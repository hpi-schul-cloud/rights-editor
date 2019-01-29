<template>
  <div class="rule-editor">
    <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
    <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
    <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
    <ul>
      <li is="RuleItem" v-for="(rule, index) in rules" v-bind:rule="rule" v-bind:key="index"></li>
    </ul>
    <button id="new-rule-button" v-on:click="newRule">Neue Regel</button>
  </div>
</template>

<script>
import RuleItem from "./RuleItem.vue";

class Rule {
  constructor(title) {
    this.kind = 0;
    this.title = title;
    this.actions = [];
  }
}

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
    newRule: function() {
      let ruleCount = this.rules.length;
      this.rules.push(new Rule("Regel " + ++ruleCount));
    }
  }
};
</script>

<style>
</style>