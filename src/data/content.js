// All site text lives here. Edit this file to update the portfolio;
// the components in src/components only handle layout.

export const profile = {
  name: 'Gayathri Gupta Samudrala',
  initials: 'GS',
  // The full-screen character on the home page. `videos.wide` holds the animated
  // version (leave it null to show the still image); the still also shows while it loads.
  aboutArt: {
    wide: 'images/about-me.jpg',
    videos: {
      wide: null,
    },
  },
  // The short line under "About Gayathri" on the home page.
  intro: "I am Gayathri, an MS student in Educational Psychology & Methodology at UAlbany, where I also support students' well-being through Project ACCESS. Outside of college, I love reading fiction and have recently developed a liking for hiking.",
  tagline: [
    'MS Educational Psychology & Methodology, University at Albany, SUNY',
    'On the path to Counseling Psychology',
  ],
  interests: ['Adolescent well-being', 'Neuroplasticity', 'Neuroscience', 'Human development', 'AI'],
  email: 'gaya3guptashiksha2024@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gayathri-gupta-samudrala',
  location: 'Albany, NY',
};

export const about = {
  paragraphs: [
    'I always wanted to do Counseling Psychology. I initially found opportunities to work with children and in Child Psychology (Special Education and Speech Therapy), I utilized the opportunities that came my way and I am transitioning into Counseling Psychology.',
  ],
  facts: [
    { label: 'Currently', value: 'Prevention Navigator, Project ACCESS' },
    { label: 'Studying', value: 'MS Educational Psychology, UAlbany (Dec 2026)' },
    { label: 'Based in', value: 'Albany, NY' },
    { label: 'Languages', value: 'English, Telugu, Hindi' },
  ],
};

export const research = {
  projects: [
    {
      title: 'A meta-analysis on the relationship between language delays and externalizing behaviors in children aged 2 to 8 years',
      tag: 'Meta-analysis',
      meta: 'Schlomer, G. L., & Samudrala, G. G. (2026) · Department of Educational & Counseling Psychology, University at Albany, SUNY',
      bullets: [
        'Advisor: Dr. Gabriel Schlomer, University at Albany, SUNY',
        'Conducted systematic searches and retrieved 3,243 records.',
        'Screened 2,155 titles and abstracts in Rayyan after duplicate removal, identifying 9 studies for inclusion.',
        'Conducting statistical analyses in R.',
      ],
      status: 'Manuscript in preparation',
    },
    {
      title: 'A study on the relationship between self-esteem and well-being',
      tag: 'Individual research project',
      meta: 'Samudrala, G. G. (2022) · Department of Psychology, Andhra Mahila Sabha Arts & Science College, Hyderabad, India',
      bullets: [
        'Conducted a quantitative study investigating the correlation between self-esteem and well-being in an Indian population. Recruited 100 participants (50 male, 50 female) aged 18 to 25 years to ensure a balanced sample for comparative analysis.',
        'Drafted informed consent materials, communicated study procedures to participants, ensured confidentiality through de-identified online data collection, and maintained secure data storage.',
        'Administered standardized measures, including the Self-Esteem Scale (SES-DSDU, Dhar & Dhar, 2009) and the PERMA Profiler (Butler & Kern, 2016).',
        "Cleaned, coded, and managed the dataset. Conducted statistical analyses, including descriptive statistics, Pearson's correlations, and t-tests, to evaluate relationships between variables.",
        'Interpreted statistical findings and authored a comprehensive project report summarizing results that indicated a significant positive relationship between self-esteem and well-being.',
        'Presented findings at class and departmental research presentations.',
      ],
      status: 'Unpublished manuscript',
    },
  ],
};

// The AI & Society fellowship, shown by its own sticker.
// Describe the role only: no findings without the professor's permission.
export const fellowship = {
  title: 'AI & Society Experiential Learning Fellow',
  tag: 'Fellowship',
  meta: ['AI & Society College, University at Albany, SUNY · January 2026 – July 2026'],
  lede:
    'Selected as a funded fellow to conduct a qualitative project examining how faculty use AI in classroom environments.',
  bullets: [
    'Designed interview protocols; scheduled and conducted faculty interviews; managed data recording and transcription.',
    'Performing a thematic analysis and preparing an analytical report for the AI & Society College.',
    'Collaborated across disciplines under faculty mentorship within a university-wide initiative.',
  ],
  status: 'Final report in preparation',
};

