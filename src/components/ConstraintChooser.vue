<template>
  <BaseModal>
    <template v-slot:header>
      <h1>Bedingung festlegen</h1>
    </template>
    <template v-slot:body>
      <ul class="left-operands-list">
        <li
          v-for="leftOperand in leftOperands"
          v-bind:key="leftOperand.id"
          v-bind:class="{selected: leftOperandIsSelected(leftOperand.id)}"
          v-on:click="leftOperandClicked(leftOperand.id)"
        >{{leftOperand.name}}</li>
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
      currentLeftOperandId: 0,
      currentLeftOperand: "",
      leftOperands: {
        1: { id: 1, name: "Bundesland" },
        2: { id: 2, name: "Gruppenzugehörigkeit" },
        3: { id: 3, name: "Alter" }
      }
    };
  },
  props: {},
  methods: {
    leftOperandClicked: function(id) {
      this.currentLeftOperand = this.leftOperands[id].name;
      this.currentLeftOperandId = id;
    },
    leftOperandIsSelected: function(id) {
      return this.currentLeftOperandId == id;
    }
  }
};
</script>

<style scoped>
.left-operands-list {
  margin: 0px;
  padding: 0px;
  width: 200px;
  font-size: 13px;
}
.left-operands-list li {
  padding: 0.5em;
  border-bottom: 1px lightgray solid;
  cursor: default;
}
.left-operands-list li:hover {
  background-color: rgb(248, 248, 248);
}
.left-operands-list .selected {
  background-color: rgb(238, 238, 238);
}
.left-operands-list .selected:hover {
  background-color: rgb(228, 228, 228);
}

.modal-footer {
  text-align: right;
}
</style>
