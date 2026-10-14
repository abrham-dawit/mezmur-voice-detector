// Mezmur Voice Detector — INTERFACE DEMO ONLY.
// There is no audio model behind this page. The "identify" flow runs a fake
// analysis animation and then returns a clearly labeled PLACEHOLDER result.
// See README.md for what a real version needs.

// Starter library: the kinds of labeled entries a real database would hold.
const LIBRARY = [
  { title: "Selam Leki (ሰላም ለኪ)", type: "Mezmur — St. Mary", note: "Hymn to St. Mary, sung at feasts of Mary and during Marian devotions." },
  { title: "Tinsa'e (ትንሣኤ) mezmur", type: "Mezmur — Easter", note: "Resurrection hymns sung through the Easter season." },
  { title: "Gena (ገና) mezmur", type: "Mezmur — Christmas", note: "Nativity hymns sung around Ethiopian/Eritrean Christmas (Jan 7)." },
  { title: "Tsom (ጾም) mezmur", type: "Mezmur — Lent", note: "Slower, reflective hymns for the Great Fast." },
  { title: "Everyday Tigrinya love songs", type: "Song — Tigrinya", note: "The secular side of the library: popular Tigrinya songs people hear at weddings and in cars." },
  { title: "Amharic classics", type: "Song — Amharic", note: "Well-known Amharic songs across decades — the ones every family party ends up playing." },
];

const libGrid = document.getElementById("libGrid");
libGrid.innerHTML = LIBRARY.map(x => `
  <article class="lib-card">
    <span class="lib-cat">${x.type}</span>
    <h4>${x.title}</h4>
    <p>${x.note}</p>
  </article>`).join("");

// --- Audio upload + playback ---
const fileInput = document.getElementById("audioFile");
const player = document.getElementById("player");
const analyzeBtn = document.getElementById("analyzeBtn");
const fileLine = document.getElementById("fileLine");
let clipURL = null;

fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  if (clipURL) URL.revokeObjectURL(clipURL);
  clipURL = URL.createObjectURL(file);
  player.src = clipURL;
  player.hidden = false;
  fileLine.textContent = `Loaded: ${file.name} — press play to hear it, then hit Identify.`;
  analyzeBtn.disabled = false;
});

// --- Mic "listen" demo (visual only; does not record) ---
const micBtn = document.getElementById("micBtn");
micBtn.addEventListener("click", () => {
  const listening = micBtn.classList.toggle("listening");
  micBtn.textContent = listening ? "🔴 Listening… (demo — tap to stop)" : "🎤 Or tap to \"listen\" (demo)";
  if (listening) {
    fileLine.textContent = "Demo mode: the mic animation is visual only in this version — no audio is recorded or sent anywhere. Upload a clip to try the full flow.";
    analyzeBtn.disabled = false;
  }
});

// --- Fake analysis -> placeholder result ---
const resultBody = document.getElementById("resultBody");
analyzeBtn.addEventListener("click", () => {
  resultBody.innerHTML = `
    <p class="muted">Analyzing audio…</p>
    <div class="wave">${Array.from({ length: 28 }, (_, i) =>
      `<span style="height:${10 + Math.abs(Math.sin(i * 1.7)) * 26}px;animation-delay:${i * 0.05}s"></span>`).join("")}
    </div>
    <p class="muted">Extracting fingerprint · comparing against library · scoring confidence</p>`;
  analyzeBtn.disabled = true;

  setTimeout(() => {
    // PLACEHOLDER RESULT — no identification was performed.
    resultBody.innerHTML = `
      <span class="placeholder-tag">Placeholder result — no identification performed</span>
      <p class="result-title">Not sure yet — and that's the honest answer</p>
      <p class="result-sub">In the real app, this is where the matched title, singer/choir, and a confidence score would appear.</p>
      <p class="muted">This demo has <strong>no trained model and no fingerprint database</strong>, so instead of guessing a title and pretending, it shows you the shape of the result and says plainly: the matching engine is the part still to build. What it needs is listed in the "How the real version would work" section below.</p>`;
    analyzeBtn.disabled = false;
  }, 2400);
});
