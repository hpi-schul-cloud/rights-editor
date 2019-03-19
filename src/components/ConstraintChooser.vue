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
            >{{operator.symbol}}</li>
          </ul>
        </div>
        <div class="value-input-container">
          <!-- input is number -->
          <div v-if="displayNumberInput" class="value-input-number-container">Zahl eingeben:
            <br>
            <input class="value-input-number" type="number" v-model.number="inputNumber">
          </div>
          <!-- input is selection from list -->
          <div v-if="displayListInput" class="value-input-list-container">
            <ul class="value-input-list list">
              <li
                v-for="item in valueList"
                v-bind:key="item.id"
                v-bind:class="{selected: isValueListItemChosen(item.id) }"
                v-on:click="valueListItemClicked(item.id)"
              >{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton textlike v-bind:onClick="function() {$emit('abort');}">Abbrechen</BaseButton>
        <BaseButton v-bind:onClick="accept">Annehmen</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";

class Constraint {
  constructor() {
    this.name = "";
    this.leftOperand = "";
    this.rightOperand = "";
    this.operator = "";
    this.unit = "";
    this.type = "";
  }
}

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
      setOfNumericOperands: null,

      inputNumber: 0,
      currentLeftOperandId: 1,
      currentOperatorId: 1,
      backupOperatorId: 1,
      operators: null,
      valueList: null,
      chosenStates: [],
      chosenGroups: [],

      leftOperands: {
        1: { id: 1, name: "Bundesland" },
        2: { id: 2, name: "Gruppenzugehörigkeit" },
        3: { id: 3, name: "Alter" },
        4: { id: 4, name: "Nutzungsdauer" }
      },
      numericOperators: {
        1: { id: 1, symbol: "=", short: "eq" },
        2: { id: 2, symbol: "<", short: "lt" },
        3: { id: 3, symbol: "≤", short: "lteq" },
        4: { id: 4, symbol: ">", short: "gt" },
        5: { id: 5, symbol: "≥", short: "gteq" }
      },
      listOperators: {
        1: { id: 1, symbol: "=", short: "eq" }
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
      statesCount: 16,
      groups: {
        1: { id: 1, name: "Lehrer" },
        2: { id: 2, name: "Schüler" }
      },
      groupsCount: 2
    };
  },
  created: function() {
    // initialize the array of chosen states
    this.setOfNumericOperands = new Set();
    this.setOfNumericOperands.add(3);
    this.setOfNumericOperands.add(4);

    for (let i = 1; i <= this.statesCount; i++) {
      this.chosenStates.push(false);
    }
    for (let i = 1; i <= this.groupsCount; i++) {
      this.chosenGroups.push(false);
    }
    this.valueList = this.states;
    this.operators = this.listOperators;
  },
  methods: {
    leftOperandClicked: function(id) {
      this.currentLeftOperandId = id;
      // determine possible operators and value input options based on the chosen left operand
      if (this.setOfNumericOperands.has(id)) {
        this.displayNumberInput = true;
        this.displayListInput = false;
        this.operators = this.numericOperators;
        this.currentOperatorId = this.backupOperatorId;
      } else {
        this.displayNumberInput = false;
        this.displayListInput = true;
        this.operators = this.listOperators;
        this.currentOperatorId = 1;

        if (id == 1) {
          this.valueList = this.states;
        } else if (id == 2) {
          this.valueList = this.groups;
        }
      }
    },
    isLeftOperandSelected: function(id) {
      return this.currentLeftOperandId == id;
    },
    operatorClicked: function(id) {
      this.currentOperatorId = id;
      if (this.displayNumberInput) {
        this.backupOperatorId = id;
      }
    },
    isOperatorSelected: function(id) {
      return this.currentOperatorId == id;
    },
    stateClicked: function(id) {
      this.chosenStates[id] = !this.chosenStates[id];
      // this is a hack to force vue js to redraw the list
      this.chosenStates.push(undefined);
      this.chosenStates.pop();
    },
    groupClicked: function(id) {
      this.chosenGroups[id] = !this.chosenGroups[id];
      // this is a hack to force vue js to redraw the list
      this.chosenGroups.push(undefined);
      this.chosenGroups.pop();
    },
    isStateChosen: function(id) {
      return this.chosenStates[id] == true;
    },
    isGroupChosen: function(id) {
      return this.chosenGroups[id] == true;
    },
    isValueListItemChosen: function(id) {
      if (this.valueList == this.states) {
        return this.isStateChosen(id);
      } else if (this.valueList == this.groups) {
        return this.isGroupChosen(id);
      }
    },
    valueListItemClicked: function(id) {
      if (this.valueList == this.states) {
        this.stateClicked(id);
      } else if (this.valueList == this.groups) {
        this.groupClicked(id);
      }
    },
    accept: function() {
      let constraint = new Constraint();
      constraint.leftOperand = this.leftOperands[
        this.currentLeftOperandId
      ].name;

      constraint.operator = this.operators[this.currentOperatorId].short;
      if (this.displayNumberInput) {
        // for numeric input the right operand is just a number
        constraint.rightOperand = this.inputNumber.toString();
      } else {
        // create array of chosen names from the value list
        let values = [];
        if (this.valueList == this.states) {
          for (let i = 1; i <= this.statesCount; i++) {
            if (this.chosenStates[i] == true) {
              values.push(this.states[i].name);
            }
          }
        } else if (this.valueList == this.groups) {
          for (let i = 1; i <= this.groupsCount; i++) {
            if (this.chosenGroups[i] == true) {
              values.push(this.groups[i].name);
            }
          }
        }
        console.log(values);
        constraint.rightOperand = values.toString();
      }
      console.log(constraint);
      this.$emit("chosen", constraint);
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
  cursor: pointer;
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
  margin-right: 15px;
}

.value-input-list {
  overflow-y: scroll;
  height: 250px;
  width: 335px;
}

.value-input-number-container {
  float: left;
  width: 275px;
  margin-left: 50px;
}

.value-input-number {
  width: 200px;
  font-size: 16px;
  height: 16px;
  margin: 0;
  margin-top: 5px;
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
  background-color: rgb(218, 218, 218);
}

::-webkit-scrollbar-thumb {
  background: #999;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
