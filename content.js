// Guard against double-injection when background re-injects into an already-loaded tab
if (typeof window.__cvpLoaded === 'undefined') {
window.__cvpLoaded = true;

// ── UI Translations ───────────────────────────────────────────────────────────
// All strings the user sees in the panel, translated per language code
const UI_STRINGS = {
  "en-AU": {
    title:        "Huddo AI Assistant for Verse",
    summarise:    "Summarise",
    reply:        "Draft reply",
    tone:         "Improve tone",
    actionItems:  "Action items",
    send:         "Send",
    placeholder:  "Ask anything about this email…",
    chooseTone:   "Choose a tone:",
    tones:        ["Professional", "Friendly", "Concise", "Formal"],
    summarising:  "Summarising…",
    drafting:     "Drafting reply…",
    applyingTone: t => `Applying ${t.toLowerCase()} tone…`,
    findingActions: "Finding action items…",
    noEmail:      "I would love to help but there is no email selected ;)",
    inserted:     "✓ Reply drafted and inserted into Verse",
    toneApplied:  t => `✓ ${t} tone applied in Verse`,
    insertBtn:    "Insert into compose",
    insertFail:   "Could not auto-insert — use the button below",
  },
  "en-GB": {
    title:        "Huddo AI Assistant for Verse",
    summarise:    "Summarise",
    reply:        "Draft reply",
    tone:         "Improve tone",
    actionItems:  "Action items",
    send:         "Send",
    placeholder:  "Ask anything about this email…",
    chooseTone:   "Choose a tone:",
    tones:        ["Professional", "Friendly", "Concise", "Formal"],
    summarising:  "Summarising…",
    drafting:     "Drafting reply…",
    applyingTone: t => `Applying ${t.toLowerCase()} tone…`,
    findingActions: "Finding action items…",
    noEmail:      "I would love to help but there is no email selected ;)",
    inserted:     "✓ Reply drafted and inserted into Verse",
    toneApplied:  t => `✓ ${t} tone applied in Verse`,
    insertBtn:    "Insert into compose",
    insertFail:   "Could not auto-insert — use the button below",
  },
  "en": {
    title:        "Huddo AI Assistant for Verse",
    summarise:    "Summarize",
    reply:        "Draft reply",
    tone:         "Improve tone",
    actionItems:  "Action items",
    send:         "Send",
    placeholder:  "Ask anything about this email…",
    chooseTone:   "Choose a tone:",
    tones:        ["Professional", "Friendly", "Concise", "Formal"],
    summarising:  "Summarizing…",
    drafting:     "Drafting reply…",
    applyingTone: t => `Applying ${t.toLowerCase()} tone…`,
    findingActions: "Finding action items…",
    noEmail:      "I would love to help but there is no email selected ;)",
    inserted:     "✓ Reply drafted and inserted into Verse",
    toneApplied:  t => `✓ ${t} tone applied in Verse`,
    insertBtn:    "Insert into compose",
    insertFail:   "Could not auto-insert — use the button below",
  },
  "de": {
    title:        "Huddo KI-Assistent für Verse",
    summarise:    "Zusammenfassen",
    reply:        "Antwort verfassen",
    tone:         "Ton verbessern",
    actionItems:  "Aufgaben",
    send:         "Senden",
    placeholder:  "Fragen Sie etwas zu dieser E-Mail…",
    chooseTone:   "Ton wählen:",
    tones:        ["Professionell", "Freundlich", "Prägnant", "Formell"],
    summarising:  "Wird zusammengefasst…",
    drafting:     "Antwort wird verfasst…",
    applyingTone: t => `Ton wird angepasst: ${t}…`,
    findingActions: "Aufgaben werden gesucht…",
    noEmail:      "Ich helfe gerne, aber es wurde keine E-Mail ausgewählt ;)",
    inserted:     "✓ Antwort verfasst und in Verse eingefügt",
    toneApplied:  t => `✓ Ton „${t}" in Verse angewendet`,
    insertBtn:    "In Entwurf einfügen",
    insertFail:   "Konnte nicht automatisch eingefügt werden — Schaltfläche unten verwenden",
  },
  "fr": {
    title:        "Assistant IA Huddo pour Verse",
    summarise:    "Résumer",
    reply:        "Rédiger une réponse",
    tone:         "Améliorer le ton",
    actionItems:  "Points d'action",
    send:         "Envoyer",
    placeholder:  "Posez une question sur cet e-mail…",
    chooseTone:   "Choisir un ton :",
    tones:        ["Professionnel", "Convivial", "Concis", "Formel"],
    summarising:  "Résumé en cours…",
    drafting:     "Rédaction en cours…",
    applyingTone: t => `Application du ton ${t}…`,
    findingActions: "Recherche des points d'action…",
    noEmail:      "Je serais ravi d'aider, mais aucun e-mail n'est sélectionné ;)",
    inserted:     "✓ Réponse rédigée et insérée dans Verse",
    toneApplied:  t => `✓ Ton « ${t} » appliqué dans Verse`,
    insertBtn:    "Insérer dans le brouillon",
    insertFail:   "Insertion automatique impossible — utiliser le bouton ci-dessous",
  },
  "it": {
    title:        "Assistente IA Huddo per Verse",
    summarise:    "Riepiloga",
    reply:        "Bozza risposta",
    tone:         "Migliora tono",
    actionItems:  "Punti d'azione",
    send:         "Invia",
    placeholder:  "Chiedi qualcosa su questa email…",
    chooseTone:   "Scegli un tono:",
    tones:        ["Professionale", "Amichevole", "Conciso", "Formale"],
    summarising:  "Riepilogo in corso…",
    drafting:     "Bozza in corso…",
    applyingTone: t => `Applicazione tono ${t}…`,
    findingActions: "Ricerca punti d'azione…",
    noEmail:      "Sarei felice di aiutare, ma nessuna email è selezionata ;)",
    inserted:     "✓ Risposta redatta e inserita in Verse",
    toneApplied:  t => `✓ Tono „${t}" applicato in Verse`,
    insertBtn:    "Inserisci nella bozza",
    insertFail:   "Inserimento automatico non riuscito — usa il pulsante qui sotto",
  },
  "es": {
    title:        "Asistente IA Huddo para Verse",
    summarise:    "Resumir",
    reply:        "Redactar respuesta",
    tone:         "Mejorar tono",
    actionItems:  "Puntos de acción",
    send:         "Enviar",
    placeholder:  "Pregunta algo sobre este correo…",
    chooseTone:   "Elegir un tono:",
    tones:        ["Profesional", "Amigable", "Conciso", "Formal"],
    summarising:  "Resumiendo…",
    drafting:     "Redactando respuesta…",
    applyingTone: t => `Aplicando tono ${t}…`,
    findingActions: "Buscando puntos de acción…",
    noEmail:      "Me encantaría ayudar, pero no hay ningún correo seleccionado ;)",
    inserted:     "✓ Respuesta redactada e insertada en Verse",
    toneApplied:  t => `✓ Tono „${t}" aplicado en Verse`,
    insertBtn:    "Insertar en borrador",
    insertFail:   "No se pudo insertar automáticamente — usa el botón abajo",
  },
  "pt-BR": {
    title:        "Assistente IA Huddo para Verse",
    summarise:    "Resumir",
    reply:        "Redigir resposta",
    tone:         "Melhorar tom",
    actionItems:  "Itens de ação",
    send:         "Enviar",
    placeholder:  "Pergunte algo sobre este e-mail…",
    chooseTone:   "Escolher um tom:",
    tones:        ["Profissional", "Amigável", "Conciso", "Formal"],
    summarising:  "Resumindo…",
    drafting:     "Redigindo resposta…",
    applyingTone: t => `Aplicando tom ${t}…`,
    findingActions: "Buscando itens de ação…",
    noEmail:      "Adoraria ajudar, mas nenhum e-mail está selecionado ;)",
    inserted:     "✓ Resposta redigida e inserida no Verse",
    toneApplied:  t => `✓ Tom „${t}" aplicado no Verse`,
    insertBtn:    "Inserir no rascunho",
    insertFail:   "Não foi possível inserir automaticamente — use o botão abaixo",
  },
  "nl": {
    title:        "Huddo AI-assistent voor Verse",
    summarise:    "Samenvatten",
    reply:        "Antwoord opstellen",
    tone:         "Toon verbeteren",
    actionItems:  "Actiepunten",
    send:         "Verzenden",
    placeholder:  "Stel een vraag over deze e-mail…",
    chooseTone:   "Kies een toon:",
    tones:        ["Professioneel", "Vriendelijk", "Beknopt", "Formeel"],
    summarising:  "Samenvatten…",
    drafting:     "Antwoord opstellen…",
    applyingTone: t => `Toon aanpassen: ${t}…`,
    findingActions: "Actiepunten zoeken…",
    noEmail:      "Ik help graag, maar er is geen e-mail geselecteerd ;)",
    inserted:     "✓ Antwoord opgesteld en ingevoegd in Verse",
    toneApplied:  t => `✓ Toon „${t}" toegepast in Verse`,
    insertBtn:    "Invoegen in concept",
    insertFail:   "Automatisch invoegen mislukt — gebruik de knop hieronder",
  },
  "ru": {
    title:        "Huddo ИИ-ассистент для Verse",
    summarise:    "Резюмировать",
    reply:        "Составить ответ",
    tone:         "Улучшить тон",
    actionItems:  "Задачи",
    send:         "Отправить",
    placeholder:  "Задайте вопрос об этом письме…",
    chooseTone:   "Выберите тон:",
    tones:        ["Профессиональный", "Дружелюбный", "Краткий", "Официальный"],
    summarising:  "Резюмирование…",
    drafting:     "Составление ответа…",
    applyingTone: t => `Применение тона «${t}»…`,
    findingActions: "Поиск задач…",
    noEmail:      "Я бы с удовольствием помог, но письмо не выбрано ;)",
    inserted:     "✓ Ответ составлен и вставлен в Verse",
    toneApplied:  t => `✓ Тон «${t}» применён в Verse`,
    insertBtn:    "Вставить в черновик",
    insertFail:   "Автовставка не удалась — используйте кнопку ниже",
  },
  "pl": {
    title:        "Asystent AI Huddo dla Verse",
    summarise:    "Podsumuj",
    reply:        "Napisz odpowiedź",
    tone:         "Popraw ton",
    actionItems:  "Punkty działania",
    send:         "Wyślij",
    placeholder:  "Zadaj pytanie dotyczące tej wiadomości…",
    chooseTone:   "Wybierz ton:",
    tones:        ["Profesjonalny", "Przyjazny", "Zwięzły", "Formalny"],
    summarising:  "Podsumowywanie…",
    drafting:     "Pisanie odpowiedzi…",
    applyingTone: t => `Stosowanie tonu ${t}…`,
    findingActions: "Szukanie punktów działania…",
    noEmail:      "Chętnie pomogę, ale nie wybrano żadnej wiadomości ;)",
    inserted:     "✓ Odpowiedź napisana i wstawiona do Verse",
    toneApplied:  t => `✓ Ton „${t}" zastosowany w Verse`,
    insertBtn:    "Wstaw do wersji roboczej",
    insertFail:   "Automatyczne wstawianie nie powiodło się — użyj przycisku poniżej",
  },
  "cs": {
    title:        "Huddo AI asistent pro Verse",
    summarise:    "Shrnout",
    reply:        "Napsat odpověď",
    tone:         "Zlepšit tón",
    actionItems:  "Úkoly",
    send:         "Odeslat",
    placeholder:  "Zeptejte se na cokoli ohledně tohoto e-mailu…",
    chooseTone:   "Vyberte tón:",
    tones:        ["Profesionální", "Přátelský", "Stručný", "Formální"],
    summarising:  "Shrnutí…",
    drafting:     "Psaní odpovědi…",
    applyingTone: t => `Použití tónu ${t}…`,
    findingActions: "Hledání úkolů…",
    noEmail:      "Rád bych pomohl, ale není vybrán žádný e-mail ;)",
    inserted:     "✓ Odpověď napsána a vložena do Verse",
    toneApplied:  t => `✓ Tón „${t}" použit ve Verse`,
    insertBtn:    "Vložit do konceptu",
    insertFail:   "Automatické vložení se nezdařilo — použijte tlačítko níže",
  },
  "hu": {
    title:        "Huddo MI-asszisztens a Verse-hez",
    summarise:    "Összefoglalás",
    reply:        "Válasz szerkesztése",
    tone:         "Hangnem javítása",
    actionItems:  "Feladatok",
    send:         "Küldés",
    placeholder:  "Kérdezzen valamit erről az e-mailről…",
    chooseTone:   "Válasszon hangnemet:",
    tones:        ["Szakszerű", "Barátságos", "Tömör", "Formális"],
    summarising:  "Összefoglalás…",
    drafting:     "Válasz szerkesztése…",
    applyingTone: t => `${t} hangnem alkalmazása…`,
    findingActions: "Feladatok keresése…",
    noEmail:      "Szívesen segítenék, de nincs kiválasztva e-mail ;)",
    inserted:     "✓ Válasz elkészítve és beillesztve a Verse-be",
    toneApplied:  t => `✓ „${t}" hangnem alkalmazva a Verse-ben`,
    insertBtn:    "Beillesztés a vázlatba",
    insertFail:   "Automatikus beillesztés sikertelen — használja az alábbi gombot",
  },
  "ja": {
    title:        "Huddo AI アシスタント for Verse",
    summarise:    "要約",
    reply:        "返信を作成",
    tone:         "トーンを改善",
    actionItems:  "アクション項目",
    send:         "送信",
    placeholder:  "このメールについて質問してください…",
    chooseTone:   "トーンを選択:",
    tones:        ["プロフェッショナル", "フレンドリー", "簡潔", "フォーマル"],
    summarising:  "要約中…",
    drafting:     "返信を作成中…",
    applyingTone: t => `${t}のトーンを適用中…`,
    findingActions: "アクション項目を検索中…",
    noEmail:      "お役に立ちたいのですが、メールが選択されていません ;)",
    inserted:     "✓ 返信を作成してVerseに挿入しました",
    toneApplied:  t => `✓ ${t}のトーンをVerseに適用しました`,
    insertBtn:    "下書きに挿入",
    insertFail:   "自動挿入できませんでした — 下のボタンを使用してください",
  },
  "ko": {
    title:        "Huddo AI 어시스턴트 for Verse",
    summarise:    "요약",
    reply:        "답장 작성",
    tone:         "어조 개선",
    actionItems:  "실행 항목",
    send:         "보내기",
    placeholder:  "이 이메일에 대해 질문하세요…",
    chooseTone:   "어조 선택:",
    tones:        ["전문적", "친근한", "간결한", "공식적"],
    summarising:  "요약 중…",
    drafting:     "답장 작성 중…",
    applyingTone: t => `${t} 어조 적용 중…`,
    findingActions: "실행 항목 검색 중…",
    noEmail:      "도와드리고 싶지만 이메일이 선택되지 않았습니다 ;)",
    inserted:     "✓ 답장이 작성되어 Verse에 삽입되었습니다",
    toneApplied:  t => `✓ ${t} 어조가 Verse에 적용되었습니다`,
    insertBtn:    "초안에 삽입",
    insertFail:   "자동 삽입 실패 — 아래 버튼을 사용하세요",
  },
  "zh": {
    title:        "Huddo AI 助手 for Verse",
    summarise:    "摘要",
    reply:        "起草回复",
    tone:         "改善语气",
    actionItems:  "行动项目",
    send:         "发送",
    placeholder:  "询问有关此邮件的任何问题…",
    chooseTone:   "选择语气：",
    tones:        ["专业", "友好", "简洁", "正式"],
    summarising:  "摘要中…",
    drafting:     "起草回复中…",
    applyingTone: t => `正在应用${t}语气…`,
    findingActions: "正在查找行动项目…",
    noEmail:      "我很乐意帮助，但尚未选择邮件 ;)",
    inserted:     "✓ 回复已起草并插入Verse",
    toneApplied:  t => `✓ ${t}语气已在Verse中应用`,
    insertBtn:    "插入草稿",
    insertFail:   "无法自动插入 — 请使用下方按钮",
  },
  "zh-TW": {
    title:        "Huddo AI 助手 for Verse",
    summarise:    "摘要",
    reply:        "起草回覆",
    tone:         "改善語氣",
    actionItems:  "行動項目",
    send:         "傳送",
    placeholder:  "詢問有關此郵件的任何問題…",
    chooseTone:   "選擇語氣：",
    tones:        ["專業", "友善", "簡潔", "正式"],
    summarising:  "摘要中…",
    drafting:     "起草回覆中…",
    applyingTone: t => `正在套用${t}語氣…`,
    findingActions: "正在尋找行動項目…",
    noEmail:      "我很樂意協助，但尚未選擇郵件 ;)",
    inserted:     "✓ 回覆已起草並插入Verse",
    toneApplied:  t => `✓ ${t}語氣已在Verse中套用`,
    insertBtn:    "插入草稿",
    insertFail:   "無法自動插入 — 請使用下方按鈕",
  },
  "eu": {
    title:        "Huddo AI Laguntzailea Verse-rako",
    summarise:    "Laburtu",
    reply:        "Erantzuna zirriborratu",
    tone:         "Tonua hobetu",
    actionItems:  "Ekintza-puntuak",
    send:         "Bidali",
    placeholder:  "Galdetu zerbait mezu elektroniko honi buruz…",
    chooseTone:   "Hautatu tonua:",
    tones:        ["Profesionala", "Adiskidetsua", "Laburra", "Formala"],
    summarising:  "Laburtzen…",
    drafting:     "Erantzuna zirriborratzen…",
    applyingTone: t => `${t} tonua aplikatzen…`,
    findingActions: "Ekintza-puntuak bilatzen…",
    noEmail:      "Lagundu nahiko nuke baina ez dago mezu elektronikorik hautaturik ;)",
    inserted:     "✓ Erantzuna zirriborratu eta Verse-n txertatu da",
    toneApplied:  t => `✓ „${t}" tonua Verse-n aplikatu da`,
    insertBtn:    "Txertatu zirriborroan",
    insertFail:   "Ezin izan da automatikoki txertatu — erabili beheko botoia",
  },
  "ca": {
    title:        "Assistent IA Huddo per a Verse",
    summarise:    "Resumeix",
    reply:        "Redacta una resposta",
    tone:         "Millora el to",
    actionItems:  "Punts d'acció",
    send:         "Envia",
    placeholder:  "Pregunta qualsevol cosa sobre aquest correu…",
    chooseTone:   "Tria un to:",
    tones:        ["Professional", "Amistós", "Concís", "Formal"],
    summarising:  "Resumint…",
    drafting:     "Redactant la resposta…",
    applyingTone: t => `Aplicant el to ${t}…`,
    findingActions: "Cercant punts d'acció…",
    noEmail:      "M'encantaria ajudar però no hi ha cap correu seleccionat ;)",
    inserted:     "✓ Resposta redactada i inserida a Verse",
    toneApplied:  t => `✓ To «${t}» aplicat a Verse`,
    insertBtn:    "Insereix a l'esborrany",
    insertFail:   "No s'ha pogut inserir automàticament — utilitza el botó de sota",
  },
};

// ── Language list for the in-panel switcher ───────────────────────────────────
const LANG_LIST = [
  { code: "en-AU", label: "English (AU)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "en",    label: "English (US)" },
  { code: "ca",    label: "Català" },
  { code: "cs",    label: "Čeština" },
  { code: "de",    label: "Deutsch" },
  { code: "es",    label: "Español" },
  { code: "eu",    label: "Euskara" },
  { code: "fr",    label: "Français" },
  { code: "hu",    label: "Magyar" },
  { code: "it",    label: "Italiano" },
  { code: "ja",    label: "日本語" },
  { code: "ko",    label: "한국어" },
  { code: "nl",    label: "Nederlands" },
  { code: "pl",    label: "Polski" },
  { code: "pt-BR", label: "Português" },
  { code: "ru",    label: "Русский" },
  { code: "zh",    label: "中文 (简)" },
  { code: "zh-TW", label: "中文 (繁)" },
];

// Session-only language override — resets when the panel is closed
let sessionLang = null;

// Returns a language instruction prefix for AI messages when session lang is active
const LANG_NAMES = {
  "en-AU": "Australian English", "en-GB": "British English", "en": "English",
  "ca": "Catalan", "cs": "Czech", "de": "German", "es": "Spanish",
  "eu": "Basque", "fr": "French", "hu": "Hungarian", "it": "Italian",
  "ja": "Japanese", "ko": "Korean", "nl": "Dutch", "pl": "Polish",
  "pt-BR": "Brazilian Portuguese", "ru": "Russian",
  "zh": "Simplified Chinese", "zh-TW": "Traditional Chinese",
};

// Resolve active language from storage, falling back to browser lang
function getActiveLang(storedOverride) {
  const code = (storedOverride && storedOverride !== "")
    ? storedOverride
    : (navigator.language || "en");
  // Find best match in UI_STRINGS
  if (UI_STRINGS[code]) return code;
  // Try language prefix (e.g. en-AU -> en-AU, then en)
  const prefix = code.split("-")[0];
  const match = Object.keys(UI_STRINGS).find(k => k === prefix);
  return match || "en";
}

// Get the UI strings for the active language (session override takes priority)
async function getStrings() {
  if (sessionLang) return UI_STRINGS[sessionLang] || UI_STRINGS["en"];
  return new Promise(resolve => {
    chrome.storage.local.get("languageOverride", ({ languageOverride }) => {
      const lang = getActiveLang(languageOverride);
      resolve(UI_STRINGS[lang] || UI_STRINGS["en-AU"]);
    });
  });
}

async function shouldActivate() {
  return new Promise(resolve => {
    if (location.hash.startsWith('#/tearoff/')) { resolve(false); return; }
    chrome.storage.local.get("verseUrl", ({ verseUrl }) => {
      if (!verseUrl) { resolve(false); return; }
      try {
        const configured = new URL(verseUrl.startsWith('http') ? verseUrl : 'https://' + verseUrl);
        resolve(window.location.hostname === configured.hostname);
      } catch (e) { resolve(false); }
    });
  });
}

function getLoggedInUser() {
  const banner = document.querySelector('.ics-scbanner');
  if (!banner) return "";
  const walker = document.createTreeWalker(banner, NodeFilter.SHOW_TEXT);
  const texts = [];
  let node;
  while (node = walker.nextNode()) {
    const t = node.textContent.trim();
    if (t && t.length > 1 && t.length < 60) texts.push(t);
  }
  const idx = texts.indexOf("Change My Picture");
  if (idx > 0) return texts[idx - 1];
  const loIdx = texts.lastIndexOf("Log Out");
  if (loIdx > 1) return texts[loIdx - 2];
  return "";
}

function getEmailContext() {
  const subject = document.querySelector('h2')?.innerText?.trim() || "";
  const sender  = document.querySelector('.socpimMailingList.pim-mailread-recipient')?.innerText?.trim()?.split('\n')[0] || "";
  let body = "";
  document.querySelectorAll('.pim-mailread-mailcontent').forEach(el => {
    if (el.classList.contains('collapsed-mailcontent')) return;
    const txt = el.innerText?.trim() || "";
    if (txt.length > body.length) body = txt;
  });
  return { subject, sender, body, myName: getLoggedInUser() };
}

function getDraftText() {
  const iframe = document.querySelector('iframe.tox-edit-area__iframe');
  if (!iframe || !iframe.contentDocument?.body) return null;
  const fullText = iframe.contentDocument.body.innerText || '';
  const sepIdx = fullText.indexOf('-----');
  const draft = sepIdx > 0 ? fullText.slice(0, sepIdx).trim() : fullText.trim();
  return draft.length > 0 ? draft : null;
}

function injectIntoReplyCompose(text) {
  const iframe = document.querySelector('iframe.tox-edit-area__iframe');
  if (!iframe) return false;
  const doc = iframe.contentDocument;
  if (!doc || !doc.body) return false;
  const body = doc.body;
  const prev = body.querySelector('[data-claude]');
  if (prev) prev.remove();
  const container = doc.createElement('div');
  container.setAttribute('data-claude', '1');
  text.split('\n').forEach(line => {
    const p = doc.createElement('p');
    p.textContent = line || '\u00A0';
    container.appendChild(p);
  });
  const sep = doc.createElement('p');
  sep.textContent = '\u00A0';
  container.appendChild(sep);
  body.insertBefore(container, body.firstChild);
  try {
    const range = doc.createRange();
    range.setStart(container.firstChild, 0);
    range.collapse(true);
    const sel = iframe.contentWindow.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } catch (e) {}
  doc.body.dispatchEvent(new InputEvent('input', { bubbles: true }));
  return true;
}

function triggerReplyAndInject(text) {
  const existingIframe = document.querySelector('iframe.tox-edit-area__iframe');
  if (existingIframe && existingIframe.contentDocument?.body) {
    return Promise.resolve(injectIntoReplyCompose(text));
  }
  let clicked = false;
  document.querySelectorAll('.pim-mailread-container a, .pim-mailread-container button').forEach(el => {
    if (!clicked && el.innerText?.trim() === 'Reply') { el.click(); clicked = true; }
  });
  if (!clicked) {
    document.querySelectorAll('a, button').forEach(el => {
      if (!clicked && el.innerText?.trim() === 'Reply') { el.click(); clicked = true; }
    });
  }
  if (!clicked) return Promise.resolve(false);
  return new Promise(resolve => {
    let attempts = 0;
    const poll = setInterval(() => {
      const iframe = document.querySelector('iframe.tox-edit-area__iframe');
      if (iframe && iframe.contentDocument?.body?.innerHTML?.length > 10) {
        clearInterval(poll);
        setTimeout(() => resolve(injectIntoReplyCompose(text)), 500);
      } else if (++attempts > 40) {
        clearInterval(poll);
        resolve(false);
      }
    }, 100);
  });
}

function resizePanel() {
  const msgs = document.getElementById('cvp-messages');
  if (!msgs) return;
  requestAnimationFrame(() => {
    const panel  = document.getElementById('claude-verse-panel');
    const maxH   = window.innerHeight * 0.5;
    const panelH = panel?.getBoundingClientRect().height || 0;
    msgs.style.overflowY = panelH >= maxH ? 'auto' : 'visible';
    msgs.scrollTop = msgs.scrollHeight;
  });
}

function setLoading(on) {
  const btn = document.getElementById("cvp-send");
  if (!btn) return;
  if (on) { btn.disabled = true; btn.innerHTML = '<span class="cvp-spinner"></span>'; }
  else    { btn.disabled = false; btn.textContent = window.__cvpStrings?.send || "Send"; }
}

// Send AI request — session lang takes priority over stored override and browser lang
function aiRequest(messages) {
  return chrome.runtime.sendMessage({
    type: "CLAUDE_REQUEST",
    messages,
    sessionLang: sessionLang || null,
    browserLang: navigator.language || "en"
  });
}

function makeDraggable(panel) {
  const header = panel.querySelector('#cvp-header');
  let dragging = false, startX, startY, startLeft, startTop;
  header.addEventListener('mousedown', e => {
    if (e.target.id === 'cvp-close' || e.target.id === 'cvp-lang') return;
    dragging = true; startX = e.clientX; startY = e.clientY;
    const rect = panel.getBoundingClientRect();
    startLeft = rect.left; startTop = rect.top;
    panel.style.right = 'auto'; panel.style.bottom = 'auto';
    panel.style.left = startLeft + 'px'; panel.style.top = startTop + 'px';
    panel.style.maxHeight = 'none'; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    panel.style.left = Math.max(0, startLeft + (e.clientX - startX)) + 'px';
    panel.style.top  = Math.max(0, startTop  + (e.clientY - startY)) + 'px';
  });
  document.addEventListener('mouseup', () => { dragging = false; });
}

function makeResizable(panel) {
  let resizing = false, dir = '', startX, startY, startW, startH, startLeft, startTop;
  panel.querySelectorAll('.cvp-resizer').forEach(handle => {
    handle.addEventListener('mousedown', e => {
      resizing = true; dir = handle.dataset.dir;
      startX = e.clientX; startY = e.clientY;
      startW = panel.offsetWidth; startH = panel.offsetHeight;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left; startTop = rect.top;
      panel.style.right = 'auto'; panel.style.bottom = 'auto';
      panel.style.left = startLeft + 'px'; panel.style.top = startTop + 'px';
      panel.style.maxHeight = 'none'; e.preventDefault(); e.stopPropagation();
    });
  });
  document.addEventListener('mousemove', e => {
    if (!resizing) return;
    const dx = e.clientX - startX, dy = e.clientY - startY, minW = 260, minH = 200;
    if (dir.includes('e')) panel.style.width  = Math.max(minW, startW + dx) + 'px';
    if (dir.includes('w')) { const nW = Math.max(minW, startW - dx); panel.style.width = nW + 'px'; panel.style.left = (startLeft + startW - nW) + 'px'; }
    if (dir.includes('s')) panel.style.height = Math.max(minH, startH + dy) + 'px';
    if (dir.includes('n')) { const nH = Math.max(minH, startH - dy); panel.style.height = nH + 'px'; panel.style.top = (startTop + startH - nH) + 'px'; }
  });
  document.addEventListener('mouseup', () => { resizing = false; });
}

function showTonePicker(ctx, s) {
  const msgs = document.getElementById('cvp-messages');
  const label = document.createElement('div');
  label.className = 'cvp-msg cvp-assistant';
  label.textContent = s.chooseTone;
  msgs.appendChild(label);
  const row = document.createElement('div');
  row.className = 'cvp-tone-picker';
  s.tones.forEach(tone => {
    const btn = document.createElement('button');
    btn.className = 'cvp-tone-btn'; btn.textContent = tone;
    btn.onclick = () => { label.remove(); row.remove(); draftWithTone(ctx, tone, s); };
    row.appendChild(btn);
  });
  msgs.appendChild(row);
  resizePanel();
}

async function draftWithTone(ctx, tone, s) {
  const identity   = ctx.myName ? `You are replying as ${ctx.myName}.` : "";
  const draftText  = getDraftText();
  const sourceText = draftText || ctx.body;
  const action     = draftText
    ? `Rewrite the following draft email in a ${tone} tone`
    : `Draft a ${tone} reply to this email on behalf of ${ctx.myName || "the recipient"}`;

  appendMessage("user", s.applyingTone(tone), true);
  setLoading(true);

  const langNote = sessionLang ? ` Write your response in ${LANG_NAMES[sessionLang] || sessionLang}.` : "";
  const messages = [{ role: "user", content:
    `${identity} ${action}.${langNote} Output ONLY the body text — no subject line, no preamble, no explanation.\n\n`
    + `Subject: ${ctx.subject}\nFrom: ${ctx.sender}\n\n${sourceText}`
  }];

  const resp = await aiRequest(messages);
  setLoading(false);
  if (resp.error) { appendMessage("assistant", `Error: ${resp.error}`); return; }

  const injected = await triggerReplyAndInject(resp.reply);
  const note = document.createElement("div");
  note.className = "cvp-msg cvp-assistant";
  note.style.cssText = "font-size:12px;opacity:0.7";
  if (injected) {
    note.textContent = s.toneApplied(tone);
  } else {
    note.textContent = s.insertFail;
    const useBtn = document.createElement("button");
    useBtn.className = "cvp-use-btn"; useBtn.textContent = s.insertBtn;
    useBtn.onclick = () => triggerReplyAndInject(resp.reply)
      .then(ok => { if (!ok) alert("Please click Reply in Verse first, then try again."); });
    note.appendChild(useBtn);
  }
  document.getElementById("cvp-messages").appendChild(note);
  resizePanel();
}

let history = [];

// Re-label all translatable UI elements after a language switch
function updatePanelStrings(s) {
  const titleEl = document.querySelector('#cvp-title span');
  if (titleEl) titleEl.textContent = s.title;
  const inputEl = document.getElementById('cvp-input');
  if (inputEl) inputEl.placeholder = s.placeholder;
  const sendEl = document.getElementById('cvp-send');
  if (sendEl && !sendEl.disabled) sendEl.textContent = s.send;
  document.querySelectorAll('#cvp-quick-actions [data-action]').forEach(btn => {
    if (btn.dataset.action === 'summarise')    btn.textContent = s.summarise;
    if (btn.dataset.action === 'reply')        btn.textContent = s.reply;
    if (btn.dataset.action === 'tone')         btn.textContent = s.tone;
    if (btn.dataset.action === 'action-items') btn.textContent = s.actionItems;
  });
  window.__cvpStrings = s;
}

function toggleLangPicker(forceOpen) {
  const picker = document.getElementById('cvp-lang-picker');
  if (!picker) return;
  const open = forceOpen !== undefined ? forceOpen : !picker.classList.contains('open');
  picker.classList.toggle('open', open);
  const btn = document.getElementById('cvp-lang');
  if (btn) btn.classList.toggle('active', open);
}

function buildLangPicker(storedDefault) {
  const picker = document.getElementById('cvp-lang-picker');
  if (!picker) return;
  const activeLang = sessionLang || storedDefault || getActiveLang('');
  picker.innerHTML = '';
  LANG_LIST.forEach(({ code, label }) => {
    const isActive   = code === activeLang;
    const isDefault  = code === storedDefault;
    const row        = document.createElement('div');
    row.className    = 'cvp-lang-row';

    const langBtn       = document.createElement('button');
    langBtn.className   = 'cvp-lang-btn' + (isActive ? ' active' : '');
    langBtn.textContent = label;
    langBtn.onclick     = async () => {
      sessionLang = code;
      history = [];  // clear stale conversation context from previous language
      const s = await getStrings();
      updatePanelStrings(s);
      toggleLangPicker(false);
      buildLangPicker(storedDefault);
    };

    const defBtn       = document.createElement('button');
    defBtn.className   = 'cvp-lang-default-btn' + (isDefault ? ' is-default' : '');
    defBtn.title       = isDefault ? 'Current default' : 'Make default';
    defBtn.textContent = isDefault ? '★' : '☆';
    defBtn.onclick     = async e => {
      e.stopPropagation();
      await chrome.storage.local.set({ languageOverride: code });
      storedDefault = code;
      sessionLang   = code;
      history = [];  // clear stale conversation context from previous language
      const s = await getStrings();
      updatePanelStrings(s);
      buildLangPicker(storedDefault);
    };

    row.appendChild(langBtn);
    row.appendChild(defBtn);
    picker.appendChild(row);
  });
}

async function createPanel() {
  if (document.getElementById("claude-verse-panel")) return;

  // Load strings for active language before building UI
  const s = await getStrings();
  window.__cvpStrings = s; // store for setLoading

  const panel = document.createElement("div");
  panel.id = "claude-verse-panel";
  panel.innerHTML = `
    <div id="cvp-header">
      <div id="cvp-title"><svg width="24" height="24" viewBox="0 0 128 128" style="flex-shrink:0;border-radius:6px"><rect width="128" height="128" rx="22" fill="#1a1f2e"/><polygon points="22,20 22,90 80,55" fill="#6fdd5a"/><polygon points="52,34 52,90 102,62" fill="#8a9099"/><rect x="76" y="6" width="46" height="22" rx="11" fill="white"/><text x="99" y="21.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="13" fill="#1a1f2e">AI</text></svg><span>${s.title}</span></div>
      <div id="cvp-header-actions">
        <button id="cvp-lang" title="Switch language">🌐</button>
        <button id="cvp-close" title="Close">✕</button>
      </div>
    </div>
    <div id="cvp-lang-picker"></div>
    <div id="cvp-messages"></div>
    <div id="cvp-quick-actions">
      <button data-action="summarise">${s.summarise}</button>
      <button data-action="reply">${s.reply}</button>
      <button data-action="tone">${s.tone}</button>
      <button data-action="action-items">${s.actionItems}</button>
    </div>
    <div id="cvp-input-row">
      <textarea id="cvp-input" placeholder="${s.placeholder}" rows="2"></textarea>
      <button id="cvp-send">${s.send}</button>
    </div>
    <div class="cvp-resizer n" data-dir="n"></div>
    <div class="cvp-resizer s" data-dir="s"></div>
    <div class="cvp-resizer e" data-dir="e"></div>
    <div class="cvp-resizer w" data-dir="w"></div>
    <div class="cvp-resizer nw" data-dir="nw"></div>
    <div class="cvp-resizer ne" data-dir="ne"></div>
    <div class="cvp-resizer sw" data-dir="sw"></div>
    <div class="cvp-resizer se" data-dir="se"></div>
  `;
  document.body.appendChild(panel);
  makeDraggable(panel);
  makeResizable(panel);

  document.getElementById("cvp-close").onclick = () => { sessionLang = null; panel.remove(); };
  document.getElementById("cvp-send").onclick = sendMessage;

  // Language picker — build and wire the globe toggle
  chrome.storage.local.get("languageOverride", ({ languageOverride }) => {
    buildLangPicker(languageOverride || "");
  });
  document.getElementById("cvp-lang").onclick = () => toggleLangPicker();
  document.getElementById("cvp-input").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  panel.querySelectorAll("[data-action]").forEach(btn => {
    btn.onclick = async () => {
      const s   = await getStrings(); // always fetch fresh — picks up any session lang switch
      const ctx = getEmailContext();
      if (!ctx.subject && !ctx.body) {
        appendMessage("assistant", s.noEmail);
        return;
      }

      if (btn.dataset.action === "summarise") {
        history = [];
        appendMessage("user", s.summarising, true);
        setLoading(true);
        const langNote = sessionLang ? ` Write your response in ${LANG_NAMES[sessionLang] || sessionLang}.` : "";
        history = [{ role: "user", content:
          `Summarise this email in 3 bullet points.${langNote}\n\nSubject: ${ctx.subject}\nFrom: ${ctx.sender}\n\n${ctx.body}`
        }];
        const resp = await aiRequest(history);
        setLoading(false);
        if (resp.error) { appendMessage("assistant", `Error: ${resp.error}`); return; }
        history.push({ role: "assistant", content: resp.reply });
        appendMessage("assistant", resp.reply);

      } else if (btn.dataset.action === "reply") {
        const identity = ctx.myName ? `You are replying as ${ctx.myName}.` : "";
        appendMessage("user", s.drafting, true);
        setLoading(true);
        const langNote = sessionLang ? ` Write your response in ${LANG_NAMES[sessionLang] || sessionLang}.` : "";
        const replyMessages = [{ role: "user", content:
          `${identity} Draft a professional reply to this email on behalf of ${ctx.myName || "the recipient"}.${langNote} `
          + `Output ONLY the body text — no subject line, no preamble, no explanation.\n\n`
          + `Subject: ${ctx.subject}\nFrom: ${ctx.sender}\n\n${ctx.body}`
        }];
        const resp = await aiRequest(replyMessages);
        setLoading(false);
        if (resp.error) { appendMessage("assistant", `Error: ${resp.error}`); return; }

        const injected = await triggerReplyAndInject(resp.reply);
        const note = document.createElement("div");
        note.className = "cvp-msg cvp-assistant";
        note.style.cssText = "font-size:12px;opacity:0.7";
        if (injected) {
          note.textContent = s.inserted;
        } else {
          appendMessage("assistant", resp.reply);
          note.textContent = s.insertFail;
          const useBtn = document.createElement("button");
          useBtn.className = "cvp-use-btn"; useBtn.textContent = s.insertBtn;
          useBtn.onclick = () => triggerReplyAndInject(resp.reply)
            .then(ok => { if (!ok) alert("Please click Reply in Verse first, then try again."); });
          note.appendChild(useBtn);
        }
        document.getElementById("cvp-messages").appendChild(note);
        resizePanel();

      } else if (btn.dataset.action === "tone") {
        showTonePicker(ctx, s);

      } else if (btn.dataset.action === "action-items") {
        history = [];
        appendMessage("user", s.findingActions, true);
        setLoading(true);
        const langNote = sessionLang ? ` Write your response in ${LANG_NAMES[sessionLang] || sessionLang}.` : "";
        history = [{ role: "user", content:
          `List all action items or tasks mentioned in this email as a numbered list.${langNote} `
          + `Output ONLY the action items — no preamble, no summary of the email.\n\n`
          + `Subject: ${ctx.subject}\n\n${ctx.body}`
        }];
        const resp = await aiRequest(history);
        setLoading(false);
        if (resp.error) { appendMessage("assistant", `Error: ${resp.error}`); return; }
        history.push({ role: "assistant", content: resp.reply });
        appendMessage("assistant", resp.reply);
      }
    };
  });
}

function appendMessage(role, text, silent = false) {
  const msgs = document.getElementById("cvp-messages");
  const div  = document.createElement("div");
  div.className = `cvp-msg cvp-${role}${silent ? ' cvp-silent' : ''}`;
  div.textContent = text;
  msgs.appendChild(div);
  resizePanel();
}

async function runPrompt(userText) {
  if (!userText.trim()) return;
  appendMessage("user", userText);
  const langNote = sessionLang ? ` Write your response in ${LANG_NAMES[sessionLang] || sessionLang}.` : "";
  history.push({ role: "user", content: userText + langNote });
  setLoading(true);
  const resp = await aiRequest(history);
  setLoading(false);
  if (resp.error) { appendMessage("assistant", `Error: ${resp.error}`); history.pop(); return; }
  appendMessage("assistant", resp.reply);
  history.push({ role: "assistant", content: resp.reply });
}

function sendMessage() {
  const input = document.getElementById("cvp-input");
  const text  = input.value.trim();
  if (!text) return;
  input.value = "";
  runPrompt(text);
}

function addToggleButton() {
  if (document.getElementById("cvp-toggle")) return;
  const btn = document.createElement("button");
  btn.id = "cvp-toggle"; btn.title = "Open Huddo AI Assistant";
  btn.textContent = "✦";
  btn.onclick = () => { history = []; createPanel(); };
  document.body.appendChild(btn);
}

shouldActivate().then(active => {
  if (!active) return;
  const observer = new MutationObserver(() => {
    if (document.querySelector(".lotusShell, #lsMainFrame, .verse-app, .pim-mailread-container, .socpimComposeView")) {
      addToggleButton(); observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  addToggleButton();
});

} // end double-injection guard
