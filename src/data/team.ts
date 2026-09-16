/**
 * Team members and who did what. EMPTY UNTIL THE TEAM FILLS IT IN.
 *
 * Add one entry per person:
 *   {
 *     name: 'Full name',
 *     role: 'What they do on the team',
 *     discipline: 'What they study',
 *     contributions: ['wet-lab', 'modelling'],   // ids from `areas` below
 *     photo: 'https://static.igem.wiki/teams/.../photo.jpg',   // iGEM requires assets on their servers
 *     alt: 'Description of the photo',
 *   }
 */
export interface TeamMember {
  name: string;
  role: string;
  discipline: string;
  contributions: string[];
  photo?: string;
  alt?: string;
}

export const members: TeamMember[] = [];

export interface Area {
  id: string;
  name: string;
  detail: string;
}

export const areas: Area[] = [
  { id: 'wet-lab', name: 'Wet lab', detail: 'Construct design, cloning, characterisation experiments.' },
  { id: 'modelling', name: 'Modelling and analysis', detail: 'Normalisation, pattern analysis, model validation.' },
  { id: 'human-practices', name: 'Human practices', detail: 'Stakeholder work, ethics, deployment context.' },
  { id: 'design', name: 'Wiki and design', detail: 'This site, diagrams and science communication.' },
  { id: 'safety', name: 'Safety', detail: 'Biosafety documentation, risk assessment, iGEM safety forms.' },
  { id: 'outreach', name: 'Education and outreach', detail: 'Public engagement and collaborations.' },
];

export interface Supporter {
  name: string;
  kind: 'advisor' | 'instructor' | 'institution' | 'sponsor';
  contribution: string;
}

/** Advisors, instructors, institutions and sponsors. Add only real, confirmed entries. */
export const supporters: Supporter[] = [];