export const experience = [
  {
    group: 'Work',
    entries: [
      {
        title: 'Prevention Navigator, Project ACCESS',
        tag: 'Current',
        meta: [
          'Research Foundation for SUNY · Center for Behavioral Health Promotion and Applied Research (CBHPAR), School of Education, University at Albany',
          'August 2026 – Present · Part-time · Albany, NY',
        ],
        lede:
          "Project ACCESS (Achieving College Completion through Engaged Support Services) is a SAMHSA-funded initiative of UAlbany's Center for Behavioral Health Promotion and Applied Research, which develops and evaluates evidence-based programs for the health and well-being of adolescents, emerging adults, and college students. The project works to improve students' health, well-being, and academic success by making prevention, support, and care easier to reach.",
        bullets: [
          'Trained in C.A.R.E.S. (Community Awareness in Resource Engagement & Suicide Prevention) for recognizing signs of distress and suicide risk and connecting students to appropriate campus and community resources.',
          'Provide one-on-one well-being appointments to all undergraduate and graduate students, using Motivational Interviewing (MI) within the SBIRT (Screening, Brief Intervention, and Referral to Treatment) framework.',
          "In an appointment, have non-judgmental peer-to-peer conversations about mental health, sexual health, alcohol and cannabis use, other substance use, nicotine and gambling, and other aspects of students' health and well-being.",
          "Connect students with on-campus and off-campus resources, such as counseling, health services, and community agencies, based on each student's needs and circumstances.",
          'Facilitate workshops, tabling, and outreach events across the UAlbany campus.',
          'Maintain documentation to support program evaluation and research.',
        ],
      },
      {
        title: 'Intersections Orientation Peer Educator',
        meta: ['Office of Student Engagement & Belonging, University at Albany · August 2025, January 2026'],
        bullets: [
          'Co-facilitated the "Intersections: Unleashing Greatness Through Belonging" orientation workshop for incoming first-year and transfer students.',
          'Led interactive discussions exploring personal and social identities to foster an inclusive campus environment.',
          'Introduced students to university resources, offices, and organizations to support their transition to UAlbany.',
        ],
      },
      {
        title: 'Assistant Speech Therapist',
        meta: ['Ashoka Multispecialty Rehabilitation Center, Hyderabad, India · February 2023 – September 2024'],
        bullets: [
          'Provided therapy to children aged 0–18 with speech, language, and communication disorders and behavioral and emotional challenges, including autism spectrum disorder, ADHD, cerebral palsy, Down syndrome, learning disorders, and intellectual disabilities.',
          'Conducted standardized assessments, designed intervention plans under speech-language pathologist supervision, and adjusted interventions based on outcome data.',
          'Delivered psychoeducation and parent training to support skill generalization at home and in the clinic.',
          'Promoted to Head of the Department, supervising interns and therapists.',
        ],
      },
      {
        title: 'Student Assistant',
        meta: ['Athletics Department, University at Albany · January 2025 – Present'],
        bullets: ['Support event operations and coordination during athletic events.'],
      },
      {
        title: 'Academic Coach, Private Instruction',
        meta: ['Hyderabad, India · 2020 – 2022'],
        bullets: [
          'Provided individualized coaching to elementary, middle, and high school students in English, Math, and Telugu, building confidence and problem-solving skills.',
        ],
      },
    ],
  },
  {
    group: 'Clinical internships',
    entries: [
      {
        title: 'Department of Child Psychology, Jiguar (NGO)',
        meta: ['Hyderabad, India · November 2022 – January 2023'],
        bullets: [
          'Visited public schools to screen children for developmental delays, Autism Spectrum Disorder (ASD), and Learning Disabilities (LD), gaining experience in administering psychological assessments such as M-CHAT-R/F and the Indian Scale for Assessment of Autism (ISAA).',
          'Contributed to referral recommendations based on screening outcomes.',
        ],
      },
      {
        title: 'Department of Clinical Psychology, ASHA Hospital',
        meta: ['Hyderabad, India · September 2022 – October 2022'],
        bullets: [
          'Participated in case discussions across diverse mental health conditions, with applied exposure to case history taking, mental status examination, and psychological assessment.',
        ],
      },
      {
        title: 'NIEPID',
        meta: ['National Institute for the Empowerment of Persons with Intellectual Disabilities, Hyderabad, India · May 2022 – June 2022'],
        bullets: [
          'Rotated through Rehabilitation Psychology, Special Education, and Physiotherapy.',
          'Participated in supervised assessments, case history taking, and psychological report writing for individuals with intellectual and developmental disabilities.',
        ],
      },
    ],
  },
  {
    group: 'Leadership and volunteering',
    entries: [
      {
        title: 'Social Skills Mentor, Friday Knights',
        meta: ['School of Education, University at Albany · September 2025 – November 2025'],
        bullets: [
          'Provided one-on-one support to a child, fostering social and personal growth.',
          'Facilitated group activities designed to teach social skills to children with diverse needs.',
        ],
      },
      {
        title: 'Marketing Chair, Executive Board',
        meta: ['Indian Student Organization, University at Albany · August 2025 – Present'],
        bullets: [
          'Lead outreach and promotion for cultural events across student organizations, campus departments, and student communities.',
          'Coordinate event logistics, including setup and ticketing.',
        ],
      },
      {
        title: 'National Service Scheme',
        meta: ['Andhra Mahila Sabha Arts & Science College, Hyderabad, India · 2021 – 2022'],
        bullets: [
          'Ran awareness workshops in public schools on menstrual health for girls and on healthy diet and nutrition for children.',
          'Prepared educational materials and led discussion-based sessions to promote health awareness.',
        ],
      },
    ],
  },
];

