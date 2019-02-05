<template>
  <div>
    Aktion:
    <div class="action-content">
    <input
      class="action-input"
      placeholder="Bezeichner eingeben..."
      v-bind:value="actionName"
      list="actions"
      type="text"
      name="action"
    >
    <datalist id="actions">
      <option
        v-for="(actionUri, index) in possibleActionUris()"
        v-bind:key="index"
        v-bind:value="actionUri"
      />
    </datalist>
    <br>
    <ConstraintItem class="constraint-input" v-bind:constraint="action.constraint">
      
    </ConstraintItem>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintItem, { Constraint } from "./ConstraintItem";


export class Action {
  constructor(name, nsVocabUri) {
    this.name = name;
    this.nsVocabUri = nsVocabUri;
    this.constraint = new Constraint();
  }

  name() {
    return this.nsVocabUri.split("/").pop();
  }
}

export default {
  name: "ActionItem",
  components: {
    ConstraintItem
  },
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  methods: {
    possibleActionUris: function() {
      return [
        Vocab.ActionsCV.use,
        Vocab.ActionsCV.display,
        Vocab.ActionsCV.distribute,
        Vocab.ActionsCV.execute
      ];
    }
  },
  computed: {
    actionName: function() {
      return this.action.name;
    }
  }
};
</script>

<style>

.action-content {
  margin-left: 90px;
}

.action-input {
  margin-top: 20px;
  margin-left: 70px;
  width: 400px;
}

.remove-button {
  height: 42px;
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  padding: 0;
  font-size: 1.1em;
}

input.under-cover {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid DarkGray;
  box-shadow: none;
}

input,
input.under-cover:focus {
  background-color: white;
  border-radius: 0;
  border: 0px black solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;

  margin: 10px;
  padding: 10px 10px;

  -webkit-box-shadow: inset 0 0 1px #000;
  -moz-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
}

.constraint-input {
  margin-bottom: 35px;
  margin-left: 60px;
}

select {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  width: 250px;
  /*border: 1px solid black;*/
}
</style>
