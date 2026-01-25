/* =====================================================
   SCRIPT EXCURSIONS – VERSION STABLE
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

    // Éléments autorisés à contenir du HTML
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
   SLIDERS AUTO (EXCURSIONS)
=============================== */
document.querySelectorAll(".exc-slider.auto.fast").forEach(slider => {
  let i = 0;
  setInterval(() => {
    i++;
    if (i >= slider.children.length) i = 0;
    slider.scrollTo({
      left: slider.clientWidth * i,
      behavior: "smooth"
    });
  }, 5000);
});

document.querySelectorAll(".exc-slider.auto.slow").forEach(slider => {
  let i = 0;
  setInterval(() => {
    i++;
    if (i >= slider.children.length) i = 0;
    slider.scrollTo({
      left: slider.clientWidth * i,
      behavior: "smooth"
    });
  }, 8000);
});

/* ===============================
   SCROLL DÉTAIL EXCURSION
=============================== */
function scrollToExcursionDetail(name) {
  const details = document.querySelectorAll(".exc-detail");

  for (const d of details) {
    const h = d.querySelector("h3");
    if (
      h &&
      h.textContent.toLowerCase().includes(
        name.toLowerCase().split(" ")[0]
      )
    ) {
      const header = document.getElementById("mainHeader");
      const y =
        d.getBoundingClientRect().top +
        window.pageYOffset -
        (header ? header.offsetHeight : 0) -
        15;

      window.scrollTo({ top: y, behavior: "smooth" });
      break;
    }
  }
}

/* ===============================
   RÉSERVER → REDIRECTION INDEX
=============================== */
function openExcursion(excursionName) {
  const url =
    "index.html?service=excursion&circuit=" +
    encodeURIComponent(excursionName);
  window.location.href = url;
}

/* ===============================
   SHAKE MENU
=============================== */
setInterval(() => {
  document
    .querySelectorAll("#mainHeader nav a")
    .forEach(btn => {
      btn.classList.add("menu-shake");
      setTimeout(() => btn.classList.remove("menu-shake"), 600);
    });
}, 3500);

/* ===============================
   INIT LANGUE (DOM PRÊT)
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || LANG_DEFAULT;
  setLang(lang);
});

/* ===============================
   AFFICHAGE PAGE (ANTI BLANC)
=============================== */
window.addEventListener("load", () => {
  document.body.classList.add("lang-ready");
});

/* ===============================
   SHAKE BOUTON BAS
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    const btn = document.getElementById("bookNowBtn");
    if (!btn) return;

    btn.classList.remove("btn-shake");
    void btn.offsetWidth;
    btn.classList.add("btn-shake");
  }, 4000);
});
