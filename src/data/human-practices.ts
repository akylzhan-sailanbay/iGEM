/**
 * Human practices. Stakeholder groups are who we intend to work with; `engagements` records what
 * actually happened. Never add an engagement that has not taken place.
 */
export interface StakeholderGroup {
  id: string;
  name: string;
  who: string;
  whyThem: string;
  whatWeAsk: string[];
}

export const stakeholders: StakeholderGroup[] = [
  {
    id: 'clinicians',
    name: 'Clinicians',
    who: 'Pulmonologists, oncologists, radiologists and primary care doctors.',
    whyThem: 'They decide who is referred, and they would be the ones acting on any result.',
    whatWeAsk: [
      'Where in the pathway a triage test could help, if anywhere.',
      'What accuracy would be needed before they would trust it.',
      'What a false alarm costs their clinic and their patients.',
    ],
  },
  {
    id: 'patients',
    name: 'Patients and the public',
    who: 'People at higher risk of lung cancer, survivors, and the general public.',
    whyThem: 'A screening test nobody wants to take does not screen anyone.',
    whatWeAsk: [
      'Whether breathing into a device is acceptable, and in what setting.',
      'How they would want an elevated-risk result explained to them.',
      'What they would expect to happen next, and how quickly.',
    ],
  },
  {
    id: 'public-health',
    name: 'Public health and policy',
    who: 'Oncology services, health ministry staff, epidemiologists.',
    whyThem: 'Screening is a system decision, not a device decision.',
    whatWeAsk: [
      'How lung cancer screening is organised today in Kazakhstan.',
      'What evidence would be required before any new test could be piloted.',
      'Which regions have the least access to CT, and why.',
    ],
  },
  {
    id: 'ethics',
    name: 'Bioethics and biosafety',
    who: 'Ethics committees, biosafety officers, our institutional advisors.',
    whyThem: 'Consent, data handling and containment have to be designed in, not added later.',
    whatWeAsk: [
      'What would be required before any human breath sample could be collected.',
      'How to handle results that a research project is not qualified to interpret.',
      'What containment applies to engineered cells used outside a laboratory.',
    ],
  },
  {
    id: 'makers',
    name: 'Engineers and manufacturers',
    who: 'Device engineers, laboratory suppliers, local manufacturers.',
    whyThem: 'Portability and cost are engineering problems as much as biological ones.',
    whatWeAsk: [
      'What a simple optical reader would cost to build locally.',
      'How engineered cells could be stored and shipped without a cold chain.',
    ],
  },
];

export interface Engagement {
  date: string;
  who: string;
  what: string;
  /** What we changed because of it. This is the part that matters. */
  changed: string;
}

/** Add an entry only after the conversation has happened. */
export const engagements: Engagement[] = [];

export interface Principle {
  title: string;
  detail: string;
}

export const principles: Principle[] = [
  {
    title: 'Never call a pattern a diagnosis',
    detail:
      'Any output is a suggestion to seek standard clinical assessment. The wording of every result, on this site and in any future device, follows that rule.',
  },
  {
    title: 'A test is only as useful as the pathway behind it',
    detail:
      'Flagging people in places where follow-up is unavailable creates anxiety without benefit. Deployment questions come before device questions.',
  },
  {
    title: 'Design for the clinic that exists',
    detail:
      'Cost, power, storage and training are constraints, not details. A device that needs a cold chain is not a device for a rural clinic.',
  },
  {
    title: 'Breath data is health data',
    detail:
      'Any sample collection would need informed consent, a clear retention policy and no identifiable data leaving the study.',
  },
  {
    title: 'Say what we do not know',
    detail:
      'Every page marks what is evidence, what is hypothesis and what is missing. That is a deliberate choice about how research should be communicated.',
  },
];
