export const RuleTypes = Object.freeze({
  permission: {
    gender: 'f',
    hasParentRule: false,
    subrule: 'duty',
    icon: 'far fa-check-circle',
  },
  obligation: {
    gender: 'f',
    hasParentRule: false,
    subrule: 'consequence',
    icon: 'far fa-handshake',
  },
  prohibition: {
    gender: 'n',
    hasParentRule: false,
    subrule: 'remedy',
    icon: 'fas fa-ban',
  },
  duty: {
    gender: 'f',
    hasParentRule: true,
    subrule: 'consequence',
    icon: 'far fa-hand-point-up',
  },
  consequence: {
    gender: 'f',
    hasParentRule: true,
    subrule: '',
    icon: 'fas fa-gavel',
  },
  remedy: {
    gender: 'f',
    hasParentRule: true,
    subrule: '',
    icon: 'fas fa-balance-scale',
  },
});
