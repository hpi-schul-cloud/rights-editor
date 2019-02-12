<template>
  <li>
    <div class="rule-header-container">
      <div class="heading-rule-name">
        <b>{{ rule.type["name"] }}:</b>
      </div>
      <input class="under-cover" v-model="rule.title" placeholder="Name der Regel">
      <button class="button-dismiss-rule" v-on:click="removeRule()">&times;</button>
    </div>
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>

    <div class="addon-container">
      <p>Füge optional Erweiterungen hinzu:</p>
      <ul class="addon-ul">
        <li v-for="(addon, index) in getPossibleAddons()" v-bind:key="index" v-bind:value="addon">
          <BaseButton v-bind:onClick="createAddon">{{addon[0]}} hinzufügen</BaseButton>
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
import BaseButton from "./BaseButton.vue";
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
    BaseButton,
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
        return [
          ["Pflicht", "erlaubt wird dann nur, wenn die Pflicht erfüllt ist"]
        ];
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
      if (this.rule.duties.length == 0) {
        let newID = this.nextId++;
        this.rule.duties.push(new Duty("Duty", newID, dutyType));
        console.log("new duty with id: " + newID + " of type: " + dutyType.name);
      }
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

.heading-rule-name {
  width: 150px;
  display: inline-block;
}

.rule-header-container {
  position: relative;
}

.button-dismiss-rule {
  border: none;
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
