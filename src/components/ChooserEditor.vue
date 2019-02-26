<template>
<div style="font-family: 'Helvetica';">
    <h1>Lizenzeditor</h1>
    <h2>Erlaubnisse</h2>
    <div class="rule" v-for="action in actions.permissions">
        <p class="caption">{{ action.name }}</p>
        <p class="description">{{ action.description }}</p>
        <div class="button-group">
            <button class="negative" v-bind:class="{active: settings[action.uri] !== allowed}" v-on:click="settings[action.uri] = 'not allowed'">Nicht erlaubt</button>
            <button class="positive" v-bind:class="{active: settings[action.uri] === allowed}" v-on:click="settings[action.uri] = allowed">Erlaubt</button>
        </div>
    </div>
    <h2>Einschränkungen</h2>
    <div class="rule" v-for="action in actions.prohibitions">
        <p class="caption">{{ action.name }}</p>
        <p class="description">{{ action.description }}</p>
        <div class="button-group">
            <button class="negative" v-bind:class="{active: settings[action.uri] !== allowed}" v-on:click="settings[action.uri] = prohibited">Verboten</button>
            <button class="positive" v-bind:class="{active: settings[action.uri] === allowed}" v-on:click="settings[action.uri] = allowed">Uneingeschränkt</button>
        </div>
    </div>
    <h2>Anforderung</h2>
    <div class="rule" v-for="action in actions.duties">
        <p class="caption">{{ action.name }}</p>
        <p class="description">{{ action.description }}</p>
        <div class="button-group">
            <button class="negative" v-bind:class="{active: settings[action.uri] === demanded}" v-on:click="settings[action.uri] = demanded">Verlangt</button>
            <button class="positive" v-bind:class="{active: settings[action.uri] !== demanded}" v-on:click="settings[action.uri] = 'optional'">Optional</button>
        </div>
    </div>
    <hr>
    <h2>Provisorische Lizenz</h2>
    <pre>{{ license }}</pre>
    <div v-if="notice" class="rule">
        <p class="caption">CC-Lizenz</p>
        <p class="description">Die erstellte CC-Lizenz:</p>
        <img v-if="notice && commercialUse && !shareAlike && derivateWorks" src="../img/cc/by.png">
        <img v-if="notice && commercialUse && shareAlike && derivateWorks" src="../img/cc/by-sa.png">
        <img v-if="notice && commercialUse && !shareAlike && !derivateWorks" src="../img/cc/by-nd.png">
        <img v-if="notice && !commercialUse && !shareAlike && derivateWorks" src="../img/cc/by-nc.eu.png">
        <img v-if="notice && !commercialUse && shareAlike && derivateWorks" src="../img/cc/by-nc-sa.eu.png">
        <img v-if="notice && !commercialUse && !shareAlike && !derivateWorks" src="../img/cc/by-nc-nd.eu.png">
    </div>
</div>
</template>

<script>

class Action {
    constructor(name, description, uri) {
        this.name = name;
        this.description = description;
        this.uri = uri;
    }
}

const actionReproduction  = new Action("Reproduktion", "Das Werk darf reproduziert werden.", "http://creativecommons.org/ns#Reproduction");
const actionDistribution  = new Action("Distribution", "Das Werk (und, sofern authorisiert, Derivate) dürfen verteilt, öffentlich gezeigt und öffentlich aufgeführt werden.", "http://creativecommons.org/ns#Distribution")
const actionDerivateWorks = new Action("Derivat-Werke", "Derivate des Werks dürfen erstellt und reproduziert werden.", "http://creativecommons.org/ns#DerivativeWorks")
const actionShare         = new Action("Teilen", "Nichtkommerzielle Reproduktion und Distribution (wie z.B. File-Sharing) des gesamten Werks ist erlaubt.", "http://creativecommons.org/ns#Sharing")
const actionCommercialUse = new Action("Kommerziele Nutzung", "Die eingräumten Berechtigungen dürfen für kommerzielle Zwecke genutzt werden.", "http://creativecommons.org/ns#CommericalUse")
const actionNotice        = new Action("Lizenzangabe", "Copyright- und Lizenzangaben müssen mit dem Werk zusammen bleiben.", "http://creativecommons.org/ns#Notice")
const actionShareAlike    = new Action("Lizenzbeibehaltung", "Derivate müssen mit gleichen Bedingungen lizenziert werden wie das originale Werk.", "http://creativecommons.org/ns#ShareAlike")

const actions = {
    permissions: [
        actionReproduction,
        actionDistribution,
        actionDerivateWorks,
        actionShare,
    ],
    prohibitions: [
        actionCommercialUse,
    ],
    duties: [
        actionNotice,
        actionShareAlike,
    ],
}

