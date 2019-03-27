<template>
  <BaseModal v-bind:width="'1000px'" v-bind:scrollable="false">
    <template v-slot:header>
      <h1>Bedingung festlegen</h1>
    </template>
    <template v-slot:body>
      <div class="body-container">
        <div class="list-container">
          <ul class="list">
            <li
              v-for="leftOperand in leftOperands"
              v-bind:key="leftOperand.id"
              v-bind:class="{selected: isLeftOperandSelected(leftOperand.id)}"
              v-on:click="leftOperandClicked(leftOperand.id)"
            >{{leftOperand.name}}</li>
          </ul>
        </div>
        <div class="list-container">
          <ul class="list">
            <li
              v-for="operator in operators"
              v-bind:key="operator.id"
              v-bind:class="{selected: isOperatorSelected(operator.id)}"
              v-on:click="operatorClicked(operator.id)"
            >{{operator.symbol}}</li>
          </ul>
        </div>
        <div class="value-container">
          <!-- input is number with unit -->
          <div v-if="displayNumberInput" class="numeric-input-container">
            <div class="number-container">
              <div class="numeric-input-header">Zahl:</div>
              <br>
              <BaseInput class="number-input flat-input" type="number" v-model.number="number"></BaseInput>
            </div>
            <div class="unit-container">
              <div class="numeric-input-header">Einheit:</div>
              <br>
              <ul class="unit-list list" type="text" name="unit">
                <li
                  v-for="unit in units"
                  v-bind:key="unit.id"
                  v-bind:class="{selected: isUnitSelected(unit.id)}"
                  v-on:click="unitClicked(unit.id)"
                >{{ unit.name }}</li>
              </ul>
            </div>
          </div>
          <!-- input is selection from list -->
          <div v-if="displayListInput" class="value-list-container list-container">
            <ul class="value-list list">
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
import BaseInput from "./BaseInput.vue";
import BaseModal from "./BaseModal.vue";
import BaseButton from "./BaseButton.vue";
import { Constraint } from "./ConstraintItem.vue";

