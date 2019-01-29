<template>
  <div class="rule-editor">
    <template v-if="rules.length > 0">
      <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
      <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
      <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
    </template>
    <ul>
      <li is="RuleItem" v-for="(rule, index) in rules" v-bind:rule="rule" v-bind:key="index"></li>
    </ul>
    <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
      <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
      <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
  </div>
</template>

<script>
import RuleItem from "./RuleItem.vue";

class Rule {
  constructor(title, original) {
    this.title = title;
    this.rule  = original;
  }
}

import {Odrl} from "../libs/rightsml-lib-js/ODRLclasses";

export default {
  name: "RuleEditor",
  components: {
    RuleItem
  },
  data: function() {
    return {
      rules: []
    };
  },
  methods: {
    newPermission: function() {
      this.newRule(new Odrl.Permission())
    },
    newDuty: function () {
      this.newRule(new Odrl.Duty())
    },
    newProhibition: function() {
      this.newRule(new Odrl.Prohibition())
    },
    newRule: function(original) {
      let ruleCount = this.rules.length + 1;
      this.rules.push(new Rule("Regel " + ruleCount, original))
    }
  }
};
</script>

<style>
</style>