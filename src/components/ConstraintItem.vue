<template>
  <div>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      :object-to-edit="constraint"
      name="constraint"
      :operand-list="opList"
      :operand-mapping="opMapping"
      @chosen="hideConstraintChooser(); constraint = $event"
      @abort="abortChooser()"
    />

    <div class="constraint-container">
      <BaseButton
        input
        :width="'90%'"
        class="edit-constraint"
        name="constraint"
        type="button"
        @click="showConstraintChooser()"
      >
        {{ description }}
      </BaseButton>
      <BaseButton class="remove-constraint" remove @click="removeConstraint()">
        <i class="fas fa-times" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseComponents/BaseButton.vue';
import ConstraintChooser from './ConstraintChooser.vue';
import {
  constraintOnlyOperandList,
  operandMapping,
  operatorList,
  unitList,
} from '../libs/odrl/constraints';


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
        return this.$i18n.t('placeholder');
      }

      let desc = ` ${this.$i18n.t(this.constraint.leftOperand)}`;
      desc += ` ${operatorList.find(op => (op.identifier === this.constraint.operator)).symbol}`;

      const rOperand = this.constraint.rightOperand;
      if (Array.isArray(rOperand)) {
        rOperand.forEach((item) => { desc += ` ${this.$i18n.t(item)}, `; });
        desc = desc.substr(0, desc.length - 2); // removes the last comma
      } else {
        desc += ` ${rOperand['@value']}`;
        desc += ` ${this.$i18n.t(this.constraint.unit)}`;
      }
      return desc;
    },
    opList() {
      return constraintOnlyOperandList;
    },
    opMapping() {
      return operandMapping;
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
      this.constraintChooserShouldDisplay = true;
    },
    hideConstraintChooser() {
      this.constraintChooserShouldDisplay = false;
    },
    removeConstraint() {
      const removeIndex = this.path[this.path.length - 1];
      Vue.delete(this.constraintParent, removeIndex);

      if (this.constraintParent.length === 1) {
        // go from list with logical operator
        // back to just one constraint within the array
        const constraint = this.constraintParent[0];
        const rulePath = this.path.slice(0, this.path.length - 4);
        Vue.set(this.policy.follow(rulePath), 'constraint', [constraint]);
        return;
      }

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
