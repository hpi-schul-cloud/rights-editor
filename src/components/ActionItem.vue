<template>
  <div class="action-container">
    <ActionChooser
      v-if="displayActionChooser"
      :allow-abort="actionChooserAllowAbort"
      @chosen="hideActionChooser(); action = $event"
      @abort="hideActionChooser()"
    />

    <!-- display and edit action -->
    <BaseButton
      input
      :on-click="showActionChooserWithAbort"
      list="actions"
      name="action"
      type="button"
    >
      {{ action }}
    </BaseButton>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseButton.vue';
import ActionChooser from './ActionChooser.vue';

const placeholderText = '<leer>';

export default {
  name: 'ActionItem',
  components: {
    ActionChooser,
    BaseButton,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      actionChooserShouldDisplay: false,
      actionChooserAllowAbort: false,
    };
  },
  computed: {
    rule() {
      return this.path
        .slice(0, this.path.length - 1)
        .reduce((result, segment) => result[segment], this.policy);
    },
    action: {
      get() {
        if (!this.rule.action) {
          Vue.set(this.rule, 'action', placeholderText);
        }
        if (Array.isArray(this.rule.action)) {
          return this.rule.action[0]['rdf:value'];
        }
        return this.rule.action;
      },
      set(newAction) {
        this.rule.action = newAction;
      },
    },
    displayActionChooser() {
      return this.actionChooserShouldDisplay || this.rule.action === placeholderText;
    },
  },
  methods: {
    showActionChooserWithAbort() {
      this.showActionChooser(true);
    },
    showActionChooser(allowAbort) {
      this.actionChooserShouldDisplay = true;
      this.actionChooserAllowAbort = allowAbort;
    },
    hideActionChooser() {
      this.actionChooserShouldDisplay = false;
      this.actionChooserAllowAbort = false;
    },
  },
};
</script>

<style scoped>
.action-container {
  display: inline;
}
</style>
