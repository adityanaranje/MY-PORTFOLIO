/* =============================================================
   Aditya Naranje — Portfolio interactions
   Data + rendering + nav + theme + reveal + lightbox
   All factual content sourced from the résumé / original portfolio.
   ============================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     DATA
  ------------------------------------------------------------ */

  // Featured production AI projects (strongest work first), with pipeline
  const featured = [
    {
      title: "Isolated Multi-Bot RAG System",
      category: "Generative AI",
      image: "static/images/Projects/isolated-rag-bot.png",
      link: "https://github.com/adityanaranje/ISOLATED-RAG-CHATBOT",
      desc: "A production multi-bot RAG platform (10+ bots) with isolated Pinecone namespaces and LangGraph-based agent routing, improving response relevance by ~35%. An LLM evaluation/validation loop (3-retry relevance scoring) cut hallucinations by ~30%; deployed on AWS EC2 with Docker, Nginx and Watchtower for automated updates.",
      tags: ["LangGraph", "Pinecone", "Docker", "AWS EC2", "RAG"],
      flow: ["User query", "LangGraph router", "Isolated namespace", "Retrieval + eval", "Answer"],
    },
    {
      title: "CodeGuard — Automated PR Review Agent",
      category: "Agentic AI",
      image: "static/images/Projects/code-review.png",
      link: "https://github.com/adityanaranje/CodeGuard",
      desc: "An LLM agent (LangGraph + Flask) that reviews GitHub pull requests with severity scoring and inline fix suggestions, cutting manual review effort by ~85% and improving PR turnaround by ~70%.",
      tags: ["LangGraph", "Flask", "LLMs", "GitHub Actions", "Code review"],
      flow: ["Pull request", "LangGraph agent", "Severity scoring", "Inline fixes", "Merge gate"],
    },
    {
      title: "AI Email Job Agent — Telegram Bot",
      category: "Agentic AI",
      image: "static/images/Projects/email-summary.png",
      link: "https://github.com/adityanaranje/EMAIL-SUMMARY-AGENT-TELEGRAM",
      desc: "An autonomous, fully serverless agent that monitors Gmail via OAuth2, classifies emails and extracts job metadata with LangChain/OpenAI, then pushes structured alerts to Telegram — running on a scheduled GitHub Actions CI/CD (15-min cadence) with no dedicated infrastructure.",
      tags: ["LangChain", "OpenAI", "Gmail API", "Telegram", "GitHub Actions"],
      flow: ["Gmail (OAuth2)", "LLM classify", "Extract jobs", "Telegram alert", "Serverless cron"],
    },
    {
      title: "RAG Chatbot — Amazon Bedrock AgentCore",
      category: "Generative AI",
      image: "static/images/Projects/aws-bedrock.png",
      link: "https://github.com/adityanaranje/RAG-Chatbot-AWS-Bedrock-Agentcore",
      desc: "A RAG chatbot using FAISS over 500+ knowledge chunks (~40% relevance gain) with Groq Llama-3.3-70B and persistent, thread-based memory. Containerized and deployed via the AWS AgentCore CLI to Amazon ECR and the Bedrock runtime.",
      tags: ["AWS Bedrock", "AgentCore", "FAISS", "Groq Llama-3.3", "LangChain"],
      flow: ["Question", "FAISS (500+ chunks)", "Bedrock / Groq LLM", "Memory", "Answer"],
    },
  ];

  // Remaining projects
  const projects = [
    { title: "Agent Builder — Research Agent", category: "Agentic AI", image: "static/images/Projects/agent-builder.png", link: "https://github.com/adityanaranje/Agent-Builder-Research-Agent", desc: "Multi-agent LangGraph workflow that plans and executes real-time research, breaking a query into subtasks and synthesising structured insights.", tags: ["LangGraph", "AI Agents", "LLMs", "LangSmith"] },
    { title: "GitHub Events Notifier (n8n)", category: "Agentic AI", image: "static/images/Projects/telegram-bot.png", link: "https://github.com/adityanaranje/n8n-github-events-telegram-email-workflow", desc: "Turns GitHub events into intelligent AI-powered notifications routed through Telegram and email.", tags: ["n8n", "Telegram", "Automation", "APIs"] },
    { title: "CODEVO — Repository Q&A Bot", category: "Generative AI", image: "static/images/Projects/codevo.png", link: "https://github.com/adityanaranje/CODEVO", desc: "AI tool that answers questions about a GitHub repository by indexing and retrieving from its codebase.", tags: ["RAG", "LLMs", "GitHub API", "Python"] },
    { title: "WhatsApp Shop Agent (n8n)", category: "Agentic AI", image: "static/images/Projects/whatsapp-bot.png", link: "https://github.com/adityanaranje/n8n-WhatsApp-Bot", desc: "WhatsApp chatbot that manages store orders and answers customer queries through automated workflows.", tags: ["n8n", "WhatsApp", "AI Agents", "Automation"] },
    { title: "Fitness Chatbot", category: "Generative AI", image: "static/images/Projects/fitness-bot.png", link: "https://github.com/adityanaranje/FITNESS-CHATBOT", desc: "AI fitness assistant delivering personalised workout and nutrition guidance through conversation.", tags: ["LLMs", "Chatbots", "Python", "Streamlit"] },
    { title: "SparkLine", category: "Generative AI", image: "static/images/Projects/sparkline.png", link: "https://github.com/adityanaranje/SparkLine", desc: "AI assistant that generates focused study plans from job-listing links to help close skill gaps.", tags: ["LLMs", "Prompting", "Python", "Streamlit"] },
    { title: "Story Generator", category: "Generative AI", image: "static/images/Projects/story-generator.png", link: "https://github.com/adityanaranje/STORY-GENERATOR", desc: "Interactive story-creation tool powered by LLMs with a Streamlit interface.", tags: ["LLMs", "Streamlit", "Python"] },
    { title: "Movie Recommendation System", category: "Machine Learning", image: "static/images/Projects/movie.png", link: "https://github.com/adityanaranje/MOVIE-RECOMMENDATION", desc: "Recommends movies using KNN and cosine similarity over content features.", tags: ["Scikit-Learn", "KNN", "Cosine Similarity", "Python"] },
    { title: "Book Recommender", category: "Machine Learning", image: "static/images/Projects/book-recommender.png", link: "https://github.com/adityanaranje/BOOK-RECOMMENDER", desc: "Recommends books using a collaborative-filtering approach.", tags: ["Machine Learning", "Recommenders", "Python"] },
    { title: "IPL Win Probability Predictor", category: "Machine Learning", image: "static/images/Projects/ipl-win.png", link: "https://github.com/adityanaranje/IPL-WIN-PROBABILITY-PREDICTOR", desc: "Predicts IPL match outcomes with a classifier reaching ~80% accuracy, deployed as a web app.", tags: ["Logistic Regression", "Pandas", "Streamlit"] },
    { title: "T20 Score Prediction", category: "Machine Learning", image: "static/images/Projects/score-predict.png", link: "https://github.com/adityanaranje/T20-1ST-INNING-SCORE-PREDICTION", desc: "Predicts a T20 first-innings total from in-match state using regression models.", tags: ["Regression", "Machine Learning", "Python"] },
    { title: "Health Care — Disease Prediction", category: "Machine Learning", image: "static/images/Projects/health-care.png", link: "https://github.com/adityanaranje/HEALTH-CARE", desc: "ML web app that predicts disease from patient symptoms using trained classification models.", tags: ["Classification", "Flask", "Scikit-Learn"] },
    { title: "Store Sales Prediction", category: "Machine Learning", image: "static/images/Projects/storesales.png", link: "https://github.com/adityanaranje/Store_Sales_Prediction", desc: "Regression model that forecasts future retail sales from historical data.", tags: ["Regression", "Feature Engineering", "Python"] },
    { title: "Flight Fare Prediction", category: "Machine Learning", image: "static/images/Projects/flight-fare.png", link: "https://github.com/adityanaranje/FLIGHT-FARE-PREDICTION", desc: "Predicts flight fares using regression-based models on route and timing features.", tags: ["Regression", "Machine Learning", "Python"] },
    { title: "Face & Object Detection", category: "Machine Learning", image: "static/images/Projects/objec-face.png", link: "https://github.com/adityanaranje/COMPUTER-VISION-PROJECT", desc: "Computer-vision application that detects faces and objects in images and video.", tags: ["Computer Vision", "OpenCV", "Deep Learning"] },
    { title: "British Airways Analysis", category: "Data Analysis", image: "static/images/Projects/british-airways.png", link: "https://github.com/adityanaranje/British-airways-forage", desc: "Topic modelling and review insights from the British Airways customer-review dataset.", tags: ["NLP", "Python", "Visualization"] },
    { title: "T20 Cricket Data Analysis", category: "Data Analysis", image: "static/images/Projects/cricket-analysis.png", link: "https://github.com/adityanaranje/T-20-Cricket-Data-Analysis-Using-Streamlit", desc: "End-to-end cleaning and analysis of T20 cricket statistics presented in a Streamlit dashboard.", tags: ["Streamlit", "Pandas", "Plotly", "ETL"] },
    { title: "Onyx Data DNA Challenges", category: "Data Analysis", image: "static/images/Projects/onyx.png", link: "https://github.com/adityanaranje/Onyx-Data-DNA-Challenges", desc: "Power BI dashboards visualising Onyx challenge performance and datasets.", tags: ["Power BI", "DAX", "Dashboarding"] },
    { title: "Indian Crop Analysis (SQL)", category: "Data Analysis", image: "static/images/Projects/sql-crop.png", link: "https://github.com/adityanaranje/SQL-For-India-Crop-Data-Analysis", desc: "SQL-driven analysis of Indian crop data surfaced through a Python/Streamlit web app.", tags: ["MySQL", "Python", "Streamlit"] },
    { title: "Google App Store Analysis", category: "Data Analysis", image: "static/images/Projects/google-app-store.png", link: "https://github.com/adityanaranje/Google-App-Store-Analysis-Ineuron-Internship", desc: "Analysis of Google Play Store apps — cleaning, rating/install trends and insights (iNeuron internship).", tags: ["Python", "Pandas", "Data Cleaning"] },
  ];

  // Featured credentials (from résumé). `img` opens the real scan in the lightbox.
  const featuredCerts = [
    { name: "Generative AI with LangChain & Hugging Face", issuer: "Udemy", img: null },
    { name: "Data Science", issuer: "IBM", img: "static/images/certifications/img5.jpg" },
    { name: "Machine Learning", issuer: "Internshala Trainings", img: "static/images/certifications/img2.jpg" },
    { name: "Neural Networks", issuer: "LinkedIn Learning", img: null },
    { name: "Feature Engineering", issuer: "Kaggle", img: null },
  ];

  // Certificate scans (real — match images in static/images/certifications)
  const certifications = [
    { name: "Nasscom Python — Top Performer", issuer: "Coding Ninjas", date: "2022", img: "static/images/certifications/img3.jpg" },
    { name: "Data Science Training — 100% Score", issuer: "Internshala Trainings", date: "2021", img: "static/images/certifications/img9.jpg" },
    { name: "Machine Learning Training", issuer: "Internshala Trainings", date: "2021", img: "static/images/certifications/img2.jpg" },
    { name: "Deep Learning Training", issuer: "Internshala Trainings", date: "2021", img: "static/images/certifications/img6.jpg" },
    { name: "Data Science Methodology", issuer: "IBM · Coursera", date: "2021", img: "static/images/certifications/img5.jpg" },
    { name: "Introduction to Data Analytics", issuer: "IBM · Coursera", date: "2022", img: "static/images/certifications/img1.jpg" },
    { name: "SQL for Data Analytics", issuer: "Udemy", date: "2021", img: "static/images/certifications/img14.jpg" },
    { name: "Python for Data Visualization", issuer: "LinkedIn Learning", date: "2021", img: "static/images/certifications/img8.jpg" },
    { name: "OpenCV for Python Developers", issuer: "LinkedIn Learning", date: "2021", img: "static/images/certifications/img11.jpg" },
    { name: "Deep Learning with OpenCV", issuer: "LinkedIn Learning", date: "2021", img: "static/images/certifications/img13.jpg" },
    { name: "AWS Machine Learning Foundations", issuer: "AWS · Udacity", date: "2021", img: "static/images/certifications/img12.jpg" },
    { name: "Introduction to Data Mining", issuer: "Great Learning", date: "2021", img: "static/images/certifications/img4.jpg" },
    { name: "Exploratory Data Analysis", issuer: "Great Learning", date: "2021", img: "static/images/certifications/img7.jpg" },
    { name: "HTML Course", issuer: "Sololearn", date: "2021", img: "static/images/certifications/img10.jpg" },
  ];

  // Writing — AI/LLM articles with public links
  const blogs = [
    {
      title: "Designing Production-Grade Agentic AI Systems — Explained Through a Restaurant",
      date: "Aug 30, 2026", read: "13 min", tags: ["Agentic AI", "AI Architecture", "Production AI"],
      excerpt: "How the moving parts of a production agentic AI system — orchestration, tool calling, memory, and validation — map onto the roles in a busy restaurant kitchen, making AI system design intuitive.",
      img: "static/images/Blogs/agentic-restaurant.jpg",
      link: "https://medium.com/@adityanaranje/designing-production-grade-agentic-ai-systems-explained-through-a-restaurant-308c97abb524?sharedUserId=adityanaranje",
      newest: true,
    },
    {
      title: "A Smart RAG Architecture with LangGraph",
      date: "Apr 6, 2026", read: "8 min", tags: ["RAG", "LangGraph", "LLM"],
      excerpt: "A modern Retrieval-Augmented Generation architecture using LangGraph to build context-aware AI systems with better control, memory and real-world applicability.",
      img: "static/images/Blogs/blog2.png",
      link: "https://medium.com/@adityanaranje/a-smart-rag-architecture-with-langgraph-03e294cd809c",
    },
    {
      title: "Prompting vs RAG vs Fine-Tuning — Real-Life Examples",
      date: "Mar 16, 2026", read: "7 min", tags: ["LLM", "Prompting", "Fine-Tuning"],
      excerpt: "The key differences between prompting, RAG and fine-tuning, with simple real-life examples to help you choose the right approach for LLM applications.",
      img: "static/images/Blogs/blog3.png",
      link: "https://medium.com/@adityanaranje/prompting-vs-rag-vs-fine-tuning-explained-with-real-life-examples-bf5ec841f39f",
    },
    {
      title: "Superpowers vs Algorithms: The Boys Guide to ML & DL",
      date: "Apr 26, 2026", read: "9 min", tags: ["Machine Learning", "Deep Learning"],
      excerpt: "Learn ML and DL concepts through a fun analogy inspired by The Boys, where superpowers represent algorithms — making complex ideas intuitive and memorable.",
      img: "static/images/Blogs/theboys.png",
      link: "https://adityanaranje.medium.com/superpowers-vs-algorithms-the-boys-guide-to-machine-learning-deep-learning-56543e614e8b",
    },
    {
      title: "PyTorch vs TensorFlow — Iron Man vs Captain America",
      date: "Apr 25, 2026", read: "10 min", tags: ["PyTorch", "TensorFlow", "Deep Learning"],
      excerpt: "A practical, intuitive comparison of PyTorch and TensorFlow with real-world examples and code to help you choose the right framework for production.",
      img: "static/images/Blogs/blog1.png",
      link: "https://medium.com/@adityanaranje/pytorch-vs-tensorflow-iron-man-vs-captain-america-of-deep-learning-8749cbcc0033",
    },
  ];

  /* ------------------------------------------------------------
     ICONS (inline SVG)
  ------------------------------------------------------------ */
  const ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
    kaggle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.83 23.85l-6.42-8.7 6.42-5.72c.54-.48.61-1.27.16-1.78-.46-.51-1.26-.55-1.8-.09L8.76 14.6V3.05c0-.7-.57-1.27-1.27-1.27s-1.27.57-1.27 1.27v17.9c0 .7.57 1.27 1.27 1.27s1.27-.57 1.27-1.27v-3.8l1.78-1.6 5.66 7.69c.39.52 1.13.64 1.66.26.52-.39.64-1.13.26-1.66z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>',
  };

  /* ------------------------------------------------------------
     RENDER: projects
  ------------------------------------------------------------ */
  const projectsEl = document.getElementById("projectsGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function tagHtml(tags) {
    return tags.map((t) => `<span class="p-tag">${t}</span>`).join("");
  }

  function featuredCard(p, delay) {
    const flow = p.flow
      ? `<div class="p-arch">
           <div class="p-arch-label">Pipeline</div>
           <div class="flow">
             ${p.flow.map((s, i) => `<span class="flow-step">${s}</span>${i < p.flow.length - 1 ? '<span class="flow-arrow">→</span>' : ""}`).join("")}
           </div>
         </div>`
      : "";
    return `
    <article class="project-card featured reveal" data-delay="${delay}">
      <div class="p-thumb">
        <img src="${p.image}" alt="${p.title} interface screenshot" loading="lazy">
        <span class="p-cat">${p.category}</span>
        <span class="p-featured-flag">Featured</span>
      </div>
      <div class="p-body">
        <h3 class="p-title">${p.title}</h3>
        <p class="p-desc">${p.desc}</p>
        ${flow}
        <div class="p-tags">${tagHtml(p.tags)}</div>
        <div class="p-links">
          <a class="p-link" href="${p.link}" target="_blank" rel="noopener noreferrer">${ICON.github} Code</a>
        </div>
      </div>
    </article>`;
  }

  function projectCard(p, delay) {
    return `
    <article class="project-card reveal" data-delay="${delay}" data-category="${p.category}">
      <div class="p-thumb">
        <img src="${p.image}" alt="${p.title} interface screenshot" loading="lazy">
        <span class="p-cat">${p.category}</span>
      </div>
      <div class="p-body">
        <h3 class="p-title">${p.title}</h3>
        <p class="p-desc">${p.desc}</p>
        <div class="p-tags">${tagHtml(p.tags)}</div>
        <div class="p-links">
          <a class="p-link" href="${p.link}" target="_blank" rel="noopener noreferrer">${ICON.github} Code</a>
        </div>
      </div>
    </article>`;
  }

  function renderProjects(filter) {
    // Featured production projects lead the full grid; category filters show only matches
    const featuredHtml =
      filter === "all" ? featured.map((p, i) => featuredCard(p, (i % 2) + 1)).join("") : "";
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    const listHtml = list.length
      ? list.map((p, i) => projectCard(p, (i % 3) + 1)).join("")
      : '<p class="empty-note">// no projects in this category</p>';
    projectsEl.innerHTML = featuredHtml + listHtml;
    observeReveals();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });

  /* ------------------------------------------------------------
     RENDER: certifications
  ------------------------------------------------------------ */
  // Featured credentials (from résumé)
  const featuredCertEl = document.getElementById("featuredCertGrid");
  featuredCertEl.innerHTML = featuredCerts
    .map((c, i) => {
      const inner = `
        <span class="fc-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5"/></svg></span>
        <div class="fc-name">${c.name}</div>
        <div class="fc-issuer">${c.issuer}</div>
        ${c.img ? `<span class="fc-view">View certificate ${ICON.arrow}</span>` : `<span class="fc-verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Certified</span>`}`;
      if (c.img) {
        return `<button class="featured-cert-card is-image reveal" data-delay="${(i % 3) + 1}" data-img="${c.img}" data-title="${c.name}" data-issuer="${c.issuer}" aria-label="View certificate: ${c.name} from ${c.issuer}">${inner}</button>`;
      }
      return `<div class="featured-cert-card reveal" data-delay="${(i % 3) + 1}">${inner}</div>`;
    })
    .join("");

  const certEl = document.getElementById("certGrid");
  certEl.innerHTML = certifications
    .map(
      (c, i) => `
    <button class="cert-card reveal" data-delay="${(i % 4) + 1}" data-img="${c.img}" data-title="${c.name}" data-issuer="${c.issuer}" aria-label="View certificate: ${c.name} from ${c.issuer}">
      <img src="${c.img}" alt="${c.name} certificate from ${c.issuer}" loading="lazy">
      <span class="cert-zoom">${ICON.zoom}</span>
      <span class="cert-overlay">
        <span class="cert-issuer">${c.issuer}</span>
        <span class="cert-name">${c.name}</span>
      </span>
    </button>`
    )
    .join("");

  /* ------------------------------------------------------------
     RENDER: blogs
  ------------------------------------------------------------ */
  const blogEl = document.getElementById("blogGrid");
  blogEl.innerHTML = blogs
    .map(
      (b, i) => `
    <article class="blog-card reveal" data-delay="${(i % 2) + 1}">
      <div class="blog-thumb">
        <img src="${b.img}" alt="${b.title} article cover" loading="lazy">
        ${b.newest ? '<span class="blog-new">New</span>' : ""}
      </div>
      <div class="blog-body">
        <div class="blog-meta"><span>${b.date}</span><span class="dot"></span><span>${b.read} read</span></div>
        <h3 class="blog-title">${b.title}</h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div class="blog-tags">${b.tags.map((t) => `<span class="blog-tag">${t}</span>`).join("")}</div>
        <a class="blog-read" href="${b.link}" target="_blank" rel="noopener noreferrer">Read on Medium ${ICON.arrow}</a>
      </div>
    </article>`
    )
    .join("");

  /* ------------------------------------------------------------
     Lightbox
  ------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbTitle = document.getElementById("lbTitle");
  const lbIssuer = document.getElementById("lbIssuer");

  function openLightbox(card) {
    lbImg.src = card.dataset.img;
    lbImg.alt = card.dataset.title + " certificate";
    lbTitle.textContent = card.dataset.title;
    lbIssuer.textContent = card.dataset.issuer;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function onCertClick(e) {
    const card = e.target.closest(".cert-card, .featured-cert-card.is-image");
    if (card) openLightbox(card);
  }
  certEl.addEventListener("click", onCertClick);
  featuredCertEl.addEventListener("click", onCertClick);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest("#lbClose")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });

  /* ------------------------------------------------------------
     Theme toggle
  ------------------------------------------------------------ */
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  function setTheme(light) {
    body.classList.toggle("light-mode", light);
    themeBtn.innerHTML = light ? ICON.moon : ICON.sun;
    themeBtn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(saved ? saved === "light" : prefersLight);
  themeBtn.addEventListener("click", () => setTheme(!body.classList.contains("light-mode")));

  /* ------------------------------------------------------------
     Mobile nav
  ------------------------------------------------------------ */
  const navLinks = document.getElementById("navLinks");
  const burger = document.getElementById("burger");
  const scrim = document.getElementById("navScrim");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    scrim.classList.toggle("show", open);
  }
  burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  scrim.addEventListener("click", () => setMenu(false));
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ------------------------------------------------------------
     Nav scrolled state + active section (scrollspy)
  ------------------------------------------------------------ */
  const nav = document.getElementById("nav");
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = navLinks.querySelectorAll("a");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 12);
    const pos = window.scrollY + 120;
    let current = "";
    sections.forEach((s) => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) current = s.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------
     Reveal on scroll
  ------------------------------------------------------------ */
  let observer;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }
    const els = document.querySelectorAll(".reveal:not(.visible)");
    els.forEach((el) => observer.observe(el));
  }
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }

  /* ------------------------------------------------------------
     Hero role rotator (typewriter)
  ------------------------------------------------------------ */
  const roles = ["AI/ML Engineer", "RAG & LLM Agents", "LangGraph · MCP Tools", "AWS · Production AI"];
  const roleEl = document.getElementById("heroRole");
  let rIdx = 0, cIdx = 0, deleting = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tick() {
    const word = roles[rIdx];
    if (deleting) { cIdx--; } else { cIdx++; }
    roleEl.textContent = word.slice(0, cIdx);
    let delay = deleting ? 45 : 90;
    if (!deleting && cIdx === word.length) { delay = 1800; deleting = true; }
    else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }
    setTimeout(tick, delay);
  }
  if (reduceMotion) {
    roleEl.textContent = roles[0];
  } else {
    tick();
  }

  /* ------------------------------------------------------------
     Inject inline SVG icons into social/contact placeholders
  ------------------------------------------------------------ */
  function setIcon(selector, icon) {
    document.querySelectorAll(selector).forEach((el) => { el.innerHTML = icon; });
  }
  const heroSocial = document.querySelectorAll(".hero-social a");
  [["github", ICON.github], ["linkedin", ICON.linkedin], ["medium", ICON.medium], ["kaggle", ICON.kaggle]].forEach((pair, i) => {
    if (heroSocial[i]) heroSocial[i].innerHTML = pair[1];
  });
  setIcon(".fs-github", ICON.github);
  setIcon(".fs-linkedin", ICON.linkedin);
  setIcon(".fs-medium", ICON.medium);
  setIcon(".ci-mail", ICON.mail);
  setIcon(".ci-linkedin", ICON.linkedin);
  setIcon(".ci-github", ICON.github);
  setIcon(".ci-medium", ICON.medium);
  setIcon(".ci-kaggle", ICON.kaggle);

  /* ------------------------------------------------------------
     Experience timeline — smooth snake/S-curve
  ------------------------------------------------------------ */
  function drawTimelineCurve() {
    const tl = document.getElementById("timeline");
    const svg = document.getElementById("timelineCurve");
    const path = document.getElementById("timelinePath");
    if (!tl || !svg || !path) return;
    const dots = Array.from(tl.querySelectorAll(".tl-dot"));
    if (dots.length < 2) return;

    const tlRect = tl.getBoundingClientRect();
    // Centre of each milestone dot, relative to the timeline
    const dotPts = dots.map((d) => {
      const r = d.getBoundingClientRect();
      return { x: r.left - tlRect.left + r.width / 2, y: r.top - tlRect.top + r.height / 2 };
    });

    // Nodes: each dot, plus a swayed midpoint between consecutive dots (alternating side)
    const nodes = [dotPts[0]];
    for (let i = 1; i < dotPts.length; i++) {
      const a = dotPts[i - 1];
      const b = dotPts[i];
      const midY = (a.y + b.y) / 2;
      const bulge = i % 2 === 1 ? 17 : -13; // right then left → snake
      nodes.push({ x: a.x + bulge, y: midY });
      nodes.push(b);
    }

    // Catmull-Rom → cubic Bézier (smooth, passes through every node/dot)
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let k = 0; k < nodes.length - 1; k++) {
      const p0 = nodes[k - 1] || nodes[k];
      const p1 = nodes[k];
      const p2 = nodes[k + 1];
      const p3 = nodes[k + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`;
    }
    path.setAttribute("d", d);

    const H = Math.ceil(tl.clientHeight);
    svg.setAttribute("viewBox", `0 0 40 ${H}`);
    svg.setAttribute("height", H);
  }
  window.addEventListener("load", drawTimelineCurve);
  window.addEventListener("resize", drawTimelineCurve);
  setTimeout(drawTimelineCurve, 500); // after fonts/reveal settle

  /* ------------------------------------------------------------
     Init
  ------------------------------------------------------------ */
  renderProjects("all");
  observeReveals();
  setTimeout(drawTimelineCurve, 800);
})();
