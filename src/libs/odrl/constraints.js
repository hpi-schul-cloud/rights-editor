const storageDevice = [
  'http://www.example.org/storage-device/magnetic-tape',
  'http://www.example.org/storage-device/hard-disk',
  'http://www.example.org/storage-device/cd',
  'http://www.example.org/storage-device/dvd',
];

const groups = [
  'http://www.example.org/person/student',
  'http://www.example.org/person/teacher',
  'http://www.example.org/person/parent',
  'http://www.example.org/person/administrator',
];

const communication = [
  'http://www.example.org/communication/email',
  'http://www.example.org/communication/usb',
  'http://www.example.org/communication/cloud',
];

const fileFormat = [
  'http://www.example.org/file-format/mp3',
  'http://www.example.org/file-format/mp4',
  'http://www.example.org/file-format/pdf',
  'http://www.example.org/file-format/doc',
  'http://www.example.org/file-format/ppt',
];

const states = [
  'http://schema.org/State/Germany/Baden-Württemberg',
  'http://schema.org/State/Germany/Bayern',
  'http://schema.org/State/Germany/Berlin',
  'http://schema.org/State/Germany/Brandenburg',
  'http://schema.org/State/Germany/Bremen',
  'http://schema.org/State/Germany/Hamburg',
  'http://schema.org/State/Germany/Hessen',
  'http://schema.org/State/Germany/Mecklenburg-Vorpommern',
  'http://schema.org/State/Germany/Niedersachsen',
  'http://schema.org/State/Germany/Nordrhein-Westfalen',
  'http://schema.org/State/Germany/Rheinland-Pfalz',
  'http://schema.org/State/Germany/Saarland',
  'http://schema.org/State/Germany/Sachsen',
  'http://schema.org/State/Germany/Sachsen-Anhalt',
  'http://schema.org/State/Germany/Schleswig-Holstein',
  'http://schema.org/State/Germany/Thüringen',
];

const resolutions = [
  'http://www.example.org/resolution/tv/hd',
  'http://www.example.org/resolution/tv/full-hd',
  'http://www.example.org/resolition/tv/4k',
];

export const operandList = [
  'http://www.example.org/state',
  'http://www.example.org/group-identity',
  'http://www.example.org/age',
  'http://www.example.org/time-of-use',
  'http://www.example.org/user-amount',
  'http://www.example.org/storage-device',
  'http://www.example.org/share',
  'http://www.example.org/amount',
  'http://wwww.example.org/resolution',
  'http://www.example.org/participants',
  'http://www.example.org/distribution-method',
  'http://www.example.org/file-format',
  'http://www.example.org/pay-amount',
  'http://www.example.org/tv-resolution',
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

export const logicalOperatorList = [
  'or',
  'xone',
  'and',
];

export const unitList = [
  'http://www.example.org/resource/year',
  'http://www.example.org/resource/day',
  'http://www.example.org/resource/hour',
  'http://www.example.org/resource/user',
  'http://www.example.org/resource/percentage',
  'http://www.example.org/resource/piece',
  'http://www.example.org/resource/dpi',
  'http://www.example.org/resource/ppi',
  'http://www.example.org/resource/euro',
  'http://www.example.org/resource/dollar',
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
    units: [unitList[5]],
  },
  'http://wwww.example.org/resolution': {
    operators: operatorList,
    units: [unitList[6], unitList[7]],
  },
  'http://www.example.org/participants': {
    operators: [operatorList[0]],
    list: [groups[0], groups[1], groups[2]],
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
    units: [unitList[8], unitList[9]],
  },
  'http://www.example.org/tv-resolution': {
    operators: operatorList,
    list: resolutions,
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
    operands: [operandList[6], operandList[7], operandList[1], operandList[10], operandList[11]],
  },
  'http://www.w3.org/ns/odrl/2/compensate': {
    operands: [operandList[12]],
  },
  'http://www.w3.org/ns/odrl/2/present': {
    operands: [operandList[6], operandList[7], operandList[9]],
  },
  'http://www.w3.org/ns/odrl/2/public-screening': {
    operands: [operandList[6], operandList[13]],
  },
  'http://www.w3.org/ns/odrl/2/download': {
    operands: [operandList[6]],
  },
  'http://www.w3.org/ns/odrl/2/streaming': {
    operands: [operandList[6], operandList[13]],
  },
  'http://www.w3.org/ns/odrl/2/save': {
    operands: [operandList[5], operandList[11]],
  },
  'http://schul-could.org/license-vocabulary/thumbnailerzeugung': {
    operands: [operandList[6]],
  },
  'http://schul-could.org/license-vocabulary/oeffentliche-zugaenglichmachung-von-bearbeitungen': {
    operands: [operandList[6]],
  },
  'http://schul-could.org/license-vocabulary/remix': {
    operands: [operandList[6]],
  },
});
