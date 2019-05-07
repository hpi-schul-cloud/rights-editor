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

export function startSentence(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const placeholders = { de: '<leer>', en: '<empty>' };

export const lang = 'en';
export const placeholder = placeholders[lang];
