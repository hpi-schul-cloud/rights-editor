export const articles = Object.freeze({
  f: {
    def: { de: 'die', en: 'the' },
    undef: { de: 'eine', en: 'a' },
  },
  m: {
    def: { de: 'der', en: 'the' },
    undef: { de: 'ein', en: 'a' },
  },
  n: {
    def: { de: 'das', en: 'the' },
    undef: { de: 'ein', en: 'a' },
  },
});

var lang = 'en';

export function getLanguage() {
  console.log("get: " + lang);
  return lang;
}

export function setLanguage(l) {
  lang = l;
  console.log("set: " + lang);
}

const placeholders = { de: '<leer>', en: '<empty>' };
export const placeholder = placeholders[lang];
