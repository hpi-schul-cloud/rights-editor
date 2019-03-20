<template>
  <div>
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      v-bind:allowAbort="actionChooserSettings.allowAbort"
      v-on:chosen="hideActionChooser(); action.name=$event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>Aktion:
    <div>
      <BaseButton
        input
        class="flat-input"
        v-bind:width="'600px'"
        v-bind:value="actionName"
        v-bind:onClick="showActionChooser"
        list="actions"
        name="action"
        type="button"
      >{{this.action.name}}</BaseButton>
      <br>
      <ConstraintItem v-on:constraint-set="setConstraint($event)"></ConstraintItem>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import BaseButton from "./BaseButton.vue";
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
    ActionChooser,
    BaseButton
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
