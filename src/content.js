export const profile = {
  name: 'Apollo Brian',
  company: 'Solarrick',
  title: 'Founder of Solarrick · Software Engineer · Full-Stack Developer',
  focus: 'Backend engineering, databases, and security-conscious systems',
  email: 'brianapollo63@gmail.com',
  github: 'https://github.com/Apollo-otete',
  linkedin: 'https://www.linkedin.com/in/apollo-brian-53a5bb368/',
  summary:
    'Founder of Solarrick and Information Technology student building practical software while developing a stronger foundation in backend engineering, full-stack development, databases, and secure application design.',
};

export const navigation = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Backend', 'backend'],
  ['Databases', 'databases'],
  ['Security', 'security'],
  ['DevOps', 'devops'],
  ['Experience', 'experience'],
  ['Education', 'education'],
  ['Writing', 'writing'],
  ['CV', 'resume'],
  ['Contact', 'contact'],
];

export const skillGroups = [
  {
    title: 'Frontend engineering',
    context: 'Tools and practices listed in my CV',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Responsive UI', 'API integration'],
  },
  {
    title: 'Backend engineering',
    context: 'Coursework and personal-project toolkit',
    skills: ['Python', 'Java', 'Node.js', 'Express.js', 'Django', 'REST APIs', 'Server-side logic'],
  },
  {
    title: 'Database engineering',
    context: 'Relational and NoSQL technologies',
    skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Database design', 'Data management'],
  },
  {
    title: 'Application security',
    context: 'Foundations and areas of active study',
    skills: ['Authentication', 'Authorization', 'RBAC', 'Secure API design', 'OWASP principles'],
  },
  {
    title: 'DevOps & infrastructure',
    context: 'Fundamentals and hands-on learning',
    skills: ['Linux / Ubuntu', 'Git & GitHub', 'Docker', 'Docker Compose', 'CI/CD fundamentals', 'GitHub Actions'],
  },
];

export const learningTracks = [
  {
    title: 'Architecture & system design',
    topics: ['Modular monoliths', 'REST and MVC patterns', 'Clean Code and SOLID', 'Scalability', 'Technical documentation'],
  },
  {
    title: 'Security & DevSecOps',
    topics: ['OWASP Top 10', 'Input validation', 'SQL injection and XSS prevention', 'SAST / DAST', 'Dependency and container security', 'Secrets management'],
  },
  {
    title: 'Operations & infrastructure',
    topics: ['Linux administration', 'Nginx', 'Cloud fundamentals', 'Deployment', 'Monitoring and logging', 'Backup and recovery'],
  },
  {
    title: 'Artificial intelligence & machine learning',
    topics: ['Python for AI/ML', 'Machine-learning fundamentals', 'Data processing', 'AI integration', 'Model deployment'],
  },
];

