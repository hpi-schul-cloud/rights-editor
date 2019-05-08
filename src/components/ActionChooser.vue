<template>
  <BaseModal>
    <template v-slot:header>
      <h1>Aktion auswählen</h1>
    </template>
    <template v-slot:body>
      <ul class="actions-list">
        <li
          v-for="(action, index) in actions"
          :key="index"
          :class="{selected: currentSelected === index}"
          @click="actionClicked(index)"
        >
          {{ action.label }}
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton textlike @click="abort">
          Abbrechen
        </BaseButton>
        <BaseButton :disabled="currentAction == ''" @click="chosen($event)">
          Annehmen
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';
import { actionList } from '../libs/odrl/actions.js';
import { RuleTypes } from '../libs/odrl/rules.js';

export default {
  name: 'ActionChooser',
  components: {
    BaseButton,
    BaseModal,
  },
  props: {
    ruleType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentSelected: null,
      currentAction: '',
    };
  },
  computed: {
    actions() {
      const getParentRule = (type => RuleTypes[type].subrule === this.ruleType);
      const ruleType = RuleTypes[this.ruleType].hasParentRule ? Object.keys(RuleTypes).filter(getParentRule)[0] : this.ruleType;
      return actionList.filter(action => action[ruleType]);
    },
  },
  methods: {
    actionClicked(actionId) {
      this.currentAction = this.actions[actionId];
      this.currentSelected = actionId;
    },
    abort() {
      this.$emit('abort');
    },
    chosen(action) {
      this.$emit('chosen', this.currentAction.label);
    },
  },
};
</script>

<style scoped>
.actions-list {
  margin: 0px;
  padding: 0px;
}
.actions-list li {
  padding: 0.5em;
  border-bottom: 1px lightgray solid;
  cursor: default;
}
.actions-list li:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
}
.actions-list .selected {
  background-color: rgb(218, 218, 218);
}
.actions-list .selected:hover {
  background-color: rgb(218, 218, 218);
}

.modal-footer {
  text-align: right;
}

</style>
