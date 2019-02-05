<template>
  <li class="rule">
    <header>
      <h3 class="rule-heading-type">{{ rule.type.name }}:</h3>
      <div>{{ rule.action.name }}</div>
      <button class="edit-button"><i class="far fa-edit"></i></button>
      <button class="remove" type="button">[DEL]</button>
    </header>
      <ActionItem
        v-bind:action="rule.action"
      ></ActionItem>
    <hr>
  </li>
</template>

<script>
import ActionItem, {Action} from "./ActionItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Rule {
  constructor(title, id, type) {
    this.title = title;
    this.id = id;
    this.type = type;
    this.action = {"name": "Nutzung", "uri": Vocab.ActionsCV.use};
  }
}

export let RuleTypes = Object.freeze({
  "Permission": {"name": "Erlaubnis"},
  "Duty": {"name": "Verpflichtung"},
  "Prohibition": {"name": "Verbot"}});

export default {
  name: "RuleItem",
  props: {
    rule: {
      type: Object,
      required: true
    }
  },
  components: {
    ActionItem
  },
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
<style scoped>
.rule header {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-template-areas:
    "rule-type action-name edit-icon icons"
    ".         action-uri  .         .    ";
}
h3.rule-heading-type {
  grid-area: rule-type;
  margin: 10px 0em 0px;
  font-size: 1.17em;
}
button.change-action {
  grid-area: action-name;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  text-align: left;
  margin: 0px;
  padding: 0px;
  align-self: end;
  font-size: 1.17em;
}
button.change-action:hover {
  background-color: #f2f2f2;
  box-shadow: 4px 0px 1px 1px #f7f7f7 inset;
}
button.change-action div {
  display: inline-block;
  margin: 10px auto 0px 8px;
}
a.action-uri {
  grid-area: action-uri;
  padding: 0em 8px;
  font-size: 0.8em;
}
button.remove {
  grid-area: icons;
  background-color: transparent;
  color: inherit;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}
.edit-button {
  grid-area: edit-icon;
  align-self: end;
  margin-bottom: 0.2em;
}
</style>
