/* =====================================================
   LANGUE FR / EN
===================================================== */
let lang = localStorage.getItem("lang") || "FR";

function translateTexts(){
  document.querySelectorAll("[data-fr]").forEach(el=>{
    el.innerHTML = (lang === "EN" && el.dataset.en)
      ? el.dataset.en
      : el.dataset.fr;
  });
}

function toggleLang(){
  lang = (lang === "FR") ? "EN" : "FR";
  localStorage.setItem("lang", lang);
  translateTexts();
  updateLangFlag();
}

function updateLangFlag(){
  const flag = document.getElementById("langFlagBtn");
  if(!flag) return;

  flag.src = lang === "FR"
    ? "https://flagcdn.com/w40/gb.png"
    : "https://flagcdn.com/w40/fr.png";
}

/* =====================================================
   SLIDER FADE AUTO (🔥 COMPATIBLE CSS)
===================================================== */
function initFadeSliders(){

  document.querySelectorAll(".exc-slider").forEach(slider=>{
    const images = slider.querySelectorAll("img");
    if(images.length < 2) return;

    let index = 0;

    // init
    images.forEach(img => img.classList.remove("active"));
    images[0].classList.add("active");

    setInterval(()=>{
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, slider.classList.contains("slow") ? 8000 : 5000);
  });

}

/* =====================================================
   SCROLL → DÉTAIL EXCURSION
===================================================== */
function scrollToExcursionDetail(name){

  const details = document.querySelectorAll("#excursionDetails .exc-detail");

  for(const d of details){
    const h = d.querySelector("h3");
    if(!h) continue;

    if(h.textContent.toLowerCase().includes(
      name.toLowerCase().split(" ")[0]
    )){
      const header = document.getElementById("mainHeader");
      const offset = header ? header.offsetHeight + 15 : 0;

      const y = d.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top:y, behavior:"smooth" });
      break;
    }
  }
}

/* =====================================================
   INIT
===================================================== */
document.addEventListener("DOMContentLoaded", ()=>{
  translateTexts();
  updateLangFlag();
  initFadeSliders();
});
