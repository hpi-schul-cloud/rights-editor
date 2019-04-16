<template>
  <div>
    <BaseChooser
      v-if="displayRefinementChooser"
      :object-to-edit="refinement"
      :name="'Verfeinerung'"
      :operand-list="opList"
      :operand-mapping="opMapping"
      @chosen="hideRefinementChooser(); refinement = $event"
      @abort="abortChooser()"
    />
    <div class="refinement-container">
      <BaseButton
        input
        :width="'90%'"
        :on-click="showRefinementChooser"
        class="edit-refinement"
        name="refinement"
        type="button"
      >
        {{ description }}
      </BaseButton>
      <BaseButton class="remove-refinement" remove :on-click="removeRefinement">
        <i class="fas fa-times" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseChooser from './BaseChooser.vue';
import BaseButton from './BaseButton.vue';
import {
  operandList,
  operandMapping,
  operatorList,
} from '../libs/odrl/refinements';

const placeholder = '<leer>';

export default {
  name: 'RefinementItem',
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
      refinementChooserShouldDisplay: false,
    };
  },
  computed: {
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
    displayRefinementChooser() {
      return this.refinementChooserShouldDisplay || !this.refinement;
    },
    description() {
      if (!this.refinement) {
        return placeholder;
      }
      let desc = this.refinement.leftOperand;
      desc += ` ${operatorList.find(op => (op.identifier === this.refinement.operator)).symbol}`;
      if (Array.isArray(this.refinement.rightOperand)) {
        desc += ` ${this.refinement.rightOperand.join(', ')}`;
      } else {
        desc += ` ${this.refinement.rightOperand['@value']}`;
        desc += ` ${this.refinement.unit}`;
      }
      return desc;
    },
    opList() {
      return operandList;
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
      Vue.delete(this.refinementParent, this.path[this.path.length - 1]);
      if (this.refinementParent.length === 0) {
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
