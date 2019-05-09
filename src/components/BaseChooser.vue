<template>
  <BaseModal :width="'1000px'" :scrollable="false">
    <template v-slot:header>

      <h1 v-if="objectToEdit == null">
        {{ addObjectHeader }}
      </h1>
      <h1 v-else>
        {{ editObjectHeader }}
      </h1>
    </template>

    <template v-slot:body>
      <ul class="list">
        <li
          v-for="(op, index) in operands"
          :key="index"
          :class="{ selected: leftOperand === op.odrl }"
          @click="leftOperand = op.odrl"
        >{{ op[lang] }}</li>
      </ul>
      <ul class="list">
        <li
          v-for="(op, index) in operators"
          :key="index"
          :class="{ selected: operator === op.identifier }"
          @click="operator = op.identifier"
        >{{ op.symbol }}</li>
      </ul>
      <div class="value-container">
        <!-- input is number with unit -->
        <div v-if="isNumericInput" class="numeric-input-container">
          <div class="number-container">
            <div class="numeric-input-header">Zahl:</div>
            <br>
            <BaseInput
              class="number-input flat-input"
              type="number"
              :value="value"
              @input="value = $event"
            />
          </div>
          <div class="unit-container">
            <div class="numeric-input-header">Einheit:</div>
            <br>
            <ul class="unit-list list" type="text" name="unit">
              <li
                v-for="(u, index) in units"
                :key="index"
                :class="{ selected: unit === u.odrl }"
                @click="unit = u.odrl"
              >{{ u[lang] }}</li>
            </ul>
          </div>
        </div>
        <!-- input is selection from list -->
        <ul v-if="isListInput" class="value-list list">
          <li
            v-for="(item, index) in listItems[lang]"
            :key="index"
            :class="{ selected: Array.isArray(rightOperand) && rightOperand.indexOf(item) >= 0 }"
            @click="toggleRightOperand(item)"
          >{{ item }}</li>
        </ul>
      </div>
    </template>

    <template v-slot:footer>
      <div class="modal-footer">
        <BaseButton
          textlike
          @click="$emit('abort');"
        >{{ $t('cancel') }}</BaseButton>
        <BaseButton :disabled="!complete()" @click="accept()">{{ $t("accept") }}</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import Vue from 'vue';
import BaseInput from './BaseInput.vue';
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'BaseChooser',
  components: {
    BaseInput,
    BaseModal,
    BaseButton,
  },
  props: {
    objectToEdit: {
      type: Object,
      default: null,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    operandList: {
      type: Array,
      required: true,
    },
    operandMapping: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      objectCopy: null,
      forceUpdate: 0,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    addObjectHeader() {
      return this.$i18n.t(this.name + '.add');
    },
    editObjectHeader() {
      return this.$i18n.t(this.name + '.edit');
    },
    operands() {
      return this.operandList;
    },
    object() {
      if (this.objectCopy) {
        // the object copy has already been initialized correctly
        return this.objectCopy;
      }
      if (!this.objectToEdit) {
        // new empty object is going to be filled
        this.objectCopy = {};
        return this.objectCopy;
      }
      // deep copy the v-bound object that is going to be edited
      this.objectCopy = {};
      Vue.set(this.objectCopy, 'leftOperand', this.objectToEdit.leftOperand);
      Vue.set(this.objectCopy, 'operator', this.objectToEdit.operator);

      if (Array.isArray(this.objectToEdit.rightOperand)) {
        // right operand is a selection from list
        Vue.set(this.objectCopy, 'rightOperand', [
          ...this.objectToEdit.rightOperand,
        ]);
      } else {
        // right operand is number and unit
        Vue.set(this.objectCopy, 'rightOperand', {
          '@value': this.objectToEdit.rightOperand['@value'],
        });
        Vue.set(this.objectCopy, 'unit', this.objectToEdit.unit);
      }

      Vue.delete(this.objectCopy, 'uninitialized');
      return this.objectCopy;
    },
    leftOperand: {
      get() {
        const operand = this.object.leftOperand;
        if (!operand) {
          this.leftOperand = this.operands[0].odrl;
          return this.leftOperand;
        }
        return operand;
      },
      set(op) {
        if (this.object.leftOperand === op) {
          // do nothing
          return;
        }
        Vue.set(this.object, 'leftOperand', op);
        Vue.delete(this.object, 'operator');
        Vue.delete(this.object, 'rightOperand');
        Vue.delete(this.object, 'unit');
      },
    },
    operator: {
      get() {
        if (this.operators.length === 1) {
          this.operator = this.operators[0].identifier;
        }
        return this.object.operator;
      },
      set(op) {
        Vue.set(this.object, 'operator', op);
      },
    },
    rightOperand: {
      get() {
        const operand = this.object.rightOperand;
        return operand || [];
      },
      set(op) {
        op.sort();
        Vue.set(this.object, 'rightOperand', op);
      },
    },
    value: {
      get() {
        const op = this.object.rightOperand;
        if (!op && this.isNumericInput) {
          Vue.set(this.object, 'rightOperand', { '@value': '0' });
        }
        return this.object.rightOperand['@value'];
      },
      set(val) {
        this.object.rightOperand['@value'] = val;
      },
    },
    unit: {
      get() {
        if (this.units.length === 1) {
          this.unit = this.units[0].odrl;
        }
        return this.object.unit;
      },
      set(u) {
        Vue.set(this.object, 'unit', u);
      },
    },
    operators() {
      return this.operandMapping[this.leftOperand].operators;
    },
    units() {
      return this.operandMapping[this.leftOperand].units;
    },
    listItems() {
      return this.operandMapping[this.leftOperand].list;
    },
    isNumericInput() {
      return !!this.operandMapping[this.leftOperand].units;
    },
    isListInput() {
      return !!this.operandMapping[this.leftOperand].list;
    },
  },
  methods: {
    complete() {
      const hasLeftOperand = !!this.object.leftOperand;
      const hasOperator = !!this.object.operator;
      const hasRightOperand = !!this.object.rightOperand;
      const hasUnitIfNumeric = !this.isNumericInput || !!this.object.unit;

      return (
        hasLeftOperand && hasOperator && hasRightOperand && hasUnitIfNumeric
      );
    },
    accept() {
      if (this.complete()) {
        this.$emit('chosen', this.object);
      }
    },
    toggleRightOperand(op) {
      const idx = this.rightOperand.indexOf(op);
      if (idx >= 0) {
        this.rightOperand.splice(idx, 1);

        if (this.rightOperand.length === 0) {
          Vue.delete(this.object, 'rightOperand');
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
  font-size: 16px;
  width: 300px;
  height: 250px;
  overflow-y: auto;
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
  margin-left: 0px;
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
