/* ================= LANG ================= */
let lang = localStorage.getItem("lang") || "FR";

function translateTexts() {
  document.querySelectorAll("[data-fr]").forEach(el => {
    el.textContent = (lang === "EN" && el.dataset.en)
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
  flag.src = lang === "FR"
    ? "https://flagcdn.com/w40/gb.png"
    : "https://flagcdn.com/w40/fr.png";
}

/* ================= SLIDERS ================= */
document.querySelectorAll(".exc-slider.auto.fast").forEach(slider=>{
  let i = 0;
  setInterval(()=>{
    i++;
    if(i >= slider.children.length) i = 0;
    slider.scrollTo({
      left: slider.clientWidth * i,
      behavior: "smooth"
    });
  }, 5000);
});

document.querySelectorAll(".exc-slider.auto.slow").forEach(slider=>{
  let i = 0;
  setInterval(()=>{
    i++;
    if(i >= slider.children.length) i = 0;
    slider.scrollTo({
      left: slider.clientWidth * i,
      behavior: "smooth"
    });
  }, 8000);
});

/* ================= SCROLL DETAIL ================= */
function scrollToExcursionDetail(name){
  const details = document.querySelectorAll("#excursionDetails .exc-detail");

  for(const d of details){
    const h = d.querySelector("h3");
    if(h && h.textContent.toLowerCase().includes(name.toLowerCase().split(" ")[0])){
      const header = document.getElementById("mainHeader");
      const y = d.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 10;
      window.scrollTo({ top: y, behavior: "smooth" });
      break;
    }
  }
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", ()=>{
  translateTexts();
  updateLangFlag();
});
