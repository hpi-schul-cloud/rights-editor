<template>
<div style="font-family: 'Helvetica';">
    <h1>Lizenzeditor</h1>
    <h2>Erlaubnisse</h2>
    <div class="rule" v-for="action in actions.permissions" v-bind:key="action.uri">
        <p class="caption">{{ action.name }}</p>
        <p class="description">{{ action.description }}</p>
        <div class="button-group">
            <button class="negative" v-bind:class="{active: settings[action.uri] !== allowed}" v-on:click="settings[action.uri] = 'not allowed'; displayCCLicense();">Nicht erlaubt</button>
            <button class="positive" v-bind:class="{active: settings[action.uri] === allowed}" v-on:click="settings[action.uri] = allowed; displayCCLicense();">Erlaubt</button>
        </div>
    </div>
    <h2>Einschränkungen</h2>
    <div class="rule" v-for="action in actions.prohibitions" v-bind:key="action.uri">
        <p class="caption">{{ action.name }}</p>
        <p class="description">{{ action.description }}</p>
        <div class="button-group">
            <button class="negative" v-bind:class="{active: settings[action.uri] !== allowed}" v-on:click="settings[action.uri] = prohibited; displayCCLicence();">Verboten</button>
            <button class="positive" v-bind:class="{active: settings[action.uri] === allowed}" v-on:click="settings[action.uri] = allowed; displayCCLicence();">Uneingeschränkt</button>
        </div>
    </div>
    <h2>Anforderung</h2>
    <div class="rule" v-for="action in actions.duties" v-bind:key="action.uri">
        <p class="caption">{{ action.name }}</p>
        <p class="description">{{ action.description }}</p>
        <div class="button-group">
            <button class="negative" v-bind:class="{active: settings[action.uri] === demanded}" v-on:click="settings[action.uri] = demanded; displayCCLicence()">Verlangt</button>
            <button class="positive" v-bind:class="{active: settings[action.uri] !== demanded}" v-on:click="settings[action.uri] = 'optional'; displayCCLicence()">Optional</button>
        </div>
    </div>
    <hr>
    <h2>Provisorische Lizenz</h2>
    <pre>{{ license }}</pre>
    <div v-if="isDemanded({uri: noticeURI})" class="rule">
        <p class="caption">CC-Lizenz</p>
        <p id="imageText" class="description">Die erstellte CC-Lizenz: {{ imageText }}</p>
        <img v-bind:src="image" />
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
            settings,
            imageText: "Namensnennung 4.0 International",
            image: require("../img/cc/by.png"),
        
            // initialize constants
            allowed,
            prohibited,
            demanded,
            noticeURI: "http://creativecommons.org/ns#Notice"
        };
    },
    methods: {
        isAllowed(action) {
            return this.settings[action.uri] === this.allowed;
        },
        isDemanded(action) {
            return this.settings[action.uri] === this.demanded;
        },
        displayCCLicence() {
            if (this.isDemanded(actionNotice) && this.isAllowed(actionCommercialUse) && !this.isDemanded(actionShareAlike) && this.isAllowed(actionDerivateWorks)) {
                this.imageText = "Namensnennung 4.0 International";
                this.image = require("../img/cc/by.png");
            }
            else if(this.isDemanded(actionNotice) && this.isAllowed(actionCommercialUse) && this.isDemanded(actionShareAlike) && this.isAllowed(actionDerivateWorks)) {
                this.imageText = "Namensnennung-Share Alike 4.0 International";
                this.image = require("../img/cc/by-sa.png");
            }
            else if(this.isDemanded(actionNotice) && this.isAllowed(actionCommercialUse) && !this.isDemanded(actionShareAlike) && !this.isAllowed(actionDerivateWorks)) {
                this.imageText = "Namensnennung-Keine Bearbeitungen 4.0 International";
                this.image = require("../img/cc/by-nd.png");
            }
            else if(this.isDemanded(actionNotice) && !this.isAllowed(actionCommercialUse) && !this.isDemanded(actionShareAlike) && this.isAllowed(actionDerivateWorks)) {
                this.imageText = "Namensnennung-Nicht kommerziell 4.0 International";
                this.image = require("../img/cc/by-nc.eu.png");
            }
            else if(this.isDemanded(actionNotice) && !this.isAllowed(actionCommercialUse) && this.isDemanded(actionShareAlike) && this.isAllowed(actionDerivateWorks)) {
                this.imageText = "Namensnennung-Nicht kommerziell-Share Alike 4.0 International";
                this.image = require("../img/cc/by-nc-sa.eu.png");
            }
            else if(this.isDemanded(actionNotice) && !this.isAllowed(actionCommercialUse) && !this.isDemanded(actionShareAlike) && !this.isAllowed(actionDerivateWorks)) {
                this.imageText = "Namensnennung-Nicht kommerziell-Keine Bearbeitungen 4.0 International";
                this.image = require("../img/cc/by-nc-nd.eu.png");
            }          
        },
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
    }
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
    float: left;
    font-size: 1em;
    padding: 0.5em;
    background-color: #DDD;
    color: #555;
    transition: background-color 0.2s;
    cursor: pointer;
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
.button-group button.active.positive, .button-group button.positive:active {
    color: darkgreen;
}
.button-group button.active.negative, .button-group button.negative:active {
    color: rgb(160, 0, 0);
}
.button-group button.active {
    background-color: #EEE;
    box-shadow: 0px 0px 3px gray;
    position: relative;
    z-index: 1;
}
.button-group button:hover:active {
    background-color: #EEE;
    box-shadow: 0px 0px 3px gray;
    position: relative;
    z-index: 2;
}
.button-group button:not(.active):not(:active):hover {
    background-color: #d0d0d0;
    box-shadow: 0px 0px 1px gray inset;
}
</style>