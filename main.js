let is24Hour = true;
let alarmTime = null;
let alarmTimeout = null;
let swInterval, h=0, m=0, s=0, flag_start=false;
let timerInterval, timerSeconds = 0;

function pad(num) { return num < 10 ? "0" + num : num; }

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let session = "";

  if (!is24Hour) {
    session = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
  }

  const hh = pad(h);
  const mm = pad(m);
  const ss = pad(s);
  const time = `${hh}:${mm}:${ss} ${session}`;

  document.getElementById("clockTime").textContent = time;
  document.getElementById("clockDate").textContent = now.toDateString();

  if (alarmTime === `${hh}:${mm}` && ss === "00") {
    document.getElementById("alarmSound").play();
    document.getElementById("alarmStatus").textContent = "⏰ Alarm Ringing!";
  }

  updateWorldClocks();
  setTimeout(updateClock, 1000);
}

function toggleFormat() {
  is24Hour = !is24Hour;
}

function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (input) {
    alarmTime = input;
    document.getElementById("alarmStatus").textContent = `Alarm set for ${alarmTime}`;
  }
}

function nima() {
  s++;
  if (s > 59) { s = 0; m++; }
  if (m > 59) { m = 0; h++; }
  if (h > 99) { h = 0; }
  document.getElementById("div1").innerHTML = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function start() {
  if (!flag_start) {
    flag_start = true;
    swInterval = setInterval(nima, 1000);
    document.getElementById("btn_start").disabled = true;
    document.getElementById("btn_stop").disabled = false;
    document.getElementById("btn_reset").disabled = false;
    document.getElementById("statusText").innerText = "⏱ Stopwatch is running...";
  }
}

function stop() {
  clearInterval(swInterval);
  flag_start = false;
  document.getElementById("btn_start").disabled = false;
  document.getElementById("btn_stop").disabled = true;
  document.getElementById("statusText").innerText = "⏸ Stopwatch paused.";
}

function reset() {
  stop(); h = m = s = 0;
  document.getElementById("div1").innerHTML = "00:00:00";
  document.getElementById("statusText").innerText = "🔁 Stopwatch reset.";
  document.getElementById("btn_reset").disabled = true;
}

function startTimer() {
  timerSeconds = parseInt(document.getElementById("timerInput").value);
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timerCount").textContent = "Done!";
      document.getElementById("alarmSound").play();
      return;
    }
    timerSeconds--;
    const m = Math.floor(timerSeconds / 60);
    const s = timerSeconds % 60;
    document.getElementById("timerCount").textContent = `${pad(m)}:${pad(s)}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timerCount").textContent = "00:00";
}

function updateWorldClocks() {
  const now = new Date();
  document.getElementById("londonTime").textContent = `London: ${now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London' })}`;
  document.getElementById("tokyoTime").textContent = `Tokyo: ${now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo' })}`;
  document.getElementById("tehranTime").textContent = `Tehran: ${now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tehran' })}`;
}

function showTab(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
  document.querySelector(`[onclick*="${tabName}"]`).classList.add('active');
  document.getElementById(tabName).style.display = 'block';
}

updateClock();
