/* =====================================================
   EXCURSIONS SCRIPT — VERSION STABLE FINALE
   - Bilingue FR / EN
   - Slider FADE auto
   - Clic image → scroll vers détail
===================================================== */

/* ===============================
   LANGUE
=============================== */
const LANG_DEFAULT = "FR";

function translateTexts(lang){
  document.querySelectorAll("[data-fr]").forEach(el=>{
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

function setLang(lang){
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "EN" ? "en" : "fr";
  translateTexts(lang);
  updateLangFlag();
}

function toggleLang(){
  const current = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(current === "FR" ? "EN" : "FR");
}

function updateLangFlag(){
  const flag = document.getElementById("langFlagBtn");
  if(!flag) return;

  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  flag.src = lang === "FR"
    ? "https://flagcdn.com/w40/gb.png"
    : "https://flagcdn.com/w40/fr.png";
}

/* ===============================
   SCROLL VERS DÉTAIL EXCURSION
=============================== */
function scrollToExcursionDetail(name){
  const target = document.querySelector(
    `.exc-detail[data-excursion="${CSS.escape(name)}"]`
  );
  if(!target) return;

  const header = document.getElementById("mainHeader");
  const offset = header ? header.offsetHeight + 15 : 0;

  const y =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({ top:y, behavior:"smooth" });
}

/* ===============================
   SLIDER FADE AUTOMATIQUE
=============================== */
function initFadeSliders(){

  document.querySelectorAll(".exc-slider.auto").forEach(slider => {

    const imgs = slider.querySelectorAll("img");
    if (imgs.length < 2) return;

    let index = 0;
    const delay = slider.classList.contains("slow") ? 8000 : 5000;

    // image initiale
    imgs.forEach(img => img.classList.remove("active"));
    imgs[0].classList.add("active");

    setInterval(() => {
      imgs[index].classList.remove("active");
      index = (index + 1) % imgs.length;
      imgs[index].classList.add("active");
    }, delay);

    // clic image → détail
    const name = slider.dataset.excursion;
    if (name) {
      slider.style.cursor = "pointer";
      slider.addEventListener("click", () => {
        scrollToExcursionDetail(name);
      });
    }
  });
}

/* ===============================
   INIT GLOBAL
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  // 🌍 langue
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  // 🎞️ sliders
  initFadeSliders();
});
