<template>
  <li>
    <div>
      Regel:
      <input v-model="rule.title">
      <select class="rule-type-select">
        <option>Erlaubnis</option>
        <option>Verpflichtung</option>
        <option>Verbot</option>
      </select>
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
    updateActions(action_id) {
      for (let i = 0; i < this.rule.actions.length; ++i) {
        if (this.rule.actions[i].id == action_id) {
          this.rule.actions.splice(i, 1);
        }
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
