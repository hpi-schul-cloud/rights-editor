<template>
<div style="font-family: 'Helvetica';">
    <h1>CreativeCommons Editor</h1>
    <h2>Erlaubnisse</h2>
    <div class="rule">
        <p class="caption">Reproduktion</p>
        <p class="description">Das Werk darf reproduziert werden.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: reproduction}" v-on:click="reproduction = true; displayCCLicence()">Erlaubt</button>
            <button class="negative" v-bind:class="{active: !reproduction}" v-on:click="reproduction = false; displayCCLicence();">Nicht erlaubt</button>
        </div>
    </div>
    <div class="rule">
        <p class="caption">Distribution</p>
        <p class="description">Das Werk (und, sofern authorisiert, Derivate) dürfen verteilt, öffentlich gezeigt und öffentlich aufgeführt werden.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: distribution}" v-on:click="distribution = true; displayCCLicence()">Erlaubt</button>
            <button class="negative" v-bind:class="{active: !distribution}" v-on:click="distribution = false; displayCCLicence();">Nicht erlaubt</button>
        </div>
    </div>
    <div class="rule">
        <p class="caption">Derivat-Werke</p>
        <p class="description">Derivate des Werks dürfen erstellt und reproduziert werden.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: derivateWorks}" v-on:click="derivateWorks = true; displayCCLicence()">Erlaubt</button>
            <button class="negative" v-bind:class="{active: !derivateWorks}" v-on:click="derivateWorks = false; displayCCLicence();">Nicht erlaubt</button>
        </div>
    </div>
    <div class="rule">
        <p class="caption">Teilen</p>
        <p class="description">Nichtkommerzielle Reproduktion und Distribution (wie z.B. File-Sharing) des gesamten Werks ist erlaubt.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: sharing}" v-on:click="sharing = true; displayCCLicence()">Erlaubt</button>
            <button class="negative" v-bind:class="{active: !sharing}" v-on:click="sharing = false; displayCCLicence();">Nicht erlaubt</button>
        </div>
    </div>
    <h2>Einschränkungen</h2>
    <div class="rule">
        <p class="caption">Nichtkommerziele Nutzung</p>
        <p class="description">Die eingräumten Berechtigungen dürfen nicht für kommerzielle Zwecke genutzt werden.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: nonCommercialUse}" v-on:click="nonCommercialUse = true; displayCCLicence()">Eingeschränkt</button>
            <button class="negative" v-bind:class="{active: !nonCommercialUse}" v-on:click="nonCommercialUse = false; displayCCLicence();">Nicht Eingeschränkt</button>
        </div>
    </div>
    <h2>Anforderung</h2>
    <div class="rule">
        <p class="caption">Lizenzangabe</p>
        <p class="description">Copyright- und Lizenzangaben müssen mit dem Werk zusammen bleiben.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: notice}" v-on:click="notice = true; displayCCLicence()">Verlangt</button>
            <button class="negative" v-bind:class="{active: !notice}" v-on:click="notice = false; displayCCLicence();">Nicht verlangt</button>
        </div>
    </div>
    <div class="rule">
        <p class="caption">Lizenzbeibehaltung</p>
        <p class="description">Derivate müssen mit gleichen Bedingungen lizenziert werden wie das originale Werk.</p>
        <div class="button-group">
            <button class="positive" v-bind:class="{active: shareAlike}" v-on:click="shareAlike = true; displayCCLicence()">Verlangt</button>
            <button class="negative" v-bind:class="{active: !shareAlike}" v-on:click="shareAlike = false; displayCCLicence();">Nicht verlangt</button>
        </div>
    </div>
    <div v-if="notice" class="rule">
        <p class="caption">CC-Lizenz</p>
        <p id="imageText" class="description">Die erstellte CC-Lizenz: {{ imageText }}</p>
        <img v-bind:src="image" />
    </div>
</div>   
</template>

<script>
export default {
    name: "ChooserEditor",
    data: function() {
        return {
            reproduction: true,
            distribution: true,
            derivateWorks: true,
            sharing: true,
            nonCommercialUse: false,
            notice: true,
            shareAlike: false,
            imageText: "Namensnennung 4.0 International",
            image: require("../img/cc/by.png")
        };
    },
    methods: {
        displayCCLicence() {
            if(this.notice && !this.nonCommercialUse && !this.shareAlike && this.derivateWorks) {
                this.imageText = "Namensnennung 4.0 International";
                this.image = require("../img/cc/by.png");
            }
            else if(this.notice && !this.nonCommercialUse && this.shareAlike && this.derivateWorks) {
                this.imageText = "Namensnennung-Share Alike 4.0 International";
                this.image = require("../img/cc/by-sa.png");
            }
            else if(this.notice && !this.nonCommercialUse && !this.shareAlike && !this.derivateWorks) {
                this.imageText = "Namensnennung-Keine Bearbeitungen 4.0 International";
                this.image = require("../img/cc/by-nd.png");
            }
            else if(this.notice && this.nonCommercialUse && !this.shareAlike && this.derivateWorks) {
                this.imageText = "Namensnennung-Nicht kommerziell 4.0 International";
                this.image = require("../img/cc/by-nc.eu.png");
            }
            else if(this.notice && this.nonCommercialUse && this.shareAlike && this.derivateWorks) {
                this.imageText = "Namensnennung-Nicht kommerziell-Share Alike 4.0 International";
                this.image = require("../img/cc/by-nc-sa.eu.png");
            }
            else if(this.notice && this.nonCommercialUse && !this.shareAlike && !this.derivateWorks) {
                this.imageText = "Namensnennung-Nicht kommerziell-Keine Bearbeitungen 4.0 International";
                this.image = require("../img/cc/by-nc-nd.eu.png");
            }          
        }
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
    border-top: black solid 2px;
    border-bottom: black solid 2px;
    float: left;
    font-size: 1em;
    padding: 0.5em;
    background-color: #EEE;
}
.button-group button:first-child {
    border-left: black solid 2px;
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
}
.button-group button:last-child {
    border-right: black solid 2px;
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
.button-group button.positive.active, .button-group button.positive:hover {
/*  background-color: rgb(29, 138, 29);
*/  color: white;
    background-color: darkgreen;
}
.button-group button.negative.active, .button-group button.negative:hover {
/*  background: rgb(206, 54, 54);
*/  color: white;
    background-color: rgb(160, 0, 0);
}
</style>