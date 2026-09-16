/**
 * Global project settings. Items marked TODO need real team information before the wiki freeze.
 */
export const site = {
  project: 'OncoNose',
  tagline: 'A biological nose for a breath-based future.',
  summary:
    'An iGEM project from Kazakhstan exploring whether engineered biological sensors can read patterns in exhaled breath that may help identify people at elevated risk of lung cancer.',
  year: 2026,
  country: 'Kazakhstan',

  teamName: 'OncoNose' as string | null,
  // TODO: add the team's institution(s).
  institution: null as string | null,

  // TODO: replace with the team's iGEM pages once they exist.
  links: {
    igemTeamPage: 'https://teams.igem.org/', // TODO: link the OncoNose team page
    igem: 'https://igem.org/',
    responsibility: 'https://responsibility.igem.org/',
    repository: null as string | null,
    contactEmail: null as string | null,
  },
} as const;
