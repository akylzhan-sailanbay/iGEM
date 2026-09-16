/**
 * Minimal scale helpers for the build-time SVG charts. No charting library needed.
 */
export interface Scale {
  (value: number): number;
  ticks: number[];
  format: (value: number) => string;
  domain: [number, number];
}

function niceStep(rough: number): number {
  const power = Math.pow(10, Math.floor(Math.log10(rough)));
  const scaled = rough / power;
  const step = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return step * power;
}

export function formatNumber(value: number): string {
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1000) return value.toLocaleString('en');
  if (abs >= 1) return String(Math.round(value * 100) / 100);
  if (abs >= 0.001) return String(Math.round(value * 10000) / 10000);
  return value.toExponential(0);
}

/** Linear scale from a data domain to a pixel range, with rounded tick values. */
export function linearScale(domain: [number, number], range: [number, number], tickCount = 5): Scale {
  const [d0, d1] = domain[0] === domain[1] ? [domain[0], domain[0] + 1] : domain;
  const step = niceStep((d1 - d0) / tickCount);
  const start = Math.ceil(d0 / step) * step;
  const ticks: number[] = [];
  for (let t = start; t <= d1 + step * 0.001; t += step) ticks.push(Math.round(t / step) * step);

  const scale = ((value: number) =>
    range[0] + ((value - d0) / (d1 - d0)) * (range[1] - range[0])) as Scale;
  scale.ticks = ticks;
  scale.format = formatNumber;
  scale.domain = [d0, d1];
  return scale;
}

/** Log10 scale, for concentration series that span orders of magnitude. */
export function logScale(domain: [number, number], range: [number, number]): Scale {
  const d0 = Math.log10(Math.max(domain[0], Number.EPSILON));
  const d1 = Math.log10(Math.max(domain[1], domain[0] * 10));
  const ticks: number[] = [];
  for (let e = Math.floor(d0); e <= Math.ceil(d1); e++) {
    const value = Math.pow(10, e);
    if (value >= Math.pow(10, d0) * 0.999 && value <= Math.pow(10, d1) * 1.001) ticks.push(value);
  }

  const scale = ((value: number) =>
    range[0] + ((Math.log10(Math.max(value, Number.EPSILON)) - d0) / (d1 - d0)) * (range[1] - range[0])) as Scale;
  scale.ticks = ticks;
  scale.format = (value: number) => {
    const exponent = Math.round(Math.log10(value));
    if (exponent >= -2 && exponent <= 3) return formatNumber(value);
    return `1e${exponent}`;
  };
  scale.domain = [Math.pow(10, d0), Math.pow(10, d1)];
  return scale;
}

export function extent(values: number[], pad = 0.05): [number, number] {
  if (!values.length) return [0, 1];
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return [min - 1, max + 1];
  const padding = (max - min) * pad;
  return [min - padding, max + padding];
}
