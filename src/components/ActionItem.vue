<template>
  <div class="action-container">
    <ActionChooser
      v-if="displayActionChooser"
      @chosen="chosen($event)"
      @abort="aborted()"
    />

    <!-- display and edit action -->
    <BaseButton
      input
      list="actions"
      name="action"
      type="button"
      @click="showActionChooser()"
    >
      {{ actionLabel }}
    </BaseButton>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseButton.vue';
import ActionChooser from './ActionChooser.vue';
import { actionList } from '../libs/odrl/actions.js';

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
    removeCallback: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      actionChooserShouldDisplay: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    placeholder() {
      return this.$i18n.t('placeholder');
    },
    rule() {
      const rulePath = this.path.slice(0, this.path.length - 1);
      return this.policy.follow(rulePath);
    },
    action: {
      get() {
        if (!this.rule.action) {
          Vue.set(this.rule, 'action', this.placeholder);
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
    actionLabel() {
      if (this.action && this.action != this.placeholder) {
        return this.$i18n.t(actionList.find(item => item === this.action));
      }
      return this.placeholder;
    },
    displayActionChooser() {
      return this.actionChooserShouldDisplay || this.rule.action === this.placeholder;
    },
  },
  methods: {
    showActionChooser() {
      this.actionChooserShouldDisplay = true;
    },
    hideActionChooser() {
      this.actionChooserShouldDisplay = false;
    },
    chosen(action) {
      this.hideActionChooser();
      this.action = action;
    },
    aborted() {
      if (this.rule.action === this.placeholder) {
        this.removeCallback();
      } else {
        this.hideActionChooser();
      }
    },
  },
};
</script>

<style scoped>
.action-container {
  display: inline;
}
</style>
