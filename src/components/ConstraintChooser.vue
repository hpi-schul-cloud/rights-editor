<template>
  <BaseModal>
    <template v-slot:header>
      <h1>Bedingung festlegen</h1>
    </template>
    <template v-slot:body>
      <ul class="left-operands-list">
        <li v-for="leftOperand in leftOperands" v-bind:key="leftOperand.id">{{leftOperand.name}}</li>
      </ul>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton textlike v-bind:onClick="function() {$emit('abort');}">Abbrechen</BaseButton>
        <BaseButton
          v-bind:onClick="function() {$emit('chosen' /*, additional parameter: the chosen constraint*/);}"
        >Annehmen</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";

export default {
  name: "ConstraintChooser",
  components: {
    BaseButton,
    BaseModal
  },

  data: function() {
    return {
      leftOperands: {
        1: { name: "Bundesland" },
        2: { name: "Gruppenzugehörigkeit" },
        3: { name: "Alter" }
      }
    };
  },
  props: {},
  methods: {}
};
</script>

<style scoped>

.left-operands-list {
  margin: 0px;
  padding: 0px;
}
.left-operands-list li {
  padding: 0.5em;
  border-bottom: 1px lightgray solid;
  cursor: default;
}

.modal-footer {
  text-align: right;
}
</style>
