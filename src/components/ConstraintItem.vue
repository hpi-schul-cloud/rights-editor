<template>
  <div>
    <ConstraintChooser
      v-if="this.displayConstraintChooser"
      v-on:chosen="constraintChosen($event)"
      v-on:abort="hideConstraintChooser()"
    ></ConstraintChooser>
    <div>Bedingung:
      <br>
      <button
        class="flat-input"
        v-on:click="showConstraintChooser()"
        name="constraint"
        type="button"
      >{{ constraint.name }}</button>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintChooser from "./ConstraintChooser.vue";

export class Constraint {
  constructor() {
    this.name = "<leer>";
    this.leftOperand = "";
    this.rightOperand = "";
    this.operator = "";
    this.unit = "";
    this.type = "";
  }
}

export default {
  name: "ConstraintItem",
  components: {
    ConstraintChooser
  },
  data: function() {
    return {
      displayConstraintChooser: false,
      constraint: new Constraint()
    };
  },
  methods: {
    showConstraintChooser: function() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser: function() {
      this.displayConstraintChooser = false;
    },
    constraintChosen: function(constraint) {
      console.log(constraint);
      this.hideConstraintChooser();
      this.constraint = constraint;
      this.$emit("constraint-set", this.constraint);
    }
  }
};
</script>