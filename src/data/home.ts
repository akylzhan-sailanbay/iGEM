/**
 * Home page content: the nine questions a visitor asks, and where the project stands.
 * Update `status` as work progresses — it is the honest summary judges and visitors see first.
 */
export interface Question {
  question: string;
  answer: string;
  link: string;
  linkLabel: string;
}

export const questions: Question[] = [
  {
    question: 'What problem are we solving?',
    answer:
      'Lung cancer is the most frequently diagnosed cancer and the leading cause of cancer death worldwide. In Kazakhstan it causes the largest share of cancer deaths, and patients are usually diagnosed once the disease is already advanced.',
    link: 'problem',
    linkLabel: 'Lung cancer is usually found late',
  },
  {
    question: 'Why is it important?',
    answer:
      'Screening people at high risk with low-dose CT reduced lung cancer deaths by 20% in the National Lung Screening Trial. That kind of programme needs scanners, radiologists and follow-up clinics within reach of the people being screened.',
    link: 'problem#why-screening-is-hard-to-reach',
    linkLabel: 'Why screening is hard to reach',
  },
  {
    question: 'What is OncoNose?',
    answer:
      'A screening concept. An array of engineered biological sensing modules responds to volatile organic compounds in exhaled breath, and the combined responses form a pattern we call a breath signature.',
    link: 'solution',
    linkLabel: 'A biological nose for breath',
  },
  {
    question: 'How does it work?',
    answer:
      'In six steps: collect a breath sample, bring its compounds to the sensing array, let each module respond, read the responses, compare the pattern with references, and refer unusual patterns for clinical follow-up.',
    link: 'how-it-works',
    linkLabel: 'From one breath to a signature',
  },
  {
    question: 'Why synthetic biology?',
    answer:
      'Biology already detects small molecules for a living. Receptors and regulatory circuits can be moved into engineered cells and coupled to reporters that are easy to read. Whether that is practical for breath is exactly what we want to find out.',
    link: 'synthetic-biology',
    linkLabel: 'Engineering the sensing modules',
  },
  {
    question: 'What did the team build and test?',
    answer:
      'Module designs, the array concept and the testing plan are in place. Wet-lab data is not in yet, and every page marks what is still missing rather than filling the gap with a guess.',
    link: 'experiments',
    linkLabel: 'How we test each claim',
  },
  {
    question: 'What evidence supports the concept?',
    answer:
      'For breath analysis in general: two decades of published studies, including sensor arrays that separated breath samples of lung cancer patients from controls. For OncoNose specifically: no results yet. The figures are prepared and empty.',
    link: 'results',
    linkLabel: 'What the data shows',
  },
  {
    question: 'What are the limitations?',
    answer:
      'Breath patterns overlap between conditions, samples are affected by diet, smoking and the air in the room, and a pattern-based screening result is never a diagnosis. Nothing on this site is clinically validated.',
    link: 'safety-and-security',
    linkLabel: 'Limits, risks and responsibilities',
  },
  {
    question: 'What could happen next?',
    answer:
      'If modules respond reliably and repeatably, the next step is a small, tightly controlled study designed together with clinicians, patients and public-health researchers in Kazakhstan.',
    link: 'human-practices',
    linkLabel: 'Screening that fits real clinics',
  },
];

export interface StatusStage {
  name: string;
  state: 'done' | 'active' | 'planned';
  note: string;
}

export const status: StatusStage[] = [
  {
    name: 'Concept and literature review',
    state: 'done',
    note: 'Breath VOC studies, electronic-nose work and engineered biological sensors reviewed and cited across this site.',
  },
  {
    name: 'Sensing module design',
    state: 'active',
    note: 'Choosing sensing elements, reporters and a chassis. Nothing is fixed yet, so the module list on this site is illustrative.',
  },
  {
    name: 'Constructs built and sequenced',
    state: 'planned',
    note: 'Cloning plan and part list to be added once designs are final.',
  },
  {
    name: 'Module characterisation in the lab',
    state: 'planned',
    note: 'Dose–response, specificity and reproducibility for each module, against defined compound standards.',
  },
  {
    name: 'Array response to compound mixtures',
    state: 'planned',
    note: 'Whether the full array produces separable patterns for mixtures, not just single compounds.',
  },
  {
    name: 'Work with human breath samples',
    state: 'planned',
    note: 'Not started. Requires an approved protocol, ethics review and clinical partners before any sample is collected.',
  },
];
