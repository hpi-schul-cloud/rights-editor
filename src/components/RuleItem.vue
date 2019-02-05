<template>
  <li>
    <div class="disabled-text">{{ rule.type["name"] }}:</div>
    <input class="under-cover" v-model="rule.title" placeholder="Name der Regel">
    <button class="remove-button" v-on:click="removeRule">X</button>
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>
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
    removeRule() {
      this.$emit("remove-rule-event", this.rule.id);
    }
  }
};
</script>

<style>
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
</style>
