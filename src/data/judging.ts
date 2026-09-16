/**
 * Where the evidence for each iGEM deliverable lives on this site.
 *
 * IMPORTANT: check this list against the current iGEM 2026 judging handbook and medal criteria
 * before the wiki freeze. Requirements change between years; this is our mapping, not iGEM's.
 */
export interface JudgingItem {
  criterion: string;
  what: string;
  /** Page slug plus optional hash */
  where: string;
  whereLabel: string;
  status: 'ready' | 'partial' | 'missing';
  note?: string;
}

export const judging: JudgingItem[] = [
  {
    criterion: 'Project description',
    what: 'What the project is, why it matters and where the idea came from.',
    where: 'solution',
    whereLabel: 'Solution',
    status: 'ready',
  },
  {
    criterion: 'Problem and motivation',
    what: 'The health problem, with sources, and the local context.',
    where: 'problem',
    whereLabel: 'Problem',
    status: 'ready',
  },
  {
    criterion: 'Engineering success',
    what: 'Design–build–test–learn cycles with what each one changed.',
    where: 'experiments#engineering',
    whereLabel: 'Experiments, engineering cycles',
    status: 'partial',
    note: 'The cycle structure is in place; completed cycles need real build and test data.',
  },
  {
    criterion: 'Experimental design',
    what: 'Hypotheses, controls, variables and workflow.',
    where: 'experiments',
    whereLabel: 'Experiments',
    status: 'ready',
  },
  {
    criterion: 'Results and proof of concept',
    what: 'Measured data supporting the claims.',
    where: 'results',
    whereLabel: 'Results',
    status: 'missing',
    note: 'No experimental results yet. Figures are built and explicitly empty.',
  },
  {
    criterion: 'Modelling',
    what: 'The analysis pipeline, module model and validation plan.',
    where: 'model',
    whereLabel: 'Modeling',
    status: 'partial',
    note: 'Methods and an interactive module model are documented; fitted parameters need data.',
  },
  {
    criterion: 'Parts',
    what: 'Parts used and contributed, with documentation.',
    where: 'synthetic-biology#parts',
    whereLabel: 'Synthetic biology, parts',
    status: 'missing',
    note: 'Part list to be added once constructs are final.',
  },
  {
    criterion: 'Human practices',
    what: 'Who we consulted, what we learned and what changed as a result.',
    where: 'human-practices',
    whereLabel: 'Human practices',
    status: 'partial',
    note: 'Stakeholder plan and questions are published; the engagement log is empty until conversations happen.',
  },
  {
    criterion: 'Safety and security',
    what: 'Biosafety, ethics, limitations and responsible communication.',
    where: 'safety-and-security',
    whereLabel: 'Safety and ethics',
    status: 'partial',
    note: 'Framework and limitations are written; organism-specific documentation is pending.',
  },
  {
    criterion: 'Contribution',
    what: 'What we leave behind for future teams.',
    where: 'judging#contribution',
    whereLabel: 'This page, contribution section',
    status: 'partial',
  },
  {
    criterion: 'Attributions',
    what: 'Who did what, including help from outside the team.',
    where: 'attributions',
    whereLabel: 'Attributions',
    status: 'missing',
    note: 'Needs the official iGEM attributions form and the team’s own record.',
  },
  {
    criterion: 'Team',
    what: 'Members, roles and how the work was shared.',
    where: 'team',
    whereLabel: 'Team',
    status: 'missing',
    note: 'Member list not filled in yet.',
  },
];

export const statusLabels = {
  ready: 'Documented',
  partial: 'Partly documented',
  missing: 'Not yet',
} as const;
