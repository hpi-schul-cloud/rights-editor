<template>
  <div>
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      v-bind:allowAbort="actionChooserSettings.allowAbort"
      v-on:chosen="hideActionChooser(); action.name=$event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>Aktion:
    <div class="action-content">
      <button
        class="action-input"
        v-bind:value="actionName"
        v-on:click="showActionChooser()"
        list="actions"
        name="action"
        type="button"
      >{{this.action.name}}</button>
      <br>
      <!-- should be optional and it should also be possible to add more than one constraint
      also constraints (and by the way refinements as well) are not bound to actions only, 
      they can also be attached to party collections for example...
      http://dev.iptc.org/RightsML-Combined-Example-geographic-and-time-period-->
      <ConstraintItem v-bind:constraint="action.constraint"></ConstraintItem>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintItem, { Constraint } from "./ConstraintItem";
import ActionChooser from "./ActionChooser.vue";
import { all } from "q";

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
      actionChooserSettings: {
        displayActionChooser: false,
        allowAbort: true
      }
    };
  },
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  mounted: function() {
    this.showActionChooser(false);
  },
  methods: {
    showActionChooser: function(allowAbort) {
      this.actionChooserSettings.displayActionChooser = true;
      this.actionChooserSettings.allowAbort =
        allowAbort == undefined ? true : allowAbort;
    },
    hideActionChooser: function() {
      this.actionChooserSettings.displayActionChooser = false;
      this.actionChooserSettings.allowAbort = true;
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
  width: 700px;
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

  box-shadow: inset 0 0 1.5px #000;
}

.action-input:hover {
  cursor: text;
}

input.under-cover {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid DarkGray;
  box-shadow: none;
  margin-left: 10px;
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
  margin-left: 10px;
  padding: 10px 10px;

  box-shadow: inset 0 0 1.5px #000;
}

select {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  width: 250px;
  margin-right: 10px;
}
</style>
