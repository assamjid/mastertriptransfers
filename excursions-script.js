/* =====================================================
   SCRIPT EXCURSIONS — SLIDERS AUTO STABLES
   Compatible CSS scroll horizontal
===================================================== */

const LANG_DEFAULT = "EN";

/* ===============================
   TRADUCTION
=============================== */
function translateTexts(lang) {
  document.querySelectorAll("[data-fr]").forEach(el => {
    const txt =
      (lang === "EN" && el.dataset.en)
        ? el.dataset.en
        : el.dataset.fr;

    if (
      el.classList.contains("intro-seo") ||
      el.classList.contains("seo-services") ||
      el.classList.contains("dest-intro") ||
      el.classList.contains("exc-intro")
    ) {
      el.innerHTML = txt;
    } else {
      el.textContent = txt;
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
   REDIRECTION RÉSERVATION
=============================== */
function openExcursion(name) {
  window.location.href =
    "index.html?service=excursion&circuit=" +
    encodeURIComponent(name);
}

/* ===============================
   INIT UNIQUE
=============================== 
document.addEventListener("DOMContentLoaded", () => {

  /* 🌍 Langue 
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);
  document.body.classList.add("lang-ready");

  /* =====================================================
     SLIDERS AUTO — VERSION QUI MARCHE
  ===================================================== 

  /* SLIDERS RAPIDES (cartes excursions) 
  document.querySelectorAll(".exc-slider.auto.fast").forEach(slider => {

    const images = slider.querySelectorAll("img");
    if (images.length <= 1) return;

    let i = 0;

    // ⚠️ Forcer la position initiale
    slider.scrollLeft = 0;

    setInterval(() => {
      i++;
      if (i >= images.length) i = 0;

      slider.scrollTo({
        left: slider.clientWidth * i,
        behavior: "smooth"
      });
    }, 5000); // 5 secondes
  });

  /* SLIDERS LENTS (fiches détails) 
  document.querySelectorAll(".exc-slider.auto.slow").forEach(slider => {

    const images = slider.querySelectorAll("img");
    if (images.length <= 1) return;

    let i = 0;

    slider.scrollLeft = 0;

    setInterval(() => {
      i++;
      if (i >= images.length) i = 0;

      slider.scrollTo({
        left: slider.clientWidth * i,
        behavior: "smooth"
      });
    }, 8000); // 8 secondes
  });

});  ===============FIN==============*/

/* =====================================================
   EXCURSIONS — SLIDER AUTO + CLIC → DÉTAIL (STABLE)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SCROLL VERS DÉTAIL
  =============================== */
  function scrollToExcursionDetail(name) {
    const target = document.querySelector(
      `.exc-detail[data-excursion="${CSS.escape(name)}"]`
    );
    if (!target) return;

    const header = document.getElementById("mainHeader");
    const offset = header ? header.offsetHeight + 15 : 0;

    const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  /* ===============================
     SLIDERS RAPIDES (cartes)
  =============================== */
  document.querySelectorAll(".exc-slider.auto.fast").forEach(slider => {

    const imgs = slider.querySelectorAll("img");
    if (imgs.length < 2) return;

    let i = 0;
    const w = slider.clientWidth;

    // clic image → détail
    const name = slider.dataset.excursion;
    if (name) {
      imgs.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          scrollToExcursionDetail(name);
        });
      });
    }

    setInterval(() => {
      i = (i + 1) % imgs.length;
      slider.scrollTo({
        left: w * i,
        behavior: "smooth"
      });
    }, 5000);
  });

  /* ===============================
     SLIDERS LENTS (détails)
  =============================== */
  document.querySelectorAll(".exc-slider.auto.slow").forEach(slider => {

    const imgs = slider.querySelectorAll("img");
    if (imgs.length < 2) return;

    let i = 0;
    const w = slider.clientWidth;

    setInterval(() => {
      i = (i + 1) % imgs.length;
      slider.scrollTo({
        left: w * i,
        behavior: "smooth"
      });
    }, 8000);
  });

});
