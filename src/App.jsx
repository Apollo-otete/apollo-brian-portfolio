import React, { useEffect, useMemo, useState } from 'react';
import cvUrl from '../Apollo Brian - Curriculum Vitae.pdf?url';
import {
  articles,
  backendFlow,
  devSecOpsFlow,
  education,
  engineeringPrinciples,
  experienceEntries,
  learningTracks,
  navigation,
  professionalSummary,
  profile,
  projectFilters,
  projects,
  skillGroups,
  writingTopics,
} from './content.js';

const defaultDescription =
  'Apollo Brian is an Information Technology student and software developer focused on backend engineering, databases, and secure software.';

function externalLinkProps() {
  return { target: '_blank', rel: 'noreferrer' };
}

function SectionHeading({ number, title, intro }) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{number} / {title}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="portfolio-project">
      <div className="project-card-heading">
        <p className="project-type">{project.category}</p>
        <span className="project-status"><span aria-hidden="true" />{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      <ul className="project-tags" aria-label={`${project.title} technologies and topics`}>
        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <a className="text-link" href={`/?project=${encodeURIComponent(project.id)}`}>
        Read the case study <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

function ProjectDetails({ project }) {
  const sections = [
    ['Project overview', project.overview],
    ['Problem space', project.problem],
    ['My contribution', project.contribution],
    ['Architecture', project.architecture],
    ['Database', project.database],
    ['Security', project.security],
    ['Engineering challenges', project.challenges],
    ['Approach', project.solutions],
  ];

  return (
    <main className="project-page page-width" id="main-content">
      <a className="back-link" href="/#projects">← Back to projects</a>
      <header className="project-page-header">
        <p className="section-kicker">{project.category}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <span className="status-label">{project.status}</span>
      </header>

      <div className="case-study-grid">
        {sections.map(([title, description]) => (
          <section className="case-study-block" key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </section>
        ))}
        <section className="case-study-block">
          <h2>Technologies</h2>
          <ul className="project-tags">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </section>
        <section className="case-study-block">
          <h2>Repository &amp; deployment</h2>
          {project.links.length ? (
            <ul className="case-study-links">
              {project.links.map(({ href, label }) => (
                <li key={href}><a className="text-link" href={href} {...externalLinkProps()}>{label} ↗</a></li>
              ))}
            </ul>
          ) : (
            <p>No public repository or deployment link has been provided for this project.</p>
          )}
        </section>
      </div>
      <p className="case-study-note">{project.note}</p>
    </main>
  );
}

function ArticleDetails({ article }) {
  const relatedArticles = articles.filter(({ id }) => article.relatedIds?.includes(id));
  return (
    <main className="article-page page-width" id="main-content">
      <a className="back-link" href="/#writing">← Back to writing</a>
      <article>
        <header className="article-header">
          <p className="section-kicker">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-meta">
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} min read</span>
          </p>
          {article.coverImage && (
            <img
              className="article-cover"
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              loading="lazy"
            />
          )}
        </header>
        <div className="article-body">
          {article.content.map((block, index) => block.type === 'code' ? (
            <pre key={`${block.language}-${index}`}><code>{block.content}</code></pre>
          ) : (
            <p key={`paragraph-${index}`}>{block.content}</p>
          ))}
        </div>
        {relatedArticles.length > 0 && (
          <aside className="related-articles">
            <h2>Related articles</h2>
            <ul>
              {relatedArticles.map((related) => (
                <li key={related.id}>
                  <a className="text-link" href={`/?article=${encodeURIComponent(related.id)}`}>{related.title} →</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
}

function NotFound() {
  return (
    <main className="not-found page-width" id="main-content">
      <p className="section-kicker">404 / Not found</p>
      <h1>This page isn’t here.</h1>
      <p>The link may be outdated, or the project page may have moved.</p>
      <a className="button button-primary" href="/">Return to the portfolio</a>
    </main>
  );
}

function App() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');
  const articleId = params.get('article');
  const project = projects.find(({ id }) => id === projectId);
  const article = articles.find(({ id }) => id === articleId);
  const isNotFound = window.location.pathname !== '/'
    || Boolean((projectId && !project) || (articleId && !article) || (projectId && articleId));
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') !== 'light';
    } catch {
      return true;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [topicSearch, setTopicSearch] = useState('');
  const [contactFeedback, setContactFeedback] = useState('');

  const filteredProjects = useMemo(
    () => activeFilter === 'All'
      ? projects
      : projects.filter(({ filters }) => filters.includes(activeFilter)),
    [activeFilter],
  );
  const filteredTopics = useMemo(
    () => writingTopics.filter((topic) => topic.toLowerCase().includes(topicSearch.trim().toLowerCase())),
    [topicSearch],
  );
  const filteredArticles = useMemo(() => {
    const query = topicSearch.trim().toLowerCase();
    return articles.filter((item) => [
      item.title,
      item.category,
      item.summary,
      ...item.content.map(({ content }) => content),
    ].join(' ').toLowerCase().includes(query));
  }, [topicSearch]);
  const homeHref = project || article || isNotFound ? '/' : '';

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    } catch {
      // The selected theme remains usable for the current page.
    }
  }, [darkMode]);

  useEffect(() => {
    const pageTitle = project || article
      ? `${project?.title || article?.title} | ${profile.name}`
      : isNotFound
        ? `Page not found | ${profile.name}`
        : `${profile.name} | Software Engineer`;
    const description = project?.summary || article?.summary || defaultDescription;
    document.title = pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    const socialUrl = document.querySelector('meta[property="og:url"]');
    if (canonical) {
      canonical.href = project || article
        ? `${window.location.origin}/?${project ? 'project' : 'article'}=${encodeURIComponent(project?.id || article?.id)}`
        : window.location.origin;
    }
    if (socialUrl) {
      socialUrl.content = project || article
        ? `${window.location.origin}/?${project ? 'project' : 'article'}=${encodeURIComponent(project?.id || article?.id)}`
        : window.location.origin;
    }
  }, [article, isNotFound, project]);

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('website')) {
      setContactFeedback('This message could not be prepared. Please email me directly instead.');
      return;
    }

    const name = String(formData.get('name') || '').trim();
    const sender = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (!name || !sender || !subject || !message) {
      setContactFeedback('Please complete each field before continuing.');
      return;
    }

    const body = `From: ${name}\nReply-to: ${sender}\n\n${message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setContactFeedback(`Your email draft is ready. Send it from your email app, or email ${profile.email} directly.`);
  }

  if (isNotFound) {
    return <><a className="skip-link" href="#main-content">Skip to content</a><NotFound /><SiteFooter /></>;
  }

  if (project || article) {
    return (
      <>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader darkMode={darkMode} setDarkMode={setDarkMode} menuOpen={menuOpen} setMenuOpen={setMenuOpen} homeHref={homeHref} />
        {project ? <ProjectDetails project={project} /> : <ArticleDetails article={article} />}
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader darkMode={darkMode} setDarkMode={setDarkMode} menuOpen={menuOpen} setMenuOpen={setMenuOpen} homeHref={homeHref} />
      <main id="main-content">
        <section className="hero page-width" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Software engineering · Information Technology</p>
            <h1>{profile.name}</h1>
            <p className="hero-role">Full-Stack Developer · Backend &amp; Database Focus</p>
            <p className="hero-description">
              I’m an Information Technology student building practical software and
              growing my experience across backend systems, databases, and security-conscious engineering.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View My Projects</a>
              <a className="button button-outline" href={cvUrl} download="Apollo-Brian-CV.pdf">Download CV</a>
              <a className="button button-quiet" href="#contact">Contact Me</a>
            </div>
            <div className="social-links" aria-label="Professional profiles">
              <a href={profile.github} {...externalLinkProps()}>GitHub ↗</a>
              <a href={profile.linkedin} {...externalLinkProps()}>LinkedIn ↗</a>
              <a href={`mailto:${profile.email}`}>Email ↗</a>
            </div>
          </div>
          <div className="portrait-wrap">
            <img
              className="portrait"
              src="/images/apollo-brian-junior.jpg"
              alt={`Portrait of ${profile.name}`}
              fetchPriority="high"
              width="320"
              height="320"
            />
            <span className="portrait-tag"><span aria-hidden="true" /> SOFTWARE ENGINEERING</span>
          </div>
          <a className="scroll-cue" href="#about"><span aria-hidden="true" />Scroll to explore</a>
        </section>

        <section className="content-section page-width about-section" id="about">
          <div className="section-heading">
            <p className="section-kicker">01 / About</p>
            <h2>Engineering from the inside out.</h2>
          </div>
          <div className="about-copy">
            <p>{profile.summary}</p>
            <p>
              I’m studying for a Bachelor of Information Technology at Masinde Muliro
              University of Science and Technology. My project work and learning are
              centered on understanding how interfaces, APIs, databases, and operational
              concerns fit together.
            </p>
            <p>
              I prefer to describe work precisely: coursework, learning projects, active
              development, and live deployments are identified separately rather than
              presented as interchangeable professional experience.
            </p>
            <blockquote>
              Building reliable, scalable and secure software systems through thoughtful
              engineering, clean architecture and continuous improvement.
            </blockquote>
          </div>
        </section>

        <section className="content-section page-width" id="skills">
          <SectionHeading
            number="02"
            title="Technical skills & learning"
            intro="These technologies and areas come from my CV and project work. I don’t assign percentage bars or advanced ratings that I can’t substantiate."
          />
          <div className="skill-grid">
            {skillGroups.map(({ title, context, skills }) => (
              <article className="skill-panel" key={title}>
                <p className="skill-context">{context}</p>
                <h3>{title}</h3>
                <ul className="project-tags">
                  {skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="learning-tracks">
            <h3>Learning tracks · topics, not proficiency claims</h3>
            <div className="learning-track-grid">
              {learningTracks.map(({ title, topics }) => (
                <article className="learning-track" key={title}>
                  <h4>{title}</h4>
                  <ul>{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="projects">
          <SectionHeading
            number="03"
            title="Selected projects"
            intro="Case studies distinguish live work from development and learning projects. Details are deliberately limited to what the CV, public repositories, and live site support."
          />
          <div className="filter-list" role="group" aria-label="Filter projects by category">
            {projectFilters.map((filter) => (
              <button
                className={filter === activeFilter ? 'filter-button selected' : 'filter-button'}
                type="button"
                aria-pressed={filter === activeFilter}
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="visually-hidden" aria-live="polite">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}.
          </p>
          <div className="portfolio-project-grid">
            {filteredProjects.map((item) => <ProjectCard key={item.id} project={item} />)}
          </div>
        </section>

        <section className="content-section page-width" id="backend">
          <SectionHeading
            number="04"
            title="Backend & API engineering"
            intro="My backend practice focuses on understanding request handling, validation, authorization, application logic, persistence, and clear responses."
          />
          <div className="engineering-layout">
            <div>
              <h3>Request lifecycle · illustrative</h3>
              <ol className="flow-list" aria-label="Illustrative backend request flow">
                {backendFlow.map((step, index) => (
                  <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>
                ))}
              </ol>
              <p className="annotation">
                This is a learning reference, not a diagram of a deployed FARDAgriTRUST API.
              </p>
            </div>
            <div className="code-panel">
              <p className="skill-context">Example contract · documentation template only</p>
              <h3>Keep API behavior explicit</h3>
              <pre><code>{`POST /v1/records
Content-Type: application/json

{
  "name": "Example record"
}

201 Created
{
  "id": "record-id",
  "name": "Example record"
}`}</code></pre>
              <p className="annotation">
                This endpoint and response are illustrative; they are not a live service or project endpoint.
              </p>
            </div>
          </div>
          <div className="capability-row">
            {['Request validation', 'Authentication & authorization', 'Database integration', 'Errors & logging', 'API documentation'].map((item) => (
              <span className="capability-chip" key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="content-section page-width database-section" id="databases">
          <div className="database-copy">
            <p className="section-kicker">05 / Data &amp; systems</p>
            <h2>Reliable applications need sound data foundations.</h2>
            <p className="section-intro">
              My database work and study cover relational and NoSQL systems. I’m interested
              in how data modeling and integrity rules support dependable application behavior.
            </p>
            <ul className="database-topics">
              {[
                'Relational and document data modeling',
                'Normalization and referential integrity',
                'Transactions and consistency',
                'Indexes and query performance',
                'Access control, protection, and recovery',
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="schema-panel">
            <p className="skill-context">Illustrative relationship · not a project schema</p>
            <div className="data-visual" aria-label="Illustration of a parent table related to child records">
              <div className="data-table">
                <span className="data-table-title">parent</span>
                <span><i /> id <b>PK</b></span>
                <span><i /> created_at</span>
              </div>
              <div className="data-connector" aria-hidden="true"><span /></div>
              <div className="data-table">
                <span className="data-table-title">child</span>
                <span><i /> id <b>PK</b></span>
                <span><i /> parent_id <b>FK</b></span>
              </div>
            </div>
            <p className="annotation">One-to-many relationship pattern. No project ERD is published yet.</p>
          </div>
        </section>

        <section className="content-section page-width" id="security">
          <SectionHeading
            number="06"
            title="Cybersecurity & DevSecOps"
            intro="Security is part of how I think about software, and an area I’m actively learning. Planned controls are not presented as implemented results."
          />
          <div className="security-layout">
            <div className="security-topics">
              <h3>Security engineering areas</h3>
              <ul>
                {[
                  'Secure coding and input validation',
                  'Authentication, authorization, and RBAC',
                  'OWASP awareness and secure API design',
                  'Database access and data protection',
                  'Dependency, container, and CI/CD security',
                  'Secrets handling and secure deployment',
                ].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="security-workflow">
              <p className="skill-context">Intended lifecycle · learning model</p>
              <h3>Security throughout delivery</h3>
              <ol className="devsecops-flow">
                {devSecOpsFlow.map(([stage, detail], index) => (
                  <li key={stage}>
                    <span className="flow-number">{String(index + 1).padStart(2, '0')}</span>
                    <span><strong>{stage}</strong><small>{detail}</small></span>
                  </li>
                ))}
              </ol>
              <p className="annotation">This describes an approach I’m learning, not an operating production pipeline.</p>
            </div>
          </div>
          <article className="security-case">
            <p className="section-kicker">Case-study structure</p>
            <h3>How I document security work</h3>
            <ol>
              {['Problem', 'Threat & risk', 'Mitigation', 'Implementation', 'Testing & verification', 'Results'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="annotation">
              FARDAgriTRUST is still in development; implementation and verification results have not been claimed.
            </p>
          </article>
        </section>

        <section className="content-section page-width" id="devops">
          <SectionHeading
            number="07"
            title="DevOps & deployment"
            intro="I’m developing practical capability in Linux, containers, CI/CD, and secure deployment. The live Naoja project is linked in its case study; this workflow is a deployment reference, not a claim about its infrastructure."
          />
          <div className="deployment-flow" aria-label="Deployment workflow reference">
            {['Git workflow', 'Build & test', 'Containerize', 'Reverse proxy', 'Deploy', 'Monitor & back up'].map((step, index) => (
              <div className="deployment-step" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className="capability-row">
            {['Linux / Ubuntu', 'Docker & Compose', 'GitHub Actions', 'Nginx', 'Environment configuration', 'Monitoring & recovery'].map((item) => (
              <span className="capability-chip" key={item}>{item}</span>
            ))}
          </div>
          <p className="annotation">
            CI/CD, Nginx, monitoring, and recovery are areas of interest and learning unless a specific project case study documents otherwise.
          </p>
        </section>

        <section className="content-section page-width" id="experience">
          <SectionHeading
            number="08"
            title="Experience & contributions"
            intro="The current portfolio records project work and study. It does not invent employers, job titles, internships, or open-source contributions."
          />
          <div className="timeline">
            {experienceEntries.map(({ status, title, summary, projectId: entryProjectId }) => (
              <article className="timeline-entry" key={entryProjectId}>
                <span className="timeline-marker" aria-hidden="true" />
                <div>
                  <p className="education-status">{status}</p>
                  <h3>{title}</h3>
                  <p>{summary}</p>
                  <a className="text-link" href={`/?project=${encodeURIComponent(entryProjectId)}`}>View case study →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section page-width" id="education">
          <SectionHeading
            number="09"
            title="Education & professional development"
            intro="Academic status and professional development are shown as supplied; ongoing study is not presented as a completed qualification."
          />
          <div className="education-layout">
            <article className="education-entry">
              <span className="education-marker" aria-hidden="true" />
              <div>
                <p className="education-status">{education.status}</p>
                <h3>{education.qualification}</h3>
                <p>{education.institution}</p>
                <ul className="education-focus">
                  {education.focus.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
            <div className="development-timeline">
              {education.development.map(({ title, date, detail }) => (
                <article className="development-entry" key={title}>
                  <span>{date}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="writing">
          <SectionHeading
            number="10"
            title="Technical writing & knowledge sharing"
            intro="I haven’t provided published article links yet. Search the technical topics I’m learning and plan to write about; no draft topics are represented as published posts."
          />
          <label className="topic-search">
            <span>Search published articles and learning topics</span>
            <input
              type="search"
              value={topicSearch}
              onChange={(event) => setTopicSearch(event.target.value)}
              placeholder="Try “database” or “security”"
            />
          </label>
          {filteredArticles.length > 0 && (
            <div className="article-list">
              {filteredArticles.map((item) => (
                <article className="article-card" key={item.id}>
                  {item.coverImage && <img src={item.coverImage} alt={item.coverAlt || ''} loading="lazy" />}
                  <p className="project-type">{item.category}</p>
                  <h3><a href={`/?article=${encodeURIComponent(item.id)}`}>{item.title}</a></h3>
                  <p>{item.summary}</p>
                  <p className="article-meta"><time dateTime={item.publishedAt}>{item.publishedAt}</time> · {item.readingTime} min read</p>
                </article>
              ))}
            </div>
          )}
          {articles.length === 0 && (
            <p className="empty-state" role="status">No published articles yet.</p>
          )}
          {filteredTopics.length > 0 ? (
            <ul className="topic-list" aria-live="polite">
              {filteredTopics.map((topic) => <li key={topic}>{topic}<span>Learning topic</span></li>)}
            </ul>
          ) : (
            topicSearch && <p className="empty-state" role="status">No learning topics match “{topicSearch}”.</p>
          )}
          <p className="annotation">Published articles, publication dates, reading times, and article content will appear here when available.</p>
        </section>

        <section className="content-section page-width resume-section" id="resume">
          <div className="resume-copy">
            <p className="section-kicker">11 / CV &amp; resume</p>
            <h2>A concise overview of my current path.</h2>
            <p className="section-intro">{professionalSummary}</p>
            <a className="button button-primary" href={cvUrl} download="Apollo-Brian-CV.pdf">
              Download full CV (PDF)
            </a>
          </div>
          <div className="resume-preview">
            <p className="project-type">CV PREVIEW</p>
            <h3>{profile.name}</h3>
            <p>Software Engineer · Backend Developer · Full-Stack Developer</p>
            <dl>
              <div><dt>Education</dt><dd>{education.qualification} · Third-year student</dd></div>
              <div><dt>Focus</dt><dd>Backend engineering, full-stack development, databases, and application security</dd></div>
              <div><dt>Technology</dt><dd>React, TypeScript, Node.js, Express.js, Python, Java, PostgreSQL, MySQL, SQL Server, MongoDB, Docker</dd></div>
              <div><dt>Selected work</dt><dd>FARDAgriTRUST · Naoja Electrical &amp; Electronics · Backend practice application</dd></div>
              <div><dt>Experience</dt><dd>Project-based development and learning work; no unverified employment history is listed</dd></div>
              <div><dt>Development</dt><dd>Decode 4.0 Café Series: Made of Kenya Edition · Certificate of participation</dd></div>
            </dl>
            <div className="social-links">
              <a href={profile.github} {...externalLinkProps()}>GitHub ↗</a>
              <a href={profile.linkedin} {...externalLinkProps()}>LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <section className="content-section page-width principles-section" id="principles">
          <SectionHeading
            number="12"
            title="Engineering principles"
            intro="The practices I want to carry consistently from coursework into production engineering."
          />
          <div className="principle-grid">
            {engineeringPrinciples.map(([title, description]) => (
              <article className="principle-item" key={title}>
                <span aria-hidden="true">/</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section page-width" id="contact">
          <div>
            <p className="section-kicker">13 / Contact</p>
            <h2>Let’s talk about useful software.</h2>
            <p className="section-copy">
              Reach out about a project, collaboration, or engineering opportunity.
              The form prepares a message in your email app; it does not send data to a server.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="social-links">
              <a href={profile.github} {...externalLinkProps()}>GitHub ↗</a>
              <a href={profile.linkedin} {...externalLinkProps()}>LinkedIn ↗</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label className="contact-trap">
              Leave this field blank
              <input name="website" type="text" tabIndex="-1" autoComplete="off" />
            </label>
            <label>
              Full name
              <input name="name" type="text" autoComplete="name" maxLength="100" required />
            </label>
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" maxLength="254" required />
            </label>
            <label>
              Subject
              <input name="subject" type="text" maxLength="150" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" maxLength="5000" required />
            </label>
            <button className="button button-primary" type="submit">Prepare email</button>
            <p className="form-feedback" aria-live="polite" role="status">{contactFeedback}</p>
            <p className="form-privacy">Messages are not stored or submitted by this website.</p>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SiteHeader({ darkMode, setDarkMode, menuOpen, setMenuOpen, homeHref }) {
  const logoHref = homeHref ? `${homeHref}#home` : '#home';
  return (
    <header className="site-header">
      <a className="brand" href={logoHref} aria-label={`${profile.name}, home`}>&lt;apollo.dev /&gt;</a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>
      <nav
        className={menuOpen ? 'main-nav open' : 'main-nav'}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navigation.map(([label, id], index) => (
          <a
            className={index === 0 ? 'active' : ''}
            href={`${homeHref}#${id}`}
            key={id}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
      <button
        className="theme-toggle"
        type="button"
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
        onClick={() => setDarkMode(!darkMode)}
      >
        <span aria-hidden="true">{darkMode ? '☼' : '☾'}</span>
      </button>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer page-width">
      <a className="brand" href="/#home">&lt;apollo.dev /&gt;</a>
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <div className="footer-links">
        <a href={profile.github} {...externalLinkProps()}>GitHub</a>
        <a href={profile.linkedin} {...externalLinkProps()}>LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <a className="back-to-top" href="/#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default App;
