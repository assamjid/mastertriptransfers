/* =====================================================
   SCRIPT EXCURSIONS — VERSION FINALE STABLE
   ✔ Langues FR / EN
   ✔ Sliders automatiques (FADE)
   ✔ Aucun swipe / aucun scroll manuel
   ✔ Clic image → scroll vers détail
   ✔ Aucun doublon / aucun conflit
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
   SCROLL VERS DÉTAIL
=============================== */
function scrollToExcursionDetail(name) {
  const target = document.querySelector(
    `.exc-detail[data-excursion="${CSS.escape(name)}"]`
  );
  if (!target) return;

  const header = document.getElementById("mainHeader");
  const offset = header ? header.offsetHeight + 20 : 20;

  const y =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

/* ===============================
   INIT UNIQUE (IMPORTANT)
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* 🌍 Langue */
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);
  document.body.classList.add("lang-ready");

  /* ===============================
     SLIDERS AUTO (FADE UNIQUEMENT)
  =============================== */
  document.querySelectorAll(".exc-slider.auto").forEach(slider => {

    const images = slider.querySelectorAll("img");
    if (images.length < 2) return;

    let index = 0;
    const delay = slider.classList.contains("slow") ? 7000 : 4000;

    // Sécurité : tout masquer
    images.forEach(img => img.classList.remove("active"));
    images[0].classList.add("active");

    // Auto fade
    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, delay);

    // Clic image → détail
    const name = slider.dataset.excursion;
    if (name) {
      images.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          scrollToExcursionDetail(name);
        });
      });
    }
  });

});
