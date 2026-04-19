const STORAGE_KEY = "rm_club_site_v2";
const ADMIN_PASSWORD = "1234";

let isAdmin = false;
let lang = localStorage.getItem("rm_lang") || "ru";

const data = loadData();

const el = {
  players: document.getElementById("players"),
  transfers: document.getElementById("transfers"),
  news: document.getElementById("news"),
  schedule: document.getElementById("schedule"),

  playersCount: document.getElementById("playersCount"),
  transfersCount: document.getElementById("transfersCount"),
  newsCount: document.getElementById("newsCount"),
  scheduleCount: document.getElementById("scheduleCount"),

  search: document.getElementById("search"),

  modal: document.getElementById("modal"),
  pass: document.getElementById("pass"),
  loginBtn: document.getElementById("loginBtn"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  adminOpenBtn: document.getElementById("adminOpenBtn"),
  adminPanel: document.getElementById("adminPanel"),
  logoutBtn: document.getElementById("logoutBtn"),

  themeBtn: document.getElementById("themeBtn"),
  langBtn: document.getElementById("langBtn"),

  pname: document.getElementById("pname"),
  ppos: document.getElementById("ppos"),
  addPlayerBtn: document.getElementById("addPlayerBtn"),

  lpos: document.getElementById("lpos"),
  lname: document.getElementById("lname"),
  setLineupBtn: document.getElementById("setLineupBtn"),

  tname: document.getElementById("tname"),
  tfrom: document.getElementById("tfrom"),
  addTransferBtn: document.getElementById("addTransferBtn"),

  sname: document.getElementById("sname"),
  sdate: document.getElementById("sdate"),
  addMatchBtn: document.getElementById("addMatchBtn"),

  ntitle: document.getElementById("ntitle"),
  addNewsBtn: document.getElementById("addNewsBtn"),

  lw: document.getElementById("lw"),
  rw: document.getElementById("rw"),
  cm: document.getElementById("cm"),
  gk: document.getElementById("gk"),

  playersTitle: document.getElementById("playersTitle"),
  lineupTitle: document.getElementById("lineupTitle"),
  transfersTitle: document.getElementById("transfersTitle"),
  scheduleTitle: document.getElementById("scheduleTitle"),
  newsTitle: document.getElementById("newsTitle"),

  statPlayersLabel: document.getElementById("statPlayersLabel"),
  statTransfersLabel: document.getElementById("statTransfersLabel"),
  statNewsLabel: document.getElementById("statNewsLabel"),
  statMatchesLabel: document.getElementById("statMatchesLabel"),

  brandSubtitle: document.getElementById("brandSubtitle"),
  heroBadge: document.getElementById("heroBadge"),
  heroTitle: document.getElementById("heroTitle"),
  heroText: document.getElementById("heroText"),
  adminTitle: document.getElementById("adminTitle"),
  adminNote: document.getElementById("adminNote"),
  adminPlayersTitle: document.getElementById("adminPlayersTitle"),
  adminLineupTitle: document.getElementById("adminLineupTitle"),
  adminTransfersTitle: document.getElementById("adminTransfersTitle"),
  adminScheduleTitle: document.getElementById("adminScheduleTitle"),
  adminNewsTitle: document.getElementById("adminNewsTitle"),
  modalTitle: document.getElementById("modalTitle"),
  modalText: document.getElementById("modalText")
};

const dict = {
  ru: {
    players: "Игроки",
    lineup: "Состав",
    transfers: "Трансферы",
    schedule: "Расписание",
    news: "Новости",
    playersStat: "Игроки",
    transfersStat: "Трансферы",
    newsStat: "Новости",
    matchesStat: "Матчи",
    brandSubtitle: "Премиальный клубный сайт",
    heroBadge: "Hala Madrid",
    heroTitle: "Real Madrid",
    heroText: "Современный сайт клуба с красивым интерфейсом, полем состава, новостями, трансферами и удобной админкой.",
    adminTitle: "⚙️ Админ-панель",
    adminNote: "Добавляй, редактируй и удаляй всё",
    adminPlayers: "Игроки",
    adminLineup: "Состав",
    adminTransfers: "Трансферы",
    adminSchedule: "Расписание",
    adminNews: "Новости",
    modalTitle: "Вход в админку",
    modalText: "Введите пароль администратора",
    search: "Поиск игрока",
    emptyPlayers: "Игроков пока нет",
    emptyTransfers: "Трансферов пока нет",
    emptySchedule: "Матчей пока нет",
    emptyNews: "Новостей пока нет",
    invalidLogin: "Неверный пароль",
    invalidFields: "Заполни поля",
    invalidPos: "Допустимые позиции: lw, rw, cm, gk",
    edit: "Редактировать",
    del: "Удалить",
    fromClub: "Из клуба",
    date: "Дата",
    position: "Позиция"
  },
  en: {
    players: "Players",
    lineup: "Lineup",
    transfers: "Transfers",
    schedule: "Schedule",
    news: "News",
    playersStat: "Players",
    transfersStat: "Transfers",
    newsStat: "News",
    matchesStat: "Matches",
    brandSubtitle: "Premium club website",
    heroBadge: "Hala Madrid",
    heroTitle: "Real Madrid",
    heroText: "A modern club website with a beautiful interface, lineup field, news, transfers and a convenient admin panel.",
    adminTitle: "⚙️ Admin Panel",
    adminNote: "Add, edit and delete everything",
    adminPlayers: "Players",
    adminLineup: "Lineup",
    adminTransfers: "Transfers",
    adminSchedule: "Schedule",
    adminNews: "News",
    modalTitle: "Admin Login",
    modalText: "Enter the administrator password",
    search: "Search player",
    emptyPlayers: "No players yet",
    emptyTransfers: "No transfers yet",
    emptySchedule: "No matches yet",
    emptyNews: "No news yet",
    invalidLogin: "Wrong password",
    invalidFields: "Fill in the fields",
    invalidPos: "Allowed positions: lw, rw, cm, gk",
    edit: "Edit",
    del: "Delete",
    fromClub: "From club",
    date: "Date",
    position: "Position"
  }
};

function t(key) {
  return dict[lang][key] || key;
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      players: [],
      transfers: [],
      news: [],
      schedule: [],
      lineup: {
        lw: "",
        rw: "",
        cm: "",
        gk: ""
      }
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      players: Array.isArray(parsed.players) ? parsed.players : [],
      transfers: Array.isArray(parsed.transfers) ? parsed.transfers : [],
      news: Array.isArray(parsed.news) ? parsed.news : [],
      schedule: Array.isArray(parsed.schedule) ? parsed.schedule : [],
      lineup: {
        lw: parsed.lineup?.lw || "",
        rw: parsed.lineup?.rw || "",
        cm: parsed.lineup?.cm || "",
        gk: parsed.lineup?.gk || ""
      }
    };
  } catch {
    return {
      players: [],
      transfers: [],
      news: [],
      schedule: [],
      lineup: { lw: "", rw: "", cm: "", gk: "" }
    };
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  renderAll();
}

