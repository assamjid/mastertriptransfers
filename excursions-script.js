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

  // ✅ LIGNE MANQUANTE (CAUSE DU BUG)
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
   SHAKE MENU
=============================== */
setInterval(() => {
  document.querySelectorAll("#mainHeader nav a").forEach(btn => {
    btn.classList.add("menu-shake");
    setTimeout(() => btn.classList.remove("menu-shake"), 600);
  });
}, 3500);

/* ===============================
   INIT
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  // 🔓 affiche la page
  document.body.classList.add("lang-ready");
});


/*==========SHAKE BOUTON EN BAS=========*/
       document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    const btn = document.getElementById("bookNowBtn");
    if (!btn) return;

    btn.classList.remove("btn-shake");
    void btn.offsetWidth; // reset animation
    btn.classList.add("btn-shake");
  }, 4000);
});
