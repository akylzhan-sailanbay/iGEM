/**
 * Client-side simulation for the breath instrument.
 *
 * One "breath" releases compound particles in proportion to the selected profile. Each particle
 * travels to a sensing module chosen by that module's sensitivity, so cross-reactive modules also
 * light up. Module brightness and the signature polygon follow the particles that have arrived.
 * With reduced motion, the final state is shown immediately.
 */
import { families, modules, profiles, profileResponses, type FamilyId } from '../../data/signals';
import { geometries, pointsAttr, signaturePoints, type InstrumentGeometry, type LayoutKind, type Point } from '../../lib/instrument-geometry';

const SVG_NS = 'http://www.w3.org/2000/svg';
const BREATH_MS = 2600;
const EMIT_MS = 1500;
/** Distance from reference (RMS over modules) at which the illustration suggests follow-up */
const FOLLOW_UP_THRESHOLD = 0.15;
/** Distance shown at the right end of the bar */
const DISTANCE_SCALE_MAX = 0.45;

const referenceValues = profileResponses(profiles[0]);

interface Particle {
  el: SVGPathElement;
  moduleIndex: number;
  route: Point[];
  segments: number[];
  length: number;
  start: number;
  duration: number;
  wobble: number;
  arrived: boolean;
}

const glyphPath: Record<string, string> = {
  circle: 'M0 -4.5a4.5 4.5 0 1 0 0.01 0Z',
  diamond: 'M0 -5.5 5.5 0 0 5.5 -5.5 0Z',
  triangle: 'M0 -5.5 5.2 4 -5.2 4Z',
};

function rms(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0) / a.length);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function pointAlong(route: Point[], segments: number[], distance: number): Point {
  let remaining = distance;
  for (let i = 0; i < segments.length; i++) {
    if (remaining <= segments[i] || i === segments.length - 1) {
      const t = segments[i] === 0 ? 1 : Math.min(1, remaining / segments[i]);
      return {
        x: route[i].x + (route[i + 1].x - route[i].x) * t,
        y: route[i].y + (route[i + 1].y - route[i].y) * t,
      };
    }
    remaining -= segments[i];
  }
  return route[route.length - 1];
}

function describe(values: number[]) {
  const distance = rms(values, referenceValues);
  const familyShift = Object.fromEntries(
    families.map((f) => {
      const idx = modules.map((m, i) => (m.family === f.id ? i : -1)).filter((i) => i >= 0);
      const shift = idx.reduce((s, i) => s + values[i] - referenceValues[i], 0) / idx.length;
      return [f.id, shift];
    }),
  ) as Record<FamilyId, number>;

  if (distance < FOLLOW_UP_THRESHOLD) {
    return { distance, state: 'Close to the reference pattern' };
  }
  const largest = Math.max(...families.map((f) => familyShift[f.id]));
  const risen = families.filter((f) => familyShift[f.id] > Math.max(0.12, largest * 0.7));
  if (risen.length === 1 && risen[0].id === 'inflammation') {
    return { distance, state: 'Different from reference, mainly in the inflammation modules' };
  }
  const names = risen.map((f) => f.short.toLowerCase());
  const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0] ?? 'several';
  return { distance, state: `Different from reference across ${list} modules` };
}

