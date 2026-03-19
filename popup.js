const verseUrlEl        = document.getElementById("verseUrl");
const providerEl        = document.getElementById("provider");
const keyEl             = document.getElementById("key");
const keyLabelEl        = document.getElementById("apikey-label");
const keyHintEl         = document.getElementById("apikey-hint");
const keyFieldEl        = document.getElementById("apikey-field");
const ollamaInfo        = document.getElementById("ollama-info");
const ollamaFields      = document.getElementById("ollama-fields");
const ollamaUrlEl       = document.getElementById("ollamaUrl");
const ollamaModelEl     = document.getElementById("ollamaModel");
const dominoIQInfo      = document.getElementById("dominoiq-info");
const dominoIQFields    = document.getElementById("dominoiq-fields");
const dominoIQUrlEl     = document.getElementById("dominoIQUrl");
const dominoIQTokenEl   = document.getElementById("dominoIQToken");
const langOverrideEl    = document.getElementById("languageOverride");
const detectedLangEl    = document.getElementById("detected-lang");
const statusEl          = document.getElementById("status");

const PROVIDER_META = {
  claude:   { label: "Anthropic API key",     hint: "Get yours at console.anthropic.com — stored locally",  placeholder: "sk-ant-…" },
  openai:   { label: "OpenAI API key",        hint: "Get yours at platform.openai.com — stored locally",    placeholder: "sk-…"     },
  gemini:   { label: "Google Gemini API key", hint: "Get yours at aistudio.google.com — stored locally",    placeholder: "AIza…"    },
};

// Detect and display browser language from the active tab
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const detect = lang => { detectedLangEl.textContent = lang || navigator.language || "en"; };
  if (tabs[0]?.id) {
    chrome.scripting.executeScript(
      { target: { tabId: tabs[0].id }, func: () => navigator.language },
      results => detect(results?.[0]?.result)
    );
  } else {
    detect(navigator.language);
  }
});

// Load ALL saved settings — use null-safe restore for every field including languageOverride
chrome.storage.local.get(
  ["apiKey", "verseUrl", "provider", "ollamaUrl", "ollamaModel", "dominoIQUrl", "dominoIQToken", "languageOverride"],
  (stored) => {
    if (stored.verseUrl)       verseUrlEl.value        = stored.verseUrl;
    if (stored.apiKey)         keyEl.value             = stored.apiKey;
    if (stored.provider)       providerEl.value        = stored.provider;
    if (stored.ollamaUrl)      ollamaUrlEl.value       = stored.ollamaUrl;
    if (stored.ollamaModel)    ollamaModelEl.value     = stored.ollamaModel;
    if (stored.dominoIQUrl)    dominoIQUrlEl.value     = stored.dominoIQUrl;
    if (stored.dominoIQToken)  dominoIQTokenEl.value   = stored.dominoIQToken;

    // Restore language — must use !== undefined check so "" (auto-detect) also restores
    if (stored.languageOverride !== undefined) {
      langOverrideEl.value = stored.languageOverride;
    }

    updateUI(stored.provider || "claude");
  }
);

providerEl.addEventListener("change", () => updateUI(providerEl.value));

function updateUI(prov) {
  const isOllama   = prov === "ollama";
  const isDominoIQ = prov === "dominoiq";
  ollamaInfo.classList.toggle("visible",     isOllama);
  ollamaFields.classList.toggle("visible",   isOllama);
  dominoIQInfo.classList.toggle("visible",   isDominoIQ);
  dominoIQFields.classList.toggle("visible", isDominoIQ);
  keyFieldEl.classList.toggle("hidden", isOllama || isDominoIQ);
  if (!isOllama && !isDominoIQ) {
    const meta = PROVIDER_META[prov] || PROVIDER_META.claude;
    keyLabelEl.textContent = meta.label;
    keyHintEl.textContent  = meta.hint;
    keyEl.placeholder      = meta.placeholder;
  }
}

document.getElementById("save").onclick = () => {
  const url    = verseUrlEl.value.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  const prov   = providerEl.value;
  const key    = keyEl.value.trim();
  const oUrl   = ollamaUrlEl.value.trim();
  const oMod   = ollamaModelEl.value.trim();
  const diqUrl = dominoIQUrlEl.value.trim().replace(/\/$/, "");
  const diqTok = dominoIQTokenEl.value.trim();
  // Always save languageOverride — even "" means auto-detect
  const lang   = langOverrideEl.value;

  if (!url) { showStatus("Please enter your Verse URL", false); return; }
  if (prov === "dominoiq" && !diqUrl) { showStatus("Please enter your Domino IQ URL", false); return; }
  if (prov !== "ollama" && prov !== "dominoiq" && !key) { showStatus("Please enter your API key", false); return; }

  chrome.storage.local.set(
    { apiKey: key, verseUrl: url, provider: prov, ollamaUrl: oUrl, ollamaModel: oMod,
      dominoIQUrl: diqUrl, dominoIQToken: diqTok, languageOverride: lang },
    () => {
      const langLabel = lang
        ? langOverrideEl.options[langOverrideEl.selectedIndex].text
        : `Auto-detect (${detectedLangEl.textContent})`;
      showStatus(`Settings saved! Language: ${langLabel}`, true);
    }
  );
};

function showStatus(msg, ok) {
  statusEl.textContent = msg;
  statusEl.className = ok ? "status-ok" : "status-err";
  if (ok) setTimeout(() => { statusEl.textContent = ""; statusEl.className = ""; }, 5000);
}
