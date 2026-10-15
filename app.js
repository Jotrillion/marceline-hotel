const initialArrivals = [
  { name: "Sofia Laurent", detail: "Anniversary · Returning guest", room: "208", stay: "3 nights", status: "Expected", initials: "SL", tone: "" },
  { name: "Youssef Benali", detail: "2 guests · Garden view", room: "314", stay: "5 nights", status: "Checked in", initials: "YB", tone: "avatar-peach" },
  { name: "Amina El Idrissi", detail: "Birthday · Suite upgrade", room: "312", stay: "2 nights", status: "Checked in", initials: "AE", tone: "avatar-blue" },
  { name: "Oliver Martin", detail: "1 guest · Business", room: "106", stay: "1 night", status: "Expected", initials: "OM", tone: "avatar-gold" }
];

const today = new Date();
const localDateValue = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const isFrench = document.documentElement.lang === "fr";
const frenchPhrases = {
  "Anniversary · Returning guest": "Anniversaire de mariage · Client fidèle",
  "2 guests · Garden view": "2 personnes · Vue sur le jardin",
  "Birthday · Suite upgrade": "Anniversaire · Surclassement en suite",
  "1 guest · Business": "1 personne · Séjour professionnel",
  "Expected": "Attendue",
  "Checked in": "Arrivée enregistrée",
  " checked in to room ": " est arrivée en chambre ",
  ". Welcome to Maselyne.": ". Bienvenue chez Marceline.",
  "Check in": "Enregistrer l’arrivée",
  "Scheduled": "Planifiée",
  "No reservations yet. Add your first guest to get started.": "Aucune réservation. Ajoutez votre premier client pour commencer.",
  "No arrivals expected today.": "Aucune arrivée prévue aujourd’hui.",
  "expected soon": "attendues prochainement",
  "checked in": "arrivées enregistrées",
  "pending": "attendues",
  "arrivals still expected today": "arrivées encore attendues aujourd’hui",
  "bookings on file": "réservations enregistrées",
  "Reservation schedule": "Planning des réservations",
  "New reservation": "Nouvelle réservation",
  "GUEST": "CLIENT",
  "ROOM": "CHAMBRE",
  "ARRIVAL": "ARRIVÉE",
  "STATUS": "STATUT",
  "ACTION": "ACTION",
  "No reservations yet. Add your first guest to get started.": "Aucune réservation. Ajoutez votre premier client pour commencer.",
  "LIVE ROOM BOARD": "ÉTAT DES CHAMBRES EN DIRECT",
  "Every room, at a glance": "Toutes les chambres en un coup d’œil",
  "Occupied": "Occupée",
  "Ready": "Prête",
  "Needs attention": "À préparer",
  "Room ": "Chambre ",
  "Turn-down requested": "Service de soirée demandé",
  "Garden room": "Chambre avec jardin",
  "Deluxe king": "Chambre deluxe, lit king size",
  "Riad suite": "Suite riad",
  "Deluxe twin": "Chambre deluxe, lits jumeaux",
  "Terrace suite": "Suite avec terrasse",
  "Garden suite": "Suite avec jardin",
  "Ready for arrival": "Prête pour l’arrivée",
  "Being prepared": "En préparation",
  "View arrival details": "Voir les détails d’arrivée",
  "Updated just now": "Mise à jour à l’instant",
  "Guest directory": "Répertoire de la clientèle",
  "Personal touches, made easy": "Des attentions personnalisées, en toute simplicité",
  "guest profiles": "profils clients",
  "Arrives ": "Arrivée le ",
  "Guest profiles will appear here when reservations are added.": "Les profils clients apparaîtront ici dès l’ajout de réservations.",
  "Today’s room preparations": "Préparation des chambres aujourd’hui",
  "tasks need attention": "tâches à effectuer",
  " of ": " sur ",
  " complete": " terminées",
  "Reopen": "Rouvrir",
  "Complete": "Terminer",
  "task": "la tâche",
  "Final inspection": "Inspection finale",
  "Prepare for arrival": "Préparer pour l’arrivée",
  "Occupancy this week": "Taux d’occupation cette semaine",
  "Rooms occupied by day": "Chambres occupées par jour",
  "vs last week": "par rapport à la semaine dernière",
  "MON": "LUN",
  "TUE": "MAR",
  "WED": "MER",
  "THU": "JEU",
  "FRI": "VEN",
  "SAT": "SAM",
  "SUN": "DIM",
  "+6.2%": "+6,2 %",
  "€54,280": "54 280 €",
  "↗ 12.8%": "↗ 12,8 %",
  "7:30 pm": "19 h 30",
  "9:42 am": "09 h 42",
  "9:18 am": "09 h 18",
  "8:56 am": "08 h 56",
  "THIS WEEK": "CETTE SEMAINE",
  "Room and experience revenue": "Revenus des chambres et expériences",
  "compared with last week": "par rapport à la semaine dernière",
  "GUEST HAPPINESS": "SATISFACTION CLIENT",
  "From 86 recent reviews": "Sur 86 avis récents",
  "Moments that matter": "Les moments qui comptent",
  "Personal touches across your hotel today": "Des attentions personnalisées dans votre hôtel aujourd’hui",
  "thoughtful moments": "attentions particulières",
  "Welcome amenity delivered": "Cadeau de bienvenue livré",
  "Anniversary noted": "Anniversaire de mariage signalé",
  "Consider a personalized welcome": "Prévoir un accueil personnalisé",
  "Garden table reserved": "Table au jardin réservée",
  "For the Benali family": "Pour la famille Benali",
  "Maselyne Intelligence": "Intelligence Marceline",
  "Three guests are celebrating anniversaries today. A small surprise could make their stay unforgettable.": "Trois clients célèbrent leur anniversaire de mariage aujourd’hui. Une petite surprise pourrait rendre leur séjour inoubliable.",
  "A warm welcome starts with knowing who’s arriving.": "Un accueil chaleureux commence par bien connaître ses arrivées.",
  "Every room, its status, and what needs attention.": "L’état de chaque chambre et les interventions à prévoir.",
  "Personal details that make every stay feel special.": "Les petites attentions qui rendent chaque séjour unique.",
  "A thoughtful turn-down, a perfectly prepared room.": "Un service attentionné et une chambre parfaitement préparée.",
  "A clearer view of how your hotel is thriving.": "Une vision claire de la performance de votre hôtel.",
  "The little moments guests remember long after checkout.": "Les petites attentions dont vos clients se souviennent.",
  "Your hotel, thoughtfully in sync.": "Votre hôtel, orchestré avec attention.",
  "Here’s what’s happening at your hotel today.": "Voici les actualités de votre hôtel aujourd’hui.",
  "Good morning": "Bonjour",
  "Good afternoon": "Bon après-midi",
  "Good evening": "Bonsoir",
  "Welcome to Maselyne.": "Bienvenue chez Marceline.",
  "New reservation · Welcome to Maselyne": "Nouvelle réservation · Bienvenue chez Marceline",
  "Stay details pending": "Détails du séjour à confirmer",
  "housekeeping task": "tâche d’entretien",
  "completed": "terminée",
  "reopened": "rouverte",
  "You’re all caught up. No new notifications.": "Vous êtes à jour. Aucune nouvelle notification.",
  "Showing today’s guests. Three are celebrating an anniversary.": "Voici les clients du jour. Trois célèbrent leur anniversaire de mariage.",
  "Room 208 is ready for Sofia Laurent’s early check-in.": "La chambre 208 est prête pour l’arrivée anticipée de Sofia Laurent.",
  "Room 208 is ready for an early check-in.": "La chambre 208 est prête pour une arrivée anticipée.",
  "Reservation created for ": "Réservation créée pour ",
  " in room ": " en chambre ",
  "Anniversary noted": "Anniversaire de mariage signalé",
  "Occupancy": "Taux d’occupation",
  "Reservations": "Réservations",
  "Rooms": "Chambres",
  "Guests": "Clientèle",
  "Housekeeping": "Entretien",
  "Analytics": "Analyses",
  "Guest experience": "Expérience client",
  "Overview": "Vue d’ensemble"
};

