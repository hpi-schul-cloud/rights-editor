<template>
  <div class="action-container">
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      v-bind:allowAbort="actionChooserSettings.allowAbort"
      v-on:chosen="hideActionChooser(); action.name=$event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>

    <!-- display and edit action -->
    <BaseButton
      input
      v-bind:value="actionName"
      v-bind:onClick="showActionChooserWithAbort"
      list="actions"
      name="action"
      type="button"
    >{{action.name}}</BaseButton>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import BaseButton from "./BaseButton.vue";
import ActionChooser from "./ActionChooser.vue";

export class Action {
  constructor(name, nsVocabUri) {
    this.name = name;
    this.nsVocabUri = nsVocabUri;
    this.constraints = new Array();
  }

  name() {
    return this.nsVocabUri.split("/").pop();
  }
}

export default {
  name: "ActionItem",
  components: {
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
    showActionChooserWithAbort: function() {
      this.showActionChooser(true);
    },
    showActionChooser: function(allowAbort) {
      this.actionChooserSettings.displayActionChooser = true;
      this.actionChooserSettings.allowAbort = allowAbort;
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

<style scoped>
.action-container {
  display: inline;
}
</style>
