// Extra facts the AI assistant can use that are not on the page itself.
// Anything starting with "TODO" is treated as unknown and is NOT sent to the
// model — fill these in (or delete them) so the assistant can answer.
// Keep this file free of anything you would not say to a recruiter.

export const bio = {
  // Where you are and where you can work
  location: 'TODO: e.g. Gurugram, Haryana, India',
  hometown: 'Satnali, Mahendragarh district, Haryana, India',
  relocation: 'Open to relocation within India and to remote roles.',
  noticePeriod: 'TODO: e.g. 30 days, negotiable',

  // What you are looking for
  lookingFor:
    'Full-time Full Stack Developer roles (MERN stack). Also open to Software Engineer, MERN Stack Developer, React.js Developer or Node.js Developer titles, and to freelance projects.',
  workMode: 'Remote, hybrid or on-site are all fine.',

  // How you work
  strengths: [
    'End-to-end feature ownership, from the React UI to the Node.js API to the MongoDB schema.',
    'Strong debugging and root-cause analysis on production issues.',
    'Fast learner who picks up new integrations independently (Shopify GraphQL, AWS Lambda).',
    'Uses AI tools such as Claude Code and GitHub Copilot to deliver faster without lowering code quality.',
    'Clear communicator and reliable team player in Agile/Scrum.',
  ],
  languagesSpoken: ['Hindi', 'English'],
  interests: 'TODO: e.g. chess, cricket, building small side projects',

  // Background — keep it brief and only what you are happy to share publicly
  familyBackground: 'TODO: e.g. From a middle-class family in Satnali, Haryana.',

  // Anything you want the bot to say no to
  doNotDiscuss: [
    'Current or expected salary — ask the visitor to email Anirudh directly.',
    'Exact home address or personal identification numbers.',
    'Internal details or confidential data about Ribbon or Affluence Digital Solutions beyond what is on the portfolio.',
  ],
}

// Chips shown in the empty chat, one click sends the question.
export const starterQuestions = [
  'What does Anirudh do at Affluence Digital Solutions?',
  'Which technologies is he strongest in?',
  'Tell me about the Ribbon project.',
  'Is he open to new roles?',
  'How can I contact him?',
]

export const assistant = {
  name: 'Ask Anirudh',
  greeting: "Hi! I'm Anirudh's portfolio assistant. Ask me about his work, projects, skills or background.",
  footnote: 'Answers come from the content of this site. For anything else, email Anirudh directly.',
}
