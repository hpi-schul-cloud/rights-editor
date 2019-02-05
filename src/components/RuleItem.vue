<template>
  <li>
    <div class="disabled-text">
      <b>{{ rule.type["name"] }}:</b>
    </div>
    <input class="under-cover" v-model="rule.title" placeholder="Name der Regel">
    <button class="remove-button" v-on:click="removeRule()">&times;</button>   
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>

    <!-- experiments-->
    <button class="modal-btn" v-on:click="openModal()">+</button>
    <div class="modal">
      <div class="modal-content">
        <button class="modal-close remove-button" v-on:click="closeModal()">&times;</button>
        <p>Füge <i>{{ rule.type["name"] }}</i> -Erweiterung hinzu:</p>
        <ul>
          <li v-for="(addon, index) in getPossibleAddons()"
          v-bind:key="index"
          v-bind:value="addon"><button typ="button" class="addon-btn">{{addon}}</button></li>
        </ul>
      </div>
    </div>
    <!-- /experiments -->

    <p></p>
    <hr>
  </li>
</template>

<script>
import ActionItem, { Action } from "./ActionItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Rule {
  constructor(title, id, type) {
    this.title = title;
    this.id = id;
    this.type = type;
    this.action = new Action(Vocab.ActionsCV.use);
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

<style>
.addon-btn {
  float: left;
}
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
  max-width: 100%;
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
