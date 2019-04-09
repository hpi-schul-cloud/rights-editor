<template>
  <div>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      v-on:chosen="hideConstraintChooser(); constraint = $event"
      v-bind:constraintToEdit="constraint"
      v-on:abort="abortChooser()"
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
      <BaseButton remove v-bind:onClick="removeConstraint">
        <i class="fas fa-times"></i>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import ConstraintChooser from "./ConstraintChooser.vue";
import BaseButton from "./BaseButton.vue";
import Vue from "vue";

export default {
  name: "ConstraintItem",
  components: {
    ConstraintChooser,
    BaseButton
  },
  data: function() {
    return {
      displayConstraintChooser: true
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
    abortChooser() {
      this.hideConstraintChooser();
      let c = this.path.reduce((result, segment) => result[segment], this.policy);
      if (!c) {
        this.removeConstraint();
      }
    },
    showConstraintChooser() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser() {
      this.displayConstraintChooser = false;
    },
    removeConstraint() {
      Vue.delete(this.constraintParent, this.path[this.path.length - 1]);
      if (this.constraintParent.length === 0) {
        let parentsParent = this.path
            .slice(0, this.path.length - 2)
            .reduce((result, segment) => result[segment], this.policy);
        Vue.delete(parentsParent, this.path[this.path.length - 2]);
      }
    }
  },
  computed: {
    constraint: {
      get() {
        let c = this.path.reduce((result, segment) => result[segment], this.policy);
        return c ? c : { 'name': 'Einschränkung hinzufügen' };
      },
      set(newConstraint) {
        Vue.set(this.constraintParent, this.path[this.path.length - 1], newConstraint);
      }
    },
    constraintParent() {
      let pathWithoutLastElement = this.path.slice(0, this.path.length - 1);
      return pathWithoutLastElement.reduce((result, segment) => result[segment], this.policy);
    }
  }
};
</script>

<style scoped>
.constraint-button {
  margin: 0px;
}
</style>