// export const actions = {
//     "permission": [
//         {"name": "Reproduktion", "description": "Das Werk darf reproduziert werden.", "uri": "http://creativecommons.org/ns#Reproduction"},
//         {"name": "Distribution", "description": "Das Werk (und, sofern authorisiert, Derivate) dürfen verteilt, öffentlich gezeigt und öffentlich aufgeführt werden.", "uri": "http://creativecommons.org/ns#Distribution"},
//         {"name": "Derivat-Werke", "description": "Derivate des Werks dürfen erstellt und reproduziert werden.", "uri": "http://creativecommons.org/ns#DerivativeWorks"},
//         {"name": "Teilen", "description": "Nichtkommerzielle Reproduktion und Distribution (wie z.B. File-Sharing) des gesamten Werks ist erlaubt.", "uri": "http://creativecommons.org/ns#Sharing"},
//     ],
//     "prohibition": [
//         {"name": "Kommerziele Nutzung", "description": "Die eingräumten Berechtigungen dürfen für kommerzielle Zwecke genutzt werden.", "uri": "http://creativecommons.org/ns#CommericalUse"},
//     ],
//     "duty": [
//         {"name": "Lizenzangabe", "description": "Copyright- und Lizenzangaben müssen mit dem Werk zusammen bleiben.", "uri": "http://creativecommons.org/ns#Notice"},
//         {"name": "Lizenzbeibehaltung", "description": "Derivate müssen mit gleichen Bedingungen lizenziert werden wie das originale Werk.", "uri": "http://creativecommons.org/ns#ShareAlike"},
//     ]
// };

export const allowed    = "allowed";
export const prohibited = "prohibited";
export const demanded   = "demanded";


export default {
    name: "ChooserEditor",
    data: function() {
        let settings = {}
        settings[actionReproduction.uri] =   allowed;
        settings[actionDistribution.uri] =   allowed;
        settings[actionDerivateWorks.uri] =  allowed;
        settings[actionShare.uri] =          allowed;
        settings[actionCommercialUse.uri] =  allowed;
        settings[actionNotice.uri] =         demanded;
        settings[actionShareAlike.uri] =     "optional";
        return {
            actions,
            settings
        };
    },
    created: function() {
        // initialize constants
        this.actions = actions;
        this.allowed = allowed;
        this.prohibited = prohibited;
        this.demanded = demanded;
    },
    computed: {
        license: function() {
            let license = {
                "@context": "http://www.w3.org/ns/odrl.jsonld",
                "@type": "Set",
                "uid": "http://www.schulcloud.de/lernstore/lizenzen/license:0001.json",
            }
           
            // Add permissions into license.
            let self = this;
            this.actions.permissions.forEach(function(action) {
                let permissions = license["permission"] || [];
                
                if (self.settings[action.uri] === self.allowed) {
                    permissions.push({"action": action.uri});
                    license["permission"] = permissions;
                }
            });

            // Add prohibitions into license.
            this.actions.prohibitions.forEach(function(action) {
                let prohibitions = license["prohibition"] || [];

                if (self.settings[action.uri] !== self.allowed) {
                    prohibitions.push({"action": action.uri});
                    license["prohibition"] = prohibitions;
                }
            });

            // Add duties into license.
            this.actions.duties.forEach(function(action) {
                let duties = license["obligation"] || [];

                if (self.settings[action.uri] === self.demanded) {
                    duties.push({"action": action.uri});
                    license["obligation"] = duties;
                }
            });

            return license;
        },
        notice: function() {
            return this.settings[actionNotice.uri] === this.demanded;
        },
        commercialUse: function() {
            return this.settings[actionCommercialUse.uri] === this.allowed;
        },
        shareAlike: function() {
            return this.settings[actionShareAlike.uri] === this.demanded;
        },
        derivateWorks: function() {
            return this.settings[actionDerivateWorks.uri] === this.allowed;
        }
    },
};
</script>

<style scoped>
p {
    margin: 0px;
    padding: 0px;
}
.caption {
    font-size: 1.3em;
    font-weight: 400;
    grid-area: rule-caption;
}
.description {
    color: gray;
    font-style: italic;
    grid-area: rule-description;
}
.rule {
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
        "rule-caption     rule-buttons"
        "rule-description rule-buttons";
}
.button-group {
    grid-area: rule-buttons;
}
.button-group::after{
    content: "";
    clear: both;
}
.button-group button {
    border: none;
    border-top: black solid 0px;
    border-bottom: black solid 0px;
    float: left;
    font-size: 1em;
    padding: 0.5em;
    background-color: #EEE;
}
.button-group button:first-child {
    border-left: black solid 0px;
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
}
.button-group button:last-child {
    border-right: black solid 0px;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
}
.button-group button.positive {
    color: darkgreen;
    border-color: darkgreen;
}
.button-group button.negative {
    color: rgb(160, 0, 0);
    border-color: rgb(160, 0, 0);
}
.button-group button.active {
    background-color: #DDD;
    box-shadow: 0px 0px 1px gray;
    position: relative;
    z-index: 1;
}
.button-group button:hover {
    background-color: #e0e0e0;
}
</style>