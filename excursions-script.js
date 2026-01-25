/* =====================================================
   SCRIPT EXCURSIONS – VERSION PROPRE & STABLE
   (ANTI PAGE BLANCHE – SANS SUPPRESSION)
===================================================== */
document.body.classList.add("lang-ready");

const LANG_DEFAULT = "EN";

/* ===============================
   TRADUCTION
=============================== */
function translateTexts(lang) {
  document.querySelectorAll("[data-fr]").forEach(el => {
    const value =
      (lang === "EN" && el.dataset.en)
        ? el.dataset.en
        : el.dataset.fr;

    const allowHTML =
      el.classList.contains("intro-seo") ||
      el.classList.contains("seo-services") ||
      el.classList.contains("dest-intro") ||
      el.classList.contains("exc-intro");

    if (allowHTML) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
}

/* ===============================
   LANGUE
=============================== */
function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "EN" ? "en" : "fr";
  translateTexts(lang);
  updateLangFlag();
}

function toggleLang() {
  const current = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(current === "FR" ? "EN" : "FR");
}

/* ===============================
   DRAPEAU
=============================== */
function updateLangFlag() {
  const flag = document.getElementById("langFlagBtn");
  if (!flag) return;

  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  flag.src =
    lang === "FR"
      ? "https://flagcdn.com/w40/gb.png"
      : "https://flagcdn.com/w40/fr.png";
}

/* ===============================
   SCROLL VERS DÉTAIL
=============================== */
function scrollToExcursionDetail(name) {
  const details = document.querySelectorAll(".exc-detail");
  for (const d of details) {
    const h = d.querySelector("h3");
    if (!h) continue;

    if (
      h.textContent
        .toLowerCase()
        .includes(name.toLowerCase().split(" ")[0])
    ) {
      const header = document.getElementById("mainHeader");
      const y =
        d.getBoundingClientRect().top +
        window.pageYOffset -
        (header ? header.offsetHeight : 0) -
        15;

      window.scrollTo({ top: y, behavior: "smooth" });
      break;
    }
  }
}

/* ===============================
   REDIRECTION RÉSERVATION
=============================== */
function openExcursion(name) {
  window.location.href =
    "index.html?service=excursion&circuit=" +
    encodeURIComponent(name);
}

/* ===============================
   INIT DOM (AFFICHAGE IMMÉDIAT)
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* 🌍 LANGUE */
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  /* ✅ ANTI PAGE BLANCHE */
  document.body.classList.add("lang-ready");

  /* 🎞️ SLIDERS RAPIDES */
  document.querySelectorAll(".exc-slider.auto.fast").forEach(slider => {
    let i = 0;
    setInterval(() => {
      if (!slider.children.length) return;
      i = (i + 1) % slider.children.length;
      slider.scrollTo({
        left: slider.clientWidth * i,
        behavior: "smooth"
      });
    }, 5000);
  });

  /* 🎞️ SLIDERS LENTS */
  document.querySelectorAll(".exc-slider.auto.slow").forEach(slider => {
    let i = 0;
    setInterval(() => {
      if (!slider.children.length) return;
      i = (i + 1) % slider.children.length;
      slider.scrollTo({
        left: slider.clientWidth * i,
        behavior: "smooth"
      });
    }, 8000);
  });


   document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".exc-slider").forEach(slider => {
    const name = slider.dataset.excursion;
    if (!name) return;

    slider.querySelectorAll("img").forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        scrollToExcursionDetail(name);
      });
    });
  });

});

  /* 🔔 SHAKE MENU */
  setInterval(() => {
    document.querySelectorAll("#mainHeader nav a").forEach(btn => {
      btn.classList.add("menu-shake");
      setTimeout(() => btn.classList.remove("menu-shake"), 600);
    });
  }, 3500);

  /* 🔔 SHAKE BOUTON BAS */
  setInterval(() => {
    const btn = document.getElementById("bookNowBtn");
    if (!btn) return;
    btn.classList.remove("btn-shake");
    void btn.offsetWidth;
    btn.classList.add("btn-shake");
  }, 4000);

});

/* ===============================
   LOAD (SÉCURITÉ BONUS – NON BLOQUANT)
=============================== */
window.addEventListener("load", () => {
  // Sécurité : au cas où DOMContentLoaded n’aurait pas suffi
  document.body.classList.add("lang-ready");
});
