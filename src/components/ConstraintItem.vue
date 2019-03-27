<template>
  <div>
    <ConstraintChooser
      v-if="this.displayConstraintChooser"
      v-on:chosen="constraintChosen($event)"
      v-on:abort="hideConstraintChooser()"
    ></ConstraintChooser>
    <div>
      Bedingung:
      <br>
      <BaseButton
        input
        v-bind:width="'600px'"
        v-bind:onClick="showConstraintChooser"
        name="constraint"
        type="button"
      >{{ constraint.name }}</BaseButton>
      <BaseButton
        remove
        v-if="constraint.name != '<leer>'"
        v-bind:onClick="function () {$emit('remove-constraint', constraint.id);}"
      >&times;</BaseButton>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintChooser from "./ConstraintChooser.vue";
import BaseButton from "./BaseButton.vue";

export class Constraint {
  constructor(id) {
    this.id = id;
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
      displayConstraintChooser: false
    };
  },
  props: {
    constraint: {
      type: Object,
      required: true
    }
  },
  methods: {
    showConstraintChooser: function() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser: function() {
      this.displayConstraintChooser = false;
    },
    constraintChosen: function(chosenConstraint) {
      this.hideConstraintChooser();
      this.$emit("constraint-chosen", chosenConstraint);
    }
  }
};
</script>