#!/usr/bin/env node
/**
 * build.js — generuje statyczne strony HTML z szablonu + tłumaczeń.
 * Zero zależności. Uruchom: node build.js
 */
const fs = require('fs');
const path = require('path');

const LOCALES = ['en','pl','de','nl','es','fr','uk','pt','pt-br','ro','cs','sk'];
const BASE_URL = 'https://volcast.app';

// BCP 47 hreflang mapping
const HREFLANG = {
  'en': 'en', 'pl': 'pl', 'de': 'de', 'nl': 'nl',
  'es': 'es', 'fr': 'fr', 'uk': 'uk', 'pt': 'pt',
  'pt-br': 'pt-BR', 'ro': 'ro', 'cs': 'cs', 'sk': 'sk'
};

// Native language names (for language switcher)
const NATIVE_NAMES = {
  'en': 'English', 'pl': 'Polski', 'de': 'Deutsch', 'nl': 'Nederlands',
  'es': 'Español', 'fr': 'Français', 'uk': 'Українська', 'pt': 'Português',
  'pt-br': 'Português (BR)', 'ro': 'Română', 'cs': 'Čeština', 'sk': 'Slovenčina'
};

const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations.json'), 'utf8'));

/** Resolve dot-notation key from nested object */
function resolve(obj, key) {
  return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
}

/** Generate hreflang <link> tags */
function hreflangTags() {
  const tags = LOCALES.map(loc =>
    `  <link rel="alternate" hreflang="${HREFLANG[loc]}" href="${BASE_URL}/${loc}/">`
  );
  tags.push(`  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/en/">`);
  return tags.join('\n');
}

/** Generate language switcher options HTML */
function langSwitcherOptions(currentLocale) {
  return LOCALES.map(loc => {
    const active = loc === currentLocale ? ' active' : '';
    const ariaCurrent = loc === currentLocale ? ' aria-current="page"' : '';
    return `              <a href="/${loc}/" class="lang-option${active}"${ariaCurrent} data-lang="${loc}">${NATIVE_NAMES[loc]}</a>`;
  }).join('\n');
}

const hreflang = hreflangTags();

for (const locale of LOCALES) {
  // Fallback to EN if locale translations missing
  const t = translations[locale] || translations['en'];

  let html = template;

  // Inject hreflang tags
  html = html.replace('{{HREFLANG}}', hreflang);

  // Replace global placeholders
  html = html.replace(/\{\{LOCALE\}\}/g, locale);
  html = html.replace(/\{\{LANG\}\}/g, HREFLANG[locale]);
  html = html.replace(/\{\{BASE_URL\}\}/g, BASE_URL);
  html = html.replace(/\{\{NATIVE_NAME\}\}/g, NATIVE_NAMES[locale]);

  // Inject language switcher options
  html = html.replace('{{LANG_SWITCHER_OPTIONS}}', langSwitcherOptions(locale));

  // Replace {{tj.xxx.yyy}} — JS-safe (escapes single quotes for use in JS strings)
  html = html.replace(/\{\{tj\.([a-zA-Z0-9_.]+)\}\}/g, (_match, key) => {
    const val = resolve(t, key) ?? resolve(translations['en'], key) ?? `[${key}]`;
    return String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  });

  // Replace all {{t.xxx.yyy}} with translation values (HTML context)
  html = html.replace(/\{\{t\.([a-zA-Z0-9_.]+)\}\}/g, (_match, key) => {
    const val = resolve(t, key);
    if (val === null) {
      console.warn(`  ⚠ Missing key: t.${key} for locale: ${locale}`);
      // Fallback to EN
      const fallback = resolve(translations['en'], key);
      return fallback !== null ? fallback : `[${key}]`;
    }
    return val;
  });

  // Write to /{locale}/index.html
  const dir = path.join(__dirname, locale);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`  ✓ ${locale}/index.html`);
}

console.log(`\nDone — ${LOCALES.length} locale pages generated.`);
