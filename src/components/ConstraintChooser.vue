<template>
  <BaseModal :width="'1000px'" :scrollable="false">
    <template v-slot:header>
      <h1 v-if="constraintToEdit == null">
        Einschränkung hinzufügen
      </h1>
      <h1 v-else>
        Einschränkung bearbeiten
      </h1>
    </template>

    <template v-slot:body>
      <ul class="list">
        <li
          v-for="(op, index) in operands"
          :key="index"
          :class="{ selected: leftOperand === op }"
          @click="leftOperand = op"
        >
          {{ op }}
        </li>
      </ul>
      <ul class="list">
        <li
          v-for="(op, index) in operators"
          :key="index"
          :class="{ selected: operator === op.identifier }"
          @click="operator = op.identifier"
        >
          {{ op.symbol }}
        </li>
      </ul>
      <div class="value-container">
        <!-- input is number with unit -->
        <div v-if="isNumericInput" class="numeric-input-container">
          <div class="number-container">
            <div class="numeric-input-header">
              Zahl:
            </div>
            <br>
            <BaseInput
              :value="value"
              class="number-input flat-input"
              type="number"
              @input="value = $event"
            />
          </div>
          <div class="unit-container">
            <div class="numeric-input-header">
              Einheit:
            </div>
            <br>
            <ul class="unit-list list" type="text" name="unit">
              <li
                v-for="(u, index) in units"
                :key="index"
                :class="{ selected: unit === u }"
                @click="unit = u"
              >
                {{ u }}
              </li>
            </ul>
          </div>
        </div>
        <!-- input is selection from list -->
        <ul v-if="isListInput" class="value-list list">
          <li
            v-for="(item, index) in listItems"
            :key="index"
            :class="{ selected: Array.isArray(rightOperand) && rightOperand.indexOf(item) >= 0 }"
            @click="toggleRightOperand(item)"
          >
            {{ item }}
          </li>
        </ul>
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
        >
          Abbrechen
        </BaseButton>
        <BaseButton :on-click="accept">
          Annehmen
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import Vue from 'vue';
import {
  Constraint,
  operandList,
  states,
  groups,
  operandMapping,
} from '../libs/odrl/constraints';
import BaseInput from './BaseInput.vue';
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'ConstraintChooser',
  components: {
    BaseInput,
    BaseModal,
    BaseButton,
  },
  props: {
    constraintToEdit: {
      type: Object,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      constraint: {},
    };
  },
  computed: {
    operands() {
      return operandList;
    },
    leftOperand: {
      get() {
        let operand = this.constraint.leftOperand;
        if (!operand) {
          operand = this.operands[0];
          this.leftOperand = operand;
        }
        return operand;
      },
      set(op) {
        if (this.constraint.leftOperand === op) {
          // do nothing
          return;
        }
        Vue.set(this.constraint, 'leftOperand', op);
        Vue.delete(this.constraint, 'operator');
        Vue.delete(this.constraint, 'rightOperand');
        Vue.delete(this.constraint, 'unit');
      },
    },
    operator: {
      get() {
        if (this.operators.length === 1) {
          this.operator = this.operators[0].identifier;
        }
        return this.constraint.operator;
      },
      set(op) {
        Vue.set(this.constraint, 'operator', op);
      },
    },
    rightOperand: {
      get() {
        const operand = this.constraint.rightOperand;
        return operand || [];
      },
      set(op) {
        op.sort();
        Vue.set(this.constraint, 'rightOperand', op);
      },
    },
    value: {
      get() {
        const op = this.constraint.rightOperand;
        if (!op && this.isNumericInput) {
          Vue.set(this.constraint, 'rightOperand', { '@value': '0' });
        }
        return this.constraint.rightOperand['@value'];
      },
      set(val) {
        this.constraint.rightOperand['@value'] = val;
      },
    },
    unit: {
      get() {
        if (this.units.length === 1) {
          this.unit = this.units[0];
        }
        return this.constraint.unit;
      },
      set(u) {
        Vue.set(this.constraint, 'unit', u);
      },
    },
    operators() {
      return operandMapping[this.leftOperand].operators;
    },
    units() {
      return operandMapping[this.leftOperand].units;
    },
    listItems() {
      return operandMapping[this.leftOperand].list;
    },
    isNumericInput() {
      return !!operandMapping[this.leftOperand].units;
    },
    isListInput() {
      return !!operandMapping[this.leftOperand].list;
    },
  },
  methods: {
    accept() {
      const hasLeftOperand = !!this.constraint.leftOperand;
      const hasOperator = !!this.constraint.operator;
      const hasRightOperand = !!this.constraint.rightOperand;
      const hasUnitIfNumeric = !this.isNumericInput || !!this.constraint.unit;

      if (hasLeftOperand && hasOperator && hasRightOperand && hasUnitIfNumeric) {
        this.$emit('chosen', this.constraint);
      }
    },
    toggleRightOperand(op) {
      const idx = this.rightOperand.indexOf(op);
      if (idx >= 0) {
        this.rightOperand.splice(idx, 1);

        if (this.rightOperand.length === 0) {
          Vue.delete(this.constraint, 'rightOperand');
        }
        return;
      }

      this.rightOperand = [...this.rightOperand, op];
    },
  },
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
