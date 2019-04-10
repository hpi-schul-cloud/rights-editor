export const RuleTypes = Object.freeze({
  permission: {
    name: 'Erlaubnis',
    definiteArticle: 'die',
    indefiniteArticle: 'eine',
    parentrule: '',
    subrule: 'duty',
    descriptionBefore: ' ist erlaubt.',
    descriptionAfter: '',
    icon: 'far fa-check-circle',
  },
  obligation: {
    name: 'Pflicht',
    definiteArticle: 'die',
    indefiniteArticle: 'eine',
    parentrule: '',
    subrule: 'consequence',
    descriptionBefore: ' ist Pflicht.',
    descriptionAfter: '',
    icon: 'far fa-handshake',
  },
  prohibition: {
    name: 'Verbot',
    definiteArticle: 'das',
    indefiniteArticle: 'ein',
    parentrule: '',
    subrule: 'remedy',
    descriptionBefore: ' ist verboten.',
    descriptionAfter: '',
    icon: 'fas fa-ban',
  },
  duty: {
    name: 'Bedingung',
    definiteArticle: 'die',
    indefiniteArticle: 'eine',
    parentrule: 'permission',
    subrule: 'consequence',
    descriptionBefore:
            ' muss geleistet werden, damit ',
    descriptionAfter:
            ' gilt.',
    icon: 'far fa-hand-point-up',
  },
  consequence: {
    name: 'Konsequenz',
    definiteArticle: 'die',
    indefiniteArticle: 'eine',
    parentrule: 'obligation',
    subrule: '',
    descriptionBefore:
            ' muss geleistet werden, falls ',
    descriptionAfter:
            ' nicht eingehalten wurde.',
    icon: 'fas fa-gavel',
  },
  remedy: {
    name: 'Strafe',
    definiteArticle: 'die',
    indefiniteArticle: 'eine',
    parentrule: 'prohibition',
    subrule: '',
    descriptionBefore:
            ' muss geleistet werden, falls ',
    descriptionAfter:
            ' missachtet wurde.',
    icon: 'fas fa-balance-scale',
  },
});
