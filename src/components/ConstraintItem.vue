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
      <BaseButton
        input
        v-bind:width="'500px'"
        v-bind:onClick="showConstraintChooser"
        class="constraint-button"
        name="constraint"
        type="button"
      >{{ constraint.name }}</BaseButton>
      <BaseButton remove v-bind:onClick="function () {$emit('remove-constraint', constraint.id);}">
        <i class="fas fa-times"></i>
      </BaseButton>
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

<style scoped>
.constraint-button {
  margin: 0px;
}
</style>