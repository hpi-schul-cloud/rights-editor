export const operandList = [
  'Speichermedium',
  'Anteil',
  'Anzahl',
  'Auflösung',
  'Teilnehmer',
  'Verbreitungsmethode',
  'Dateiformat',
  'Betrag'
];

const storageMedium = [
  'Magnetband',
  'Festplatte',
  'CD/DVD'
];

const attendees = [
  'Schüler',
  'Lehrer',
  'Eltern',
  'Verwaltung'
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

export const operatorList = [
  { symbol: '=', identifier: 'eq' },
  { symbol: '<', identifier: 'lt' },
  { symbol: '≤', identifier: 'lteq' },
  { symbol: '>', identifier: 'gt' },
  { symbol: '≥', identifier: 'gteq' },
];

export const unitList = [
  '%',
  'Stück',
  'Personen',
  'dpi',
  'ppi',
  '€'
];

export const operandMapping = {
  Speichermedium: {
    operators: [operatorList[0]],
    list: storageMedium,
  },
  Anteil: {
    operators: operatorList,
    units: [unitList[0]],
  },
  Anzahl: {
    operators: operatorList,
    units: [unitList[1], unitList[2]],
  },
  Auflösung: {
    operators: operatorList,
    units: [unitList[3], unitList[4]],
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
    units: [unitList[5]],
  }
};

export const actionToRefinement = Object.freeze({
  Archivieren: {
    operands: [operandList[0], operandList[1], operandList[2]],
  },
  Bearbeiten: {
    operands: [operandList[1]],
  },
  Drucken: {
    operands: [operandList[1], operandList[2], operandList[3]],
  },
  Kopieren: {
    operands: [operandList[2], operandList[6]],
  },
  Verbreiten: {
    operands: [operandList[1], operandList[2], operandList[4], operandList[5], operandList[6]],
  },
  Verkaufen: {
    operands: [operandList[7]],
  },
  Vorführen: {
    operands: [operandList[1], operandList[2], operandList[4]],
  },
  Zitieren: {
    operands: [operandList[1]],
  },
});
