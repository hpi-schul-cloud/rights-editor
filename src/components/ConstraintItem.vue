<template>
  <div>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      v-on:chosen="constraintChosen($event)"
      v-on:abort="hideConstraintChooser()"
      v-on:edited="bla($event)"
      v-bind:constraintToEdit="constraint"
    ></ConstraintChooser>
    <div>
      Einschränkung:
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
    },
    bla: function(editedConstraint) {
      this.hideConstraintChooser();
      this.$emit("constraint-edited", editedConstraint);
    }
  }
};
</script>