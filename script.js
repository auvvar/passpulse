const input  = document.getElementById("password");
const bar    = document.getElementById("bar");
const label  = document.getElementById("label");
const tip    = document.getElementById("tip");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password";
});

input.addEventListener("input", () => {
  const val = input.value;

  const checks = {
    length: val.length >= 8,
    upper:  /[A-Z]/.test(val),
    lower:  /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    symbol: /[^A-Za-z0-9]/.test(val),
    long:   val.length >= 16,
  };

  updateCriteria(checks);

  const score = Object.values(checks).filter(Boolean).length;
  updateBar(score, val.length);
  showTip(checks, val.length);
});

function updateCriteria(checks) {
  const map = {
    "c-length": checks.length,
    "c-upper":  checks.upper,
    "c-lower":  checks.lower,
    "c-number": checks.number,
    "c-symbol": checks.symbol,
    "c-long":   checks.long,
  };
  for (const [id, passed] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (input.value.length === 0) {
      el.className = "";
    } else {
      el.className = passed ? "pass" : "fail";
    }
  }
}

function updateBar(score, length) {
  const colors = ["", "#e74c3c", "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#00c896"];
  const widths  = ["0%", "16%", "32%", "48%", "64%", "80%", "100%"];
  const labels  = ["Waiting...", "Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];

  const s = length === 0 ? 0 : score;
  bar.style.width      = widths[s];
  bar.style.background = colors[s];
  label.textContent    = labels[s];
}

function showTip(checks, length) {
  tip.className = "";
  if (length === 0)       { tip.textContent = "Start typing to see feedback."; return; }
  if (!checks.length)     { tip.textContent = "💡 Make it at least 8 characters long."; return; }
  if (!checks.upper)      { tip.textContent = "💡 Add an uppercase letter (A–Z)."; return; }
  if (!checks.lower)      { tip.textContent = "💡 Mix in some lowercase letters."; return; }
  if (!checks.number)     { tip.textContent = "💡 Include a number (0–9)."; return; }
  if (!checks.symbol)     { tip.textContent = "💡 Add a symbol like ! @ # $"; return; }
  if (!checks.long)       { tip.textContent = "💡 Push to 16+ characters for maximum strength."; return; }
  tip.className = "success";
  tip.textContent = "✅ Excellent password — all criteria met!";
}