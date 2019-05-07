export const operandList = [
  'Bundesland',
  'Gruppenzugehörigkeit',
  'Alter',
  'Nutzungsdauer',
  'Nutzeranzahl',
  'Speichermedium',
  'Anteil',
  'Anzahl',
  'Auflösung',
  'Teilnehmer',
  'Verbreitungsmethode',
  'Dateiformat',
  'Betrag',
];

export const constraintOnlyOperandList = [
  'Bundesland',
  'Gruppenzugehörigkeit',
  'Alter',
  'Nutzungsdauer',
  'Nutzeranzahl',
];

export const operatorList = [
  { symbol: '=', identifier: 'eq' },
  { symbol: '<', identifier: 'lt' },
  { symbol: '≤', identifier: 'lteq' },
  { symbol: '>', identifier: 'gt' },
  { symbol: '≥', identifier: 'gteq' },
];

export const logicalOperatorList = {
  or: {
    text: { de: 'UND/ODER', en: 'AND/OR' }
  },
  xone: {
    text: { de: 'ODER', en: 'OR' },
  },
  and: {
    text: { de: 'UND', en: 'AND' },
  },
};

const storageMedium = [
  'Magnetband',
  'Festplatte',
  'CD/DVD',
];

const attendees = [
  'Schüler',
  'Lehrer',
  'Eltern',
  'Verwaltung',
];

const communication = [
  'E-Mail',
  'USB-Stick',
  'Cloud',
];

const fileFormat = [
  '.mp3',
  '.mp4',
  '.pdf',
  '.doc',
  '.ppt',
];

export const states = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];

export const groups = [
  'Lehrer',
  'Schüler',
  'Verwaltung',
];

export const unitList = [
  'Jahre',
  'Tage',
  'Stunden',
  'Nutzer',
  '%',
  'Stück',
  'Personen',
  'dpi',
  'ppi',
  '€',
];

export const operandMapping = {
  Bundesland: {
    operators: [operatorList[0]],
    list: states,
  },
  Gruppenzugehörigkeit: {
    operators: [operatorList[0]],
    list: groups,
  },
  Alter: {
    operators: operatorList,
    units: [unitList[0]],
  },
  Nutzungsdauer: {
    operators: operatorList,
    units: [unitList[0], unitList[1], unitList[2]],
  },
  Nutzeranzahl: {
    operators: operatorList,
    units: [unitList[3]],
  },
  Speichermedium: {
    operators: [operatorList[0]],
    list: storageMedium,
  },
  Anteil: {
    operators: operatorList,
    units: [unitList[4]],
  },
  Anzahl: {
    operators: operatorList,
    units: [unitList[5], unitList[6]],
  },
  Auflösung: {
    operators: operatorList,
    units: [unitList[7], unitList[8]],
  },
  Teilnehmer: {
    operators: [operatorList[0]],
    list: attendees,
  },
  Verbreitungsmethode: {
    operators: [operatorList[0]],
    list: communication,
  },
  Dateiformat: {
    operators: [operatorList[0]],
    list: fileFormat,
  },
  Betrag: {
    operators: operatorList,
    units: [unitList[9]],
  },
};

export const actionToRefinements = Object.freeze({
  // german version
  Archivieren: {
    operands: [operandList[5], operandList[6], operandList[7]],
  },
  Bearbeiten: {
    operands: [operandList[6]],
  },
  Drucken: {
    operands: [operandList[6], operandList[7], operandList[8]],
  },
  Kopieren: {
    operands: [operandList[7], operandList[11]],
  },
  Verbreiten: {
    operands: [operandList[6], operandList[7], operandList[9], operandList[10], operandList[11]],
  },
  Verkaufen: {
    operands: [operandList[12]],
  },
  Vorführen: {
    operands: [operandList[6], operandList[7], operandList[9]],
  },
  Zitieren: {
    operands: [operandList[6]],
  },
  // english version
  archiving: {
    operands: [operandList[5], operandList[6], operandList[7]],
  },
  editing: {
    operands: [operandList[6]],
  },
  printing: {
    operands: [operandList[6], operandList[7], operandList[8]],
  },
  copying: {
    operands: [operandList[7], operandList[11]],
  },
  distributing: {
    operands: [operandList[6], operandList[7], operandList[9], operandList[10], operandList[11]],
  },
  selling: {
    operands: [operandList[12]],
  },
  demonstrating: {
    operands: [operandList[6], operandList[7], operandList[9]],
  },
  quoting: {
    operands: [operandList[6]],
  },
});
