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
import { lang } from '../libs/language/language.js';
import { placeholder } from '../libs/language/language.js';
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
      return lang;
    },
    rule() {
      const rulePath = this.path.slice(0, this.path.length - 1);
      return this.policy.follow(rulePath);
    },
    action: {
      get() {
        if (!this.rule.action) {
          Vue.set(this.rule, 'action', placeholder);
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
      if (this.action && this.action != placeholder) {
        return actionList.find(obj => { return obj.odrl === this.action })[lang];
      }
      return placeholder;
    },
    displayActionChooser() {
      return this.actionChooserShouldDisplay || this.rule.action === placeholder;
    },
  },
  methods: {
    showActionChooser() {
      this.actionChooserShouldDisplay = true;
    },
    hideActionChooser() {
      this.actionChooserShouldDisplay = false;
    },
    chosen(actionObj) {
      this.hideActionChooser();
      this.action = actionObj.odrl;
    },
    aborted() {
      if (this.rule.action === placeholder) {
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
