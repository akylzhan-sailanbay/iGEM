/**
 * Experimental plan. Hypotheses and the workflow are the team's; results belong in src/data/results.ts.
 * Update `status` as work progresses so the site never claims more than has been done.
 */
export interface Hypothesis {
  id: string;
  statement: string;
  prediction: string;
  test: string;
  wouldFalsify: string;
  status: 'planned' | 'running' | 'done';
}

export const hypotheses: Hypothesis[] = [
  {
    id: 'H1',
    statement: 'Each sensing module responds to its target compound class in a dose-dependent way.',
    prediction: 'Reporter signal increases with compound concentration and follows a saturating curve.',
    test: 'Expose each module to a concentration series of a defined standard, with unexposed and solvent-only controls, in at least three biological replicates.',
    wouldFalsify: 'No signal above background, or a signal that does not change with concentration.',
    status: 'planned',
  },
  {
    id: 'H2',
    statement: 'Modules differ from each other in what they respond to.',
    prediction: 'A panel of compounds produces a different response profile for each module.',
    test: 'Cross-reactivity panel: every module against every compound in the panel, at a fixed concentration.',
    wouldFalsify: 'All modules respond identically, which would mean the array carries no more information than one module.',
    status: 'planned',
  },
  {
    id: 'H3',
    statement: 'The array distinguishes compound mixtures that single modules cannot.',
    prediction: 'Mixtures designed to mimic different breath profiles produce patterns that separate reliably.',
    test: 'Measure the full array against defined mixtures, repeated across days and cell batches, and analyse with the pipeline described in Modeling.',
    wouldFalsify: 'Patterns overlap between mixtures once day-to-day variation is taken into account.',
    status: 'planned',
  },
  {
    id: 'H4',
    statement: 'Module responses are repeatable enough to compare samples.',
    prediction: 'Variation between replicates is smaller than variation between different mixtures.',
    test: 'Repeat identical measurements across replicates, batches and days, and compare within-group with between-group variation.',
    wouldFalsify: 'Replicates vary as much as different mixtures do.',
    status: 'planned',
  },
];

export interface WorkflowStage {
  name: string;
  does: string;
  measures: string;
  controls: string[];
}

export const workflow: WorkflowStage[] = [
  {
    name: 'Design',
    does: 'Choose sensing elements, promoters, reporters and host; design constructs in silico.',
    measures: 'Nothing yet: the output is a documented design and a build plan.',
    controls: ['Design review against the safety rules before anything is ordered'],
  },
  {
    name: 'Build',
    does: 'Assemble constructs and transform the host strain.',
    measures: 'Correct assembly, by colony PCR and sequencing.',
    controls: ['Untransformed host', 'Empty-vector transformation'],
  },
  {
    name: 'Characterise single modules',
    does: 'Expose one module at a time to a concentration series of a defined compound.',
    measures: 'Reporter signal over time and concentration.',
    controls: ['Unexposed cells', 'Solvent-only exposure', 'Constitutive reporter strain'],
  },
  {
    name: 'Cross-reactivity panel',
    does: 'Test every module against every compound in the panel.',
    measures: 'Response matrix of modules against compounds.',
    controls: ['Same controls as above, repeated on every plate'],
  },
  {
    name: 'Array on mixtures',
    does: 'Run the full array against defined mixtures that mimic different breath profiles.',
    measures: 'Response pattern per mixture, repeated across days and batches.',
    controls: ['Reference mixture on every run', 'Room air blank once sampling hardware exists'],
  },
  {
    name: 'Analyse',
    does: 'Normalise, compare patterns and test whether groups separate.',
    measures: 'Separation between groups, and how well it holds on data the model has not seen.',
    controls: ['Held-out test data', 'Label shuffling to check the model is not fitting noise'],
  },
];

export interface Variable {
  kind: 'independent' | 'dependent' | 'controlled';
  name: string;
  detail: string;
}

export const variables: Variable[] = [
  { kind: 'independent', name: 'Compound identity', detail: 'Which compound or mixture the modules are exposed to.' },
  { kind: 'independent', name: 'Concentration', detail: 'Dose series spanning the range we can deliver reproducibly.' },
  { kind: 'independent', name: 'Exposure time', detail: 'How long modules are exposed before reading.' },
  { kind: 'dependent', name: 'Reporter signal', detail: 'Measured output per module, background-corrected.' },
  { kind: 'dependent', name: 'Response pattern', detail: 'The vector of module signals for one sample.' },
  { kind: 'controlled', name: 'Cell density at exposure', detail: 'Standardised optical density before each run.' },
  { kind: 'controlled', name: 'Temperature and medium', detail: 'Fixed growth and assay conditions.' },
  { kind: 'controlled', name: 'Reader settings', detail: 'Identical gain, wavelength and timing for every plate.' },
  { kind: 'controlled', name: 'Batch and day', detail: 'Recorded for every measurement so batch effects can be tested.' },
];

export interface DbtlCycle {
  number: number;
  title: string;
  design: string | null;
  build: string | null;
  test: string | null;
  learn: string | null;
}

/** Fill one entry per completed engineering cycle. Empty fields render as "not yet". */
export const cycles: DbtlCycle[] = [
  {
    number: 1,
    title: 'First sensing module',
    design: 'Select a sensing element and reporter, and design the two devices shown in Synthetic biology.',
    build: null,
    test: null,
    learn: null,
  },
];
