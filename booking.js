const copy = {
  en: {
    chooseRoom: "Choose a room to see your estimate",
    chooseDates: "Choose your dates to see your estimate",
    selectStay: "Choose this stay",
    selected: "Selected",
    perNight: "/ night",
    nights: "nights",
    oneNight: "night",
    guests: "guests",
    guest: "guest",
    fits: "Fits up to",
    exceedsCapacity: "This stay accommodates up to",
    maxNights: "Choose a stay of 30 nights or fewer.",
    invalidDates: "Choose a check-out date after check-in.",
    checkIn: "Check-in",
    checkOut: "Check-out",
    confirmation: "Demo request saved",
    confirmationIntro: "This is a local preview only. Your request was not sent to Marceline and no room was booked.",
    reference: "Request reference",
    noCharge: "No payment has been taken.",
    savedBookings: "Saved in this browser only. Contact the hotel to make a real reservation.",
    storageError: "Your request could not be saved in this browser. Please try again or contact the hotel directly.",
    invalidSaved: "Saved reservation requests could not be read. You can still submit a new request.",
    missingStay: "Please choose a room before continuing.",
    bookingError: "Please check your dates, guest count, and contact details."
  },
  fr: {
    chooseRoom: "Choisissez une chambre pour voir le montant estimé",
    chooseDates: "Choisissez vos dates pour voir le montant estimé",
    selectStay: "Choisir ce séjour",
    selected: "Sélectionné",
    perNight: "/ nuit",
    nights: "nuits",
    oneNight: "nuit",
    guests: "personnes",
    guest: "personne",
    fits: "Jusqu’à",
    exceedsCapacity: "Cette chambre peut accueillir au maximum",
    maxNights: "Votre séjour ne peut pas dépasser 30 nuits.",
    invalidDates: "Choisissez une date de départ après votre arrivée.",
    checkIn: "Arrivée",
    checkOut: "Départ",
    confirmation: "Demande de démonstration enregistrée",
    confirmationIntro: "Cette démo est locale. Votre demande n’a pas été transmise à Marceline et aucune chambre n’a été réservée.",
    reference: "Référence de la demande",
    noCharge: "Aucun paiement n’a été prélevé.",
    savedBookings: "Enregistrée uniquement dans ce navigateur. Contactez l’hôtel pour effectuer une vraie réservation.",
    storageError: "Impossible d’enregistrer votre demande dans ce navigateur. Veuillez réessayer ou contacter directement l’hôtel.",
    invalidSaved: "Les demandes enregistrées n’ont pas pu être lues. Vous pouvez tout de même envoyer une nouvelle demande.",
    missingStay: "Veuillez choisir une chambre avant de continuer.",
    bookingError: "Vérifiez les dates, le nombre de voyageurs et vos coordonnées."
  }
};

const stays = {
  "riad-suite": { name: { en: "The Riad Suite", fr: "La Suite Riad" }, price: 220, capacity: 2 },
  "garden-residence": { name: { en: "The Garden Residence", fr: "La Résidence Jardin" }, price: 390, capacity: 4 },
  "courtyard-retreat": { name: { en: "The Courtyard Retreat", fr: "L’Écrin du Patio" }, price: 280, capacity: 2 }
};

const language = document.body.dataset.language === "fr" ? "fr" : "en";
const text = copy[language];
const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const guestSelect = document.querySelector("#guest-count");
const estimateLabel = document.querySelector("#estimate-label");
const estimateTotal = document.querySelector("#estimate-total");
const continueButton = document.querySelector("#booking-continue");
const bookingDialog = document.querySelector("#booking-dialog");
const bookingForm = document.querySelector("#booking-form");
const bookingNotice = document.querySelector("#booking-toast");
const bookingStorageKey = "marceline-stay-requests-v1";

let selectedStay = "";
let bookingNoticeTimer;
let storageWarning = "";

