export const operandList = [
  'hmmm',
  'well',
  'dunno',
];

export const operatorList = [
  { symbol: '=', identifier: 'eq' },
  { symbol: '<', identifier: 'lt' },
  { symbol: '≤', identifier: 'lteq' },
  { symbol: '>', identifier: 'gt' },
  { symbol: '≥', identifier: 'gteq' },
];

export const unitList = [
  'xd',
  'xp',
  'lol',
  'rofl',
];

export const operandMapping = {
  hmmm: {
    operators: [operatorList[0]],
    list: [unitList[0], unitList[1], unitList[2]],
  },
  well: {
    operators: [operatorList[0]],
    list: [unitList[0], unitList[1], unitList[2]],
  },
  dunno: {
    operators: operatorList,
    units: [unitList[0]],
  },
};
