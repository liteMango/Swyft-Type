// ---------------- TRANSLATION LOGIC ---------------------
const LECTO_API_KEY = "HQV0Q3X-HSZ4MA8-H78HQCX-QXWANF9";
const LECTO_ENDPOINT = "https://api.lecto.ai/v1/translate/text";

// Your typing paragraphs
const TYPING_PARAGRAPHS = [
  `In the rapidly evolving landscape of technology, ...`,
  `Building a successful product in today's competitive market requires ...`,
  `Continuous learning is at the heart of personal and professional growth ...`,
  // Add more paragraphs as needed
];

// UI references
const typingText = document.getElementById("paragraph");
const langSelect = document.getElementById("lang-select");

// Typing test state
let currentText = "";
let uiLang = "en";

// Function to call Lecto API
async function translateViaLecto(textArr, to, from = "en") {
  if (to === "en") return [...textArr];
  try {
    const resp = await fetch(LECTO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-Key": LECTO_API_KEY,
      },
      body: JSON.stringify({ texts: textArr, to: [to], from }),
    });
    if (!resp.ok) throw new Error("API error " + resp.status);
    const data = await resp.json();
    return data.translations[0].translated || [...textArr];
  } catch (err) {
    console.error("Translation API failed:", err);
    return [...textArr]; // fallback
  }
}

// Pick a random paragraph
function randomParagraph() {
  const ranIndex = Math.floor(Math.random() * TYPING_PARAGRAPHS.length);
  return TYPING_PARAGRAPHS[ranIndex];
}

// Load paragraph and translate if needed
async function loadParagraph() {
  currentText = randomParagraph();
  let displayText = currentText;

  if (uiLang !== "en") {
    displayText = await translateViaLecto([currentText], uiLang, "en");
    displayText = displayText[0] || currentText;
  }

  typingText.textContent = displayText; // put paragraph in typing area
}

// Listen for language changes
langSelect.addEventListener("change", async () => {
  uiLang = langSelect.value;
  await loadParagraph();
});

// Initial load
window.addEventListener("DOMContentLoaded", loadParagraph);
