<template>
  <li>
    <div class="heading-rule-name">
      <b>{{ rule.type["name"] }}:</b>
    </div>
    <input class="under-cover" v-model="rule.title" placeholder="Name der Regel">
    <button class="button-dismiss-rule" v-on:click="removeRule">&times;</button>
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>

    <!-- experiments-->
    <BaseButton v-bind:onClick="openModal">Innere Regel</BaseButton>
    <div class="modal">
      <div class="modal-content">
        <button class="modal-close button-dismiss-rule" v-on:click="closeModal">&times;</button>
        <p>Füge <i>{{ rule.type["name"] }}</i> -Erweiterung hinzu:</p>
        <BaseButton
<<<<<<< HEAD
          v-bind:onClick="function() {}"
=======
>>>>>>> master
          v-for="(addon, index) in getPossibleAddons()"
          v-bind:key="index">
            {{addon}}
        </BaseButton>
      </div>
    </div>
    <!-- /experiments -->

    <p></p>
    <hr>
  </li>
</template>

<script>
import ActionItem, { Action } from "./ActionItem.vue";
import BaseButton from "./BaseButton.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Rule {
  constructor(title, id, type) {
    this.title = title;
    this.id = id;
    this.type = type;
    this.action = new Action("Nutzung", Vocab.ActionsCV.use);
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
    ActionItem
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
        return ["Pflicht", "Pflicht mit Konsequenz"];
      } else if (this.rule.type["name"] == "Verpflichtung") {
        return ["Konsequenz"];
      } else if (this.rule.type["name"] == "Verbot") {
        return ["Strafe"];
      }
      return ["null"];
    },
    removeRule() {
      this.$emit("remove-rule-event", this.rule.id);
    },
    openModal: function() {
      console.log(this.getPossibleAddons());
      console.log("rule id: " + this.rule.id);
      document.getElementsByClassName("modal")[this.rule.id].style.display =
        "block";
    },
    closeModal() {
      document.getElementsByClassName("modal")[this.rule.id].style.display =
        "none";
    }
  }
};
</script>

<style scoped>
.modal-btn {
  display: block;
  font-size: 26px;
  font-weight: bold;
  margin: 0px 50px 3px 0px;
  padding: 4px 12px !important;
}
.modal {
  display: none; /* Hidden by default */
  z-index: 1; /* Sit on top */
  border: 1px solid #172b4d;
  padding-left: 20px;
  margin-left: -2px;
  padding-right: 20px;
  margin-bottom: 20px;
  height: 125px;
  width: 700px;  
}

/* The Close Button */
.modal-close {
  float: left;
  margin-top: -20px;
  margin-left: -28px;
  color: #172b4d !important;
}

.modal-close:hover,
.modal-close:focus {
  text-decoration: none;
  cursor: pointer;
}

/* --- */

.heading-rule-name {
  width: 150px;
  display: inline-block;
}

.button-dismiss-rule {
  border: none;
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
}
</style>