function renderAll() {
  renderPlayers();
  renderTransfers();
  renderSchedule();
  renderNews();
  renderLineup();
  renderStats();
  renderAdminState();
  applyLang();
}

function renderStats() {
  el.playersCount.textContent = data.players.length;
  el.transfersCount.textContent = data.transfers.length;
  el.newsCount.textContent = data.news.length;
  el.scheduleCount.textContent = data.schedule.length;
}

function renderPlayers() {
  const q = el.search.value.trim().toLowerCase();
  const filtered = data.players.filter(p =>
    p.name.toLowerCase().includes(q) || p.pos.toLowerCase().includes(q)
  );

  if (!filtered.length) {
    el.players.innerHTML = `<div class="empty">${t("emptyPlayers")}</div>`;
    return;
  }

  el.players.innerHTML = filtered.map((p, i) => `
    <div class="card">
      <div class="card-top">
        <div>
          <div class="card-title">${escapeHtml(p.name)}</div>
          <div class="card-sub">${t("position")}: ${escapeHtml(p.pos || "—")}</div>
        </div>
        ${isAdmin ? `
          <div class="card-actions">
            <button class="small-btn" onclick="editPlayer(${findRealIndex('players', p)})">${t("edit")}</button>
            <button class="small-btn" onclick="deleteItem('players', ${findRealIndex('players', p)})">${t("del")}</button>
          </div>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function renderTransfers() {
  if (!data.transfers.length) {
    el.transfers.innerHTML = `<div class="empty">${t("emptyTransfers")}</div>`;
    return;
  }

  el.transfers.innerHTML = data.transfers.map((item, i) => `
    <div class="card">
      <div class="card-top">
        <div>
          <div class="card-title">${escapeHtml(item.name)}</div>
          <div class="card-sub">${t("fromClub")}: ${escapeHtml(item.from)}</div>
        </div>
        ${isAdmin ? `
          <div class="card-actions">
            <button class="small-btn" onclick="editTransfer(${i})">${t("edit")}</button>
            <button class="small-btn" onclick="deleteItem('transfers', ${i})">${t("del")}</button>
          </div>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function renderSchedule() {
  if (!data.schedule.length) {
    el.schedule.innerHTML = `<div class="empty">${t("emptySchedule")}</div>`;
    return;
  }

  el.schedule.innerHTML = data.schedule.map((item, i) => `
    <div class="card">
      <div class="card-top">
        <div>
          <div class="card-title">${escapeHtml(item.name)}</div>
          <div class="card-sub">${t("date")}: ${escapeHtml(item.date)}</div>
        </div>
        ${isAdmin ? `
          <div class="card-actions">
            <button class="small-btn" onclick="editSchedule(${i})">${t("edit")}</button>
            <button class="small-btn" onclick="deleteItem('schedule', ${i})">${t("del")}</button>
          </div>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function renderNews() {
  if (!data.news.length) {
    el.news.innerHTML = `<div class="empty">${t("emptyNews")}</div>`;
    return;
  }

  el.news.innerHTML = data.news.map((item, i) => `
    <div class="card">
      <div class="card-top">
        <div class="card-title">${escapeHtml(item.title)}</div>
        ${isAdmin ? `
          <div class="card-actions">
            <button class="small-btn" onclick="editNews(${i})">${t("edit")}</button>
            <button class="small-btn" onclick="deleteItem('news', ${i})">${t("del")}</button>
          </div>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function renderLineup() {
  setPos(el.lw, data.lineup.lw || "—");
  setPos(el.rw, data.lineup.rw || "—");
  setPos(el.cm, data.lineup.cm || "—");
  setPos(el.gk, data.lineup.gk || "—");
}

function setPos(node, text) {
  const name = node.querySelector(".pos-name");
  name.textContent = text;
}

function renderAdminState() {
  el.adminPanel.classList.toggle("hidden", !isAdmin);
  el.logoutBtn.classList.toggle("hidden", !isAdmin);
}

function applyLang() {
  el.playersTitle.textContent = t("players");
  el.lineupTitle.textContent = t("lineup");
  el.transfersTitle.textContent = t("transfers");
  el.scheduleTitle.textContent = t("schedule");
  el.newsTitle.textContent = t("news");

  el.statPlayersLabel.textContent = t("playersStat");
  el.statTransfersLabel.textContent = t("transfersStat");
  el.statNewsLabel.textContent = t("newsStat");
  el.statMatchesLabel.textContent = t("matchesStat");

  el.brandSubtitle.textContent = t("brandSubtitle");
  el.heroBadge.textContent = t("heroBadge");
  el.heroTitle.textContent = t("heroTitle");
  el.heroText.textContent = t("heroText");

  el.adminTitle.textContent = t("adminTitle");
  el.adminNote.textContent = t("adminNote");
  el.adminPlayersTitle.textContent = t("adminPlayers");
  el.adminLineupTitle.textContent = t("adminLineup");
  el.adminTransfersTitle.textContent = t("adminTransfers");
  el.adminScheduleTitle.textContent = t("adminSchedule");
  el.adminNewsTitle.textContent = t("adminNews");

  el.modalTitle.textContent = t("modalTitle");
  el.modalText.textContent = t("modalText");

  el.search.placeholder = t("search");
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

function toggleLang() {
  lang = lang === "ru" ? "en" : "ru";
  localStorage.setItem("rm_lang", lang);
  renderAll();
}

function openAdmin() {
  el.modal.classList.remove("hidden");
  el.pass.value = "";
  el.pass.focus();
}

function closeAdmin() {
  el.modal.classList.add("hidden");
}

function login() {
  if (el.pass.value !== ADMIN_PASSWORD) {
    alert(t("invalidLogin"));
    return;
  }

  isAdmin = true;
  closeAdmin();
  renderAll();
}

function logout() {
  isAdmin = false;
  renderAll();
}

function addPlayer() {
  const name = el.pname.value.trim();
  const pos = el.ppos.value.trim();

  if (!name || !pos) {
    alert(t("invalidFields"));
    return;
  }

  data.players.unshift({ name, pos });
  el.pname.value = "";
  el.ppos.value = "";
  save();
}

function setLineup() {
  const pos = el.lpos.value.trim().toLowerCase();
  const name = el.lname.value.trim();

  if (!pos || !name) {
    alert(t("invalidFields"));
    return;
  }

  if (!["lw", "rw", "cm", "gk"].includes(pos)) {
    alert(t("invalidPos"));
    return;
  }

  data.lineup[pos] = name;
  el.lpos.value = "";
  el.lname.value = "";
  save();
}

function addTransfer() {
  const name = el.tname.value.trim();
  const from = el.tfrom.value.trim();

  if (!name || !from) {
    alert(t("invalidFields"));
    return;
  }

  data.transfers.unshift({ name, from });
  el.tname.value = "";
  el.tfrom.value = "";
  save();
}

function addMatch() {
  const name = el.sname.value.trim();
  const date = el.sdate.value.trim();

  if (!name || !date) {
    alert(t("invalidFields"));
    return;
  }

  data.schedule.unshift({ name, date });
  el.sname.value = "";
  el.sdate.value = "";
  save();
}

function addNews() {
  const title = el.ntitle.value.trim();

  if (!title) {
    alert(t("invalidFields"));
    return;
  }

  data.news.unshift({ title });
  el.ntitle.value = "";
  save();
}

function editPlayer(index) {
  const current = data.players[index];
  const name = prompt(lang === "ru" ? "Новое имя" : "New name", current.name);
  if (name === null) return;

  const pos = prompt(lang === "ru" ? "Новая позиция" : "New position", current.pos);
  if (pos === null) return;

  data.players[index] = {
    name: name.trim() || current.name,
    pos: pos.trim() || current.pos
  };
  save();
}

function editTransfer(index) {
  const current = data.transfers[index];
  const name = prompt(lang === "ru" ? "Игрок" : "Player", current.name);
  if (name === null) return;

  const from = prompt(lang === "ru" ? "Из клуба" : "From club", current.from);
  if (from === null) return;

  data.transfers[index] = {
    name: name.trim() || current.name,
    from: from.trim() || current.from
  };
  save();
}

function editSchedule(index) {
  const current = data.schedule[index];
  const name = prompt(lang === "ru" ? "Матч / соперник" : "Match / opponent", current.name);
  if (name === null) return;

  const date = prompt(lang === "ru" ? "Дата" : "Date", current.date);
  if (date === null) return;

  data.schedule[index] = {
    name: name.trim() || current.name,
    date: date.trim() || current.date
  };
  save();
}

function editNews(index) {
  const current = data.news[index];
  const title = prompt(lang === "ru" ? "Заголовок" : "Title", current.title);
  if (title === null) return;

  data.news[index] = {
    title: title.trim() || current.title
  };
  save();
}

function deleteItem(type, index) {
  data[type].splice(index, 1);
  save();
}

function findRealIndex(type, item) {
  return data[type].indexOf(item);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

el.themeBtn.addEventListener("click", toggleTheme);
el.langBtn.addEventListener("click", toggleLang);
el.adminOpenBtn.addEventListener("click", openAdmin);
el.closeModalBtn.addEventListener("click", closeAdmin);
el.loginBtn.addEventListener("click", login);
el.logoutBtn.addEventListener("click", logout);

el.addPlayerBtn.addEventListener("click", addPlayer);
el.setLineupBtn.addEventListener("click", setLineup);
el.addTransferBtn.addEventListener("click", addTransfer);
el.addMatchBtn.addEventListener("click", addMatch);
el.addNewsBtn.addEventListener("click", addNews);

el.search.addEventListener("input", renderPlayers);

el.pass.addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});

el.modal.addEventListener("click", (e) => {
  if (e.target === el.modal) closeAdmin();
});

renderAll();
