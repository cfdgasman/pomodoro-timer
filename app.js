// A minimal Pomodoro timer. Uses end timestamps so it stays accurate
// even when the browser throttles background tabs.

const DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABELS = { focus: "Focus", short: "Short break", long: "Long break" };

const clock = document.getElementById("clock");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const countEl = document.getElementById("count");
const modeButtons = document.querySelectorAll(".modes button");

let mode = "focus";
let remaining = DURATIONS[mode];
let endAt = null;
let tick = null;
let completed = 0;

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function draw() {
  clock.textContent = fmt(remaining);
  document.title = `${fmt(remaining)} · ${LABELS[mode]}`;
  startBtn.textContent = endAt ? "Pause" : "Start";
}

function setMode(next) {
  pause();
  mode = next;
  remaining = DURATIONS[mode];
  document.body.dataset.mode = mode;
  modeButtons.forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
  draw();
}

function start() {
  endAt = Date.now() + remaining * 1000;
  tick = setInterval(update, 250);
  draw();
}

function pause() {
  clearInterval(tick);
  tick = null;
  endAt = null;
  draw();
}

function update() {
  remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
  if (remaining === 0) finish();
  draw();
}

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  } catch {
    // audio not available
  }
}

function finish() {
  beep();
  if (mode === "focus") {
    completed += 1;
    countEl.textContent = completed;
    setMode(completed % 4 === 0 ? "long" : "short");
  } else {
    setMode("focus");
  }
}

startBtn.addEventListener("click", () => (endAt ? pause() : start()));
resetBtn.addEventListener("click", () => setMode(mode));
modeButtons.forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));

document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea")) return;
  if (e.code === "Space") {
    e.preventDefault();
    endAt ? pause() : start();
  } else if (e.key.toLowerCase() === "r") {
    setMode(mode);
  }
});

draw();
