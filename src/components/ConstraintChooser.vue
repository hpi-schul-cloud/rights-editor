<template>
  <BaseModal v-bind:width="'1000px'" v-bind:scrollable="false">
    <template v-slot:header>
      <h1>Einschränkung festlegen</h1>
      <div class="hidden">{{ forceRerender }}</div>
    </template>
    <template v-slot:body>
      <div class="body-container">
        <div class="list-container">
          <ul class="list">
            <li
              v-for="operand in _operands"
              v-bind:key="operand.id"
              v-bind:class="{selected: isOperandSelected(operand.id)}"
              v-on:click="operandClicked(operand.id)"
            >{{operand.name}}</li>
          </ul>
        </div>
        <div class="list-container">
          <ul class="list">
            <li
              v-for="operator in _operators"
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
                  v-for="unit in _units"
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
                v-for="item in _list"
                v-bind:key="item.id"
                v-bind:class="{selected: isListItemSelected(item.id) }"
                v-on:click="listItemClicked(item.id)"
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
import {
  Constraint,
  operands,
  operators,
  states,
  groups,
  units,
  operandMapping
} from "../libs/constraints/constraints";
import BaseInput from "./BaseInput.vue";
import BaseModal from "./BaseModal.vue";
import BaseButton from "./BaseButton.vue";

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
      forceRerender: 0,

      displayNumberInput: false,
      displayListInput: true,

      numericOperands: null,
      _operands: null,
      _operators: null,
      _list: null,
      _units: null,

      selectedOperandId: 0,
      selectedOperatorId: 0,
      selectedUnitId: 0,

      number: 0,
      selectedListItems: []
    };
  },
  created: function() {
    this.numericOperands = new Set();
    for (let i = 0; i < operandMapping.length; i++) {
      if (operandMapping[i].units.length > 0) {
        // if there is a unit to select, then the input is a number for sure
        this.numericOperands.add(i);
      }
    }

    if (this.constraintToEdit == null) {
      // totally new (empty) constraint chooser is going to be created
      this.initializeDataOnOperandId(0);
    } else {
      // load data from the constraint to be edited

      // determine operand
      for (let i = 0; i < operands.length; i++) {
        if (operands[i].name == this.constraintToEdit.leftOperand) {
          this.selectedOperandId = i;
        }
      }

      this.initializeDataOnOperandId(this.selectedOperandId);

      // determine operator
      for (let i = 0; i < operators.length; i++) {
        if (operators[i].symbol == this.constraintToEdit.operator) {
          this.selectedOperatorId = operators[i].id;
        }
      }

      if (this.constraintToEdit.unit == "") {
        // list items
        for (let i = 0; i < this._list.length; i++) {
          for (
            let j = 0;
            j < this.constraintToEdit.rightOperandList.length;
            j++
          ) {
            if (
              this._list[i].name == this.constraintToEdit.rightOperandList[j]
            ) {
              this.selectedListItems[i] = true;
            }
          }
        }
      } else {
        // number with unit
        for (let i = 0; i < units.length; i++) {
          if (units[i].name == this.constraintToEdit.unit) {
            this.selectedUnitId = i;
          }
        }
        this.number = this.constraintToEdit.rightOperandNumber;
      }
    }
  },
  methods: {
    initializeDataOnOperandId: function(id) {
      this.selectedOperandId = id;

      // reset to default input values
      this.selectedOperatorId = 0;
      this.number = 0;

      // set data based on chosen operand (use mapping information to do so)
      let operandMapAtId = operandMapping[this.selectedOperandId];

      this.selectedListItems = new Array();
      for (let i = 0; i < operandMapAtId.list.length; i++) {
        this.selectedListItems.push(false);
      }

      this._operands = operands;
      this._operators = operandMapAtId.operators;
      this._list = operandMapAtId.list;
      this._units = operandMapAtId.units;

      // set correct display mode (numeric or list input)
      if (this.numericOperands.has(id)) {
        this.displayNumberInput = true;
        this.displayListInput = false;
        this.selectedUnitId = operandMapAtId.units[0].id;
      } else {
        this.displayNumberInput = false;
        this.displayListInput = true;
      }
    },
    operandClicked: function(id) {
      this.initializeDataOnOperandId(id);
    },
    isOperandSelected: function(id) {
      return this.selectedOperandId == id;
    },
    operatorClicked: function(id) {
      this.selectedOperatorId = id;
    },
    isOperatorSelected: function(id) {
      return this.selectedOperatorId == id;
    },
    listItemClicked: function(id) {
      this.selectedListItems[id] = !this.selectedListItems[id];
      this.forceRerender++;
    },
    isListItemSelected: function(id) {
      return this.selectedListItems[id] == true;
    },
    unitClicked(id) {
      this.selectedUnitId = id;
    },
    isUnitSelected(id) {
      return this.selectedUnitId == id;
    },
    accept: function() {
      let constraint = new Constraint(-1);
      constraint.leftOperand = operands[this.selectedOperandId].name;
      constraint.operator = operators[this.selectedOperatorId].symbol;

      if (this.displayNumberInput) {
        // for numeric input the right operand is just a number, also add the unit though
        constraint.rightOperandNumber = this.number;
        constraint.rightOperandStr = constraint.rightOperandNumber.toString();
        constraint.unit = units[this.selectedUnitId].name;
      } else {
        // create array of chosen names from the value list
        let listItems = [];
        for (let i = 0; i < this._list.length; i++) {
          if (this.selectedListItems[i] == true) {
            listItems.push(this._list[i].name);
          }
        }
        constraint.rightOperandList = listItems;
        constraint.rightOperandStr = listItems.toString();
        // add a space after each comma
        constraint.rightOperandStr = constraint.rightOperandStr.replace(
          /,/g,
          ", "
        );
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

      if (this.constraintToEdit != null) {
        constraint.id = this.constraintToEdit.id;
        this.$emit("edited", constraint);
      } else {
        this.$emit("chosen", constraint);
      }
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

/* changing data that is technically a visible part of the component but hidden using CSS styling allows for easily forcing a component rerender */
.hidden {
  display: none;
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