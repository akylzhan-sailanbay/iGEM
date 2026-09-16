/**
 * The six steps of the OncoNose concept, shown on the How it works page.
 * `status` describes where the project is for that step, not whether the step is proven in general.
 */
export interface PipelineStep {
  id: string;
  title: string;
  short: string;
  happens: string;
  mustShow: string;
  openQuestions: string[];
  status: 'concept' | 'designing' | 'testing' | 'shown';
}

export const pipeline: PipelineStep[] = [
  {
    id: 'breath',
    title: 'A person breathes out',
    short: 'Breath',
    happens:
      'A breath sample is collected in a way that can be repeated: the same volume, the same part of the breath, and a matching sample of the room air for comparison.',
    mustShow: 'That sampling is consistent enough that differences between people are larger than differences between repeat samples.',
    openQuestions: [
      'Which collection method to use (for example a sampling bag or a direct inlet).',
      'How to record and correct for room air, recent meals and smoking.',
    ],
    status: 'concept',
  },
  {
    id: 'vocs',
    title: 'Compounds reach the sensing array',
    short: 'VOCs',
    happens:
      'Volatile organic compounds from the sample are delivered to the sensing modules, for example by passing the gas over them or dissolving it into the medium they sit in.',
    mustShow: 'That enough of each compound reaches the modules, in a form the biology can respond to.',
    openQuestions: [
      'Breath VOCs are present at very low concentrations. Can they be concentrated without distorting the pattern?',
      'How long the modules need to be exposed.',
    ],
    status: 'concept',
  },
  {
    id: 'respond',
    title: 'Each sensing module responds',
    short: 'Modules respond',
    happens:
      'Each module contains an engineered biological sensor. When its target compounds are present, a genetic circuit switches on a reporter that produces a measurable signal such as fluorescence.',
    mustShow: 'Dose–response curves for each module, and how strongly each module reacts to compounds it was not designed for.',
    openQuestions: ['Which sensing elements respond to breath-relevant compounds at realistic concentrations.'],
    status: 'designing',
  },
  {
    id: 'pattern',
    title: 'Responses form a pattern',
    short: 'Pattern',
    happens:
      'The reporter signals from all modules are read at the same time. Together they form a vector of numbers: the breath signature.',
    mustShow: 'That different compound mixtures produce patterns that can be told apart, repeatably.',
    openQuestions: ['How many modules are needed before patterns become distinct.'],
    status: 'concept',
  },
  {
    id: 'analyse',
    title: 'The pattern is analysed',
    short: 'Analysis',
    happens:
      'Signals are corrected for background and normalised against controls, then compared with reference patterns using a model trained and tested on separate data.',
    mustShow: 'That a model built on one set of samples still performs on samples it has never seen.',
    openQuestions: ['What reference data would be ethical and realistic to collect.'],
    status: 'designing',
  },
  {
    id: 'followup',
    title: 'Unusual patterns are referred',
    short: 'Follow-up',
    happens:
      'In the screening concept, a pattern that differs from reference in the elevated-risk direction would prompt a referral for standard clinical assessment such as low-dose CT. OncoNose would never deliver a diagnosis.',
    mustShow: 'Clinical validation in properly designed studies, which is far beyond an iGEM project.',
    openQuestions: ['How referrals would fit Kazakhstan’s existing care pathways.'],
    status: 'concept',
  },
];

export const statusLabel: Record<PipelineStep['status'], string> = {
  concept: 'Concept only',
  designing: 'Being designed',
  testing: 'Being tested',
  shown: 'Shown in our data',
};
