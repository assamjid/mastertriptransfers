/* =====================================================
   SCRIPT INTERVILLES – VERSION FINALE STABLE
   Page : intervilles.html uniquement
===================================================== */

/* ===============================
   CONFIG
=============================== */
const LANG_DEFAULT = "EN";

/* ===============================
   TRADUCTION DES TEXTES
=============================== */
function translateTexts(lang) {
  document.querySelectorAll("[data-fr]").forEach(el => {
    const value =
      lang === "EN" && el.dataset.en
        ? el.dataset.en
        : el.dataset.fr;

    // Autoriser HTML seulement pour blocs SEO
    if (
      el.classList.contains("dest-intro") ||
      el.classList.contains("intro-seo-card")
    ) {
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
 // translateTexts(lang);
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

  if (lang === "FR") {
    flag.src = "https://flagcdn.com/w40/gb.png";
    flag.title = "English";
  } else {
    flag.src = "https://flagcdn.com/w40/fr.png";
    flag.title = "Français";
  }
}

/* ===============================
   SCROLL UTILITAIRE
=============================== */
function smoothScrollTo(id, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;

  const y =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ===============================
   MENU (OPTIONNEL)
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      smoothScrollTo(btn.dataset.scroll, 80);
    });
  });
});

/* ===============================
   SHAKE MENU (SAFE)
=============================== */
setInterval(() => {
  document.querySelectorAll("#mainHeader nav a").forEach(btn => {
    btn.classList.add("menu-shake");
    setTimeout(() => btn.classList.remove("menu-shake"), 600);
  });
}, 3500);

/* ===============================
   INIT FINAL (CRITIQUE)
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Appliquer la langue
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  // 2️⃣ Débloquer l’affichage (repaint garanti)
  document.body.classList.add("lang-ready");
});