function localDateString(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

function showNotice(message) {
  bookingNotice.textContent = message;
  bookingNotice.classList.add("show");
  window.clearTimeout(bookingNoticeTimer);
  bookingNoticeTimer = window.setTimeout(() => bookingNotice.classList.remove("show"), 5000);
}

function nightsBetween(checkIn, checkOut) {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  return Math.round((end - start) / 86400000);
}

function formatMoney(amount) {
  return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(language === "fr" ? "fr-FR" : "en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function currentQuote() {
  if (!selectedStay) return null;
  const nights = nightsBetween(checkInInput.value, checkOutInput.value);
  const guests = Number(guestSelect.value);
  const stay = stays[selectedStay];
  if (!Number.isInteger(nights) || nights < 1 || nights > 30 || guests > stay.capacity) return null;
  return { stayId: selectedStay, name: stay.name[language], guests, nights, pricePerNight: stay.price, total: stay.price * nights };
}

function updateQuote() {
  const stay = stays[selectedStay];
  const selectedGuests = Number(guestSelect.value);
  for (const option of guestSelect.options) {
    option.disabled = Boolean(stay && Number(option.value) > stay.capacity);
  }
  if (stay && selectedGuests > stay.capacity) {
    guestSelect.value = String(stay.capacity);
  }

  const nights = nightsBetween(checkInInput.value, checkOutInput.value);
  const checkoutIsValid = Number.isInteger(nights) && nights >= 1 && nights <= 30;
  const guestCountIsValid = !stay || Number(guestSelect.value) <= stay.capacity;
  continueButton.disabled = !selectedStay || !checkoutIsValid || !guestCountIsValid;

  if (!selectedStay) {
    estimateLabel.textContent = text.chooseRoom;
    estimateTotal.textContent = "—";
  } else if (!checkoutIsValid) {
    estimateLabel.textContent = nights > 30 ? text.maxNights : text.invalidDates;
    estimateTotal.textContent = `${formatMoney(stay.price)} ${text.perNight}`;
  } else {
    estimateLabel.textContent = `${nights} ${nights === 1 ? text.oneNight : text.nights} · ${formatMoney(stay.price)} ${text.perNight}`;
    estimateTotal.textContent = formatMoney(stay.price * nights);
  }
}

function readBookingRequests() {
  try {
    const stored = window.localStorage.getItem(bookingStorageKey);
    if (!stored) return [];
    const requests = JSON.parse(stored);
    const valid = Array.isArray(requests) && requests.every(request =>
      request && typeof request.id === "string" && typeof request.name === "string"
      && typeof request.email === "string" && typeof request.stayId === "string"
      && typeof request.checkIn === "string" && typeof request.checkOut === "string"
      && typeof request.guests === "number" && typeof request.total === "number"
    );
    if (!valid) throw new Error("Saved booking requests have an unexpected format.");
    return requests;
  } catch (error) {
    storageWarning = text.invalidSaved;
    console.error("Unable to read saved Marceline booking requests.", error);
    return [];
  }
}

let bookingRequests = readBookingRequests();

function selectStay(stayId) {
  if (!Object.hasOwn(stays, stayId)) return;
  selectedStay = stayId;
  document.querySelectorAll("[data-stay-card]").forEach(card => {
    const selected = card.dataset.stayCard === stayId;
    card.classList.toggle("selected", selected);
    const button = card.querySelector("[data-select-stay]");
    button.setAttribute("aria-pressed", String(selected));
    button.querySelector("span").textContent = selected ? "✓" : "→";
    button.firstChild.textContent = `${selected ? text.selected : text.selectStay} `;
  });
  updateQuote();
  document.querySelector("#booking-details").scrollIntoView({ behavior: "smooth", block: "center" });
}

function showConfirmation(request) {
  const section = document.querySelector("#booking-confirmation");
  section.hidden = false;
  section.querySelector("[data-confirmation-title]").textContent = text.confirmation;
  section.querySelector("[data-confirmation-intro]").textContent = text.confirmationIntro;
  section.querySelector("[data-confirmation-reference]").textContent = `${text.reference}: ${request.id}`;
  section.querySelector("[data-confirmation-no-charge]").textContent = text.noCharge;
  section.querySelector("[data-confirmation-saved]").textContent = text.savedBookings;
  section.focus({ preventScroll: true });
  section.scrollIntoView({ behavior: "smooth", block: "center" });
}

const today = localDateString(new Date());
checkInInput.min = today;
checkInInput.value = addDays(today, 1);
checkOutInput.min = addDays(checkInInput.value, 1);
checkOutInput.value = addDays(checkInInput.value, 2);
estimateLabel.textContent = text.chooseRoom;

document.querySelectorAll("[data-select-stay]").forEach(button => {
  button.addEventListener("click", () => selectStay(button.dataset.selectStay));
});

checkInInput.addEventListener("change", () => {
  checkOutInput.min = addDays(checkInInput.value, 1);
  if (checkOutInput.value <= checkInInput.value) {
    checkOutInput.value = checkOutInput.min;
  }
  updateQuote();
});
checkOutInput.addEventListener("change", updateQuote);
guestSelect.addEventListener("change", updateQuote);

continueButton.addEventListener("click", () => {
  const quote = currentQuote();
  if (!quote) {
    showNotice(selectedStay ? text.bookingError : text.missingStay);
    return;
  }
  document.querySelector("#checkout-summary").innerHTML = `
    <div><span>${quote.name}</span><strong>${formatMoney(quote.total)}</strong></div>
    <p>${text.checkIn}: ${formatDate(checkInInput.value)} · ${text.checkOut}: ${formatDate(checkOutInput.value)}</p>
    <p>${quote.guests} ${quote.guests === 1 ? text.guest : text.guests} · ${quote.nights} ${quote.nights === 1 ? text.oneNight : text.nights}</p>`;
  bookingDialog.showModal();
});

document.querySelectorAll(".close-dialog").forEach(button => {
  button.addEventListener("click", () => bookingDialog.close());
});
bookingDialog.addEventListener("click", event => {
  if (event.target === bookingDialog) bookingDialog.close();
});

bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  const quote = currentQuote();
  if (!quote || !bookingForm.reportValidity()) {
    showNotice(text.bookingError);
    return;
  }
  const request = {
    id: `M-${Date.now().toString(36).toUpperCase()}`,
    name: bookingForm.elements.guest.value.trim(),
    email: bookingForm.elements.email.value.trim(),
    ...quote,
    checkIn: checkInInput.value,
    checkOut: checkOutInput.value,
    status: "pending"
  };
  if (!request.name || !request.email) {
    showNotice(text.bookingError);
    return;
  }
  try {
    bookingRequests.push(request);
    window.localStorage.setItem(bookingStorageKey, JSON.stringify(bookingRequests));
  } catch (error) {
    bookingRequests = bookingRequests.filter(item => item.id !== request.id);
    console.error("Unable to save the Marceline stay request.", error);
    showNotice(text.storageError);
    return;
  }
  bookingForm.reset();
  bookingDialog.close();
  showConfirmation(request);
});

if (storageWarning) showNotice(storageWarning);
