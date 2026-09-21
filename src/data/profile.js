// All portfolio content lives here. Edit this file, not the components.

export const profile = {
  name: 'Anirudh Singh',
  initials: 'AS',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer · MERN & Java',
  headline: { before: 'I build ', em: 'scalable', after: ' web products, end to end.' },
  intro:
    'Full Stack Developer at Affluence Digital Solutions. I work across the MERN stack and Java — shipping modular React front-ends, Node/Express APIs, Shopify integrations and AWS Lambda automations. Strong fundamentals, and a habit of learning whatever the problem needs.',
  education_short: 'B.Tech CSE · GJUS&T',
  availability: 'Open to work',
  email: 'anirajput20022@gmail.com',
  phone: { display: '+91 83989 93306', href: 'tel:+918398993306' },
  resume: '/Resume_Anirudh_Singh.pdf',
  links: {
    github: { label: 'github.com/anirudh2504', url: 'https://github.com/anirudh2504' },
    linkedin: { label: 'anirudh-singh-25apr2002', url: 'https://linkedin.com/in/anirudh-singh-25apr2002' },
  },
  card: {
    stack: ['React', 'Node', 'Express', 'MongoDB', 'Java'],
    at: 'Affluence Digital Solutions',
    since: '2025-07',
  },
  tools: ['React.js', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Java', 'AWS Lambda', 'Shopify'],
}

export const about = {
  heading: 'Motivated, full stack, and still learning on purpose.',
  paragraphs: [
    "I'm a Full Stack Developer with hands-on experience in the MERN stack and Java. I'm comfortable owning a feature from the database up to the interface: designing reusable React components, wiring Node/Express REST APIs, integrating third-party platforms like Shopify, and automating the boring parts with AWS Lambda.",
    "I work in Agile teams with Git-based workflows and continuous delivery, and I care about building things that stay maintainable after the first release — modular architecture, fewer redundant components, and queries that don't fall over under load.",
  ],
  facts: [
    ['Currently', 'Full Stack Developer, Affluence Digital Solutions'],
    ['Focus', 'MERN stack · Java · REST APIs'],
    ['Degree', 'B.Tech CSE, 2025'],
  ],
}

export const experience = [
  {
    company: 'Affluence Digital Solutions',
    period: 'Jul 2025 — Present',
    type: 'Full-time',
    role: 'Full Stack Developer',
    bullets: [
      'Build scalable full-stack applications on the MERN stack with a modular, reusable architecture.',
      'Implemented Shopify integration for product imports using the Shopify GraphQL API.',
      'Developed an AWS Lambda function for user sync and data cleanup in an automation workflow.',
      'Integrate REST APIs and work across both the front-end and the back-end of the product.',
      'Collaborate in an Agile team using Git for version control and continuous delivery.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'AWS Lambda', 'Shopify'],
  },
]

export const projects = [
  {
    title: 'Ribbon E-Commerce Platform',
    kind: 'Company project',
    art: 'art-shop',
    artLabel: 'Storefront product grid on a teal ground',
    summary: 'Scalable, user-facing modules for a B2B wholesale commerce platform.',
    bullets: [
      'Engineered responsive, high-performance UI modules in React.js.',
      'Designed a reusable component architecture to improve maintainability and cut redundancy.',
      'Built REST API integrations with Node.js and Express.js for real-time data handling.',
      'Wrote the AWS Lambda user-sync and data-cleanup automation.',
    ],
    tags: ['React', 'Node', 'Express', 'REST APIs', 'AWS Lambda'],
  },
  {
    title: 'Airline Management System',
    kind: 'Personal project',
    art: 'art-air',
    artLabel: 'Boarding pass with a dashed flight path',
    summary: 'A Java desktop application for managing flight bookings and passenger records, backed by MySQL.',
    bullets: [
      'Built booking, passenger and flight management with a MySQL data layer.',
      'Optimised database queries and back-end logic for performance and reliability.',
    ],
    tags: ['Java', 'MySQL', 'JDBC'],
  },
]

export const skills = [
  { icon: '{ }', title: 'Languages', items: ['Java', 'JavaScript'] },
  { icon: 'UI', title: 'Front-end', items: ['React.js', 'HTML', 'CSS'] },
  { icon: 'API', title: 'Back-end', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { icon: 'DB', title: 'Databases', items: ['MongoDB', 'MySQL'] },
  { icon: '>_', title: 'Tools', items: ['Git', 'GitLens', 'Postman'] },
  { icon: 'λ', title: 'Cloud & platforms', items: ['AWS Lambda', 'Shopify integration', 'GraphQL'] },
]

export const education = [
  { when: '2025', title: 'B.Tech, Computer Science & Engineering', where: 'Guru Jambheshwar University of Science & Technology, Hisar' },
  { when: '2020', title: 'Class XII (CBSE)', where: 'Montessori Convent Sr. Sec. School, Satnali' },
]

export const certifications = [
  { when: 'Jul–Aug 2024', title: 'Full Stack Web Development Training', where: 'Acmegrade & Mood Indigo, IIT Bombay' },
  { when: '—', title: 'Employability Skills Training', where: 'Rubicon (Life Skills Program)' },
]

export const contact = {
  heading: "Let's build something.",
  blurb: 'Open to full-time roles and freelance projects. The fastest way to reach me is email.',
  note: "Send a few lines about the role or the product and I'll reply within two working days.",
}

export const nav = [
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#skills', 'Skills'],
  ['#education', 'Education'],
  ['#contact', 'Contact'],
]
