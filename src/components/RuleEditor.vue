<template>
  <div class="rule-editor">
    <template v-if="rules.length > 0">
      <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
      <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
      <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
    </template>
    <ul>
      <li is="RuleItem" v-for="rule in rules" v-bind:rule="rule" v-bind:key="rule.id"></li>
    </ul>
    <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
      <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
      <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
  </div>
</template>

<script>
import RuleItem, {Rule, RuleTypes} from "./RuleItem.vue";


import {Odrl} from "../libs/rightsml-lib-js/ODRLclasses";

export default {
  name: "RuleEditor",
  components: {
    RuleItem
  },
  data: function() {
    return {
      rules: [],
      nextId: 1
    };
  },
  methods: {
    newPermission: function() {
      this.newRule(RuleTypes.Permission)
    },
    newDuty: function () {
      this.newRule(RuleTypes.Duty)
    },
    newProhibition: function() {
      this.newRule(RuleTypes.Prohibition)
    },
    newRule: function(ruleType) {
      let id = this.nextId++
      this.rules.push(new Rule("Regel " + id, id, ruleType))
    }
  }
};
</script>

<style>
</style>