export const education = [
  {
    degree: 'Master of Science, Educational Psychology and Methodology',
    meta: 'University at Albany, State University of New York · Expected December 2026',
    detail: 'GPA 4.00',
  },
  {
    degree: 'Bachelor of Arts, Economics, Public Administration, and Psychology',
    meta: 'Osmania University, Hyderabad, India · July 2019 – September 2022',
    detail: 'Concentration in Psychology · GPA 3.61',
  },
];

// Milestones: the stickers scattered around the character (see Stickers.jsx).
// `sticker` is the image in public/stickers/ (cut out, with its own white border),
// `ratio` its width ÷ height, so stickers of different shapes get a similar size.
// Clicking a sticker scrolls to its first entry in `timeline` below.
export const milestones = [
  { path: '/ualbany', label: 'University at Albany', sticker: 'stickers/ualbany-damien.png', ratio: 299 / 500 },
  { path: '/osmania', label: 'Osmania University', sticker: 'stickers/osmania.png', ratio: 700 / 304 },
  { path: '/project-access', label: 'Project ACCESS', sticker: 'stickers/project-access-vinyl.png', ratio: 1 },
  { path: '/speech-therapy', label: 'Speech therapy', sticker: 'stickers/speech-blocks.png', ratio: 700 / 402 },
  { path: '/research', label: 'Research', sticker: 'stickers/research.png', ratio: 501 / 700 },
  { path: '/ai-society', label: 'AI & Society College fellowship', sticker: 'stickers/ai-society.png', ratio: 700 / 583 },
  { path: '/asha-hospital', label: 'ASHA Hospital', sticker: 'stickers/asha.png', ratio: 642 / 700 },
  { path: '/niepid', label: 'NIEPID', sticker: 'stickers/niepid.png', ratio: 471 / 700 },
  { path: '/jiguar', label: 'Jiguar (NGO)', sticker: 'stickers/jiguar.png', ratio: 1 },
];

const work = (title) => experience.flatMap((g) => g.entries).find((e) => e.title === title);

// The scroll timeline, newest first. Each entry zooms in on the sticker at `focus`
// (a milestone path); `group` starts a new chapter with that label.
export const timeline = [
  { id: 'ualbany', group: 'At UAlbany', focus: '/ualbany', item: education[0] },
  { id: 'project-access', focus: '/project-access', item: work('Prevention Navigator, Project ACCESS') },
  { id: 'ai-society', focus: '/ai-society', item: fellowship },
  { id: 'meta-analysis', focus: '/research', item: research.projects[0] },
  { id: 'speech-therapy', group: 'Work in India', focus: '/speech-therapy', item: work('Assistant Speech Therapist') },
  { id: 'jiguar', group: 'Internships', focus: '/jiguar', item: work('Department of Child Psychology, Jiguar (NGO)') },
  { id: 'asha-hospital', focus: '/asha-hospital', item: work('Department of Clinical Psychology, ASHA Hospital') },
  { id: 'niepid', focus: '/niepid', item: work('NIEPID') },
  { id: 'osmania', group: "Bachelor's", focus: '/osmania', item: education[1] },
  { id: 'self-esteem', focus: '/research', item: research.projects[1] },
];

// Each block is a card; each group inside is shown as a list or as chips.
export const skills = [
  {
    groups: [
      {
        title: 'Trainings and certifications',
        style: 'list',
        items: [
          'CITI Program, Human Subjects Research',
          'Motivational Interviewing (MI)',
          'SBIRT Protocol',
          'Childhood Assessment Program, SensAble Child (2024)',
          "Oral Sensory Integration Therapy, Level 1, GM's SpeechGears (2024)",
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'Research and data analysis',
        style: 'chips',
        items: ['SPSS', 'R (beginner)', 'Rayyan.ai'],
      },
      { title: 'Survey tools', style: 'chips', items: ['Qualtrics', 'Microsoft Forms', 'Google Forms'] },
      { title: 'Productivity', style: 'chips', items: ['Microsoft Office', 'Google Workspace', 'Notion'] },
    ],
  },
  {
    groups: [
      {
        title: 'Languages',
        style: 'list',
        items: ['English, full professional proficiency', 'Telugu, native', 'Hindi, conversational'],
      },
    ],
  },
];

// Other addresses, kept so old links still work: each scrolls to the timeline entry or
// section with id `target` (no target: the top of the page).
export const pages = [
  { path: '/about', title: 'About me' },
  { path: '/experience', title: 'Experience', target: 'project-access' },
  { path: '/education', title: 'Education', target: 'ualbany' },
  { path: '/skills', title: 'Skills and certifications', target: 'skills' },
  { path: '/contact', title: "Let's connect", target: 'contact' },
];
