<template>
  <li>
    <div class="rule-header-container">
      <div class="rule-header-name">
        <b>{{ rule.type["name"] }}</b>
      </div>
      <button class="button-dismiss-rule" v-on:click="removeRule()">&times;</button>
    </div>
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>
  </li>
</template>

<script>
import ActionItem, { Action } from "./ActionItem.vue";
import BaseButton from "./BaseButton.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Rule {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.action = new Action("<leer>", Vocab.ActionsCV.use);
  }
}

export let RuleTypes = Object.freeze({
  Permission: { name: "Erlaubnis" },
  Obligation: { name: "Verpflichtung" },
  Prohibition: { name: "Verbot" },
  Duty: { name: "Verpflichtung" },
  Consequence: { name: "Konsequenz" },
  Remedy: { name: "Strafe" }
});

export default {
  name: "RuleItem",
  components: {
    BaseButton,
    ActionItem
  },
  data: function() {
    return {
      nextId: 1
    };
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

<style scoped>
.rule-header-container {
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;
}

.button-dismiss-rule {
  border: none;
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
