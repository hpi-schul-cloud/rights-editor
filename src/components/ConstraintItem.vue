<template>
  <div>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      :constraint-to-edit="constraint"
      @chosen="hideConstraintChooser(); constraint = $event"
      @abort="abortChooser()"
    />
    <div class="constraint-container">
      <BaseButton
        input
        :width="'90%'"
        :on-click="showConstraintChooser"
        class="edit-constraint"
        name="constraint"
        type="button"
      >
        {{ description }}
      </BaseButton>
      <BaseButton class="remove-constraint" remove :on-click="removeConstraint">
        <i class="fas fa-times" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ConstraintChooser from './ConstraintChooser.vue';
import { operatorList } from '../libs/odrl/constraints';
import BaseButton from './BaseButton.vue';

const placeholder = '<leer>';

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
      constraintChooserShouldDisplay: false,
    };
  },
  computed: {
    constraint: {
      get() {
        return this.policy.follow(this.path);
      },
      set(newConstraint) {
        Vue.set(this.constraintParent, this.path[this.path.length - 1], newConstraint);
      },
    },
    constraintParent() {
      const pathWithoutLastElement = this.path.slice(0, this.path.length - 1);
      return this.policy.follow(pathWithoutLastElement);
    },
    displayConstraintChooser() {
      return this.constraintChooserShouldDisplay || !this.constraint;
    },
    description() {
      if (!this.constraint) {
        return placeholder;
      }
      let desc = this.constraint.leftOperand;
      desc += ' ' + operatorList.find(op => (op.identifier === this.constraint.operator)).symbol;
      if (Array.isArray(this.constraint.rightOperand)) {
        desc += ' ' + this.constraint.rightOperand.join(', ');
      } else {
        desc += ' ' + this.constraint.rightOperand['@value'];
        desc += ' ' + this.constraint.unit;
      }
      return desc
    }
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
      this.constraintChooserShouldDisplay = true;
    },
    hideConstraintChooser() {
      this.constraintChooserShouldDisplay = false;
    },
    removeConstraint() {
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
.constraint-container {
  position: relative;
}

.edit-constraint {
  margin: 0px;
  margin-top: 4px;
  margin-bottom: 4px;
  max-width: 500px;
}

.remove-constraint {
  position: absolute;
  top: calc(50% - 18px);
}
</style>
