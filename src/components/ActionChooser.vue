<template>
  <BaseModal>
    <template v-slot:header>
      <h1>Aktion auswählen</h1>
    </template>
    <template v-slot:body>
      <ul class="actions-list">
        <li
          v-for="action in actions"
          v-bind:key="action.id"
          v-bind:class="{selected: isSelected(action.id)}"
          v-on:click="actionClicked(action.id)"
        >{{ action.label }}</li>
      </ul>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton
          textlike
          v-if="allowAbort"
          v-bind:onClick="function() {$emit('abort');}"
        >Abbrechen</BaseButton>
        <BaseButton
          v-bind:disabled="currentAction == ''"
          v-bind:onClick="function() {$emit('chosen', currentAction);}"
        >Annehmen</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";

export default {
  name: "ActionChooser",
  components: {
    BaseButton,
    BaseModal
  },

  data: function() {
    return {
      currentSelected: null,
      currentAction: "",
      actions: {
        1: { id: 1, label: "Aggregieren" },
        2: { id: 2, label: "Annotieren" },
        4: { id: 4, label: "Annonymisieren" },
        5: { id: 5, label: "Archivieren" },
        6: { id: 6, label: "Kompensieren" },
        7: { id: 7, label: "Löschen" },
        8: { id: 8, label: "Drucken" },
        9: { id: 9, label: "Speichern" },
        10: { id: 10, label: "Verbreiten" },
        11: { id: 11, label: "Zitieren" }
      }
    };
  },
  props: {
    allowAbort: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    actionClicked: function(actionId) {
      this.currentAction = this.actions[actionId].label;
      this.currentSelected = actionId;
    },
    isSelected: function(identifier) {
      return this.currentSelected == identifier;
    }
  }
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
  background-color: rgb(248, 248, 248);
}

.actions-list .selected {
  background-color: rgb(238, 238, 238);
}
.actions-list .selected:hover {
  background-color: rgb(228, 228, 228);
}

.modal-footer {
  text-align: right;
}
</style>