export function initInstrument(root: HTMLElement) {
  document.documentElement.classList.add('js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const svgs = Array.from(root.querySelectorAll<SVGSVGElement>('svg[data-layout]'));
  const radios = Array.from(root.querySelectorAll<HTMLInputElement>('input[name="breath-profile"]'));
  const exhaleButton = root.querySelector<HTMLButtonElement>('[data-exhale]')!;
  const stateEl = root.querySelector<HTMLElement>('[data-readout-state]')!;
  const explainEl = root.querySelector<HTMLElement>('[data-readout-explain]')!;
  const distanceFill = root.querySelector<HTMLElement>('[data-distance-fill]')!;
  const wordmark = document.querySelector<HTMLElement>('[data-breathing-wordmark]');
  root.querySelector<HTMLElement>('.distance')?.style.setProperty('--line', `${(FOLLOW_UP_THRESHOLD / DISTANCE_SCALE_MAX) * 100}%`);

  let shown = [...referenceValues];
  let target = [...referenceValues];
  let from = [...referenceValues];
  let particles: Particle[] = [];
  let arrivedPerModule: number[] = modules.map(() => 0);
  let expectedPerModule: number[] = modules.map(() => 0);
  let startTime = 0;
  let raf = 0;
  let running = false;
  let profileId = profiles[0].id;

  const visibleSvg = (): SVGSVGElement | undefined => svgs.find((svg) => svg.getBoundingClientRect().width > 0);
  const geometryFor = (svg: SVGSVGElement): InstrumentGeometry => geometries[svg.dataset.layout as LayoutKind];

  function render(values: number[]) {
    for (const svg of svgs) {
      const g = geometryFor(svg);
      modules.forEach((m, i) => {
        const chamber = svg.querySelector<SVGGElement>(`[data-chamber="${m.id}"]`);
        chamber?.style.setProperty('--value', values[i].toFixed(3));
      });
      const pts = signaturePoints(g, values);
      svg.querySelector('[data-sig-shape]')?.setAttribute('points', pointsAttr(pts));
      modules.forEach((m, i) => {
        const dot = svg.querySelector(`[data-sig-dot="${m.id}"]`);
        dot?.setAttribute('cx', pts[i].x.toFixed(1));
        dot?.setAttribute('cy', pts[i].y.toFixed(1));
      });
    }
  }

  function updateReadout(values: number[]) {
    const profile = profiles.find((p) => p.id === profileId)!;
    const { distance, state } = describe(values);
    const position = Math.min(1, distance / DISTANCE_SCALE_MAX);
    distanceFill.style.setProperty('--d', position.toFixed(3));
    stateEl.textContent = state;
    explainEl.textContent = profile.explanation;
    modules.forEach((m, i) => {
      const cell = root.querySelector(`[data-value-cell="${m.id}"]`);
      if (cell) cell.textContent = String(Math.round(values[i] * 100));
    });
  }

  function clearParticles() {
    particles.forEach((p) => p.el.remove());
    particles = [];
  }

  function finish() {
    cancelAnimationFrame(raf);
    running = false;
    clearParticles();
    shown = [...target];
    render(shown);
    updateReadout(shown);
    wordmark?.style.setProperty('--exhale', '0');
    exhaleButton.removeAttribute('aria-disabled');
  }

  function spawnParticles(svg: SVGSVGElement, abundance: Record<FamilyId, number>) {
    const g = geometryFor(svg);
    const layer = svg.querySelector('[data-particles]')!;
    arrivedPerModule = modules.map(() => 0);
    expectedPerModule = modules.map(() => 0);

    for (const family of families) {
      const count = Math.round(4 + abundance[family.id] * 26);
      const weights = modules.map((m) => m.sensitivity[family.id] ** 2);
      const totalWeight = weights.reduce((a, b) => a + b, 0);

      for (let n = 0; n < count; n++) {
        let pick = Math.random() * totalWeight;
        let moduleIndex = 0;
        while (pick > weights[moduleIndex] && moduleIndex < weights.length - 1) {
          pick -= weights[moduleIndex];
          moduleIndex++;
        }
        const chamber = g.chambers.find((c) => c.moduleId === modules[moduleIndex].id)!;
        const spawn = {
          x: g.inlet.spawn.x[0] + Math.random() * (g.inlet.spawn.x[1] - g.inlet.spawn.x[0]),
          y: g.inlet.spawn.y[0] + Math.random() * (g.inlet.spawn.y[1] - g.inlet.spawn.y[0]),
        };
        const end = {
          x: chamber.cx + (Math.random() - 0.5) * chamber.r * 0.9,
          y: chamber.cy + (Math.random() - 0.5) * chamber.r * 0.9,
        };
        const route = [spawn, ...chamber.route.slice(0, -1), end];
        const segments = route.slice(1).map((p, i) => Math.hypot(p.x - route[i].x, p.y - route[i].y));
        const el = document.createElementNS(SVG_NS, 'path');
        el.setAttribute('d', glyphPath[family.glyph]);
        el.setAttribute('class', 'particle');
        el.setAttribute('data-family', family.id);
        el.setAttribute('transform', `translate(${spawn.x} ${spawn.y})`);
        el.style.opacity = '0';
        layer.appendChild(el);

        expectedPerModule[moduleIndex]++;
        particles.push({
          el,
          moduleIndex,
          route,
          segments,
          length: segments.reduce((a, b) => a + b, 0),
          start: Math.random() * EMIT_MS,
          duration: 1000 + Math.random() * 500,
          wobble: (Math.random() - 0.5) * 14,
          arrived: false,
        });
      }
    }
  }

  function frame(now: number) {
    const elapsed = now - startTime;

    for (const p of particles) {
      if (p.arrived) continue;
      const t = (elapsed - p.start) / p.duration;
      if (t < 0) continue;
      if (t >= 1) {
        p.arrived = true;
        arrivedPerModule[p.moduleIndex]++;
        p.el.remove();
        continue;
      }
      const eased = easeInOut(t);
      const pos = pointAlong(p.route, p.segments, eased * p.length);
      const wobble = Math.sin(t * Math.PI * 3) * p.wobble * (1 - t);
      p.el.setAttribute('transform', `translate(${(pos.x + wobble * 0.3).toFixed(1)} ${(pos.y + wobble).toFixed(1)})`);
      p.el.style.opacity = String(Math.min(1, t * 6, (1 - t) * 5));
    }

    const current = modules.map((_, i) => {
      const expected = expectedPerModule[i];
      const progress = expected === 0 ? Math.min(1, elapsed / (EMIT_MS + 1500)) : arrivedPerModule[i] / expected;
      return from[i] + (target[i] - from[i]) * progress;
    });
    shown = shown.map((v, i) => v + (current[i] - v) * 0.18);
    render(shown);

    const breath = Math.sin(Math.PI * Math.min(1, elapsed / BREATH_MS)) ** 2;
    wordmark?.style.setProperty('--exhale', breath.toFixed(3));

    const allArrived = particles.every((p) => p.arrived);
    const settled = shown.every((v, i) => Math.abs(v - target[i]) < 0.004);
    if (allArrived && settled && elapsed > BREATH_MS) {
      finish();
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function breathe(id: string) {
    const profile = profiles.find((p) => p.id === id);
    if (!profile) return;
    if (running) finish();

    profileId = id;
    from = [...shown];
    target = profileResponses(profile);

    const svg = visibleSvg();
    if (reducedMotion.matches || !svg) {
      shown = [...target];
      render(shown);
      updateReadout(shown);
      return;
    }

    stateEl.textContent = 'Reading the breath…';
    explainEl.textContent = profile.explanation;
    exhaleButton.setAttribute('aria-disabled', 'true');
    running = true;
    spawnParticles(svg, profile.abundance);
    startTime = performance.now();
    raf = requestAnimationFrame(frame);
  }

  radios.forEach((radio) => radio.addEventListener('change', () => radio.checked && breathe(radio.value)));
  exhaleButton.addEventListener('click', () => {
    if (running) return;
    const checked = radios.find((r) => r.checked);
    shown = modules.map(() => 0);
    render(shown);
    breathe(checked?.value ?? profiles[0].id);
  });

  // If the layout switches mid-breath, jump to the end state rather than animating off-screen
  let lastLayout = visibleSvg()?.dataset.layout;
  new ResizeObserver(() => {
    const layout = visibleSvg()?.dataset.layout;
    if (layout !== lastLayout) {
      lastLayout = layout;
      if (running) finish();
    }
  }).observe(root);

  // Play one breath the first time the diagram is seen, starting from empty chambers
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    shown = modules.map(() => 0);
    render(shown);
    stateEl.textContent = 'Waiting for a breath';
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          window.setTimeout(() => {
            if (!running) breathe(profileId);
          }, 300);
        }
      },
      { threshold: 0.4 },
    );
    const target = visibleSvg() ?? root;
    observer.observe(target);
  }
}
