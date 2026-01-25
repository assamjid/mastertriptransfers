/* =====================================================
   SCRIPT EXCURSIONS – VERSION FINALE STABLE
   - Langues FR / EN
   - Anti page blanche
   - Sliders auto (Android OK)
   - Clic photo → détail
   - Boutons réservation
===================================================== */

const LANG_DEFAULT = "EN";

/* ===============================
   TRADUCTION DES TEXTES
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
  const target = document.querySelector(
    `.exc-detail[data-excursion="${name}"]`
  );
  if (!target) return;

  const header = document.getElementById("mainHeader");
  const offset = header ? header.offsetHeight + 20 : 120;

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
   REDIRECTION RÉSERVATION
=============================== */
function openExcursion(name) {
  window.location.href =
    "index.html?service=excursion&circuit=" +
    encodeURIComponent(name);
}

/* ===============================
   INIT DOM
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* 🌍 LANGUE */
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  /* 🔓 ANTI PAGE BLANCHE */
  document.body.classList.add("lang-ready");

  /* ===============================
     SLIDERS AUTO + CLIC IMAGE
     (ANDROID SAFE)
  =============================== */
  document.querySelectorAll(".exc-slider.auto").forEach(slider => {

    const images = slider.querySelectorAll("img");
    if (images.length <= 1) return;

    let index = 0;
    const interval =
      slider.classList.contains("slow") ? 8000 : 4500;

    /* ▶️ AUTO SCROLL (PAS scrollTo !) */
    slider._auto = setInterval(() => {
      index = (index + 1) % images.length;
      slider.scrollLeft = slider.clientWidth * index;
    }, interval);

    /* ⏸️ Pause si interaction utilisateur */
    slider.addEventListener("touchstart", () => {
      clearInterval(slider._auto);
    });

    /* 🖱️ CLIC PHOTO → DÉTAIL */
    const excursionName = slider.dataset.excursion;
    if (excursionName) {
      images.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          scrollToExcursionDetail(excursionName);
        });
      });
    }
  });

  /* 🔔 SHAKE MENU */
  setInterval(() => {
    document.querySelectorAll("#mainHeader nav a").forEach(btn => {
      btn.classList.add("menu-shake");
      setTimeout(() => btn.classList.remove("menu-shake"), 600);
    });
  }, 3500);

  /* 🔔 SHAKE BOUTON FIXE */
  setInterval(() => {
    const btn = document.getElementById("bookNowBtn");
    if (!btn) return;

    btn.classList.remove("btn-shake");
    void btn.offsetWidth;
    btn.classList.add("btn-shake");
  }, 4000);
});

/* ===============================
   SÉCURITÉ LOAD (ANTI BLANC)
=============================== */
window.addEventListener("load", () => {
  document.body.classList.add("lang-ready");
});
