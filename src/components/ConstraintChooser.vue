<template>
  <BaseModal v-bind:width="1000" v-bind:scrollbar="false">
    <template v-slot:header>
      <h1>Bedingung festlegen</h1>
    </template>
    <template v-slot:body>
      <div class="body-container">
        <div class="left-operands-container list-container">
          <ul class="left-operands list">
            <li
              v-for="leftOperand in leftOperands"
              v-bind:key="leftOperand.id"
              v-bind:class="{selected: isLeftOperandSelected(leftOperand.id)}"
              v-on:click="leftOperandClicked(leftOperand.id)"
            >{{leftOperand.name}}</li>
          </ul>
        </div>
        <div class="operators-container list-container">
          <ul class="operators list">
            <li
              v-for="operator in operators"
              v-bind:key="operator.id"
              v-bind:class="{selected: isOperatorSelected(operator.id)}"
              v-on:click="operatorClicked(operator.id)"
            >{{operator.name}}</li>
          </ul>
        </div>
        <div class="value-input-container">
          <input v-if="displayNumberInput" class="value-input-input">
          <div v-if="displayListInput" class="value-input-list-container">
            <ul class="value-input-list list">
              <li v-for="state in states" v-bind:key="state.id">{{state.name}}</li>
            </ul>
          </div>
        </div>
      </div>
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
      displayNumberInput: false,
      displayListInput: true,
      currentLeftOperandId: 0,
      currentLeftOperand: "",
      currentOperatorId: 0,
      currentOperator: "",
      leftOperands: {
        1: { id: 1, name: "Bundesland" },
        2: { id: 2, name: "Gruppenzugehörigkeit" },
        3: { id: 3, name: "Alter" },
        4: { id: 4, name: "Nutzungsdauer" }
      },
      states: {
        1: { id: 1, name: "Baden-Württemberg" },
        2: { id: 2, name: "Bayern" },
        3: { id: 3, name: "Berlin" },
        4: { id: 4, name: "Brandenburg" },
        5: { id: 5, name: "Bremen" },
        6: { id: 6, name: "Hamburg" },
        7: { id: 7, name: "Hessen" },
        8: { id: 8, name: "Mecklenburg-Vorpommern" },
        9: { id: 9, name: "Niedersachsen" },
        10: { id: 10, name: "Nordrhein-Westfalen" },
        11: { id: 11, name: "Rheinland-Pfalz" },
        12: { id: 12, name: "Saarland" },
        13: { id: 13, name: "Sachsen" },
        14: { id: 14, name: "Sachsen-Anhalt" },
        15: { id: 15, name: "Schleswig-Holstein" },
        16: { id: 16, name: "Thüringen" }
      },
      operators: {
        1: { id: 1, name: "=" },
        2: { id: 2, name: "≠" },
        3: { id: 3, name: "<" },
        4: { id: 4, name: ">" }
      }
    };
  },
  props: {},
  methods: {
    leftOperandClicked: function(id) {
      this.currentLeftOperand = this.leftOperands[id].name;
      this.currentLeftOperandId = id;
    },
    isLeftOperandSelected: function(id) {
      return this.currentLeftOperandId == id;
    },
    operatorClicked: function(id) {
      this.currentLeftOperand = this.operators[id].name;
      this.currentOperatorId = id;
    },
    isOperatorSelected: function(id) {
      return this.currentOperatorId == id;
    }
  }
};
</script>

<style scoped>
.list {
  margin: 0px;
  padding: 0px;
  width: 100%;
  font-size: 16px;
}
.list li {
  padding: 0.5em;
  border-bottom: 1px lightgray solid;
  cursor: default;
}
.list li:hover {
  background-color: rgb(238, 238, 238);
}
.list .selected {
  background-color: rgb(218, 218, 218);
}
.list .selected:hover {
  background-color: rgb(218, 218, 218);
}

.list-container {
  float: left;
  margin-right: 10px;
  margin-left: 10px;
  width: 300px;
}

.value-input-container {  
  float: right;
  margin-right: 10px;
}

.value-input-list {
  overflow-y: scroll;
  height: 250px;
  width: 335px;
}

.value-input-input {
  width: 100%;
  font-size: 16px;
  height: 16px;
}

.modal-footer {
  margin-top: 50px;
  text-align: right;
}

/* custom scroll bar */

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #999;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
