<template>
  <li>
    <div class="disabled-text">
      <b>{{ rule.type["name"] }}:</b>
    </div>
    <input class="under-cover" v-model="rule.title" placeholder="Name der Regel">
    <button class="remove-button" v-on:click="removeRule()">&times;</button>
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>

    <div class="addon-container">
      <p>Füge optional Erweiterungen hinzu:</p>
      <ul class="addon-ul">
        <li v-for="(addon, index) in getPossibleAddons()" v-bind:key="index" v-bind:value="addon">
          <button typ="button" class="addon-btn" v-on:click="createAddon()">{{addon[0]}} hinzufügen</button>
          <div class="addon-info">({{addon[1]}})</div>
        </li>
      </ul>
    </div>

    <DutyItem
      v-on:remove-duty-event="updateDuties($event)"
      v-for="duty in rule.duties"
      v-bind:duty="duty"
      v-bind:key="duty.id"
    ></DutyItem>

    <p></p>
    <hr>
  </li>
</template>

<script>
import ActionItem, { Action } from "./ActionItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import DutyItem, { Duty, DutyTypes } from "./DutyItem.vue";

export class Rule {
  constructor(title, id, type) {
    this.title = title;
    this.id = id;
    this.type = type;
    this.action = new Action("Nutzung", Vocab.ActionsCV.use);
    this.duties = [];
  }
}

export let RuleTypes = Object.freeze({
  Permission: { name: "Erlaubnis" },
  Duty: { name: "Verpflichtung" },
  Prohibition: { name: "Verbot" }
});

export default {
  name: "RuleItem",
  components: {
    ActionItem,
    DutyItem
  },
  data: function() {
    return {
      nextId: 1,
      renderModal: false
    };
  },
  props: {
    rule: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPossibleAddons: function() {
      if (this.rule.type["name"] == "Erlaubnis") {
        return [["Pflicht", "erlaubt wird dann nur, wenn die Pflicht erfüllt ist"]];
      } else if (this.rule.type["name"] == "Verpflichtung") {
        return [["Konsequenz", "falls die Verpflichtung nicht erfüllt wird"]];
      } else if (this.rule.type["name"] == "Verbot") {
        return [["Strafe", "falls das Verbot missachtet wird"]];
      }
      return ["null"];
    },
    removeRule() {
      this.$emit("remove-rule-event", this.rule.id);
    },
    openModal: function() {
      this.renderModal = true;
    },
    closeModal() {
      this.renderModal = false;
    },
    createAddon() {
      let dutyType;
      if (this.rule.type["name"] == "Erlaubnis") {
        dutyType = DutyTypes.Duty;
      } else if (this.rule.type["name"] == "Verpflichtung") {
        dutyType = DutyTypes.Consequence;
      } else if (this.rule.type["name"] == "Verbot") {
        dutyType = DutyTypes.Remedy;
      }
      let newID = this.nextId++;
      this.rule.duties.push(new Duty("Duty", newID, dutyType));
      console.log("new duty with id: " + newID + " of type: " + dutyType.name);
    },
    updateDuties(duty_id) {
      for (let i = 0; i < this.rule.duties.length; ++i) {
        if (this.rule.duties[i].id == duty_id) {
          this.rule.duties.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style>
.addon-container {
  margin-bottom: 20px;
}

.addon-ul {
  margin-left: 0px !important;
  padding-inline-start: 00px !important;
}

.addon-info {
  display: inline-block;
  font-size: 0.9em;
}

/* --- */

.disabled-text {
  width: 150px;
  display: inline-block;
}

button {
  font-family: "Montserrat", sans-serif;
  color: white;
  border: 0px black solid;
  background-color: #172b4d;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  margin: 10px;
}

.rule-type-select {
  width: 170px;
}

.remove-button {
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
}
</style>
<style scoped>
.rule header {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-template-areas:
    "rule-type action-name edit-icon icons"
    ".         action-uri  .         .    ";
}
h3.rule-heading-type {
  grid-area: rule-type;
  margin: 10px 0em 0px;
  font-size: 1.17em;
}
button.change-action {
  grid-area: action-name;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  text-align: left;
  margin: 0px;
  padding: 0px;
  align-self: end;
  font-size: 1.17em;
}
button.change-action:hover {
  background-color: #f2f2f2;
  box-shadow: 4px 0px 1px 1px #f7f7f7 inset;
}
button.change-action div {
  display: inline-block;
  margin: 10px auto 0px 8px;
}
a.action-uri {
  grid-area: action-uri;
  padding: 0em 8px;
  font-size: 0.8em;
}
button.remove {
  grid-area: icons;
  background-color: transparent;
  color: inherit;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}
.edit-button {
  grid-area: edit-icon;
  align-self: end;
  margin-bottom: 0.2em;
}
</style>