export default {
  name: "ConstraintChooser",
  components: {
    BaseInput,
    BaseModal,
    BaseButton
  },
  props: {
    constraintToEdit: {
      type: Object,
      default: null,
      required: false
    }
  },
  data: function() {
    return {
      displayNumberInput: false,
      displayListInput: true,
      setOfNumericOperands: null,

      number: 0,
      selectedUnitId: 0,
      selectedLeftOperandId: 0,
      selectedOperatorId: 0,

      operators: null,
      valueList: null,
      units: null,
      chosenStates: [],
      chosenGroups: [],

      leftOperands: [
        { id: 0, name: "Bundesland" },
        { id: 1, name: "Gruppenzugehörigkeit" },
        { id: 2, name: "Alter" },
        { id: 3, name: "Nutzungsdauer" },
        { id: 4, name: "Nutzeranzahl" }
      ],
      numericOperators: [
        { id: 0, symbol: "=", short: "eq" },
        { id: 1, symbol: "<", short: "lt" },
        { id: 2, symbol: "≤", short: "lteq" },
        { id: 3, symbol: ">", short: "gt" },
        { id: 4, symbol: "≥", short: "gteq" }
      ],
      listOperators: [{ id: 0, symbol: "=", short: "eq" }],
      states: [
        { id: 0, name: "Baden-Württemberg" },
        { id: 1, name: "Bayern" },
        { id: 2, name: "Berlin" },
        { id: 3, name: "Brandenburg" },
        { id: 4, name: "Bremen" },
        { id: 5, name: "Hamburg" },
        { id: 6, name: "Hessen" },
        { id: 7, name: "Mecklenburg-Vorpommern" },
        { id: 8, name: "Niedersachsen" },
        { id: 9, name: "Nordrhein-Westfalen" },
        { id: 10, name: "Rheinland-Pfalz" },
        { id: 11, name: "Saarland" },
        { id: 12, name: "Sachsen" },
        { id: 13, name: "Sachsen-Anhalt" },
        { id: 14, name: "Schleswig-Holstein" },
        { id: 15, name: "Thüringen" }
      ],
      groups: [
        { id: 0, name: "Lehrer" },
        { id: 1, name: "Schüler" },
        { id: 2, name: "Verwaltung" }
      ],
      allUnits: [
        { id: 0, name: "Jahre" },
        { id: 1, name: "Tage" },
        { id: 2, name: "Stunden" },
        { id: 3, name: "Nutzer" }
      ]
    };
  },
  created: function() {
    // define what operands are numeric
    this.setOfNumericOperands = new Set();
    this.setOfNumericOperands.add(2);
    this.setOfNumericOperands.add(3);
    this.setOfNumericOperands.add(4);
    // default start values
    this.chosenStates = new Array();
    this.chosenGroups = new Array();
    for (let i = 0; i < this.states.length; i++) {
      this.chosenStates.push(false);
    }
    for (let i = 0; i < this.groups.length; i++) {
      this.chosenGroups.push(false);
    }

    if (this.constraintToEdit == null) {
      this.valueList = this.states;
      this.operators = this.listOperators;
    } else {
      let leftOp = this.constraintToEdit.leftOperand;

      if (leftOp == this.leftOperands[0].name) {
        // Bundesland
        this.valueList = this.states;
        this.operators = this.listOperators;

        for (let i = 0; i < this.states.length; i++) {
          for (
            let j = 0;
            j < this.constraintToEdit.rightOperandList.length;
            j++
          ) {
            if (
              this.states[i].name == this.constraintToEdit.rightOperandList[j]
            ) {
              this.chosenStates[i] = true;
            }
          }
        }
      } else if (leftOp == this.leftOperands[1].name) {
        // Gruppenzugehörigkeit
        this.selectedLeftOperandId = 1;
        this.valueList = this.groups;
        this.operators = this.listOperators;

        for (let i = 0; i < this.groups.length; i++) {
          for (
            let j = 0;
            j < this.constraintToEdit.rightOperandList.length;
            j++
          ) {
            if (
              this.groups[i].name == this.constraintToEdit.rightOperandList[j]
            ) {
              this.chosenGroups[i] = true;
            }
          }
        }
      } else {
        // numeric
        this.operators = this.numericOperators;

        // determine left operand
        for (let i = 2; i < this.leftOperands.length; i++) {
          if (leftOp == this.leftOperands[i].name) {
            this.selectedLeftOperandId = i;
          }
        }

        this.displayNumberInput = true;
        this.displayListInput = false;
        this.number = this.constraintToEdit.rightOperandNumber;

        // determine operator
        for (let i = 0; i < this.operators.length; i++) {
          if (this.constraintToEdit.operator == this.operators[i].symbol) {
            this.selectedOperatorId = i;
          }
        }

        this.units = [];
        if (this.selectedLeftOperandId == 2) {
          // age
          this.units.push(this.allUnits[0]);
          this.selectedUnitId = 0;
        } else if (this.selectedLeftOperandId == 3) {
          // time of use
          this.units.push(this.allUnits[0]);
          this.units.push(this.allUnits[1]);
          this.units.push(this.allUnits[2]);
          this.selectedUnitId = 0;
        } else if (this.selectedLeftOperandId == 4) {
          // amount of users
          this.units.push(this.allUnits[3]);
          this.selectedUnitId = 3;
        }

        // determine unit
        for (let i = 0; i < this.units.length; i++) {
          if (this.constraintToEdit.unit == this.units[i].name) {
            this.selectedUnitId = i;
          }
        }
      }
    }
  },
  methods: {
    leftOperandClicked: function(id) {
      this.selectedLeftOperandId = id;
      // determine possible operators and value input options based on the chosen left operand
      if (this.setOfNumericOperands.has(id)) {
        this.displayNumberInput = true;
        this.displayListInput = false;
        this.operators = this.numericOperators;
        this.number = 0;

        this.units = [];
        if (id == 2) {
          // age
          this.units.push(this.allUnits[0]);
          this.selectedUnitId = 0;
        } else if (id == 3) {
          // time of use
          this.units.push(this.allUnits[0]);
          this.units.push(this.allUnits[1]);
          this.units.push(this.allUnits[2]);
          this.selectedUnitId = 0;
        } else if (id == 4) {
          // amount of users
          this.units.push(this.allUnits[3]);
          this.selectedUnitId = 3;
        }
      } else {
        this.displayNumberInput = false;
        this.displayListInput = true;
        this.operators = this.listOperators;
        this.selectedOperatorId = 0;

        this.chosenStates = new Array();
        this.chosenGroups = new Array();
        for (let i = 0; i < this.states.length; i++) {
          this.chosenStates.push(false);
        }
        for (let i = 0; i < this.groups.length; i++) {
          this.chosenGroups.push(false);
        }

        if (id == 0) {
          // state
          this.valueList = this.states;
        } else if (id == 1) {
          // group
          this.valueList = this.groups;
        }
      }
    },
    isLeftOperandSelected: function(id) {
      return this.selectedLeftOperandId == id;
    },
    operatorClicked: function(id) {
      this.selectedOperatorId = id;
    },
    isOperatorSelected: function(id) {
      return this.selectedOperatorId == id;
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
    valueListItemClicked: function(id) {
      if (this.valueList == this.states) {
        this.stateClicked(id);
      } else if (this.valueList == this.groups) {
        this.groupClicked(id);
      }
    },
    isValueListItemChosen: function(id) {
      if (this.valueList == this.states) {
        return this.isStateChosen(id);
      } else if (this.valueList == this.groups) {
        return this.isGroupChosen(id);
      }
    },
    unitClicked(id) {
      this.selectedUnitId = id;
    },
    isUnitSelected(id) {
      return this.selectedUnitId == id;
    },
    accept: function() {
      let constraint = new Constraint(-1);
      constraint.leftOperand = this.leftOperands[
        this.selectedLeftOperandId
      ].name;

      constraint.operator = this.operators[this.selectedOperatorId].symbol;
      if (this.displayNumberInput) {
        // for numeric input the right operand is just a number, also add the unit though
        constraint.rightOperandNumber = this.number;
        constraint.rightOperandStr = constraint.rightOperandNumber.toString();
        constraint.unit = this.allUnits[this.selectedUnitId].name;
      } else {
        // create array of chosen names from the value list
        let values = [];
        if (this.valueList == this.states) {
          for (let i = 0; i < this.states.length; i++) {
            if (this.chosenStates[i] == true) {
              values.push(this.states[i].name);
            }
          }
        } else if (this.valueList == this.groups) {
          for (let i = 0; i < this.groups.length; i++) {
            if (this.chosenGroups[i] == true) {
              values.push(this.groups[i].name);
            }
          }
        }
        constraint.rightOperandList = values;
        constraint.rightOperandStr = values.toString();
        constraint.rightOperandStr = constraint.rightOperandStr.replace(
          /,/g,
          ", "
        ); // adds a space after each comma
      }
      constraint.name =
        constraint.leftOperand +
        " " +
        constraint.operator +
        " " +
        constraint.rightOperandStr;
      if (constraint.unit != "") {
        constraint.name += " " + constraint.unit;
      }
      this.$emit("chosen", constraint);
    },
    prepareEdit: function(constraint) {
      console.log("edit-constraint RECEIVE");
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

.value-container {
  float: left;
  margin-right: 15px;
}

.value-list {
  overflow-y: scroll;
  height: 250px;
  width: 335px;
}

.numeric-input-container {
  width: 335px;
  overflow: hidden;
}

.number-container {
  float: left;
  width: calc(50% - 20px);
  margin-left: 20px;
}

.number-input {
  width: 70%;
}

.unit-container {
  width: 50%;
  float: left;
}

.unit-list {
  margin-top: 10px;
}

.numeric-input-header {
  border-bottom: 1px solid #999;
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