const state = {
  lang: "fr",
  theme: "dark"
};

document.addEventListener("DOMContentLoaded", () => {

  const menu = document.getElementById("menu");
  const mobileBtn = document.getElementById("mobileBtn");
  const langBtn = document.getElementById("langBtn");
  const themeBtn = document.getElementById("themeBtn");
  const body = document.body;
  const form = document.getElementById("contactForm");

  if (mobileBtn && menu) {
    mobileBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("light");
      state.theme = body.classList.contains("light") ? "light" : "dark";
      themeBtn.textContent = state.theme === "light" ? "☀️" : "🌙";
      localStorage.setItem("theme", state.theme);
    });
  }

  function applyLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === "fr" ? "fr" : "ar";
    document.documentElement.dir = lang === "fr" ? "ltr" : "rtl";

    document.querySelectorAll("[data-fr][data-ar]").forEach(el => {
      el.textContent = el.getAttribute(lang === "fr" ? "data-fr" : "data-ar");
    });

    document.querySelectorAll("[data-fr-placeholder][data-ar-placeholder]").forEach(el => {
      el.placeholder = el.getAttribute(lang === "fr" ? "data-fr-placeholder" : "data-ar-placeholder");
    });

    if (langBtn) {
      langBtn.textContent = lang.toUpperCase();
    }

    localStorage.setItem("lang", lang);
  }

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLanguage(state.lang === "fr" ? "ar" : "fr");
    });
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    if (themeBtn) themeBtn.textContent = "☀️";
    state.theme = "light";
  }

  const savedLang = localStorage.getItem("lang");
  applyLanguage(savedLang === "ar" ? "ar" : "fr");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  if (form && menu) {
    form.addEventListener("submit", () => {
      menu.classList.remove("open");
    });
  }

});