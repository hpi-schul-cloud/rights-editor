<template>
  <div class="action-container">
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      :allow-abort="actionChooserSettings.allowAbort"
      @chosen="hideActionChooser(); action.name=$event"
      @abort="hideActionChooser()"
    />

    <!-- display and edit action -->
    <BaseButton
      input
      :value="actionName"
      :on-click="showActionChooserWithAbort"
      list="actions"
      name="action"
      type="button"
    >
      {{ action.name }}
    </BaseButton>
  </div>
</template>

<script>
import { Odrl as Vocab } from '../libs/rightsml-lib-js/ODRLvocabs';
import BaseButton from './BaseButton.vue';
import ActionChooser from './ActionChooser.vue';

export class Action {
  constructor(name, nsVocabUri) {
    this.name = name;
    this.nsVocabUri = nsVocabUri;
    this.constraints = new Array();
  }

  name() {
    return this.nsVocabUri.split('/').pop();
  }
}

export default {
  name: 'ActionItem',
  components: {
    ActionChooser,
    BaseButton,
  },
  props: {
    action: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actionChooserSettings: {
        displayActionChooser: false,
        allowAbort: true,
      },
    };
  },
  computed: {
    actionName() {
      return this.action.name;
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
      this.actionChooserSettings.displayActionChooser = true;
      this.actionChooserSettings.allowAbort = allowAbort;
    },
    hideActionChooser() {
      this.actionChooserSettings.displayActionChooser = false;
      this.actionChooserSettings.allowAbort = true;
    },
  },
};
</script>

<style scoped>
.action-container {
  display: inline;
}
</style>
