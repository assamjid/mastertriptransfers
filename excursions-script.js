/* =====================================================
   EXCURSIONS SCRIPT — FINAL STABLE
   - Slider AUTO (fade)
   - Click image → scroll détail
   - Langue FR / EN
===================================================== */

/* ===============================
   LANGUE
=============================== */
const LANG_DEFAULT = "FR";

function translateTexts(lang){
  document.querySelectorAll("[data-fr]").forEach(el=>{
    el.textContent =
      (lang === "EN" && el.dataset.en)
        ? el.dataset.en
        : el.dataset.fr;
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
  flag.src =
    lang === "FR"
      ? "https://flagcdn.com/w40/gb.png"
      : "https://flagcdn.com/w40/fr.png";
}

/* ===============================
   SLIDER AUTO (FADE)
=============================== */
function initExcursionSliders(){

  document.querySelectorAll(".exc-slider.auto").forEach(slider=>{

    const imgs = slider.querySelectorAll("img");
    if(imgs.length < 2) return;

    let index = 0;
    imgs.forEach(img => img.classList.remove("active"));
    imgs[0].classList.add("active");

    setInterval(()=>{
      imgs[index].classList.remove("active");
      index = (index + 1) % imgs.length;
      imgs[index].classList.add("active");
    }, slider.classList.contains("slow") ? 8000 : 4500);
  });
}

/* ===============================
   SCROLL VERS DÉTAIL
=============================== */
function scrollToExcursionDetail(name){

  const details = document.querySelectorAll(".exc-detail");
  if(!details.length) return;

  const key = name.toLowerCase().split(" ")[0];

  for(const d of details){
    const h = d.querySelector("h3");
    if(h && h.textContent.toLowerCase().includes(key)){

      const header = document.getElementById("mainHeader");
      const offset = header ? header.offsetHeight + 15 : 0;

      const y =
        d.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({ top:y, behavior:"smooth" });
      break;
    }
  }
}

/* ===============================
   CLIC IMAGE → DÉTAIL
=============================== */
function initExcursionClicks(){

  document.querySelectorAll(".exc-slider[data-excursion]").forEach(slider=>{

    const name = slider.dataset.excursion;
    if(!name) return;

    slider.querySelectorAll("img").forEach(img=>{
      img.style.cursor = "pointer";
      img.addEventListener("click", ()=>{
        scrollToExcursionDetail(name);
      });
    });
  });
}



/* ===============================
   INIT GLOBAL
=============================== */
document.addEventListener("DOMContentLoaded", ()=>{

  /* Langue */
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);

  /* Sliders */
  initExcursionSliders();

  /* Click images */
  initExcursionClicks();

});


/* ===============================
   SHAKE MENU
=============================== */
setInterval(() => {
  document.querySelectorAll("#mainHeader nav a").forEach(btn => {
    btn.classList.add("menu-shake");
    setTimeout(() => btn.classList.remove("menu-shake"), 600);
  });
}, 3500);


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
