<template>
  <div>
    <ActionChooser
      v-if="actionChooserShouldDisplay"
      v-bind:actionChooserAllowAbort="actionChooserAllowAbort"
      v-on:chosen="hideActionChooser(); action = $event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>Aktion:
    <div>
      <BaseButton
        input
        v-bind:width="'600px'"
        v-bind:onClick="showActionChooserWithAbort"
        list="actions"
        name="action"
        type="button"
      >{{ action }}</BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BaseButton from "./BaseButton.vue";
import ActionChooser from "./ActionChooser.vue";

export default {
  name: "ActionItem",
  components: {
    ActionChooser,
    BaseButton
  },
  data: function() {
    return {
      actionChooserShouldDisplay: false,
      actionChooserAllowAbort: true
    };
  },
  props: {
    policy: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    }
  },
  created: function() {
    this.showActionChooser(false);
  },
  methods: {
    showActionChooserWithAbort: function() {
      this.showActionChooser(true);
    },
    showActionChooser: function(allowAbort) {
      this.actionChooserShouldDisplay = true;
      this.actionChooserAllowAbort = allowAbort;
    },
    hideActionChooser: function() {
      this.actionChooserShouldDisplay = false;
      this.actionChooserAllowAbort = true;
    },
  },
  computed: {
    rule() {
      return this.path
        .slice(0, this.path.length - 1)
        .reduce((result, segment) => result[segment], this.policy);
    },
    action: {
      get() {
        if (!this.rule["action"]) {
          Vue.set(this.rule, "action", "");
        }
        return this.rule["action"];
      },
      set(newAction) {
        this.rule["action"] = newAction;
      }
    }
  }
};
</script>
