/**
 * The story of the project, in reading order. Order here drives the chapter rail,
 * previous/next links, the home page question index and the navigation menus.
 */
export type NavGroup = 'Project' | 'Science' | 'Impact' | 'Team';

export interface Chapter {
  slug: string;
  /** Short label used in navigation */
  nav: string;
  /** Page title */
  title: string;
  /** The visitor question this chapter answers */
  question: string;
  /** One-sentence description used in menus and the page header */
  description: string;
  group: NavGroup;
}

export const chapters: Chapter[] = [
  {
    slug: 'problem',
    nav: 'Problem',
    title: 'Lung cancer is usually found late',
    question: 'What problem are we solving?',
    description: 'Lung cancer burden, late diagnosis in Kazakhstan, and why screening is hard to reach.',
    group: 'Project',
  },
  {
    slug: 'solution',
    nav: 'Solution',
    title: 'A biological nose for breath',
    question: 'What is OncoNose?',
    description: 'Breath analysis, VOCs, and the idea of replacing chemical sensors with biological ones.',
    group: 'Project',
  },
  {
    slug: 'how-it-works',
    nav: 'How it works',
    title: 'From one breath to a signature',
    question: 'How does it work?',
    description: 'The six steps from a breath sample to a pattern that could prompt follow-up.',
    group: 'Project',
  },
  {
    slug: 'synthetic-biology',
    nav: 'Synthetic biology',
    title: 'Engineering the sensing modules',
    question: 'Why synthetic biology?',
    description: 'Sensing modules, genetic circuits, reporters, and how the array is kept modular.',
    group: 'Science',
  },
  {
    slug: 'experiments',
    nav: 'Experiments',
    title: 'How we test each claim',
    question: 'What did the team build and test?',
    description: 'Hypotheses, controls, variables, workflow and engineering cycles.',
    group: 'Science',
  },
  {
    slug: 'results',
    nav: 'Results',
    title: 'What the data shows',
    question: 'What evidence supports the concept?',
    description: 'Module responses, dose–response curves, response patterns and images.',
    group: 'Science',
  },
  {
    slug: 'model',
    nav: 'Modeling',
    title: 'From signals to a signature',
    question: 'How is a pattern analysed?',
    description: 'Normalisation, feature extraction, classification and how we avoid overfitting.',
    group: 'Science',
  },
  {
    slug: 'human-practices',
    nav: 'Human practices',
    title: 'Screening that fits real clinics',
    question: 'What could happen next?',
    description: 'Kazakhstan’s healthcare context, stakeholders, affordability and responsible use.',
    group: 'Impact',
  },
  {
    slug: 'safety-and-security',
    nav: 'Safety & ethics',
    title: 'Limits, risks and responsibilities',
    question: 'What are the limitations?',
    description: 'Biosafety, ethics of screening, clinical validation and known limitations.',
    group: 'Impact',
  },
];

export interface SupportPage {
  slug: string;
  nav: string;
  description: string;
  group: NavGroup | null;
}

export const supportPages: SupportPage[] = [
  { slug: 'team', nav: 'Team', description: 'Who we are and who did what.', group: 'Team' },
  {
    slug: 'attributions',
    nav: 'Attributions',
    description: 'Contributions from team members, advisors and partners.',
    group: 'Team',
  },
  { slug: 'references', nav: 'References', description: 'Every source cited on this site.', group: null },
  {
    slug: 'judging',
    nav: 'Judging guide',
    description: 'Where to find the evidence for each iGEM criterion.',
    group: null,
  },
];

export const navGroups: NavGroup[] = ['Project', 'Science', 'Impact', 'Team'];

export function chapterIndex(slug: string): number {
  return chapters.findIndex((c) => c.slug === slug);
}

export function getChapter(slug: string): Chapter {
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) throw new Error(`Unknown chapter: ${slug}`);
  return chapter;
}

export function pagesInGroup(group: NavGroup) {
  return [
    ...chapters.filter((c) => c.group === group).map((c) => ({ slug: c.slug, nav: c.nav, description: c.description })),
    ...supportPages.filter((p) => p.group === group),
  ];
}
