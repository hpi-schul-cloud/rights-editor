<template>
  <div>
    <ActionChooser v-if="this.showActionChooser" v-on:action="showActionChooser = false; action.name=$event" v-on:abort="showActionChooser = false"></ActionChooser>
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
      showActionChooser: true
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
  width: 710px;
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
