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

/* function startSentence(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
} */

export const lang = 'en';

const placeholders = { de: '<leer>', en: '<empty>' };
export const placeholder = placeholders[lang];
