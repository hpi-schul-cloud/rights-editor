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
        description: " ist erlaubt ",
        icon: "far fa-check-circle"
    },
    Obligation: {
        name: "Verpflichtung",
        description: " ist Pflicht ",
        icon: "far fa-handshake"
    },
    Prohibition: {
        name: "Verbot",
        description: " ist verboten ",
        icon: "fas fa-ban"
    },
    Duty: {
        name: "Verpflichtung",
        description: " ist Pflicht ",
        icon: "far fa-handshake"
    },
    Consequence: {
        name: "Konsequenz",
        description:
            " muss geleistet werden, falls die dazugehörigen Pflichten nicht eingehalten wurden ",
        icon: ""
    },
    Remedy: {
        name: "Strafe",
        description:
            " muss geleistet werden, falls das dazugehörigen Verbote missachtet wurden ",
        icon: ""
    }
});