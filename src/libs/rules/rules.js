import { Odrl as Vocab } from "../rightsml-lib-js/ODRLvocabs";
import { Action } from "../../components/ActionItem.vue"

export class Rule {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.action = new Action("<Aktion einfügen>", Vocab.ActionsCV.use);
    }
}

export class RuleTree {
    constructor(id, type) {
        this.id = id;
        this.rules = [];
    }
}

export let RuleTypes = Object.freeze({
    Permission: {
        name: "Erlaubnis",
        descriptionBefore: " ist erlaubt",
        descriptionLink: "",
        descriptionAfter: "",
        icon: "far fa-check-circle"
    },
    Obligation: {
        name: "Pflicht",
        descriptionBefore: " ist Pflicht",
        descriptionLink: "",
        descriptionAfter: "",
        icon: "far fa-handshake"
    },
    Prohibition: {
        name: "Verbot",
        descriptionBefore: " ist verboten",
        descriptionLink: "",
        descriptionAfter: "",
        icon: "fas fa-ban"
    },
    Duty: {
        name: "Pflicht",
        description: " muss geleistet werden, damit die Erlaubnis gilt",
        descriptionBefore:
            " muss geleistet werden, damit die",
        descriptionLink:
            " Erlaubnis",
        descriptionAfter:
            " gilt",
        icon: "far fa-handshake"
    },
    Consequence: {
        name: "Konsequenz",
        description:
            " muss geleistet werden, falls die Pflicht nicht eingehalten wurde",
        descriptionBefore:
            " muss geleistet werden, falls die",
        descriptionLink:
            " Pflicht",
        descriptionAfter:
            " nicht eingehalten wurde",
        icon: "fas fa-hand-holding"
    },
    Remedy: {
        name: "Strafe",
        description:
            " muss geleistet werden, falls das Verbot missachtet wurde",
        descriptionBefore:
            " muss geleistet werden, falls das",
        descriptionLink:
            " Verbot",
        descriptionAfter:
            " missachtet wurde",
        icon: "fas fa-balance-scale"
    }
});