function localize(value) {
  if (!isFrench) return value;
  return Object.entries(frenchPhrases)
    .sort(([left], [right]) => right.length - left.length)
    .reduce((text, [english, french]) => text.split(english).join(french), value);
}

let arrivals = initialArrivals.map(guest => ({ ...guest, arrivalDate: localDateValue }));
let activeView = "Overview";
let toastTimer;
const rooms = [
  { number: "104", type: "Garden room", status: "Turn-down requested", tone: "pending" },
  { number: "106", type: "Deluxe king", status: "Occupied", tone: "occupied" },
  { number: "208", type: "Riad suite", status: "Ready for arrival", tone: "ready" },
  { number: "214", type: "Deluxe twin", status: "Being prepared", tone: "cleaning" },
  { number: "312", type: "Terrace suite", status: "Occupied", tone: "occupied" },
  { number: "314", type: "Garden suite", status: "Occupied", tone: "occupied" }
];
const housekeepingTasks = [
  { room: "Suite 312", task: "Ready for arrival", assignee: "YK", done: true },
  { room: "Suite 208", task: "Final inspection", assignee: "SA", done: false },
  { room: "Room 104", task: "Turn-down requested", assignee: "LM", done: false },
  { room: "Room 214", task: "Prepare for arrival", assignee: "YK", done: false }
];

