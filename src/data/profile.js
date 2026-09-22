// All portfolio content lives here. Edit this file, not the components.

const PHONE_E164 = '918398993306'

export const profile = {
  name: 'Anirudh Singh',
  initials: 'AS',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer · MERN Stack · Java',
  // The highlighted word cycles through `words` (typewriter).
  headline: {
    before: 'I build ',
    words: ['scalable', 'robust', 'reliable', 'end-to-end', 'production-ready', 'maintainable'],
    after: ' web products.',
  },
  intro:
    'Full Stack Developer delivering production-grade web applications with the MERN stack and Java — component-driven React front-ends, RESTful APIs, database modelling, and integrations like Shopify and AWS Lambda. I use AI-assisted tooling (Claude, GitHub Copilot) to ship faster and cleaner.',
  education_short: 'B.Tech CSE · GJUS&T',
  availability: 'Open to work',
  email: 'anirajput20022@gmail.com',
  phone: { display: '+91 83989 93306', href: `tel:+${PHONE_E164}` },
  whatsapp: {
    display: 'WhatsApp me',
    href: `https://wa.me/${PHONE_E164}?text=${encodeURIComponent("Hi Anirudh, I found your portfolio and I'd like to talk.")}`,
  },
  mailto: `mailto:anirajput20022@gmail.com?subject=${encodeURIComponent('Hello Anirudh')}`,
  // Gmail compose in a new tab — works even where mailto: has no handler.
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=anirajput20022@gmail.com&su=${encodeURIComponent('Hello Anirudh')}&body=${encodeURIComponent('Hi Anirudh,\n\n')}`,
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
  tools: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Java', 'AWS Lambda', 'Shopify', 'Claude Code'],
}

export const about = {
  heading: 'Production-grade, full stack, and AI-assisted.',
  paragraphs: [
    'Full Stack Developer with hands-on experience delivering scalable, production-grade web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Java. Strong in component-driven front-end development, RESTful API design, database modelling and third-party integrations such as Shopify and AWS Lambda serverless functions.',
    'I leverage AI-assisted development tools — Claude, Claude Code and GitHub Copilot — to accelerate delivery, improve code quality and automate repetitive tasks. Agile team player with a strong debugging, problem-solving and continuous-learning mindset.',
  ],
  facts: [
    ['Currently', 'Full Stack Developer, Affluence Digital Solutions'],
    ['Focus', 'MERN stack · Java · REST APIs · Serverless'],
    ['Degree', 'B.Tech CSE, 2025'],
  ],
}

// Experience timeline — newest first. `from`/`to` render as "from → to".
export const experience = [
  {
    title: 'Full Stack Developer',
    org: 'Affluence Digital Solutions',
    from: 'Jul 2025',
    to: 'Present',
    type: 'Full-time',
    bullets: [
      'Develop and maintain scalable full-stack features for the Ribbon B2B e-commerce platform using React.js, Node.js, Express.js and MongoDB with a modular, reusable architecture.',
      'Implemented Shopify integration for automated product imports using the Shopify GraphQL API.',
      'Built AWS Lambda serverless functions for user synchronisation and scheduled data-cleanup workflows.',
      'Designed and consumed RESTful APIs, handling end-to-end feature delivery across front-end and back-end.',
      'Use Claude and AI-assisted tooling for code generation, refactoring, test scaffolding and documentation.',
      'Collaborate in an Agile/Scrum team using Git and GitHub for version control, pull requests and code reviews.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS Lambda', 'Shopify', 'Claude'],
  },
  {
    title: 'Full Stack Web Development Training',
    org: 'Acmegrade & Mood Indigo, IIT Bombay',
    from: 'Jul 2024',
    to: 'Aug 2024',
    type: 'Training',
    bullets: [
      'Hands-on training programme covering front-end (HTML, CSS, JavaScript, React), back-end (Node.js, Express) and database fundamentals.',
      'Built and deployed full-stack practice projects following the MERN architecture.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
]

// Projects — cards show `tagline` + `stack`; the dialog shows everything else.
export const projects = [
  {
    id: 'ribbon',
    title: 'Ribbon',
    subtitle: 'B2B trade-show commerce platform',
    kind: 'Company project · Affluence Digital Solutions',
    tagline: 'Multi-tenant SaaS where trade shows and sales agencies run their own branded wholesale marketplaces — vendors, buyers, orders and events included.',
    link: { label: 'meetribbon.com', url: 'https://meetribbon.com' },
    monogram: 'R',
    hue: 'teal',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'AWS Lambda', 'Shopify GraphQL'],
    overview: [
      'Ribbon is a multi-tenant B2B commerce SaaS built for trade shows and sales agencies. Every show or agency that comes aboard gets its own branded marketplace on the same platform — with its own exhibitors (vendors), retailers (buyers), product catalogues, market events and order flow — while the codebase, infrastructure and admin tooling stay shared.',
      'It ties the physical event to the online one: QR-based registration and check-in, two-way lead scanning that flows into the exhibitor’s CRM, digital showrooms, an order-writing app for exhibitors on the show floor, and a marketplace that stays open for orders all year, not just for the three days of the show.',
    ],
    tenants: ['Shoppe Object', 'Aesthetic Movement', 'CIFF', 'Art Düsseldorf', 'NY NOW'],
    scale: [['600K+', 'B2B connections'], ['$250M', 'sales'], ['40K', 'buyers'], ['1500+', 'exhibitors']],
    highlights: [
      'Develop and maintain user-facing marketplace modules — brand galleries, product catalogues, faceted filters and market events — as responsive, high-performance React.js features.',
      'Designed a reusable React component library to improve maintainability and cut duplication across tenants.',
      'Built and consumed REST APIs on Node.js/Express for real-time order, product and brand data.',
      'Implemented the Shopify GraphQL integration that lets vendors import their product catalogue automatically.',
      'Wrote AWS Lambda serverless functions for user synchronisation and scheduled data-cleanup workflows.',
    ],
  },
  {
    id: 'rsyc',
    title: 'RSYC-N',
    subtitle: 'Rao Shekha Ji Yuva Club, Nangla',
    kind: 'Personal project',
    tagline: 'Bilingual (Hindi/English) community club app with members, events, join requests and a transparent monthly fund ledger.',
    link: { label: 'rsyc-n.vercel.app', url: 'https://rsyc-n.vercel.app' },
    repo: { label: 'github.com/anirudh2504/RSYC-N', url: 'https://github.com/anirudh2504/RSYC-N' },
    monogram: 'RS',
    hue: 'indigo',
    stack: ['React.js', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT cookies', 'Vercel'],
    overview: [
      'A shared-fund ledger and noticeboard for Rao Shekha Ji Yuva Club, the youth club of Nangla village. Members contribute a fixed amount every month; the club spends it on festivals, sports tournaments, blood-donation and health camps, tree planting and emergency help for families.',
      'Anyone holding the club PIN can see the balance and every rupee that has left it — no usernames, no signup. Admins record money in and out; a master admin corrects, rotates the PIN and manages admins. The whole interface switches between Hindi and English.',
    ],
    modules: ['About', 'Events', 'Join request', 'Members', 'Fund & transactions', 'Collection', 'Admin dashboard', 'Audit log'],
    details: [
      {
        title: 'Who can see what',
        bullets: [
          'Open — anyone with the link: events and the join form only. No balance, no names, no phone numbers.',
          'Viewer — anyone who typed the club PIN: balance, transactions and the member list. The PIN is the whole identity.',
          'Admin — records money in and out, manages members, events and reminders.',
          'Master — corrects the balance, sets or rotates the PIN, adds/removes admins, sees the audit log.',
          'Three separate Express routers behind three guards; the open router has no import path to the ledger, so a phone number cannot leak by mistake.',
        ],
      },
      {
        title: 'Rules the ledger follows',
        bullets: [
          'Money is a whole number of rupees — decimals are refused at the input, the API and the schema, so sums never drift.',
          'The balance is always a sum over the entries, never a stored number; concurrent admins cannot corrupt it.',
          'Entries are append-only after 15 minutes. After that, fixing one means a visible reversal entry that nets to zero.',
          'Balance corrections are entries too: the master states the true figure and a reason, and an ordinary “adjustment” row is posted.',
          'Each credit carries its month allocation, so partial and advance payments settle specific months of dues.',
          'Monthly amounts live in contribution plans with effective dates — changing a member’s amount never rewrites past months.',
        ],
      },
      {
        title: 'Access & security',
        bullets: [
          'Club PIN stored as a bcrypt hash and never displayed; unlocking sets a 30-day httpOnly cookie with a pinVersion.',
          'Rotating the PIN bumps pinVersion, which invalidates every existing viewer session at once — no session table to sweep.',
        ],
      },
      {
        title: 'Design',
        bullets: [
          'Shekhawati palette: indigo, marigold and saffron, oxblood and antique brass on warm sandstone neutrals; light and dark both designed.',
          'Every piece of artwork is drawn in the browser as SVG — the jharokha-arch crest, a jali screen behind the balance card, mandala event covers generated from the event slug. No image files, nothing to 404 on a weak signal.',
          'Rozha One + Mukta with Devanagari support, so Hindi names set properly beside English.',
          'Mobile-first: fixed bottom navigation that becomes a top tab bar on wide screens, safe-area insets, 44px tap targets, reduced-motion respected.',
        ],
      },
    ],
    highlights: [
      'Designed the whole thing — data model, API, roles, and the UI — and built it end to end on the MERN stack.',
      'Wrote the Mongoose schemas with indexes and constraints, and a store layer so services never talk to the database directly.',
      'Built the PIN-gated viewer flow, admin/master sign-in, ledger services (post, reverse, adjust) and dues tracking.',
      'Deployed the Vite client and Express API on Vercel with same-origin /api proxying.',
    ],
  },
  {
    id: 'airline',
    title: 'Airline Management System',
    subtitle: 'Java desktop application',
    kind: 'Personal project',
    tagline: 'Desktop app for managing flights, bookings and passenger records on a MySQL database.',
    repo: { label: 'github.com/anirudh2504/Ams', url: 'https://github.com/anirudh2504/Ams' },
    monogram: 'A',
    hue: 'coral',
    stack: ['Java', 'MySQL', 'JDBC'],
    overview: [
      'A Java desktop application for an airline back office: create and manage flights, book seats for passengers, keep passenger records and look up bookings — all persisted in MySQL through JDBC.',
    ],
    modules: ['Flights', 'Bookings', 'Passengers', 'Reports'],
    highlights: [
      'Relational schema for flights, passengers and bookings with the constraints enforced in the database.',
      'Optimised SQL queries and back-end logic to improve performance and reliability.',
    ],
  },
]

// Concrete technologies only — things that appear in the work and projects above.
export const skills = [
  { title: 'Languages', items: ['JavaScript (ES6+)', 'Java', 'SQL', 'HTML5', 'CSS3'] },
  { title: 'Front-end', items: ['React.js', 'React Hooks', 'Vite'] },
  { title: 'Back-end', items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL (Shopify)', 'JWT auth'] },
  { title: 'Databases', items: ['MongoDB', 'Mongoose', 'MySQL', 'JDBC'] },
  { title: 'Cloud & integrations', items: ['AWS Lambda', 'Shopify API', 'Vercel'] },
  { title: 'AI tooling', items: ['Claude', 'Claude Code', 'GitHub Copilot'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'npm'] },
]

export const education = [
  { when: '2025', title: 'B.Tech, Computer Science & Engineering', where: 'Guru Jambheshwar University of Science & Technology, Hisar · GPA 6.4' },
  { when: '2020', title: 'Class XII (CBSE)', where: 'Montessori Convent Sr. Sec. School, Satnali · 82%' },
]

export const certifications = [
  { when: 'Jul–Aug 2024', title: 'Full Stack Web Development Training', where: 'Acmegrade & Mood Indigo, IIT Bombay' },
  { when: '—', title: 'Employability Skills Training', where: 'Rubicon (Life Skills Program)' },
]

export const contact = {
  heading: "Let's build something.",
  blurb: 'Open to full-time roles and freelance projects. Email or WhatsApp — whichever is easier for you.',
  note: "Send a few lines about the role or the product and I'll reply within two working days.",
}

export const nav = [
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#education', 'Education'],
  ['#contact', 'Contact'],
]
