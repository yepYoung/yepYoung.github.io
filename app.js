import { interfaceText, siteData } from "./Site_Data.js";

const preferredLanguage = localStorage.getItem("site-language");
let language = preferredLanguage || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");

const render = () => {
  const data = siteData[language];
  const text = interfaceText[language];

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = `${data.name} · Personal Homepage`;
  document.querySelector('meta[name="description"]').content =
    language === "zh"
      ? "杨耀鹏，南京大学软件工程博士生，研究智能软件工程、LLM for Coding、自动程序修复与自主工作智能体。"
      : "Yaopeng Yang is a software engineering Ph.D. student at Nanjing University researching LLMs for coding, program repair, and autonomous agents.";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text[element.dataset.i18n] || element.textContent;
  });

  document.querySelector("[data-brand-mark]").textContent = data.brandMark;
  document.querySelector("[data-brand-name]").textContent = data.name;
  document.querySelector("[data-footer-name]").textContent = data.name;
  document.querySelector("[data-hero-line-one]").textContent = data.heroLineOne;
  document.querySelector("[data-hero-line-two]").textContent = data.heroLineTwo;
  document.querySelector("[data-role]").textContent = data.role;
  document.querySelector("[data-intro]").textContent = data.intro;
  document.querySelector("[data-about]").textContent = data.about;
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  document.querySelector("[data-language-toggle]").textContent = language === "zh" ? "EN" : "中";

  document.querySelector("[data-focus-list]").innerHTML = data.focus
    .map(
      (item) => `
        <article class="focus-card">
          <span>${item.index}</span>
          <div><h3>${item.title}</h3><p>${item.detail}</p></div>
          <span aria-hidden="true">↗</span>
        </article>`,
    )
    .join("");

  document.querySelector("[data-facts]").innerHTML = data.facts
    .map((item) => `<div class="fact"><strong>${item.value}</strong><span>${item.label}</span></div>`)
    .join("");

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

  document.querySelector("[data-work-grid]").innerHTML = data.work
    .map((item) => {
      const tag = item.link ? "a" : "article";
      const linkProps = item.link ? `href="${item.link}" target="_blank" rel="noreferrer"` : "";
      return `
        <${tag} class="work-card reveal" ${linkProps} style="--accent:${item.accent}">
          <div class="work-top"><span>${item.number}</span><span>${item.type}</span></div>
          <div class="work-orbit" aria-hidden="true"><span>${item.number}</span></div>
          <div class="work-copy">
            <p>${item.meta}</p>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            ${item.link ? `<span class="work-link">${text.openWork} ↗</span>` : ""}
          </div>
        </${tag}>`;
    })
    .join("");

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