const arrivalRows = document.querySelector("#arrival-rows");
const toast = document.querySelector("#toast");
const dialog = document.querySelector("#reservation-dialog");
const title = document.querySelector("#page-title");
const subtitle = document.querySelector("#page-subtitle");

document.querySelector("#today-label").textContent = today.toLocaleDateString(isFrench ? "fr-FR" : "en", { weekday: "short", month: "short", day: "numeric" });
document.querySelector("#greeting").textContent = today.toLocaleDateString(isFrench ? "fr-FR" : "en", { weekday: "long", month: "long", day: "numeric" }).toUpperCase();
document.querySelector("#reservation-form [name=date]").value = localDateValue;
document.querySelector("#reservation-form [name=date]").min = localDateValue;
title.innerHTML = `${localize(today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening")}, Amira <span class="wave">✳</span>`;

function announce(message) {
  toast.textContent = localize(message);
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function renderArrivals() {
  const todaysArrivals = arrivals.filter(guest => guest.arrivalDate === localDateValue);
  const visible = activeView === "Reservations" ? arrivals : todaysArrivals.slice(0, 4);
  arrivalRows.innerHTML = localize(visible.length ? visible.map((guest, index) => {
    const statusClass = guest.status === "Checked in" ? "checked-in" : "pending";
    const action = guest.status === "Expected"
      ? `<button class="row-action" data-check-in="${index}">Check in</button>`
      : `<span aria-hidden="true">···</span>`;
    return `<tr>
      <td><div class="guest-cell"><span class="guest-avatar ${guest.tone}">${escapeHtml(guest.initials)}</span><div><div class="guest-name">${escapeHtml(guest.name)}</div><div class="guest-detail">${escapeHtml(guest.detail)}</div></div></div></td>
      <td>${escapeHtml(guest.room)}</td><td>${escapeHtml(guest.stay)}</td>
      <td><span class="status-pill ${statusClass}">${escapeHtml(guest.status)}</span></td><td>${action}</td>
    </tr>`;
  }).join("") : `<tr><td colspan="5"><div class="empty-state">${activeView === "Reservations" ? "No reservations yet. Add your first guest to get started." : "No arrivals expected today."}</div></td></tr>`);
  document.querySelector("#reservation-count").textContent = arrivals.length;
  const expected = todaysArrivals.filter(item => item.status === "Expected").length;
  const checkedIn = todaysArrivals.length - expected;
  document.querySelector("#arrival-total").innerHTML = localize(`${todaysArrivals.length}<span class="trend neutral">${expected} expected soon</span>`);
  document.querySelector("#arrival-summary").textContent = localize(`${checkedIn} checked in · ${expected} pending`);
  document.querySelector("#arrival-footer-text").textContent = localize(`${expected} arrivals still expected today`);
  document.querySelector(".nav-item[data-view=\"Housekeeping\"] .nav-alert").textContent = housekeepingTasks.filter(task => !task.done).length;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function formatArrivalDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(isFrench ? "fr-FR" : "en", { month: "short", day: "numeric" });
}

function renderWorkspace(view) {
  const workspace = document.querySelector("#view-workspace");
  const guestRows = arrivals.map((guest, index) => `
    <tr><td><div class="guest-cell"><span class="guest-avatar ${guest.tone}">${escapeHtml(guest.initials)}</span><div><div class="guest-name">${escapeHtml(guest.name)}</div><div class="guest-detail">${escapeHtml(guest.detail)}</div></div></div></td>
    <td>${escapeHtml(guest.room)}</td><td>${escapeHtml(formatArrivalDate(guest.arrivalDate))}</td><td><span class="status-pill ${guest.status === "Checked in" ? "checked-in" : "pending"}">${escapeHtml(guest.status)}</span></td>
    <td>${guest.status === "Expected" && guest.arrivalDate <= localDateValue ? `<button class="row-action" data-check-in="${index}">Check in</button>` : guest.status === "Expected" ? "Scheduled" : "—"}</td></tr>`).join("");
  const views = {
    Reservations: `<section class="panel workspace-panel"><div class="panel-heading"><div><h2>Reservation schedule</h2><p>${arrivals.length} bookings on file</p></div><button class="primary-button workspace-add" data-add-reservation>＋ New reservation</button></div><div class="table-wrap"><table><thead><tr><th>GUEST</th><th>ROOM</th><th>ARRIVAL</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>${guestRows || '<tr><td colspan="5"><div class="empty-state">No reservations yet. Add your first guest to get started.</div></td></tr>'}</tbody></table></div></section>`,
    Rooms: `<div class="workspace-intro"><div><span class="eyebrow">LIVE ROOM BOARD</span><h2>Every room, at a glance</h2></div><span class="board-legend"><i class="legend-dot occupied"></i> Occupied <i class="legend-dot ready"></i> Ready <i class="legend-dot cleaning"></i> Needs attention</span></div><div class="room-grid">${rooms.map(room => `<article class="room-card"><div class="room-card-top"><span class="room-number">Room ${escapeHtml(room.number)}</span><span class="room-status ${room.tone}">${escapeHtml(room.status)}</span></div><p>${escapeHtml(room.type)}</p>${room.number === "208" ? '<button class="row-action" data-room-action="208">View arrival details</button>' : `<span class="room-updated">Updated just now</span>`}</article>`).join("")}</div>`,
    Guests: `<section class="panel workspace-panel"><div class="panel-heading"><div><h2>Guest directory</h2><p>Personal touches, made easy</p></div><span class="guest-count">${arrivals.length} guest profiles</span></div><div class="guest-card-grid">${arrivals.map(guest => `<article class="guest-card"><div class="guest-cell"><span class="guest-avatar ${guest.tone}">${escapeHtml(guest.initials)}</span><div><div class="guest-name">${escapeHtml(guest.name)}</div><div class="guest-detail">Room ${escapeHtml(guest.room)} · Arrives ${escapeHtml(formatArrivalDate(guest.arrivalDate))}</div></div></div><p>${escapeHtml(guest.detail)}</p><span class="status-pill ${guest.status === "Checked in" ? "checked-in" : "pending"}">${escapeHtml(guest.status)}</span></article>`).join("") || '<div class="empty-state">Guest profiles will appear here when reservations are added.</div>'}</div></section>`,
    Housekeeping: `<section class="panel workspace-panel"><div class="panel-heading"><div><h2>Today’s room preparations</h2><p>${housekeepingTasks.filter(task => !task.done).length} tasks need attention</p></div><span class="guest-count">${housekeepingTasks.filter(task => task.done).length} of ${housekeepingTasks.length} complete</span></div><div class="progress-track workspace-progress"><span style="width:${housekeepingTasks.filter(task => task.done).length / housekeepingTasks.length * 100}%"></span></div><div class="task-board">${housekeepingTasks.map((task, index) => `<div class="task-board-row"><button class="task-check ${task.done ? "checked" : ""}" data-task-done="${index}" aria-label="${task.done ? "Reopen" : "Complete"} ${escapeHtml(task.room)} task">${task.done ? "✓" : "·"}</button><div><strong>${escapeHtml(task.room)}</strong><span>${escapeHtml(task.task)}</span></div><span class="task-assignee">${escapeHtml(task.assignee)}</span></div>`).join("")}</div></section>`,
    Analytics: `<div class="analytics-grid"><section class="panel workspace-panel"><div class="panel-heading"><div><h2>Occupancy this week</h2><p>Rooms occupied by day</p></div><span class="guest-count">+6.2% vs last week</span></div><div class="analytics-chart">${[61, 74, 69, 82, 76, 91, 84].map((height, index) => `<div><span class="chart-value">${height}%</span><i style="height:${height}%"></i><small>${["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][index]}</small></div>`).join("")}</div></section><section class="panel analytics-highlight"><span class="eyebrow">THIS WEEK</span><strong>€54,280</strong><p>Room and experience revenue</p><span class="trend positive">↗ 12.8% compared with last week</span><hr><span class="eyebrow">GUEST HAPPINESS</span><strong>4.92 <small>/ 5</small></strong><p>From 86 recent reviews</p></section></div>`,
    "Guest experience": `<section class="panel workspace-panel"><div class="panel-heading"><div><h2>Moments that matter</h2><p>Personal touches across your hotel today</p></div><span class="guest-count">3 thoughtful moments</span></div><div class="experience-list experience-expanded"><div class="experience-item"><div class="experience-icon experience-green">♡</div><div><strong>Welcome amenity delivered</strong><span>Room 312 · Amina El Idrissi</span></div><time>9:42 am</time></div><div class="experience-item"><div class="experience-icon experience-peach">✳</div><div><strong>Anniversary noted</strong><span>Room 208 · Sofia Laurent · Consider a personalized welcome</span></div><time>9:18 am</time></div><div class="experience-item"><div class="experience-icon experience-gold">☼</div><div><strong>Garden table reserved</strong><span>For the Benali family · 7:30 pm</span></div><time>8:56 am</time></div></div><div class="experience-tip"><span class="sparkle">✳</span><span><strong>Maselyne Intelligence</strong><br>Three guests are celebrating anniversaries today. A small surprise could make their stay unforgettable.</span></div></section>`
  };
  workspace.innerHTML = localize(views[view] || "");
}

function setView(view) {
  activeView = view;
  const isOverview = view === "Overview";
  document.querySelector("#dashboard-content").hidden = !isOverview;
  document.querySelector("#view-workspace").hidden = isOverview;
  document.querySelectorAll(".nav-item[data-view]").forEach(button => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelector("#breadcrumb-current").textContent = localize(view);
  if (view === "Overview") {
    title.innerHTML = `${localize(today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening")}, Amira <span class="wave">✳</span>`;
    subtitle.textContent = localize("Here’s what’s happening at your hotel today.");
  } else {
    title.textContent = localize(view);
    const descriptions = {
      Reservations: "A warm welcome starts with knowing who’s arriving.",
      Rooms: "Every room, its status, and what needs attention.",
      Guests: "Personal details that make every stay feel special.",
      Housekeeping: "A thoughtful turn-down, a perfectly prepared room.",
      Analytics: "A clearer view of how your hotel is thriving.",
      "Guest experience": "The little moments guests remember long after checkout."
    };
    subtitle.textContent = localize(descriptions[view] || "Your hotel, thoughtfully in sync.");
  }
  if (!isOverview) renderWorkspace(view);
  renderArrivals();
  if (window.innerWidth <= 850) document.querySelector("#sidebar").classList.remove("open");
}

document.querySelectorAll(".nav-item[data-view]").forEach(button => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-open-view]").forEach(button => {
  button.addEventListener("click", () => setView(button.dataset.openView));
});

document.querySelector("#arrival-rows").addEventListener("click", event => {
  const button = event.target.closest("[data-check-in]");
  if (!button) return;
  const guest = arrivals[Number(button.dataset.checkIn)];
  if (!guest || guest.status !== "Expected") return;
  guest.status = "Checked in";
  renderArrivals();
  announce(`${guest.name} checked in to room ${guest.room}. Welcome to Maselyne.`);
});

document.querySelector("#view-workspace").addEventListener("click", event => {
  const checkInButton = event.target.closest("[data-check-in]");
  if (checkInButton) {
    const guest = arrivals[Number(checkInButton.dataset.checkIn)];
    if (!guest || guest.status !== "Expected") return;
    guest.status = "Checked in";
    renderWorkspace(activeView);
    renderArrivals();
    announce(`${guest.name} checked in to room ${guest.room}. Welcome to Maselyne.`);
    return;
  }
  const taskButton = event.target.closest("[data-task-done]");
  if (taskButton) {
    const task = housekeepingTasks[Number(taskButton.dataset.taskDone)];
    if (!task) return;
    task.done = !task.done;
    renderWorkspace(activeView);
    renderArrivals();
    announce(`${task.room} housekeeping task ${task.done ? "completed" : "reopened"}.`);
    return;
  }
  if (event.target.closest("[data-add-reservation]")) dialog.showModal();
  if (event.target.closest("[data-room-action]")) {
    setView("Reservations");
    announce("Room 208 is ready for Sofia Laurent’s early check-in.");
  }
});

document.querySelector("#add-reservation").addEventListener("click", () => dialog.showModal());
document.querySelectorAll(".close-dialog").forEach(button => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
document.querySelector("#reservation-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("guest")).trim();
  const room = String(data.get("room")).trim();
  const notes = String(data.get("notes")).trim();
  arrivals.unshift({
    name,
    detail: notes || "New reservation · Welcome to Maselyne",
    room,
    stay: "Stay details pending",
    arrivalDate: String(data.get("date")),
    status: "Expected",
    initials: name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase(),
    tone: ""
  });
  form.reset();
  form.elements.date.value = localDateValue;
  dialog.close();
  setView("Reservations");
  announce(`Reservation created for ${name} in room ${room}.`);
});

document.querySelector("#menu-toggle").addEventListener("click", () => document.querySelector("#sidebar").classList.toggle("open"));
document.querySelector("#notification-button").addEventListener("click", () => announce("You’re all caught up. No new notifications."));
document.querySelector("#insight-action").addEventListener("click", () => {
  setView("Guests");
  announce("Showing today’s guests. Three are celebrating an anniversary.");
});
document.querySelector("#room-callout-action").addEventListener("click", () => {
  setView("Rooms");
  announce("Room 208 is ready for an early check-in.");
});

renderArrivals();
