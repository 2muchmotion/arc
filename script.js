// Utility Hub - All utilities in one place
const panel = document.getElementById('utility-panel');
const panelContent = document.getElementById('panel-content');
const closeBtn = panel.querySelector('.close-panel');

// Panel controls
document.querySelectorAll('.utility-card').forEach(card => {
  card.addEventListener('click', () => {
    const utility = card.dataset.utility;
    openPanel(utility);
  });
});

closeBtn.addEventListener('click', () => panel.classList.add('hidden'));

function openPanel(utility) {
  panelContent.innerHTML = getUtilityContent(utility);
  panel.classList.remove('hidden');
  initUtility(utility);
}

function getUtilityContent(utility) {
  const contents = {
    calculator: `
      <h2>Calculator</h2>
      <div class="calc-display" id="calc-display">0</div>
      <div class="calc-buttons">
        <button class="calc-btn" data-op="C">C</button>
        <button class="calc-btn" data-op="±">±</button>
        <button class="calc-btn" data-op="%">%</button>
        <button class="calc-btn operator" data-op="/">÷</button>
        <button class="calc-btn" data-op="7">7</button>
        <button class="calc-btn" data-op="8">8</button>
        <button class="calc-btn" data-op="9">9</button>
        <button class="calc-btn operator" data-op="*">×</button>
        <button class="calc-btn" data-op="4">4</button>
        <button class="calc-btn" data-op="5">5</button>
        <button class="calc-btn" data-op="6">6</button>
        <button class="calc-btn operator" data-op="-">−</button>
        <button class="calc-btn" data-op="1">1</button>
        <button class="calc-btn" data-op="2">2</button>
        <button class="calc-btn" data-op="3">3</button>
        <button class="calc-btn operator" data-op="+">+</button>
        <button class="calc-btn span-2" data-op="0">0</button>
        <button class="calc-btn" data-op=".">.</button>
        <button class="calc-btn equals" data-op="=">=</button>
      </div>
    `,
    rng: `
      <h2>Random Generator</h2>
      <div class="input-group">
        <label>Mode</label>
        <select id="rng-mode">
          <option value="number">Number (min-max)</option>
          <option value="dice">Dice Roll</option>
          <option value="password">Password</option>
        </select>
      </div>
      <div id="rng-options"></div>
      <button class="btn" id="rng-generate">Generate</button>
      <div class="rng-result" id="rng-result">—</div>
    `,
    time: `
      <h2>Time Converter</h2>
      <div class="input-group">
        <label>Date & Time (your local)</label>
        <input type="datetime-local" id="time-from">
      </div>
      <div class="input-group">
        <label>View in timezone</label>
        <select id="tz-to">
          <option value="local">Local</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">New York</option>
          <option value="America/Los_Angeles">Los Angeles</option>
          <option value="Europe/London">London</option>
          <option value="Europe/Paris">Paris</option>
          <option value="Asia/Tokyo">Tokyo</option>
          <option value="Asia/Shanghai">Shanghai</option>
        </select>
      </div>
      <div class="rng-result" id="time-result">—</div>
    `,
    gemini: `
      <h2>Gemini AI</h2>
      <div class="input-group">
        <label>API Key <span class="api-key-note">Get one at aistudio.google.com/apikey</span></label>
        <input type="password" id="gemini-api-key" placeholder="Enter your Gemini API key">
      </div>
      <div class="gemini-chat">
        <div class="gemini-messages" id="gemini-messages"></div>
        <div class="gemini-input-row">
          <input type="text" id="gemini-input" placeholder="Ask anything...">
          <button class="btn" id="gemini-send">Send</button>
        </div>
      </div>
    `,
    units: `
      <h2>Unit Converter</h2>
      <div class="input-group">
        <label>Category</label>
        <select id="unit-category">
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temp">Temperature</option>
          <option value="volume">Volume</option>
        </select>
      </div>
      <div class="unit-row">
        <input type="number" id="unit-from" value="1" step="any">
        <select id="unit-from-type"></select>
      </div>
      <div class="unit-row">
        <input type="number" id="unit-to" readonly>
        <select id="unit-to-type"></select>
      </div>
    `,
    color: `
      <h2>Color Picker</h2>
      <div class="input-group">
        <label>Pick a color</label>
        <input type="color" id="color-picker" value="#f59e0b" style="width:100%;height:48px;padding:4px;cursor:pointer;border-radius:8px;">
      </div>
      <div class="color-preview" id="color-preview"></div>
      <div class="color-values" id="color-values">HEX: #f59e0b</div>
      <div class="input-group" style="margin-top:1rem">
        <label>Or paste HEX/RGB</label>
        <input type="text" id="color-input" placeholder="#ff5500 or rgb(255,85,0)">
      </div>
    `,
    base64: `
      <h2>Base64 Encode / Decode</h2>
      <div class="input-group">
        <label>Input</label>
        <textarea class="code-area" id="base64-input" placeholder="Enter text to encode or base64 to decode"></textarea>
      </div>
      <div class="btn-row">
        <button class="btn" id="base64-encode">Encode</button>
        <button class="btn btn-secondary" id="base64-decode">Decode</button>
      </div>
      <div class="output-area" id="base64-output"></div>
    `,
    json: `
      <h2>JSON Formatter</h2>
      <div class="input-group">
        <label>Paste JSON</label>
        <textarea class="code-area" id="json-input" placeholder='{"key": "value"}'></textarea>
      </div>
      <div class="btn-row">
        <button class="btn" id="json-format">Format</button>
        <button class="btn btn-secondary" id="json-minify">Minify</button>
      </div>
      <div class="output-area" id="json-output"></div>
    `
  };
  return contents[utility] || '<p>Utility not found.</p>';
}

