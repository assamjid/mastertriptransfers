/* =====================================================
   SCRIPT INTERVILLES – VERSION SÛRE
===================================================== */

const LANG_DEFAULT = "EN";

/* ===============================
   LANGUE (SANS TOUCHER AU DOM)
=============================== */
function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "EN" ? "en" : "fr";
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
   INIT – CRITIQUE
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  // 🔓 OBLIGATOIRE sinon page blanche
  document.documentElement.setAttribute("data-lang-ready", "true");
});
