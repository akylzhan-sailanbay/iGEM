/**
 * Experimental results. EMPTY ON PURPOSE.
 *
 * Nothing on the Results page is invented: each figure renders real data when it is added here and
 * an explicit "waiting for data" state until then. Keep it that way — a plausible-looking curve with
 * no experiment behind it is worse than an empty axis.
 *
 * To add a dose–response curve, put one entry in `doseResponse`:
 *   {
 *     moduleId: 'm1',
 *     family: 'metabolism',
 *     compound: 'compound name',
 *     unit: 'µM',
 *     points: [{ x: 1, y: 0.05, error: 0.01 }, ...],   // y = normalised response 0–1
 *     notebook: 'Notebook entry 2026-07-14',
 *   }
 */
import type { FamilyId } from './signals';

export interface DoseResponseSet {
  moduleId: string;
  family: FamilyId;
  compound: string;
  unit: string;
  points: { x: number; y: number; error?: number }[];
  notebook?: string;
}

export const doseResponse: DoseResponseSet[] = [];

export interface SpecificityMatrix {
  /** Module labels, one per row */
  rows: string[];
  /** Compound names, one per column */
  cols: string[];
  /** values[row][col] as 0–1, or null where not measured */
  values: (number | null)[][];
  note?: string;
}

export const specificity: SpecificityMatrix | null = null;

export interface PatternRun {
  mixture: string;
  replicates: number;
  /** Mean response per module, in the module order used across the site */
  means: number[];
  sd?: number[];
}

export const patterns: PatternRun[] = [];

export interface ResultImage {
  src: string;
  alt: string;
  caption: string;
  kind: 'microscopy' | 'plate' | 'gel' | 'device' | 'other';
}

/**
 * Images must be uploaded to static.igem.wiki for the official wiki (iGEM does not allow external
 * hosting), then referenced here by their full URL.
 */
export const images: ResultImage[] = [];

export interface Dataset {
  name: string;
  description: string;
  /** Path or URL to the raw file */
  file: string | null;
  format: string;
}

export const datasets: Dataset[] = [];

export const hasAnyResults =
  doseResponse.length > 0 || specificity !== null || patterns.length > 0 || images.length > 0 || datasets.length > 0;
