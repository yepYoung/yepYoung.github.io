import { interfaceText, siteData } from "./Site_Data.js?v=20260613-cn-final-5";

const preferredLanguage = localStorage.getItem("site-language");
let language = preferredLanguage || "en";

const emphasizeAuthor = (authors) => authors.replaceAll("Yaopeng Yang", "<strong>Yaopeng Yang</strong>");
const heroBio = {
  zh: `我是 <strong>Yao-Peng Yang（杨耀鹏）</strong>。<br><br>
            我目前是南京大学软件学院<strong>软件工程方向的一年级博士生</strong>，导师为 <a class="text-link" href="https://software.nju.edu.cn/luobin/" target="_blank" rel="noreferrer">骆斌教授</a>。我于 2025 年在南京大学获得硕士学位，于 2022 年在江南大学获得计算机科学与技术学士学位。我的研究兴趣集中在面向软件工程的人工智能技术，尤其是 AI for Coding、软件工程大模型、程序修复、仓库级推理和自主编码智能体。<br><br>
            如果你对我的研究或项目感兴趣，欢迎联系与合作。邮箱：<a class="text-link" href="mailto:602025320022@smail.nju.edu.cn">602025320022@smail.nju.edu.cn</a>`,
  en: `Here is <strong>Yao-Peng Yang (杨耀鹏)</strong>.<br>
            <br>
            I am currently a <strong>first-year Ph.D. student</strong> specializing in <strong>Software Engineering (SE) at the Software Institute, Nanjing University</strong>. I have the privilege of being advised by Prof. <a class="text-link" href="https://software.nju.edu.cn/luobin/" target="_blank" rel="noreferrer">Bin Luo</a>. I received my master's degree from Nanjing University in 2025 and my bachelor's degree in Computer Science and Technology from Jiangnan University in 2022. My research interests center on artificial intelligence techniques for SE, coding, and computer usage.<br>
            <br>
            If you are interested in any aspect of my work, I would love to chat and collaborate. Please email me at <a class="text-link" href="mailto:602025320022@smail.nju.edu.cn">602025320022@smail.nju.edu.cn</a>`,
};

