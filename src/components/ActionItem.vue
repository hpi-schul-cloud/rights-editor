<template>
  <div class="action-container">
    <ActionChooser
      v-if="displayActionChooser"
      @chosen="hideActionChooser(); action = $event"
      @abort="choosingAborted()"
    />

    <!-- display and edit action -->
    <BaseButton
      input
      list="actions"
      name="action"
      type="button"
      @click="showActionChooser()"
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
    rule() {
      const rulePath = this.path.slice(0, this.path.length - 1);
      return this.policy.follow(rulePath);
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
    showActionChooser() {
      this.actionChooserShouldDisplay = true;
    },
    hideActionChooser() {
      this.actionChooserShouldDisplay = false;
    },
    choosingAborted() {
      if (this.rule.action === placeholderText) {
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
