<template>
  <div class="container">
    <div class="header">
      <b>{{ rule.type.name }}</b>
      <BaseButton remove v-bind:onClick="removeRule">
        <i class="fas fa-times"></i>
      </BaseButton>
    </div>Das
    <ActionItem v-bind:action="rule.action">
      {{ rule.type.description }}
      <i v-bind:class="rule.type.icon"></i>
    </ActionItem>
  </div>
</template>

<script>
import ActionItem, { Action } from "./ActionItem.vue";
import BaseButton from "./BaseButton.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import { Rule, RuleTypes } from "../libs/rules/rules.js";

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
.container {
  border: 1px DarkGray solid;
  width: 600px;
  padding: 20px;
  margin: 10px;
  margin-left: 0px;
}

.header {
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
