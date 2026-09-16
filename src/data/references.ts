/**
 * Bibliography. Every entry was checked against Crossref/PubMed before being added.
 *
 * Numbering is global and follows the order of this list, so [4] means the same source on
 * every page. Add new sources at the end to keep existing numbers stable, and cite them in
 * pages with <Cite id="..." />.
 */
export type ReferenceTopic =
  | 'Disease burden'
  | 'Screening'
  | 'Breath analysis'
  | 'Biological sensing'
  | 'Screening ethics'
  | 'Biosafety';

export interface Reference {
  id: string;
  authors: string;
  year: number;
  title: string;
  venue: string;
  details?: string;
  doi?: string;
  url?: string;
  topic: ReferenceTopic;
  /** What this source supports on the site, in plain words */
  supports: string;
}

export const references: Reference[] = [
  {
    id: 'ji2025',
    authors: 'Ji Y, Zhang Y, Liu S, et al.',
    year: 2025,
    title:
      'The epidemiological landscape of lung cancer: current status, temporal trend and future projections based on the latest estimates from GLOBOCAN 2022',
    venue: 'Journal of the National Cancer Center',
    details: '5(3):278–286',
    doi: '10.1016/j.jncc.2025.01.003',
    topic: 'Disease burden',
    supports: 'Global lung cancer cases and deaths in 2022.',
  },
  {
    id: 'akhmedullin2024',
    authors: 'Akhmedullin R, Aimyshev T, Zhakhina G, et al.',
    year: 2024,
    title:
      'In-depth analysis and trends of cancer mortality in Kazakhstan: a joinpoint analysis of nationwide healthcare data 2014–2022',
    venue: 'BMC Cancer',
    details: '24:1340',
    doi: '10.1186/s12885-024-13128-2',
    topic: 'Disease burden',
    supports: 'Share of cancer deaths in Kazakhstan caused by trachea, bronchus and lung cancer.',
  },
  {
    id: 'avizova2026',
    authors: 'Avizova Z, Myssayev A, Iztleuov Y, Mussin N, Tamadon A.',
    year: 2026,
    title:
      'Determinants of overall survival in lung cancer in Kazakhstan: a retrospective cohort study using classical survival analysis',
    venue: 'Acta Biomedica',
    details: '97(1):18341',
    doi: '10.23750/abm.2026.18341',
    topic: 'Disease burden',
    supports: 'Stage distribution and survival of lung cancer patients in Kazakhstan, 2019–2023.',
  },
  {
    id: 'nlst2011',
    authors: 'National Lung Screening Trial Research Team; Aberle DR, Adams AM, Berg CD, et al.',
    year: 2011,
    title: 'Reduced lung-cancer mortality with low-dose computed tomographic screening',
    venue: 'New England Journal of Medicine',
    details: '365(5):395–409',
    doi: '10.1056/NEJMoa1102873',
    topic: 'Screening',
    supports: 'Low-dose CT screening reduced lung cancer mortality; most positive screens were false positives.',
  },
  {
    id: 'dekoning2020',
    authors: 'de Koning HJ, van der Aalst CM, de Jong PA, et al.',
    year: 2020,
    title: 'Reduced lung-cancer mortality with volume CT screening in a randomized trial',
    venue: 'New England Journal of Medicine',
    details: '382(6):503–513',
    doi: '10.1056/NEJMoa1911793',
    topic: 'Screening',
    supports: 'A second large randomised trial (NELSON) of CT screening.',
  },
  {
    id: 'phillips1999',
    authors: 'Phillips M, Gleeson K, Hughes JMB, et al.',
    year: 1999,
    title: 'Volatile organic compounds in breath as markers of lung cancer: a cross-sectional study',
    venue: 'The Lancet',
    details: '353(9168):1930–1933',
    doi: '10.1016/S0140-6736(98)07552-7',
    topic: 'Breath analysis',
    supports: 'Early study of breath VOCs as lung cancer markers.',
  },
  {
    id: 'machado2005',
    authors: 'Machado RF, Laskowski D, Deffenderfer O, et al.',
    year: 2005,
    title: 'Detection of lung cancer by sensor array analyses of exhaled breath',
    venue: 'American Journal of Respiratory and Critical Care Medicine',
    details: '171(11):1286–1291',
    doi: '10.1164/rccm.200409-1184OC',
    topic: 'Breath analysis',
    supports: 'An electronic nose sensor array discriminated breath of lung cancer patients in a small study.',
  },
  {
    id: 'peng2009',
    authors: 'Peng G, Tisch U, Adams O, et al.',
    year: 2009,
    title: 'Diagnosing lung cancer in exhaled breath using gold nanoparticles',
    venue: 'Nature Nanotechnology',
    details: '4(10):669–673',
    doi: '10.1038/nnano.2009.235',
    topic: 'Breath analysis',
    supports: 'Nanoparticle sensor array distinguished breath of lung cancer patients from healthy controls.',
  },
  {
    id: 'hakim2012',
    authors: 'Hakim M, Broza YY, Barash O, Peled N, Phillips M, Amann A, Haick H.',
    year: 2012,
    title: 'Volatile organic compounds of lung cancer and possible biochemical pathways',
    venue: 'Chemical Reviews',
    details: '112(11):5949–5966',
    doi: '10.1021/cr300174a',
    topic: 'Breath analysis',
    supports: 'Review of lung cancer VOCs and the biochemical pathways that may produce them.',
  },
  {
    id: 'radhika2007',
    authors: 'Radhika V, Proikas-Cezanne T, Jayaraman M, et al.',
    year: 2007,
    title: 'Chemical sensing of DNT by engineered olfactory yeast strain',
    venue: 'Nature Chemical Biology',
    details: '3(6):325–330',
    doi: '10.1038/nchembio882',
    topic: 'Biological sensing',
    supports: 'Yeast engineered with olfactory receptor signalling coupled to a fluorescent reporter.',
  },
  {
    id: 'wilson1968',
    authors: 'Wilson JMG, Jungner G.',
    year: 1968,
    title: 'Principles and practice of screening for disease',
    venue: 'World Health Organization, Public Health Papers No. 34',
    url: 'https://iris.who.int/handle/10665/37650',
    topic: 'Screening ethics',
    supports: 'Classic criteria for when screening for a disease is appropriate.',
  },
  {
    id: 'who2020',
    authors: 'World Health Organization.',
    year: 2020,
    title: 'Laboratory biosafety manual, 4th edition',
    venue: 'World Health Organization',
    url: 'https://www.who.int/publications/i/item/9789240011311',
    topic: 'Biosafety',
    supports: 'Risk-based approach to laboratory biosafety.',
  },
];

export function referenceNumber(id: string): number {
  const index = references.findIndex((r) => r.id === id);
  if (index === -1) throw new Error(`Unknown reference id: ${id}`);
  return index + 1;
}

export function getReference(id: string): Reference {
  const ref = references.find((r) => r.id === id);
  if (!ref) throw new Error(`Unknown reference id: ${id}`);
  return ref;
}

export function referenceLink(ref: Reference): string | undefined {
  if (ref.doi) return `https://doi.org/${ref.doi}`;
  return ref.url;
}

/** Plain-text citation used for tooltips and accessible labels */
export function formatReference(ref: Reference): string {
  return `${ref.authors} ${ref.title}. ${ref.venue}. ${ref.year}${ref.details ? `;${ref.details}` : ''}.`;
}
