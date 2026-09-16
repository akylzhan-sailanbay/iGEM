/**
 * Signal families, sensing modules and example breath profiles.
 *
 * IMPORTANT: the three families come from the project concept. The module list and the
 * breath profiles below are ILLUSTRATIVE, used only by the explanatory simulation on the
 * home page and the module explorer. They are not experimental data. Replace `modules`
 * with the real construct list (sensing element, target compound, reporter) as it is confirmed.
 */
export type FamilyId = 'metabolism' | 'oxidative' | 'inflammation';

export interface SignalFamily {
  id: FamilyId;
  name: string;
  short: string;
  /** Plain-language description of why this process might change breath */
  why: string;
  /** Shape used alongside colour so the encoding does not rely on colour alone */
  glyph: 'circle' | 'diamond' | 'triangle';
}

export const families: SignalFamily[] = [
  {
    id: 'metabolism',
    name: 'Tumour metabolism',
    short: 'Metabolism',
    why: 'Cancer cells rewire their metabolism, which can change the small volatile molecules they release.',
    glyph: 'circle',
  },
  {
    id: 'oxidative',
    name: 'Oxidative stress',
    short: 'Oxidative stress',
    why: 'Reactive oxygen species damage cell membrane lipids, and that damage can release volatile by-products.',
    glyph: 'diamond',
  },
  {
    id: 'inflammation',
    name: 'Chronic inflammation',
    short: 'Inflammation',
    why: 'Long-term inflammation in the airways changes local chemistry, but it is also common without cancer.',
    glyph: 'triangle',
  },
];

export interface SensingModule {
  id: string;
  label: string;
  family: FamilyId;
  /** Relative response to each family of compounds (0–1). Cross-reactivity is what makes a pattern. */
  sensitivity: Record<FamilyId, number>;
  /** Real construct details; null until confirmed by the wet lab */
  target: string | null;
  sensingElement: string | null;
  reporter: string | null;
  chassis: string | null;
  status: 'illustrative' | 'designed' | 'built' | 'tested';
}

export const modules: SensingModule[] = [
  {
    id: 'm1',
    label: 'M1',
    family: 'metabolism',
    sensitivity: { metabolism: 1, oxidative: 0.15, inflammation: 0.05 },
    target: null,
    sensingElement: null,
    reporter: null,
    chassis: null,
    status: 'illustrative',
  },
  {
    id: 'm2',
    label: 'M2',
    family: 'metabolism',
    sensitivity: { metabolism: 0.8, oxidative: 0.05, inflammation: 0.25 },
    target: null,
    sensingElement: null,
    reporter: null,
    chassis: null,
    status: 'illustrative',
  },
  {
    id: 'm3',
    label: 'M3',
    family: 'oxidative',
    sensitivity: { metabolism: 0.1, oxidative: 1, inflammation: 0.1 },
    target: null,
    sensingElement: null,
    reporter: null,
    chassis: null,
    status: 'illustrative',
  },
  {
    id: 'm4',
    label: 'M4',
    family: 'oxidative',
    sensitivity: { metabolism: 0.25, oxidative: 0.75, inflammation: 0.05 },
    target: null,
    sensingElement: null,
    reporter: null,
    chassis: null,
    status: 'illustrative',
  },
  {
    id: 'm5',
    label: 'M5',
    family: 'inflammation',
    sensitivity: { metabolism: 0.05, oxidative: 0.2, inflammation: 1 },
    target: null,
    sensingElement: null,
    reporter: null,
    chassis: null,
    status: 'illustrative',
  },
  {
    id: 'm6',
    label: 'M6',
    family: 'inflammation',
    sensitivity: { metabolism: 0.2, oxidative: 0.1, inflammation: 0.8 },
    target: null,
    sensingElement: null,
    reporter: null,
    chassis: null,
    status: 'illustrative',
  },
];

export interface BreathProfile {
  id: string;
  name: string;
  /** Relative abundance of each compound family (0–1) */
  abundance: Record<FamilyId, number>;
  explanation: string;
}

export const profiles: BreathProfile[] = [
  {
    id: 'reference',
    name: 'Reference breath',
    abundance: { metabolism: 0.3, oxidative: 0.3, inflammation: 0.28 },
    explanation: 'A baseline pattern. Every sample is compared with references like this one.',
  },
  {
    id: 'elevated',
    name: 'Elevated-risk example',
    abundance: { metabolism: 0.85, oxidative: 0.7, inflammation: 0.45 },
    explanation:
      'Metabolism and oxidative-stress modules rise together. In the concept, a pattern like this would be referred for clinical follow-up, not diagnosed.',
  },
  {
    id: 'inflammation',
    name: 'Inflammation confounder',
    abundance: { metabolism: 0.3, oxidative: 0.34, inflammation: 0.95 },
    explanation:
      'Only the inflammation modules rise. It differs from the reference but not in the same shape, which is why the analysis must compare whole patterns rather than single signals.',
  },
];

/**
 * Illustrative Hill-type response: weak inputs give little signal, strong inputs saturate.
 * K is the input giving a half-maximal response and n sets how switch-like the module is.
 */
export function moduleResponse(module: SensingModule, abundance: Record<FamilyId, number>): number {
  const drive = (Object.keys(abundance) as FamilyId[]).reduce(
    (sum, f) => sum + module.sensitivity[f] * abundance[f],
    0,
  );
  const K = 0.6;
  const n = 2;
  return Math.min(1, drive ** n / (K ** n + drive ** n));
}

export function profileResponses(profile: BreathProfile): number[] {
  return modules.map((m) => moduleResponse(m, profile.abundance));
}

export function familyById(id: FamilyId): SignalFamily {
  return families.find((f) => f.id === id)!;
}
