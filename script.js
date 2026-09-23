// ---------- Unicode font converters ----------
function mathMap(upStart, lowStart, digStart, exceptions) {
  const exc = exceptions || {};
  return function (ch) {
    if (exc[ch]) return exc[ch];
    const c = ch.charCodeAt(0);
    if (c >= 65 && c <= 90) return String.fromCodePoint(upStart + c - 65);
    if (c >= 97 && c <= 122) return String.fromCodePoint((lowStart != null ? lowStart : upStart) + c - 97);
    if (digStart != null && c >= 48 && c <= 57) return String.fromCodePoint(digStart + c - 48);
    return ch;
  };
}

const smallCapsLetters = Array.from("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ");
const flipMap = { a:"ɐ", b:"q", c:"ɔ", d:"p", e:"ǝ", f:"ɟ", g:"ƃ", h:"ɥ", i:"ᴉ", j:"ɾ", k:"ʞ", l:"l", m:"ɯ", n:"u", o:"o", p:"d", q:"b", r:"ɹ", s:"s", t:"ʇ", u:"n", v:"ʌ", w:"ʍ", x:"x", y:"ʎ", z:"z" };

const fonts = {
  bold: mathMap(0x1D400, 0x1D41A, 0x1D7CE),
  italic: mathMap(0x1D434, 0x1D44E, null, { h: "ℎ" }),
  boldItalic: mathMap(0x1D468, 0x1D482),
  script: mathMap(0x1D49C, 0x1D4B6, null, { B:"ℬ", E:"ℰ", F:"ℱ", H:"ℋ", I:"ℐ", L:"ℒ", M:"ℳ", R:"ℛ", e:"ℯ", g:"ℊ", o:"ℴ" }),
  boldScript: mathMap(0x1D4D0, 0x1D4EA),
  gothic: mathMap(0x1D504, 0x1D51E, null, { C:"ℭ", H:"ℌ", I:"ℑ", R:"ℜ", Z:"ℨ" }),
  boldGothic: mathMap(0x1D56C, 0x1D586),
  double: mathMap(0x1D538, 0x1D552, 0x1D7D8, { C:"ℂ", H:"ℍ", N:"ℕ", P:"ℙ", Q:"ℚ", R:"ℝ", Z:"ℤ" }),
  sans: mathMap(0x1D5A0, 0x1D5BA, 0x1D7E2),
  sansBold: mathMap(0x1D5D4, 0x1D5EE, 0x1D7EC),
  sansItalic: mathMap(0x1D608, 0x1D622),
  sansBoldItalic: mathMap(0x1D63C, 0x1D656),
  mono: mathMap(0x1D670, 0x1D68A, 0x1D7F6),
  wide: mathMap(0xFF21, 0xFF41, 0xFF10),
  darkBubble: mathMap(0x1F150, null),
  square: mathMap(0x1F130, null),
  darkSquare: mathMap(0x1F170, null),
  bubble: function (ch) {
    const c = ch.charCodeAt(0);
    if (c >= 65 && c <= 90) return String.fromCodePoint(0x24B6 + c - 65);
    if (c >= 97 && c <= 122) return String.fromCodePoint(0x24D0 + c - 97);
    if (ch === "0") return "⓪";
    if (c >= 49 && c <= 57) return String.fromCodePoint(0x2460 + c - 49);
    return ch;
  },
  smallCaps: function (ch) {
    const i = ch.toLowerCase().charCodeAt(0) - 97;
    return i >= 0 && i < 26 ? smallCapsLetters[i] : ch;
  }
};

const conv = (text, key) => Array.from(text).map(fonts[key]).join("");
const mark = (text, m) => Array.from(text).map(c => (c === " " ? c : c + m)).join("");
const between = (text, s) => Array.from(text).join(s);
const flip = text => Array.from(text.toLowerCase()).map(c => flipMap[c] || c).reverse().join("");

