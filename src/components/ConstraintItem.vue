<template>
  <div>
    <ConstraintChooser
      v-if="this.displayConstraintChooser"
      v-on:chosen="constraintChosen($event)"
      v-on:abort="hideConstraintChooser()"
    ></ConstraintChooser>
    <div>Bedingung:
      <br>
      <BaseButton
        input
        class="flat-input"
        v-bind:width="'600px'"
        v-bind:onClick="showConstraintChooser"
        name="constraint"
        type="button"
      >{{ constraint.name }}</BaseButton>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintChooser from "./ConstraintChooser.vue";
import BaseButton from "./BaseButton.vue";

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
    ConstraintChooser,
    BaseButton
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