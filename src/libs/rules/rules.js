import { Odrl as Vocab } from '../rightsml-lib-js/ODRLvocabs';
import { Action } from '../../components/ActionItem.vue';

export class Rule {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.action = new Action('<Aktion auswählen>', Vocab.ActionsCV.use);
  }
}

export class RuleTree {
  constructor(id, type) {
    this.id = id;
    this.rules = [];
  }
}

export const RuleTypes = Object.freeze({
  permission: {
    name: 'Erlaubnis',
    subrule: 'duty',
    descriptionBefore: ' ist erlaubt.',
    descriptionLink: '',
    descriptionAfter: '',
    icon: 'far fa-check-circle',
  },
  obligation: {
    name: 'Pflicht',
    subrule: 'consequence',
    descriptionBefore: ' ist Pflicht.',
    descriptionLink: '',
    descriptionAfter: '',
    icon: 'far fa-handshake',
  },
  prohibition: {
    name: 'Verbot',
    subrule: 'remedy',
    descriptionBefore: ' ist verboten.',
    descriptionLink: '',
    descriptionAfter: '',
    icon: 'fas fa-ban',
  },
  duty: {
    name: 'Pflicht',
    subrule: 'consequence',
    description: ' muss geleistet werden, damit die Erlaubnis gilt.',
    descriptionBefore:
            ' muss geleistet werden, damit die',
    descriptionLink:
            ' Erlaubnis',
    descriptionAfter:
            ' gilt.',
    icon: 'far fa-handshake',
  },
  consequence: {
    name: 'Konsequenz',
    subrule: '',
    description:
            ' muss geleistet werden, falls die Pflicht nicht eingehalten wurde.',
    descriptionBefore:
            ' muss geleistet werden, falls die',
    descriptionLink:
            ' Pflicht',
    descriptionAfter:
            ' nicht eingehalten wurde.',
    icon: 'fas fa-hand-holding',
  },
  remedy: {
    name: 'Strafe',
    subrule: '',
    description:
            ' muss geleistet werden, falls das Verbot missachtet wurde.',
    descriptionBefore:
            ' muss geleistet werden, falls das',
    descriptionLink:
            ' Verbot',
    descriptionAfter:
            ' missachtet wurde.',
    icon: 'fas fa-balance-scale',
  },
});