const render = () => {
  const data = siteData[language];
  const text = interfaceText[language];

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = language === "zh" ? `${data.name} · 个人主页` : `${data.name} · Personal Homepage`;
  document.querySelector('meta[name="description"]').content =
    language === "zh"
      ? "杨耀鹏，南京大学软件工程博士生，研究智能软件工程、AI for Coding、自动程序修复与自主协作智能体。"
      : "Yaopeng Yang is a software engineering Ph.D. student at Nanjing University researching LLMs for coding, program repair, and autonomous agents.";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text[element.dataset.i18n] || element.textContent;
  });

  document.querySelector("[data-brand-mark]").textContent = data.brandMark;
  document.querySelector("[data-brand-name]").textContent = data.name;
  document.querySelector("[data-footer-name]").textContent = data.name;
  document.querySelector(".hero-title").setAttribute("aria-label", data.name);
  document.querySelector("[data-hero-line-one]").textContent = data.heroLineOne;
  document.querySelector("[data-hero-line-two]").textContent = data.heroLineTwo;
  const heroBioElement = document.querySelector("[data-hero-bio]");
  if (heroBioElement) heroBioElement.innerHTML = heroBio[language];
  const bioElement = document.querySelector("[data-bio]");
  const roleElement = document.querySelector("[data-role]");
  const introElement = document.querySelector("[data-intro]");

  if (bioElement) bioElement.textContent = `${data.role} ${data.intro}`;
  if (roleElement) roleElement.textContent = data.role;
  if (introElement) introElement.textContent = data.intro;
  const aboutElement = document.querySelector("[data-about]");
  if (aboutElement) aboutElement.textContent = data.about;
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  document.querySelector("[data-language-toggle]").textContent = language === "zh" ? "EN" : "中";

  document.querySelector("[data-focus-list]").innerHTML = data.focus
    .map(
      (item) => `
        <article class="focus-card">
          <span>${item.index}</span>
          <div><h3>${item.title}</h3><p>${item.detail}</p></div>
        </article>`,
    )
    .join("");

  const factsElement = document.querySelector("[data-facts]");
  if (factsElement) {
    factsElement.innerHTML = data.facts
      .map((item) => `<div class="fact"><strong>${item.value}</strong><span>${item.label}</span></div>`)
      .join("");
  }

  document.querySelector("[data-timeline]").innerHTML = data.timeline
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <p class="timeline-period">${item.period}</p>
          <div class="timeline-main">
            <h3>${item.title}</h3>
            <p class="timeline-place">${item.place}</p>
            <p>${item.description}</p>
          </div>
          <div class="tag-list">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        </article>`,
    )
    .join("");

  const newsElement = document.querySelector("[data-news-list]");
  if (newsElement) {
    newsElement.innerHTML = data.news
      .map(
        (item) => `
          <article class="news-item reveal" style="--accent:${item.accent}">
            <div class="news-dot" aria-hidden="true"></div>
            <div class="news-date">${item.date}</div>
            <div class="news-copy">
              <div class="news-tag">${item.tag}</div>
              <h3>${item.title}</h3>
              <p>${item.summary}</p>
              ${item.link ? `<a class="news-link" href="${item.link}" target="_blank" rel="noreferrer">${item.linkLabel || text.openWork} ↗</a>` : ""}
            </div>
          </article>`,
      )
      .join("");
  }

  document.querySelector("[data-work-grid]").innerHTML = data.work
    .map((item) => {
      return `
        <article class="publication-item reveal" style="--accent:${item.accent}">
          <div class="publication-copy">
            <p class="publication-type">${item.type}</p>
            <h3>${item.title}</h3>
            <p class="publication-meta">${item.date}</p>
            <p class="publication-venue">${item.venue}</p>
            <p class="publication-authors"><span>${text.authorLabel}:</span> ${emphasizeAuthor(item.authors)}</p>
            <p class="publication-affiliations"><span>${text.affiliationLabel}:</span> ${item.affiliations}</p>
            <p class="publication-summary">${item.summary}</p>
            ${item.link ? `<a class="publication-link" href="${item.link}" target="_blank" rel="noreferrer">${text.openWork} ↗</a>` : ""}
          </div>
        </article>`;
    })
    .join("");

  const projectElement = document.querySelector("[data-project-grid]");
  if (projectElement) {
    projectElement.innerHTML = data.projects
      .map((item) => {
        const tag = item.link ? "a" : "article";
        const linkProps = item.link ? `href="${item.link}" target="_blank" rel="noreferrer"` : "";
        return `
          <${tag} class="project-card reveal" ${linkProps} style="--accent:${item.accent}">
            <div class="project-top"><span>${item.type}</span><span>${item.meta}</span></div>
            <div class="project-orbit" aria-hidden="true"></div>
            <div class="project-copy">
              <h3>${item.title}</h3>
              <p>${item.summary}</p>
              ${item.link ? `<span class="project-link">${text.openWork} ↗</span>` : ""}
            </div>
          </${tag}>`;
      })
      .join("");
  }

  document.querySelector("[data-principles]").innerHTML = data.principles
    .map(
      (item) => `
        <article class="principle reveal">
          <span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p>
        </article>`,
    )
    .join("");

  document.querySelector("[data-contact-links]").innerHTML = data.contacts
    .map(
      (item) => `
        <a href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>
          <span>${item.label}</span><strong>${item.value}</strong><span aria-hidden="true">↗</span>
        </a>`,
    )
    .join("");

  observeReveals();
};

const observeReveals = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
};

document.querySelector("[data-language-toggle]").addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  localStorage.setItem("site-language", language);
  render();
});

render();
