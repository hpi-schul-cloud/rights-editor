<template>
  <li>
    <div class="rule-header-container">
      <div class="rule-header-name">
        <b>{{ rule.type["name"] }}</b>
      </div>
      <BaseButton remove v-bind:onClick="removeRule">&times;</BaseButton>
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
  props: {
    rule: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeRule: function() {
      this.$emit("remove-rule", this.rule.id);
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
</style>
