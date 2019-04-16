<template>
  <BaseModal>
    <template v-slot:header>
      <h1>Aktion auswählen</h1>
    </template>
    <template v-slot:body>
      <ul class="actions-list">
        <li
          v-for="action in actions"
          :key="action.id"
          :class="{selected: isSelected(action.id)}"
          @click="actionClicked(action.id)"
        >
          {{ action.label }}
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton
          textlike
          :on-click="function() {$emit('abort');}"
        >
          Abbrechen
        </BaseButton>
        <BaseButton
          :disabled="currentAction == ''"
          :on-click="function() {$emit('chosen', currentAction);}"
        >
          Annehmen
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';

export default {
  name: 'ActionChooser',
  components: {
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      currentSelected: null,
      currentAction: '',
      actions: [
        { id: 0, label: 'Aggregieren' },
        { id: 1, label: 'Annotieren' },
        { id: 2, label: 'Annonymisieren' },
        { id: 3, label: 'Archivieren' },
        { id: 4, label: 'Kompensieren' },
        { id: 5, label: 'Löschen' },
        { id: 6, label: 'Drucken' },
        { id: 7, label: 'Speichern' },
        { id: 8, label: 'Verbreiten' },
        { id: 9, label: 'Zitieren' },
      ],
    };
  },
  methods: {
    actionClicked(actionId) {
      this.currentAction = this.actions[actionId].label;
      this.currentSelected = actionId;
    },
    isSelected(identifier) {
      return this.currentSelected === identifier;
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