// ---------- Style list ----------
const styles = [
  // Gaming
  { name: "Royal wings", cat: "gaming", fn: t => "꧁༺ " + conv(t, "boldScript") + " ༻꧂" },
  { name: "Legend", cat: "gaming", fn: t => "亗 " + conv(t, "boldGothic") + " 亗" },
  { name: "Star storm", cat: "gaming", fn: t => "★彡 " + conv(t, "sansBold") + " 彡★" },
  { name: "Pro player", cat: "gaming", fn: t => "ᴾᴿᴼ✘" + conv(t, "smallCaps") },
  { name: "Killer", cat: "gaming", fn: t => "×͜× " + conv(t, "bold") },
  { name: "Warrior", cat: "gaming", fn: t => "☬ " + conv(t, "gothic") + " ☬" },
  { name: "Thunder", cat: "gaming", fn: t => "⚡" + conv(t, "darkSquare") + "⚡" },
  { name: "Sniper", cat: "gaming", fn: t => "▄︻デ " + conv(t, "sansBold") + " ══━一" },
  { name: "Boss", cat: "gaming", fn: t => "々" + conv(t, "boldItalic") + "々" },
  { name: "Ghost", cat: "gaming", fn: t => "『" + conv(t, "mono") + "』" },

  // Fonts
  { name: "Bold serif", cat: "fonts", fn: t => conv(t, "bold") },
  { name: "Italic", cat: "fonts", fn: t => conv(t, "italic") },
  { name: "Bold italic", cat: "fonts", fn: t => conv(t, "boldItalic") },
  { name: "Script", cat: "fonts", fn: t => conv(t, "script") },
  { name: "Bold script", cat: "fonts", fn: t => conv(t, "boldScript") },
  { name: "Gothic", cat: "fonts", fn: t => conv(t, "gothic") },
  { name: "Bold gothic", cat: "fonts", fn: t => conv(t, "boldGothic") },
  { name: "Double struck", cat: "fonts", fn: t => conv(t, "double") },
  { name: "Sans", cat: "fonts", fn: t => conv(t, "sans") },
  { name: "Sans bold", cat: "fonts", fn: t => conv(t, "sansBold") },
  { name: "Sans italic", cat: "fonts", fn: t => conv(t, "sansItalic") },
  { name: "Sans bold italic", cat: "fonts", fn: t => conv(t, "sansBoldItalic") },
  { name: "Monospace", cat: "fonts", fn: t => conv(t, "mono") },
  { name: "Wide", cat: "fonts", fn: t => conv(t, "wide") },
  { name: "Small caps", cat: "fonts", fn: t => conv(t, "smallCaps") },
  { name: "Bubbles", cat: "fonts", fn: t => conv(t, "bubble") },
  { name: "Dark bubbles", cat: "fonts", fn: t => conv(t, "darkBubble") },
  { name: "Squares", cat: "fonts", fn: t => conv(t, "square") },
  { name: "Dark squares", cat: "fonts", fn: t => conv(t, "darkSquare") },

  // Decorated
  { name: "Flowers", cat: "decorated", fn: t => "✿ " + conv(t, "script") + " ✿" },
  { name: "Hearts", cat: "decorated", fn: t => "♡ " + conv(t, "italic") + " ♡" },
  { name: "Framed", cat: "decorated", fn: t => "『" + conv(t, "double") + "』" },
  { name: "Sparkle", cat: "decorated", fn: t => "✦ " + conv(t, "boldItalic") + " ✦" },
  { name: "Soft dots", cat: "decorated", fn: t => "•°" + conv(t, "smallCaps") + "°•" },
  { name: "Birds", cat: "decorated", fn: t => "𓆩" + conv(t, "script") + "𓆪" },
  { name: "Night sky", cat: "decorated", fn: t => "⋆｡°✩ " + conv(t, "sansItalic") + " ✩°｡⋆" },
  { name: "Brackets", cat: "decorated", fn: t => "「" + conv(t, "wide") + "」" },

  // Effects
  { name: "Strikethrough", cat: "effects", fn: t => mark(t, "\u0336") },
  { name: "Underline", cat: "effects", fn: t => mark(t, "\u0332") },
  { name: "Slashed", cat: "effects", fn: t => mark(t, "\u0338") },
  { name: "Wavy", cat: "effects", fn: t => mark(t, "\u0330") },
  { name: "Upside down", cat: "effects", fn: t => flip(t) },
  { name: "Spaced", cat: "effects", fn: t => between(t, " ") },
  { name: "Hearts between", cat: "effects", fn: t => between(t, "♥") },
  { name: "Stars between", cat: "effects", fn: t => between(t, "★") }
];

// ---------- UI ----------
const input = document.getElementById("nameInput");
const grid = document.getElementById("grid");
const countEl = document.getElementById("styleCount");
const spotlightText = document.getElementById("spotlightText");
const toast = document.getElementById("toast");
const chips = document.querySelectorAll(".chip");
const spotlightPool = styles.filter(s => s.cat === "gaming" || s.cat === "decorated");
const randomNames = ["Shadow", "Ghost", "Legend", "Viper", "Phoenix", "Queen", "Rider", "Storm", "Ninja", "Blaze", "Angel", "Hunter"];

let currentCat = "all";
let spotIndex = 0;
let toastTimer;

function getName() {
  return input.value.trim() || "Stylish";
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function copyText(text, el) {
  const done = () => {
    showToast("Copied: " + text);
    if (el) {
      el.classList.add("copied");
      const label = el.querySelector(".item-copy");
      if (label) label.textContent = "Copied";
      setTimeout(() => {
        el.classList.remove("copied");
        if (label) label.textContent = "Copy";
      }, 1400);
    }
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { showToast("Press and hold to copy"); }
  ta.remove();
}

function render() {
  const name = getName();
  const list = currentCat === "all" ? styles : styles.filter(s => s.cat === currentCat);
  grid.innerHTML = "";
  const frag = document.createDocumentFragment();

  list.forEach(style => {
    const result = style.fn(name);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "item";
    btn.setAttribute("aria-label", "Copy " + style.name + " style");

    const text = document.createElement("span");
    text.className = "item-text";
    text.textContent = result;

    const foot = document.createElement("span");
    foot.className = "item-foot";
    const label = document.createElement("span");
    label.textContent = style.name;
    const copy = document.createElement("span");
    copy.className = "item-copy";
    copy.textContent = "Copy";
    foot.append(label, copy);

    btn.append(text, foot);
    btn.addEventListener("click", () => copyText(result, btn));
    frag.appendChild(btn);
  });

  grid.appendChild(frag);
  countEl.textContent = list.length;
  updateSpotlight();
}

function updateSpotlight() {
  spotlightText.textContent = spotlightPool[spotIndex].fn(getName());
}

input.addEventListener("input", render);

document.getElementById("clearBtn").addEventListener("click", () => {
  input.value = "";
  input.focus();
  render();
});

document.getElementById("randomBtn").addEventListener("click", () => {
  let next;
  do { next = randomNames[Math.floor(Math.random() * randomNames.length)]; } while (next === input.value);
  input.value = next;
  render();
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  spotIndex = (spotIndex + 1) % spotlightPool.length;
  updateSpotlight();
});

document.getElementById("spotlightCopy").addEventListener("click", () => {
  copyText(spotlightText.textContent);
});

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => { c.classList.remove("active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("active");
    chip.setAttribute("aria-selected", "true");
    currentCat = chip.dataset.cat;
    render();
  });
});

render();
