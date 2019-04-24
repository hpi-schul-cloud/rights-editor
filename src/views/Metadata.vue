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
      @chosen="constraintChosen($event)"
      @abort="hideConstraintChooser()"
    />

    <BaseButton :on-click="showConstraintChooser" type="button">Einschränkung hinzufügen</BaseButton>

    <li v-for="(constraint, index) in constraints" :key="index">{{ JSON.stringify(constraint) }}</li>
  </div>
</template>

<script>
import BaseChooser from "../components/BaseChooser.vue";
import BaseButton from "../components/BaseButton.vue";
import { operandList, operandMapping } from "../libs/odrl/constraints";

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
    constraintChosen(c) {
      this.hideConstraintChooser();
      this.constraints.push(c);
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
