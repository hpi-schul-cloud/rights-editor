<template>
  <div class="action-container">
    <ActionChooser
      v-if="actionChooserShouldDisplay"
      :action-chooser-allow-abort="actionChooserAllowAbort"
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
      actionChooserAllowAbort: true,
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
          Vue.set(this.rule, 'action', '');
        }
        return this.rule.action;
      },
      set(newAction) {
        this.rule.action = newAction;
      },
    },
  },
  mounted() {
    this.showActionChooser(false);
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
      this.actionChooserAllowAbort = true;
    },
  },
};
</script>

<style scoped>
.action-container {
  display: inline;
}
</style>