export const projects = [
  {
    id: 'naoja-retail',
    title: 'Naoja Electrical & Electronics',
    category: 'Retail web application · Live',
    status: 'Live deployment',
    featured: true,
    summary:
      'A live storefront for an electronics and solar business serving Kakamega. The public site presents products, delivery information, and customer ordering options.',
    filters: ['Web applications', 'Full-stack applications', 'Backend & APIs', 'Database engineering'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Go / Gin', 'PostgreSQL'],
    overview:
      'An e-commerce retail shop with a public product catalogue and customer-facing shopping experience.',
    problem:
      'The project gives a local electronics and solar retailer an online storefront for presenting its products and reaching customers.',
    contribution:
      'A project in my public GitHub account. The repository README documents the application structure and listed features.',
    architecture:
      'The public repository describes a React and Vite frontend with a Go / Gin backend.',
    database:
      'PostgreSQL is listed in the repository documentation. A schema diagram is not included in this portfolio.',
    security:
      'Security implementation details are not described here; no specific controls or audit results are claimed.',
    challenges:
      'The repository documents a catalogue, cart, checkout, order tracking, and administration features. This portfolio does not claim independent testing of each workflow.',
    solutions:
      'The live site and repository provide the project entry points for visitors who want to inspect the storefront and its implementation.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Go / Gin', 'PostgreSQL'],
    links: [
      { label: 'Live storefront', href: 'https://naojaretailshop.vercel.app/' },
      { label: 'GitHub repository', href: 'https://github.com/Apollo-otete/Naojaretailshop' },
    ],
    note: 'Technology and feature details are drawn from the public repository README; live functionality may change over time.',
  },
  {
    id: 'fardagritrust',
    title: 'FARDAgriTRUST',
    category: 'Agricultural technology · Development project',
    status: 'In development',
    summary:
      'An agricultural technology concept focused on practical agricultural challenges, transparency, and financial trust.',
    filters: ['Backend & APIs', 'Database engineering', 'Security & DevSecOps', 'DevOps & infrastructure'],
    tags: ['Agritech', 'Architecture planning', 'Data integrity', 'RBAC planning'],
    overview:
      'A development project exploring how software could support agricultural workflows and strengthen trust around financial activity.',
    problem:
      'The project is intended to address agricultural challenges where clear workflows, reliable records, and confidence between participants matter.',
    contribution:
      'Listed in my CV as a software development project. Current work includes planning the application architecture, data relationships, and authorization requirements.',
    architecture:
      'A modular application structure is being designed. Backend services, API boundaries, and a deployment approach remain areas of exploration rather than claims of a finished production system.',
    database:
      'Database structures and relationships are being planned. No production schema or public ERD is available yet.',
    security:
      'Role-based access requirements, data protection, and financial transaction integrity are design considerations. No security controls or verification results are claimed as implemented.',
    challenges:
      'Key design questions include maintaining trustworthy financial records, defining permissions, and keeping the system understandable as it grows.',
    solutions:
      'The current approach is to plan modular boundaries, relational data ownership, authorization rules, and integrity checks before describing them as implemented features.',
    technologies: ['React', 'TypeScript', 'JavaScript', 'Backend and database technologies (planned)'],
    links: [
      { label: 'GitHub profile', href: profile.github },
    ],
    note: 'Development status and planned work are based on the supplied CV. No public project repository or deployment was provided.',
  },
  {
    id: 'backend-practice',
    title: 'Backend Development Practice Application',
    category: 'Backend systems · Personal learning project',
    status: 'Learning project',
    summary:
      'A practical learning project for exploring server-side structure, database integration, routes, controllers, and login logic.',
    filters: ['Backend & APIs', 'Database engineering'],
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JavaScript'],
    overview:
      'A personal practice application focused on learning how backend components communicate and how an application connects to a database.',
    problem:
      'The learning goal is to understand common backend building blocks by applying them in one practical project.',
    contribution:
      'Backend development practice, including project organization, route and controller management, database integration, and login logic.',
    architecture:
      'The CV describes a Node.js and Express.js application with separated routes and controllers. No production architecture is claimed.',
    database:
      'MongoDB and Mongoose are listed for database integration and practice.',
    security:
      'The CV mentions user authentication and login logic as learning work. No production security review or verified authorization behavior is claimed.',
    challenges:
      'A central learning challenge is understanding the responsibilities of routes, controllers, persistence, and authentication logic.',
    solutions:
      'The project is used to practice organizing these backend components and connecting them to a database.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JavaScript'],
    links: [],
    note: 'Described in the supplied CV as a personal learning project; a public repository or live deployment was not supplied.',
  },
  {
    id: 'school-evoting',
    title: 'School E-Voting',
    category: 'E-voting · Public repository project',
    status: 'Repository project · Feature status varies',
    summary:
      'A public project exploring electronic voting for MMUST students. Its idea document distinguishes proposed security features from implemented work.',
    filters: ['Web applications', 'Backend & APIs', 'Security & DevSecOps'],
    tags: ['React', 'Voting workflows', 'Security concepts'],
    overview:
      'A repository project framed around improving access to student elections and making voting workflows easier to understand.',
    problem:
      'The repository description focuses on accessible, conflict-aware student elections.',
    contribution:
      'The repository is published under my GitHub account. This portfolio does not infer a specific individual contribution beyond that public attribution.',
    architecture:
      'The repository contains frontend and backend areas. A production architecture diagram is not published here.',
    database:
      'Database design details are not documented in this case study.',
    security:
      'The repository idea document discusses OTP and blockchain-backed transparency as proposed ideas. They are not represented here as verified, implemented controls.',
    challenges:
      'Voting systems require careful treatment of identity, eligibility, ballot integrity, and trust.',
    solutions:
      'The repository provides a place to explore those requirements; implementation status for individual controls should be verified in the source before relying on them.',
    technologies: ['React (frontend package)', 'Other implementation details: see repository'],
    links: [
      { label: 'GitHub repository', href: 'https://github.com/Apollo-otete/School-EVOTING' },
    ],
    note: 'Repository description and idea document are not equivalent to independent verification of deployed behavior.',
  },
];

