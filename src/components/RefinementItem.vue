<template>
  <div>
    <ConstraintChooser
      v-if="displayRefinementChooser"
      :object-to-edit="refinement"
      name="refinement"
      :operand-list="opList"
      :operand-mapping="opMapping"
      @chosen="hideRefinementChooser(); refinement = $event"
      @abort="abortChooser()"
    />
    <div class="refinement-container">
      <BaseButton
        input
        :width="'90%'"
        class="edit-refinement"
        name="refinement"
        type="button"
        @click="showRefinementChooser()"
      >
        {{ description }}
      </BaseButton>
      <BaseButton class="remove-refinement" remove @click="removeRefinement()">
        <i class="fas fa-times" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ConstraintChooser from './ConstraintChooser.vue';
import BaseButton from './BaseComponents/BaseButton.vue';
import {
  operandMapping,
  operatorList,
  actionToRefinements,
} from '../libs/odrl/constraints';

export default {
  name: 'RefinementItem',
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
      refinementChooserShouldDisplay: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    refinement: {
      get() {
        return this.policy.follow(this.path);
      },
      set(newRefinement) {
        Vue.set(this.refinementParent, this.path[this.path.length - 1], newRefinement);
      },
    },
    refinementParent() {
      const pathWithoutLastElement = this.path.slice(0, this.path.length - 1);
      return this.policy.follow(pathWithoutLastElement);
    },
    isOneOfManyRefinements() {
      return this.refinementParent.length > 1;
    },
    actionLabel() {
      let actionPath;

      if (this.isOneOfManyRefinements) {
        actionPath = this.path.slice(0, this.path.length - 4);
      } else {
        actionPath = this.path.slice(0, this.path.length - 2);
      }

      return this.policy.follow(actionPath)['rdf:value'];
    },
    displayRefinementChooser() {
      return this.refinementChooserShouldDisplay || !this.refinement;
    },
    description() {
      if (!this.refinement) {
        return this.$i18n.t('placeholder');
      }

      let desc = ` ${this.$i18n.t(this.refinement.leftOperand)}`;
      desc += ` ${operatorList.find(op => (op.identifier === this.refinement.operator)).symbol}`;

      const rOperand = this.refinement.rightOperand;
      if (Array.isArray(rOperand)) {
        rOperand.forEach((item) => { desc += ` ${this.$i18n.t(item)}, `; });
        desc = desc.substr(0, desc.length - 2); // removes the last comma
      } else {
        desc += ` ${rOperand['@value']}`;
        desc += ` ${this.$i18n.t(this.refinement.unit)}`;
      }
      return desc;
    },
    opList() {
      // every action needs a different set of possible refinements
      return actionToRefinements[this.actionLabel].operands;
    },
    opMapping() {
      return operandMapping;
    },
  },
  methods: {
    abortChooser() {
      this.hideRefinementChooser();
      const c = this.path.reduce(
        (result, segment) => result[segment],
        this.policy,
      );
      if (!c) {
        this.removeRefinement();
      }
    },
    showRefinementChooser() {
      this.refinementChooserShouldDisplay = true;
    },
    hideRefinementChooser() {
      this.refinementChooserShouldDisplay = false;
    },
    removeRefinement() {
      const index = this.path[this.path.length - 1];
      Vue.delete(this.refinementParent, index); // index of the current refinement

      if (this.refinementParent.length === 1) {
        // go from list with logical operator
        // back to just one refinement within the array
        const refinement = this.refinementParent[0];
        const actionPath = this.path.slice(0, this.path.length - 4);
        Vue.set(this.policy.follow(actionPath), 'refinement', [refinement]);
        return;
      }

      if (this.refinementParent.length === 0) {
        // if no refinements are left, make the action just a string again
        const rulePath = this.path.slice(0, this.path.length - 4);
        const ruleObject = this.policy.follow(rulePath);
        const action = ruleObject.action[0]['rdf:value'];
        ruleObject.action = action;
      }
    },
  },
};
</script>

<style scoped>
.refinement-container {
  position: relative;
}

.edit-refinement {
  margin: 0px;
  margin-top: 4px;
  margin-bottom: 4px;
  max-width: 500px;
}

.remove-refinement {
  position: absolute;
  top: calc(50% - 18px);
}
</style>
