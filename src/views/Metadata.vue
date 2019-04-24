<template>
  <div>
    <div class="editor-back">
      <router-link to="/">
        <a>
          <i class="fas fa-arrow-circle-left"/> Start
        </a>
      </router-link>
    </div>
    <h2>Zusätzliche Metadaten festlegen</h2>

    <BaseChooser
      v-if="displayConstraintChooser"
      :object-to-edit="constraint"
      :name="'Einschränkung'"
      :operand-list="opList"
      :operand-mapping="opMapping"
      @chosen="addConstraint($event)"
      @abort="hideConstraintChooser()"
    />

    <BaseButton @click="showConstraintChooser()" type="button">Einschränkung hinzufügen</BaseButton>

    <li v-for="(constraint, index) in constraints" :key="index">
      {{ description(constraint) }}
      <BaseButton class="remove-constraint" remove v-on:click="removeConstraint(index)">
        <i class="fas fa-times"/>
      </BaseButton>
    </li>
  </div>
</template>

<script>
import BaseChooser from "../components/BaseChooser.vue";
import BaseButton from "../components/BaseButton.vue";
import {
  operandList,
  operandMapping,
  operatorList
} from "../libs/odrl/constraints";

export default {
  name: "Metadata",
  components: {
    BaseButton,
    BaseChooser
  },
  data() {
    return {
      displayConstraintChooser: false,
      constraint: null,
      constraints: []
    };
  },
  methods: {
    showConstraintChooser() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser() {
      this.displayConstraintChooser = false;
    },
    addConstraint(constraint) {
      this.hideConstraintChooser();
      this.constraints.push(constraint);
    },
    removeConstraint(index) {
      this.constraints.splice(index, 1);
    },
    description(constraint) {
      let desc = constraint.leftOperand;
      desc += ` ${
        operatorList.find(op => op.identifier === constraint.operator).symbol
      }`;
      if (Array.isArray(constraint.rightOperand)) {
        desc += ` ${constraint.rightOperand.join(", ")}`;
      } else {
        desc += ` ${constraint.rightOperand["@value"]}`;
        desc += ` ${constraint.unit}`;
      }
      return desc;
    }
  },
  computed: {
    opList() {
      var filteredOperands = operandList.filter(function(value, index, arr) {
        return value != "Nutzungsdauer" && value != "Nutzeranzahl";
      });
      return filteredOperands;
    },
    opMapping() {
      return operandMapping;
    }
  }
};
</script>

<style scoped>
.editor-back {
  padding-top: 15px;
  padding-bottom: 5px;
  color: #1f3b70;
}
</style>
