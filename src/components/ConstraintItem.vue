<template>
  <div>
    <BaseChooser
      v-if="displayConstraintChooser"
      :object-to-edit="constraint"
      :name="'constraint'"
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
import BaseButton from './BaseButton.vue';
import BaseChooser from './BaseChooser.vue';
import {
  constraintOnlyOperandList,
  operandMapping,
  operatorList,
  unitList,
} from '../libs/odrl/constraints';


export default {
  name: 'ConstraintItem',
  components: {
    BaseChooser,
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
    lang() {
      return this.$i18n.locale;
    },
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
      let desc = this.opList.find(obj => obj.odrl === this.constraint.leftOperand)[this.lang];
      desc += ` ${operatorList.find(op => (op.identifier === this.constraint.operator)).symbol}`;
      if (Array.isArray(this.constraint.rightOperand)) {
        desc += ` ${this.constraint.rightOperand.join(', ')}`;
      } else {
        desc += ` ${this.constraint.rightOperand['@value']}`;
        desc += ` ${unitList.find(obj => obj.odrl === this.constraint.unit)[this.lang]}`;
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
