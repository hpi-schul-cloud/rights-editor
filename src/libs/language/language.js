export function capitalize(text) {
  if (!text) {
    text = '';
  } else {
    text = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  return text;
}