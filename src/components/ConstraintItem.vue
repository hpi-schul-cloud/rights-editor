<template>
  <div>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      :constraint-to-edit="constraint"
      @chosen="hideConstraintChooser(); constraint = $event"
      @abort="abortChooser()"
    />
    <div>
      <BaseButton
        input
        :width="'500px'"
        :on-click="showConstraintChooser"
        class="constraint-button"
        name="constraint"
        type="button"
      >
        {{ constraint.name }}
      </BaseButton>
      <BaseButton remove :on-click="removeConstraint">
        <i class="fas fa-times" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ConstraintChooser from './ConstraintChooser.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'ConstraintItem',
  components: {
    ConstraintChooser,
    BaseButton,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      displayConstraintChooser: true,
    };
  },
  computed: {
    constraint: {
      get() {
        const c = this.path.reduce(
          (result, segment) => result[segment],
          this.policy,
        );
        return c || { name: '<Einschränkung hinzufügen>' };
      },
      set(newConstraint) {
        Vue.set(
          this.constraintParent,
          this.path[this.path.length - 1],
          newConstraint,
        );
      },
    },
    constraintParent() {
      const pathWithoutLastElement = this.path.slice(0, this.path.length - 1);
      return pathWithoutLastElement.reduce(
        (result, segment) => result[segment],
        this.policy,
      );
    },
  },
  methods: {
    abortChooser() {
      this.hideConstraintChooser();
      const c = this.path.reduce(
        (result, segment) => result[segment],
        this.policy,
      );
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
      // delete in array: this.constraintParent at index: this.path[this.path.length - 1]
      Vue.delete(this.constraintParent, this.path[this.path.length - 1]);
      if (this.constraintParent.length === 0) {
        const parentsParent = this.path
          .slice(0, this.path.length - 2)
          .reduce((result, segment) => result[segment], this.policy);
        Vue.delete(parentsParent, this.path[this.path.length - 2]);
      }
    },
  },
};
</script>

<style scoped>
.constraint-button {
  margin: 0px;
}
</style>
