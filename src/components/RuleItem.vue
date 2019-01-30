<template>
  <li>
    <div>
      <span class="disabled-text">{{ ruleType }}</span>:
      <input class="under-cover" v-model="rule.title" placeholder="Name der Regel">
      <button class="remove-button" v-on:click="removeRule">X</button>
    </div>    
    <ul>
      <ActionItem
        v-on:remove-action-event="updateActions($event)"
        v-for="action in rule.actions"
        v-bind:key="action.id"
        v-bind:action="action"
      ></ActionItem>
    </ul>
    <button v-on:click="newAction">Neue Aktion</button>
    <p></p>
    <hr>
  </li>
</template>

<script>
import ActionItem from "./ActionItem.vue";
import {Odrl} from "../libs/rightsml-lib-js/ODRLclasses";

class Action {
  constructor(id) {
    this.id = id;
    this.leftOperand = null;
    this.rightOperand = null;
    this.operator = null;
  }
}

export default {
  name: "RuleItem",
  components: {
    ActionItem
  },
  props: {
    rule: {
      type: Object
    }
  },
  methods: {
    newAction() {
      this.rule.actions.push(new Action(this.rule.actions.length));
    },
    removeRule() {
      this.$emit("remove-rule-event", this.rule.id);
    }
  },
  computed: {
    ruleType: function() {
      if (this.rule.rule instanceof Odrl.Permission) {
        return "Erlaubnis";
      } else if (this.rule.rule instanceof Odrl.Duty) {
        return "Verpflichtung";
      } else {
        return "Verbot";
      }
    }
  }
};
</script>

<style>
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
