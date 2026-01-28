/* =====================================================
   SCRIPT INTERVILLES – VERSION STABLE FINALE
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

/* ==================================
   WHATSAPP FR / EN — INTERVILLES
================================== */

document.addEventListener("DOMContentLoaded", () => {

  const CONFIG = {
    fr: {
      phone: "33746353660",
      display: "+33 7 46 35 36 60",
      message: "Bonjour, je souhaite réserver un transfert interville avec MasterTripTransfers"
    },
    en: {
      phone: "447463559086",
      display: "+44 7463 559086",
      message: "Hello, I would like to book an intercity transfer with MasterTripTransfers"
    }
  };

  function updateWhatsApp() {
    const lang = document.documentElement.lang === "fr" ? "fr" : "en";
    const data = CONFIG[lang];
    const url = `https://wa.me/${data.phone}?text=${encodeURIComponent(data.message)}`;

    const waLabel = document.getElementById("waLabel");
    if (waLabel) waLabel.href = url;

    const floatBtn = document.getElementById("whatsappFloat");
    if (floatBtn) floatBtn.href = url;

    const footerBtn = document.getElementById("footerWhatsapp");
    if (footerBtn) footerBtn.href = url;

    const num = document.getElementById("waNumber");
    if (num) num.textContent = data.display;
  }

  updateWhatsApp();

  new MutationObserver(updateWhatsApp).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
});
