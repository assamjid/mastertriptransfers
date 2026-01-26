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

function scrollToExcursionDetail(name){
  const details = document.querySelectorAll("#excursionDetails .exc-detail");

  for(const d of details){
    const h = d.querySelector("h3");
    if(h && h.textContent.toLowerCase().includes(name.toLowerCase().split(" ")[0])){
      const header = document.getElementById("mainHeader");
      const y = d.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 15;
      window.scrollTo({top:y,behavior:"smooth"});
      break;
    }
  }
 } 


// Vitesse photos. SLIDERS RAPIDES (cartes excursions)
document.querySelectorAll(".exc-slider.auto.fast").forEach(slider=>{
  let i = 0;
  setInterval(()=>{
    i++;
    if(i >= slider.children.length) i = 0;
    slider.scrollTo({ left: slider.clientWidth * i, behavior:"smooth" });
  }, 5000);   // 5 secondes
});

// SLIDERS LENTS (fiches détaillées)
document.querySelectorAll(".exc-slider.auto.slow").forEach(slider=>{
  let i = 0;
  setInterval(()=>{
    i++;
    if(i >= slider.children.length) i = 0;
    slider.scrollTo({ left: slider.clientWidth * i, behavior:"smooth" });
  }, 8000);   // 8 secondes
});