export const projectFilters = [
  'All',
  'Web applications',
  'Full-stack applications',
  'Backend & APIs',
  'Database engineering',
  'Security & DevSecOps',
  'DevOps & infrastructure',
];

export const engineeringPrinciples = [
  ['Security by design', 'Consider permissions, input handling, and data exposure early.'],
  ['Data integrity', 'Use clear relationships and consistency rules to protect important records.'],
  ['Maintainability', 'Prefer understandable code, modular boundaries, and useful documentation.'],
  ['Reliability', 'Treat errors, testing, and operational needs as part of the engineering work.'],
  ['Automation', 'Use repeatable workflows to reduce manual mistakes as systems grow.'],
  ['Continuous learning', 'Improve through study, feedback, and practical project work.'],
];

export const experienceEntries = [
  {
    status: 'Personal project · Live',
    title: 'Naoja Electrical & Electronics',
    summary: 'A live retail storefront with public source documentation linked in its case study.',
    projectId: 'naoja-retail',
  },
  {
    status: 'Development project · In progress',
    title: 'FARDAgriTRUST',
    summary: 'Architecture, data relationships, and authorization requirements are in the planning and development stage.',
    projectId: 'fardagritrust',
  },
  {
    status: 'Personal learning project',
    title: 'Backend Development Practice Application',
    summary: 'Hands-on practice with Node.js, Express.js, MongoDB, Mongoose, routes, controllers, and login logic.',
    projectId: 'backend-practice',
  },
  {
    status: 'Repository project',
    title: 'School E-Voting',
    summary: 'A public project exploring student voting; its repository distinguishes proposed ideas from confirmed implementation.',
    projectId: 'school-evoting',
  },
];

export const backendFlow = [
  'Client request',
  'Route & validation',
  'Authentication & authorization',
  'Application logic',
  'Database',
  'Response & observability',
];

export const devSecOpsFlow = [
  ['Plan', 'Define risks and requirements'],
  ['Code', 'Review changes and handle secrets safely'],
  ['Verify', 'Run tests and security checks'],
  ['Package', 'Review dependencies and container images'],
  ['Deploy', 'Use controlled, documented releases'],
  ['Operate', 'Monitor, respond, and improve'],
];

export const writingTopics = [
  'Backend engineering and REST APIs',
  'Database management, data modeling, and integrity',
  'Authentication, authorization, and RBAC',
  'Application security and OWASP principles',
  'Docker, CI/CD, and DevSecOps fundamentals',
  'Linux, cloud, and deployment learning notes',
  'Artificial intelligence and machine-learning fundamentals',
];

export const articles = [];

export const education = {
  institution: 'Masinde Muliro University of Science and Technology',
  qualification: 'Bachelor of Information Technology',
  status: 'Third-year student · Expected graduation 2028',
  focus: ['Software engineering', 'Database systems', 'Information systems', 'Computer networks and cybersecurity'],
  development: [
    {
      title: 'Decode 4.0 Café Series: Made of Kenya Edition',
      date: '11 September 2026',
      detail: 'Certificate of participation, as listed in the supplied CV.',
    },
    {
      title: 'Ongoing technical development',
      date: 'In progress',
      detail: 'Building practical knowledge across backend development, databases, Linux, containers, and secure delivery.',
    },
  ],
};

export const professionalSummary =
  'Information Technology student with a practical interest in building reliable, maintainable, and secure software. Focused on backend and full-stack development, databases, and growing capability in infrastructure and DevSecOps.';
