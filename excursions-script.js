/* =====================================================
   EXCURSIONS — VERSION STABLE FINALE
===================================================== */

const LANG_DEFAULT = "EN";

/* ===============================
   TRADUCTION
=============================== */
function translateTexts(lang){
  document.querySelectorAll("[data-fr]").forEach(el=>{
    const val = (lang==="EN" && el.dataset.en) ? el.dataset.en : el.dataset.fr;
    el.innerHTML = val;
  });
}

/* ===============================
   LANGUE
=============================== */
function setLang(lang){
  localStorage.setItem("lang",lang);
  document.documentElement.lang = lang==="EN" ? "en":"fr";
  translateTexts(lang);
  updateLangFlag();
}

function toggleLang(){
  const current = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(current==="FR" ? "EN":"FR");
}

/* ===============================
   DRAPEAU
=============================== */
function updateLangFlag(){
  const flag = document.getElementById("langFlagBtn");
  if(!flag) return;
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  flag.src = lang==="FR"
    ? "https://flagcdn.com/w40/gb.png"
    : "https://flagcdn.com/w40/fr.png";
}

/* ===============================
   SCROLL VERS DÉTAIL
=============================== */
function scrollToExcursionDetail(name){
  const target = document.querySelector(
    `.exc-detail[data-excursion="${CSS.escape(name)}"]`
  );
  if(!target) return;

  const header = document.getElementById("mainHeader");
  const offset = header ? header.offsetHeight+15 : 0;

  const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({top:y,behavior:"smooth"});
}

/* ===============================
   INIT
=============================== */
document.addEventListener("DOMContentLoaded",()=>{

  /* langue AU CHARGEMENT */
  setLang(localStorage.getItem("lang") || LANG_DEFAULT);

  /* ===== SLIDERS RAPIDES ===== */
  document.querySelectorAll(".exc-slider.auto.fast").forEach(slider=>{
    const imgs = slider.querySelectorAll("img");
    if(imgs.length<2) return;

    let i=0;
    const w = slider.clientWidth;
    const name = slider.dataset.excursion;

    imgs.forEach(img=>{
      img.addEventListener("click",()=>scrollToExcursionDetail(name));
    });

    setInterval(()=>{
      i = (i+1)%imgs.length;
      slider.scrollTo({left:w*i,behavior:"smooth"});
    },5000);
  });

  /* ===== SLIDERS LENTS ===== */
  document.querySelectorAll(".exc-slider.auto.slow").forEach(slider=>{
    const imgs = slider.querySelectorAll("img");
    if(imgs.length<2) return;

    let i=0;
    const w = slider.clientWidth;

    setInterval(()=>{
      i = (i+1)%imgs.length;
      slider.scrollTo({left:w*i,behavior:"smooth"});
    },8000);
  });

});