function initUtility(utility) {
  const inits = {
    calculator: initCalculator,
    rng: initRng,
    time: initTime,
    gemini: initGemini,
    units: initUnits,
    color: initColor,
    base64: initBase64,
    json: initJson
  };
  (inits[utility] || (() => {}))();
}

// Calculator
function initCalculator() {
  const display = document.getElementById('calc-display');
  let current = '0', prev = '', op = null;

  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.op;
      if (val >= '0' && val <= '9' || val === '.') {
        if (prev === '' && op === null && (val >= '0' && val <= '9') && current !== '0') current = val;
        else if (current === '0' && val !== '.') current = val;
        else if (val === '.' && current.includes('.')) return;
        else current += val;
      } else if (val === 'C') {
        current = '0'; prev = ''; op = null;
      } else if (val === '±') {
        current = String(-parseFloat(current));
      } else if (val === '%') {
        current = String(parseFloat(current) / 100);
      } else if (['+', '-', '*', '/'].includes(val)) {
        if (op && prev !== '') {
          current = String(calc(parseFloat(prev), parseFloat(current), op));
        }
        prev = current; current = '0'; op = val;
      } else if (val === '=') {
        if (op && prev !== '') {
          current = String(calc(parseFloat(prev), parseFloat(current), op));
          prev = ''; op = null;
        }
      }
      display.textContent = current;
    });
  });

  function calc(a, b, o) {
    if (o === '+') return a + b;
    if (o === '-') return a - b;
    if (o === '*') return a * b;
    if (o === '/') return b === 0 ? 'Error' : a / b;
    return b;
  }
}

// RNG
function initRng() {
  const modeSelect = document.getElementById('rng-mode');
  const optionsDiv = document.getElementById('rng-options');
  const resultDiv = document.getElementById('rng-result');
  const generateBtn = document.getElementById('rng-generate');

  function renderOptions() {
    const mode = modeSelect.value;
    if (mode === 'number') {
      optionsDiv.innerHTML = `
        <div class="input-group">
          <label>Min</label>
          <input type="number" id="rng-min" value="1">
        </div>
        <div class="input-group">
          <label>Max</label>
          <input type="number" id="rng-max" value="100">
        </div>
      `;
    } else if (mode === 'dice') {
      optionsDiv.innerHTML = `
        <div class="input-group">
          <label>Dice (e.g. 2d6 for two 6-sided)</label>
          <input type="text" id="rng-dice" value="1d6" placeholder="2d20">
        </div>
      `;
    } else {
      optionsDiv.innerHTML = `
        <div class="input-group">
          <label>Length</label>
          <input type="number" id="rng-len" value="16" min="8" max="64">
        </div>
      `;
    }
  }

  modeSelect.addEventListener('change', renderOptions);
  renderOptions();

  generateBtn.addEventListener('click', () => {
    const mode = modeSelect.value;
    if (mode === 'number') {
      const min = parseInt(document.getElementById('rng-min').value) || 0;
      const max = parseInt(document.getElementById('rng-max').value) || 100;
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      resultDiv.textContent = n;
    } else if (mode === 'dice') {
      const str = (document.getElementById('rng-dice')?.value || '1d6').toLowerCase();
      const m = str.match(/^(\d+)d(\d+)$/);
      if (!m) { resultDiv.textContent = 'Invalid (use e.g. 2d6)'; return; }
      const count = parseInt(m[1]), sides = parseInt(m[2]);
      let total = 0, rolls = [];
      for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * sides) + 1;
        total += r; rolls.push(r);
      }
      resultDiv.textContent = count > 1 ? `${total} (${rolls.join(', ')})` : total;
    } else {
      const len = parseInt(document.getElementById('rng-len')?.value) || 16;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let pw = '';
      for (let i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
      resultDiv.textContent = pw;
    }
  });
}

// Time converter
function initTime() {
  const fromInput = document.getElementById('time-from');
  const tzTo = document.getElementById('tz-to');
  const resultDiv = document.getElementById('time-result');

  const now = new Date();
  fromInput.value = now.toISOString().slice(0, 16);

  function update() {
    const dateStr = fromInput.value;
    if (!dateStr) { resultDiv.textContent = '—'; return; }
    const d = new Date(dateStr);
    const toTz = tzTo.value;
    try {
      const formatted = d.toLocaleString('en-US', { timeZone: toTz === 'local' ? undefined : toTz });
      resultDiv.textContent = formatted;
    } catch {
      resultDiv.textContent = d.toLocaleString();
    }
  }

  fromInput.addEventListener('change', update);
  tzTo.addEventListener('change', update);
  update();
}

