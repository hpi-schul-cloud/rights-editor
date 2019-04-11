<template>
  <BaseModal :width="'1000px'" :scrollable="false">
    <template v-slot:header>
      <h1 v-if="constraintToEdit == null">Einschränkung hinzufügen</h1>
      <h1 v-else>Einschränkung bearbeiten</h1>
    </template>

    <template v-slot:body>
      <ul class="list">
        <li
          v-for="(op, index) in operands"
          :key="index"
          :class="{ selected: operand === op }"
          @click="operand = op"
        >{{ op }}</li>
      </ul>
      <ul class="list">
        <li
          v-for="(operator, index) in operators"
          :key="index"
          :class="{ selected: constraint.operator === operator.identifier }"
          @click="set(constraint, 'operator', operator.identifier)"
        >{{ operator.symbol }}</li>
      </ul>
      <div class="value-container">
        <!-- input is number with unit -->
        <div v-if="isNumericInput" class="numeric-input-container">
          <div class="number-container">
            <div class="numeric-input-header">Zahl:</div>
            <br>
            <BaseInput
              v-model.number="constraint.value"
              class="number-input flat-input"
              type="number"
            />
          </div>
          <div class="unit-container">
            <div class="numeric-input-header">Einheit:</div>
            <br>
            <ul class="unit-list list" type="text" name="unit">
              <li
                v-for="(unit, index) in units"
                :key="index"
                :class="{ selected: selectedUnit === unit }"
                @click="selectedUnit = unit"
              >{{ unit }}</li>
            </ul>
          </div>
        </div>
        <!-- input is selection from list -->
        <ul v-if="isListInput" class="value-list list">
          <li
            v-for="(item, index) in listItems"
            :key="index"
            :class="{ selected: constraint.rightOperand === item }"
            @click="set(constraint, 'rightOperand', item)"
          >{{ item }}</li>
        </ul>
        <pre
          style="position: fixed; z-index: 2; top: 0; left: 0; background-color: white; margin: 0px; padding: 0px"
        >{{ constraint }}</pre>
      </div>
    </template>

    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton
          textlike
          :on-click="
            function() {
              $emit('abort');
            }
          "
        >Abbrechen</BaseButton>
        <BaseButton :on-click="function() {$console.log('not implemented')}">Annehmen</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import {
  Constraint,
  operandList,
  states,
  groups,
  operandMapping
} from "../libs/odrl/constraints";
import BaseInput from "./BaseInput.vue";
import BaseModal from "./BaseModal.vue";
import BaseButton from "./BaseButton.vue";
import Vue from "vue";

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
  data() {
    return {
      constraint: {},
      selectedUnit: "",

      /////// ---------

      forceRerender: 0,

      displayNumberInput: false,
      displayListInput: true,

      numericOperands: null,
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
  methods: {
    //   accept() {
    //     const constraint = new Constraint(-1);
    //     constraint.leftOperand = operands[this.selectedOperandId].name;
    //     constraint.operator = operators[this.selectedOperatorId].symbol;

    //     if (this.displayNumberInput) {
    //       // for numeric input the right operand is just a number, also add the unit though
    //       constraint.rightOperandNumber = this.number;
    //       constraint.rightOperandStr = constraint.rightOperandNumber.toString();
    //       constraint.unit = units[this.selectedUnitId].name;
    //     } else {
    //       // create array of chosen names from the value list
    //       const listItems = [];
    //       for (let i = 0; i < this._list.length; i++) {
    //         if (this.selectedListItems[i] == true) {
    //           listItems.push(this._list[i].name);
    //         }
    //       }
    //       constraint.rightOperandList = listItems;
    //       constraint.rightOperandStr = listItems.toString();
    //       // add a space after each comma
    //       constraint.rightOperandStr = constraint.rightOperandStr.replace(
    //         /,/g,
    //         ", "
    //       );
    //     }
    //     constraint.name = `${constraint.leftOperand} ${constraint.operator} ${
    //       constraint.rightOperandStr
    //     }`;

    //     if (constraint.unit != "") {
    //       constraint.name += ` ${constraint.unit}`;
    //     }

    //     this.$emit("chosen", constraint);
    //   }
    set(target, name, value) {
      Vue.set(target, name, value);
    }
  },
  computed: {
    operands() {
      return operandList;
    },
    operand: {
      get() {
        let operand = this.constraint.leftOperand;
        if (!operand) {
          operand = this.operands[0];
        }
        return operand;
      },
      set(op) {
        if (this.constraint.leftOperand === op) {
          // do nothing
          return;
        }
        Vue.set(this.constraint, 'leftOperand', op);
        Vue.delete(this.constraint, "operator");
        Vue.delete(this.constraint, "rightOperand");
      }
    },
    operators() {
      return operandMapping[this.operand].operators;
    },
    units() {
      return operandMapping[this.operand].units;
    },
    listItems() {
      return operandMapping[this.operand].list;
    },
    isNumericInput() {
      return !!operandMapping[this.operand].units;
    },
    isListInput() {
      return !!operandMapping[this.operand].list;
    }
  }
};
</script>

<style scoped>
.list {
  float: left;
  margin: 0px 10px;
  padding: 0px;
  width: 300px;
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

.value-container {
  float: left;
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
