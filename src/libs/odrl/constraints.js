export class Constraint {
  constructor(id) {
    this.id = id;
    this.name = '<leer>';
    this.leftOperand = '';

    // TODO: make this less ugly
    this.rightOperandList = [];
    this.rightOperandNumber = 0;
    this.rightoperandListtr = '';

    this.operator = '';
    this.unit = '';
    this.type = '';
  }
}

export const operandList = [
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
};
