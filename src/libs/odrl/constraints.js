/* list of selectable options */

const storageDevice = {
  de: [
    'Magnetband',
    'Festplatte',
    'CD/DVD',
  ],
  en: [
    'magnetic tape',
    'hard disk',
    'CD/DVD',
  ],
};

const attendees = {
  de: [
    'Schüler',
    'Lehrer',
    'Eltern',
  ],
  en: [
    'students',
    'teachers',
    'parents',
  ],
};

const communication = {
  de: [
    'E-Mail',
    'USB-Stick',
    'Cloud',
  ],
  en: [
    'e-mail',
    'flash drive',
    'cloud',
  ],
};

const fileFormat = [
  '.mp3',
  '.mp4',
  '.pdf',
  '.doc',
  '.ppt',
];

export const states = {
  de: [
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
  ],
  en: [
    'Arizona',
    'California',
    'Florida',
    'Michigan',
    'New York',
    'Texas',
  ],
};

export const groups = {
  de: [
    'Schüler',
    'Lehrer',
    'Eltern',
    'Verwaltung',
  ],
  en: [
    'students',
    'teachers',
    'parents',
    'administrators',
  ],
};

export const operandList = [
  { odrl: 'http://www.example.org/state', de: 'Bundesland', en: 'state' },
  { odrl: 'http://www.example.org/group-identity', de: 'Gruppenzugehörigkeit', en: 'group identity' },
  { odrl: 'http://www.example.org/age', de: 'Alter', en: 'age' },
  { odrl: 'http://www.example.org/time-of-use', de: 'Nutzungsdauer', en: 'time of use' },
  { odrl: 'http://www.example.org/user-amount', de: 'Nutzeranzahl', en: 'user amount' },
  { odrl: 'http://www.example.org/storage-device', de: 'Speichermedium', en: 'storage device' },
  { odrl: 'http://www.example.org/share', de: 'Anteil', en: 'share' },
  { odrl: 'http://www.example.org/amount', de: 'Anzahl', en: 'amount' },
  { odrl: 'http://wwww.example.org/resolution', de: 'Auflösung', en: 'resolution' },
  { odrl: 'http://www.example.org/participants', de: 'Teilnehmer', en: 'participants' },
  { odrl: 'http://www.example.org/distribution-method', de: 'Verbreitungsmethode', en: 'distribution method' },
  { odrl: 'http://www.example.org/file-format', de: 'Dateiformat', en: 'file format' },
  { odrl: 'http://www.example.org/pay-amount', de: 'Geldbetrag', en: 'pay amount' },
];

export const constraintOnlyOperandList = [
  operandList[0],
  operandList[1],
  operandList[2],
  operandList[3],
  operandList[4],
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
    text: { de: 'UND/ODER', en: 'AND/OR' },
  },
  xone: {
    text: { de: 'ODER', en: 'OR' },
  },
  and: {
    text: { de: 'UND', en: 'AND' },
  },
};

export const unitList = [
  { odrl: 'http://www.example.org/resource/year', de: 'Jahre', en: 'years' },
  { odrl: 'http://www.example.org/resource/day', de: 'Tage', en: 'days' },
  { odrl: 'http://www.example.org/resource/hour', de: 'Stunden', en: 'hours' },
  { odrl: 'http://www.example.org/resource/user', de: 'Nutzer', en: 'users' },
  { odrl: 'http://www.example.org/resource/day', de: '%', en: '% ' },
  { odrl: 'http://www.example.org/resource/piece', de: 'Stück', en: 'pieces' },
  { odrl: 'http://www.example.org/resource/person', de: 'Personen', en: 'people' },
  { odrl: 'http://www.example.org/resource/dpi', de: 'dpi', en: 'dpi' },
  { odrl: 'http://www.example.org/resource/ppi', de: 'ppi', en: 'ppi' },
  { odrl: 'http://www.example.org/resource/euro', de: '€', en: '€' },
  { odrl: 'http://www.example.org/resource/dollar', de: '$', en: '$' },
];

export const operandMapping = Object.freeze({
  'http://www.example.org/state': {
    operators: [operatorList[0]],
    list: states,
  },
  'http://www.example.org/group-identity': {
    operators: [operatorList[0]],
    list: groups,
  },
  'http://www.example.org/age': {
    operators: operatorList,
    units: [unitList[0]],
  },
  'http://www.example.org/time-of-use': {
    operators: operatorList,
    units: [unitList[0], unitList[1], unitList[2]],
  },
  'http://www.example.org/user-amount': {
    operators: operatorList,
    units: [unitList[3]],
  },
  'http://www.example.org/storage-device': {
    operators: [operatorList[0]],
    list: storageDevice,
  },
  'http://www.example.org/share': {
    operators: operatorList,
    units: [unitList[4]],
  },
  'http://www.example.org/amount': {
    operators: operatorList,
    units: [unitList[5], unitList[6]],
  },
  'http://wwww.example.org/resolution': {
    operators: operatorList,
    units: [unitList[7], unitList[8]],
  },
  'http://www.example.org/participants': {
    operators: [operatorList[0]],
    list: attendees,
  },
  'http://www.example.org/distribution-method': {
    operators: [operatorList[0]],
    list: communication,
  },
  'http://www.example.org/file-format': {
    operators: [operatorList[0]],
    list: fileFormat,
  },
  'http://www.example.org/pay-amount': {
    operators: operatorList,
    units: [unitList[9], unitList[10]],
  },
});

export const actionToRefinements = Object.freeze({
  'http://www.w3.org/ns/odrl/2/play': {
    operands: [operandList[6], operandList[9]],
  },
  'http://www.w3.org/ns/odrl/2/archive': {
    operands: [operandList[5], operandList[6], operandList[7]],
  },
  'http://www.w3.org/ns/odrl/2/derive': {
    operands: [operandList[6]],
  },
  'http://www.w3.org/ns/odrl/2/print': {
    operands: [operandList[6], operandList[7], operandList[8]],
  },
  'http://www.w3.org/ns/odrl/2/reproduce': {
    operands: [operandList[7], operandList[11]],
  },
  'http://www.w3.org/ns/odrl/2/distribute': {
    operands: [operandList[6], operandList[7], operandList[9], operandList[10], operandList[11]],
  },
  'http://www.w3.org/ns/odrl/2/compensate': {
    operands: [operandList[12]],
  },
  'http://www.w3.org/ns/odrl/2/present': {
    operands: [operandList[6], operandList[7], operandList[9]],
  },
});
