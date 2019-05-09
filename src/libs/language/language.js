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

export function capitalize(text) {
  if (!text) {
    text = '';
  } else {
    text = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  return text;
}
