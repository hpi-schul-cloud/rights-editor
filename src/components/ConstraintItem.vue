<template>
  <div>
    <ConstraintChooser
      v-if="this.displayConstraintChooser"
      v-on:chosen="constraintChosen($event)"
      v-on:abort="hideConstraintChooser()"
    ></ConstraintChooser>
    <div>
      Bedingung:<br>
      <BaseButton
        input
        v-bind:width="'600px'"
        v-bind:onClick="showConstraintChooser"
        name="constraint"
        type="button"
      >{{ name }}</BaseButton>
      <BaseButton
        remove
        v-if="name != '<leer>'"
        v-bind:onClick="function () {$emit('remove-constraint');}"
      >&times;</BaseButton>
    </div>
  </div>
</template>

<script>
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
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true
    },
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
  },
  computed: {
    name() {

    }
  }
};
</script>