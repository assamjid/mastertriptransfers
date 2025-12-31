// ================= DATE & HEURE PAR DÉFAUT =================
const today = new Date().toISOString().split("T")[0];
date.value = today;
date.min = today;
heure.value = "07:00";

// ================= AFFICHAGE DES SERVICES =================
service.onchange = () => {
  depart.style.display = arrivee.style.display = "none";
  intervillesFields.style.display =
    circuitsFields.style.display =
    airportFields.style.display = "none";

  if (service.value === "Transferts Aéroport") {
    depart.style.display = arrivee.style.display = "block";
    airportFields.style.display = "flex";
  }

  if (service.value === "Transport Intervilles") {
    intervillesFields.style.display = "flex";
  }

  if (service.value === "Circuits & Excursions") {
    circuitsFields.style.display = "flex";
  }
};

// ================= PRIX INTERVILLES =================
const basePrices = {
  "Agadir / Taghazout vers Marrakech": { base: 125, extra: 25 },
  "Agadir / Taghazout vers Essaouira": { base: 110, extra: 18 },
  "Agadir / Taghazout vers Taroudant": { base: 90, extra: 15 },
  "Agadir / Taghazout vers Casablanca": { base: 270, extra: 30 },
  "Agadir / Taghazout vers Rabat": { base: 400, extra: 35 },
  "Agadir / Taghazout vers Fès": { base: 550, extra: 40 },
  "Agadir / Taghazout vers Tanger": { base: 650, extra: 50 },
  "Marrakech vers Agadir / Taghazout": { base: 125, extra: 30 },
  "Essaouira vers Agadir / Taghazout": { base: 110, extra: 18 },
  "Taroudant vers Agadir / Taghazout": { base: 90, extra: 15 },
  "Casablanca vers Agadir / Taghazout": { base: 270, extra: 30 },
  "Rabat vers Agadir / Taghazout": { base: 400, extra: 35 },
  "Fès vers Agadir / Taghazout": { base: 550, extra: 40 },
  "Tanger vers Agadir / Taghazout": { base: 650, extra: 50 }
};

trajet.onchange = places.onchange = () => {
  if (trajet.value && places.value) {
    const { base, extra } = basePrices[trajet.value];
    prix.value = base + (places.value > 5 ? (places.value - 5) * extra : 0) + " €";
  } else {
    prix.value = "";
  }
};

// ================= PRIX CIRCUITS =================
const circuitPrices = {
  "Paradise Valley": { base: 70, extra: 5 },
  "Tour de ville d'Agadir": { base: 50, extra: 5 },
  "Souk Al Had Agadir": { base: 50, extra: 5 },
  "CrocoParc": { base: 50, extra: 5 },
  "Kasbah Agadir": { base: 50, extra: 5 },
  "Timlaline": { base: 70, extra: 5 }
};

circuit.onchange = circuitPlaces.onchange = () => {
  if (circuit.value && circuitPlaces.value) {
    const { base, extra } = circuitPrices[circuit.value];
    circuitPrix.value =
      base + (circuitPlaces.value > 5 ? (circuitPlaces.value - 5) * extra : 0) + " €";
  } else {
    circuitPrix.value = "";
  }
};

// ================= VALIDATION =================
const check = (field, errorId) => {
  if (!field.value.trim()) {
    const err = document.getElementById(errorId);
    err.style.display = "block";
    field.classList.add("field-error");
    field.focus();

    // vibration mobile
    if (navigator.vibrate) navigator.vibrate(80);

    return false;
  }
  return true;
};

// ================= DISPARITION AUTO DES BULLES =================
document.querySelectorAll("input, select, textarea").forEach(field => {
  field.addEventListener("input", () => {
    const error = field.nextElementSibling;
    if (error && error.classList.contains("error")) {
      error.style.display = "none";
      field.classList.remove("field-error");
    }
  });
});

// ================= ENVOI WHATSAPP + EMAIL =================
submitBtn.onclick = () => {

  document.querySelectorAll(".error").forEach(e => e.style.display = "none");
  document.querySelectorAll(".field-error").forEach(f => f.classList.remove("field-error"));

  if (!check(nom, "err-nom")) return;
  if (!check(tel, "err-tel")) return;
  if (!check(email, "err-email")) return;
  if (!check(service, "err-service")) return;

  if (service.value === "Transferts Aéroport") {
    if (!check(depart, "err-depart")) return;
    if (!check(arrivee, "err-arrivee")) return;
    if (!check(airportPlaces, "err-airportPlaces")) return;
  }

  if (service.value === "Transport Intervilles") {
    if (!check(trajet, "err-trajet")) return;
    if (!check(places, "err-places")) return;
  }

  if (service.value === "Circuits & Excursions") {
    if (!check(circuit, "err-circuit")) return;
    if (!check(circuitPlaces, "err-circuitPlaces")) return;
  }

  if (!check(date, "err-date")) return;
  if (!check(heure, "err-heure")) return;

  let text = `🚐 Nouvelle réservation – MasterTripTransfers\n\n`;
  text += `👤 Nom : ${nom.value}\n`;
  text += `📞 Téléphone : +${countryCode.value} ${tel.value}\n`;
  text += `📧 Email : ${email.value}\n`;
  text += `🛎️ Service : ${service.value}\n\n`;

  if (service.value === "Transferts Aéroport") {
    text += `✈️ Départ : ${depart.value}\n`;
    text += `📍 Arrivée : ${arrivee.value}\n`;
    text += `👥 Places : ${airportPlaces.value}\n`;
    if (flightNumber.value) text += `🛫 Vol : ${flightNumber.value}\n`;
  }

  if (service.value === "Transport Intervilles") {
    text += `🛣️ Trajet : ${trajet.value}\n`;
    text += `👥 Places : ${places.value}\n`;
    text += `💰 Prix : ${prix.value}\n`;
  }

  if (service.value === "Circuits & Excursions") {
    text += `🌄 Circuit : ${circuit.value}\n`;
    text += `👥 Places : ${circuitPlaces.value}\n`;
    text += `💰 Prix : ${circuitPrix.value}\n`;
  }

  text += `\n📅 Date : ${date.value}\n`;
  text += `⏰ Heure : ${heure.value}\n`;

  if (message.value) text += `\n📝 Message : ${message.value}\n`;

  window.open(
    "https://api.whatsapp.com/send?phone=212691059759&text=" +
      encodeURIComponent(text),
    "_blank"
  );

  window.open(
    "mailto:mastertrip2030@gmail.com?subject=Nouvelle réservation&body=" +
      encodeURIComponent(text)
  );
};
