/**
 * Geometry for the breath instrument diagram. Shared by the server-rendered SVG (so the
 * diagram works without JavaScript) and the client-side simulation.
 *
 * Two layouts: "wide" reads left to right, "tall" reads top to bottom for narrow screens.
 */
import { families, modules, type FamilyId } from '../data/signals';

export type LayoutKind = 'wide' | 'tall';

export interface Point {
  x: number;
  y: number;
}

export interface Chamber {
  moduleId: string;
  label: string;
  family: FamilyId;
  cx: number;
  cy: number;
  r: number;
  /** Path a compound follows from the breath inlet to this chamber */
  route: Point[];
  cells: { cx: number; cy: number; r: number }[];
}

export interface InstrumentGeometry {
  kind: LayoutKind;
  width: number;
  height: number;
  inlet: { x: number; y: number; w: number; h: number; spawn: { x: [number, number]; y: [number, number] } };
  airways: string[];
  chambers: Chamber[];
  signature: { cx: number; cy: number; r: number; spokes: { moduleId: string; angle: number; family: FamilyId; label: string }[] };
  labels: { text: string; x: number; y: number; anchor: 'start' | 'middle' | 'end' }[];
}

const familyOrder: FamilyId[] = families.map((f) => f.id);

function cellsFor(cx: number, cy: number, r: number) {
  const cells = [{ cx, cy, r: r * 0.17 }];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    cells.push({ cx: cx + Math.cos(a) * r * 0.46, cy: cy + Math.sin(a) * r * 0.46, r: r * 0.17 });
  }
  return cells;
}

function spokes() {
  return modules.map((m, i) => ({
    moduleId: m.id,
    angle: -Math.PI / 2 + (i * 2 * Math.PI) / modules.length,
    family: m.family,
    label: m.label,
  }));
}

/** Modules grouped into rows by family, two columns per row */
function modulesByRow() {
  return familyOrder.map((family) => modules.filter((m) => m.family === family));
}

function wide(): InstrumentGeometry {
  const cy = 250;
  const exit = { x: 200, y: cy };
  const junction = { x: 330, y: cy };
  const rowYs = [100, 250, 400];
  const branchX = 450;
  const colXs = [562, 702];
  const r = 58;

  const chambers: Chamber[] = [];
  const airways = [`M${exit.x} ${cy} H${junction.x}`];

  modulesByRow().forEach((row, i) => {
    const y = rowYs[i];
    airways.push(`M${junction.x} ${cy} C ${junction.x + 70} ${cy}, ${branchX - 70} ${y}, ${branchX} ${y}`);
    airways.push(`M${branchX} ${y} H${colXs[colXs.length - 1] + r + 14}`);
    row.forEach((m, j) => {
      const cx = colXs[j];
      chambers.push({
        moduleId: m.id,
        label: m.label,
        family: m.family,
        cx,
        cy: y,
        r,
        route: [
          exit,
          junction,
          { x: junction.x + 55, y: cy + (y - cy) * 0.2 },
          { x: branchX - 45, y: cy + (y - cy) * 0.85 },
          { x: branchX, y },
          { x: cx, y },
        ],
        cells: cellsFor(cx, y, r),
      });
    });
  });

  return {
    kind: 'wide',
    width: 1080,
    height: 500,
    inlet: { x: 18, y: cy - 34, w: 182, h: 68, spawn: { x: [34, 90], y: [cy - 17, cy + 17] } },
    airways,
    chambers,
    signature: { cx: 922, cy, r: 114, spokes: spokes() },
    labels: [],
  };
}

function tall(): InstrumentGeometry {
  const inlet = { x: 168, y: 36, w: 64, h: 112 };
  const exit = { x: 200, y: inlet.y + inlet.h };
  const junction = { x: 200, y: 186 };
  const spineX = 44;
  const rowYs = [282, 402, 522];
  const colXs = [150, 278];
  const r = 50;

  const chambers: Chamber[] = [];
  const airways = [`M${exit.x} ${exit.y} V${junction.y}`, `M${junction.x} ${junction.y} H${spineX + 16} Q ${spineX} ${junction.y}, ${spineX} ${junction.y + 16} V${rowYs[2]}`];

  modulesByRow().forEach((row, i) => {
    const y = rowYs[i];
    airways.push(`M${spineX} ${y} H${colXs[colXs.length - 1] + r + 14}`);
    row.forEach((m, j) => {
      const cx = colXs[j];
      chambers.push({
        moduleId: m.id,
        label: m.label,
        family: m.family,
        cx,
        cy: y,
        r,
        route: [exit, junction, { x: spineX + 16, y: junction.y }, { x: spineX, y: junction.y + 16 }, { x: spineX, y }, { x: cx, y }],
        cells: cellsFor(cx, y, r),
      });
    });
  });

  return {
    kind: 'tall',
    width: 400,
    height: 830,
    inlet: { ...inlet, spawn: { x: [184, 216], y: [50, 96] } },
    airways,
    chambers,
    signature: { cx: 200, cy: 712, r: 90, spokes: spokes() },
    labels: [
      { text: 'Breath', x: 246, y: 80, anchor: 'start' },
      { text: 'VOCs', x: 246, y: 104, anchor: 'start' },
      { text: 'Sensing modules', x: 64, y: 218, anchor: 'start' },
      { text: 'Signature', x: 20, y: 612, anchor: 'start' },
    ],
  };
}

export const geometries: Record<LayoutKind, InstrumentGeometry> = { wide: wide(), tall: tall() };

/** Polygon points for a signature with values 0–1 per module */
export function signaturePoints(geometry: InstrumentGeometry, values: number[]): Point[] {
  const { cx, cy, r, spokes: s } = geometry.signature;
  return s.map((spoke, i) => {
    const v = 0.08 + 0.92 * Math.max(0, Math.min(1, values[i] ?? 0));
    return { x: cx + Math.cos(spoke.angle) * r * v, y: cy + Math.sin(spoke.angle) * r * v };
  });
}

export function pointsAttr(points: Point[]): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}