// Gemini AI
function initGemini() {
  const apiKeyInput = document.getElementById('gemini-api-key');
  const messagesDiv = document.getElementById('gemini-messages');
  const inputEl = document.getElementById('gemini-input');
  const sendBtn = document.getElementById('gemini-send');

  let history = [];

  async function sendMessage() {
    const apiKey = apiKeyInput.value.trim();
    const text = inputEl.value.trim();
    if (!apiKey) {
      addMessage('error', 'Please enter your Gemini API key.');
      return;
    }
    if (!text) return;

    addMessage('user', text);
    inputEl.value = '';
    history.push({ role: 'user', parts: [{ text }] });

    const placeholder = addMessage('assistant', '...');
    sendBtn.disabled = true;

    try {
      const contents = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: m.parts
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: { temperature: 0.7 }
          })
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
      history.push({ role: 'model', parts: [{ text: reply }] });
      placeholder.textContent = reply;
      placeholder.classList.remove('loading');
    } catch (err) {
      placeholder.textContent = 'Error: ' + err.message;
      placeholder.classList.add('error');
      placeholder.classList.remove('loading');
      history.pop();
    }
    sendBtn.disabled = false;
  }

  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `gemini-msg ${role}`;
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return div;
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
}

// Unit converter
const UNITS = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
  temp: { C: v => v, F: v => (v - 32) * 5/9, K: v => v - 273.15 },
  volume: { L: 1, mL: 0.001, gal: 3.78541, qt: 0.946353, cup: 0.236588 }
};

function initUnits() {
  const catSelect = document.getElementById('unit-category');
  const fromInput = document.getElementById('unit-from');
  const fromType = document.getElementById('unit-from-type');
  const toInput = document.getElementById('unit-to');
  const toType = document.getElementById('unit-to-type');

  function populate() {
    const cat = catSelect.value;
    const units = Object.keys(UNITS[cat]);
    fromType.innerHTML = toType.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    convert();
  }

  function convert() {
    const cat = catSelect.value;
    const val = parseFloat(fromInput.value) || 0;
    const from = fromType.value;
    const to = toType.value;

    if (cat === 'temp') {
      const toBase = UNITS.temp[from](val);
      const fromBase = v => {
        if (to === 'C') return v;
        if (to === 'F') return v * 9/5 + 32;
        if (to === 'K') return v + 273.15;
        return v;
      };
      toInput.value = fromBase(toBase).toFixed(2);
    } else {
      const base = val * UNITS[cat][from];
      toInput.value = (base / UNITS[cat][to]).toFixed(6);
    }
  }

  catSelect.addEventListener('change', populate);
  fromInput.addEventListener('input', convert);
  fromType.addEventListener('change', convert);
  toType.addEventListener('change', convert);
  populate();
}

// Color picker
function initColor() {
  const picker = document.getElementById('color-picker');
  const preview = document.getElementById('color-preview');
  const values = document.getElementById('color-values');
  const input = document.getElementById('color-input');

  function update(color) {
    preview.style.background = color;
    let hex = color;
    if (color.startsWith('rgb')) {
      const m = color.match(/\d+/g);
      if (m) hex = '#' + m.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    }
    if (hex.startsWith('#')) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      values.textContent = `HEX: ${hex}  |  RGB: rgb(${r}, ${g}, ${b})`;
    } else {
      values.textContent = `HEX: ${hex}`;
    }
  }

  picker.addEventListener('input', () => {
    update(picker.value);
    input.value = picker.value;
  });

  input.addEventListener('input', () => {
    const v = input.value.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(v) || /^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(v)) {
      preview.style.background = v;
      if (v.startsWith('#')) picker.value = v;
      update(v);
    }
  });

  update(picker.value);
}

// Base64
function initBase64() {
  const input = document.getElementById('base64-input');
  const output = document.getElementById('base64-output');
  document.getElementById('base64-encode').addEventListener('click', () => {
    try {
      output.textContent = btoa(unescape(encodeURIComponent(input.value)));
      output.classList.remove('error');
    } catch (e) {
      output.textContent = 'Error: ' + e.message;
      output.classList.add('error');
    }
  });
  document.getElementById('base64-decode').addEventListener('click', () => {
    try {
      output.textContent = decodeURIComponent(escape(atob(input.value.trim())));
      output.classList.remove('error');
    } catch (e) {
      output.textContent = 'Error: Invalid Base64';
      output.classList.add('error');
    }
  });
}

// JSON
function initJson() {
  const input = document.getElementById('json-input');
  const output = document.getElementById('json-output');
  document.getElementById('json-format').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value);
      output.textContent = JSON.stringify(parsed, null, 2);
      output.classList.remove('error');
    } catch (e) {
      output.textContent = 'Error: ' + e.message;
      output.classList.add('error');
    }
  });
  document.getElementById('json-minify').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value);
      output.textContent = JSON.stringify(parsed);
      output.classList.remove('error');
    } catch (e) {
      output.textContent = 'Error: ' + e.message;
      output.classList.add('error');
    }
  });
}
