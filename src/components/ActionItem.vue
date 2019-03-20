<template>
  <div>
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      v-bind:allowAbort="actionChooserSettings.allowAbort"
      v-on:chosen="hideActionChooser(); action.name=$event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>Aktion:
    <div>
      <button
        class="flat-input"
        v-bind:value="actionName"
        v-on:click="showActionChooser()"
        list="actions"
        name="action"
        type="button"
      >{{this.action.name}}</button>
      <br>
      <ConstraintItem v-on:constraint-set="setConstraint($event)"></ConstraintItem>
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
    },
    setConstraint: function(constraint) {
      this.action.constraint = constraint;
    }
  },
  computed: {
    actionName: function() {
      return this.action.name;
    }
  }
};
</script>
