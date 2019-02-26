<template>
  <div>
    <ActionChooser
      v-if="showActionChooser"
      v-on:action="showActionChooser = false; action.name=$event"
      v-on:abort="showActionChooser = false"
    ></ActionChooser>Aktion:
    <div class="action-content">
      <button
        class="action-input"
        placeholder="Bezeichner auswählen..."
        v-bind:value="actionName"
        v-on:click="showActionChooser = true"
        list="actions"
        name="action"
      >{{this.action.name}}</button>
      <datalist id="actions">
        <option
          v-for="(actionUri, index) in possibleActionUris()"
          v-bind:key="index"
          v-bind:value="actionUri"
        />
      </datalist>
      <br>
      <!-- should be optional and it should also be possible to add more than one constraint
      also constraints (and by the way refinements as well) are not bound to actions only, 
      they can also be attached to party collections for example...
      http://dev.iptc.org/RightsML-Combined-Example-geographic-and-time-period-->
      <ConstraintItem class="constraint-input" v-bind:constraint="action.constraint"></ConstraintItem>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintItem, { Constraint } from "./ConstraintItem";
import ActionChooser from "./ActionChooser.vue";

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
    ConstraintItem,
    ActionChooser
  },
  data: function() {
    return {
      showActionChooser: false,
      shownOnCreation: false
    };
  },
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  methods: {
    possibleActionUris: function() {
      if (this.shownOnCreation == false) { 
        this.showActionChooser = true;
        this.shownOnCreation = true; 
      }
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
.action-item {
  margin-left: 0px;
}

.action-content {
  margin-left: 0px;
}

.action-input {
  margin-top: 20px;
  margin-left: 0px;
  width: 690px;
  height: 38px;

  background-color: white;
  border: 0px black solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;
  text-align: left;

  margin: 10px;
  margin-left: 0px;
  padding: 10px 10px;

  -webkit-box-shadow: inset 0 0 1px #000;
  -moz-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
}

.action-input:hover {
  cursor: text;
}

.constraint-input {
  margin-bottom: 15px;
  margin-left: 0px;
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
  border: 0px black solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;

  margin: 10px;
  margin-left: 0px;
  padding: 10px 10px;

  -webkit-box-shadow: inset 0 0 1px #000;
  -moz-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
}

select {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  width: 250px;
  margin-right: 10px;
}
</style>
