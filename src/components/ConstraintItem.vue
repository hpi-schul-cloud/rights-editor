<template>
  <div>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      :constraint-to-edit="constraint"
      @chosen="constraintChosen($event)"
      @abort="hideConstraintChooser()"
      @edited="bla($event)"
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
      <BaseButton
        remove
        :on-click="function () {$emit('remove-constraint', constraint.id);}"
      >
        <i class="fas fa-times" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from '../libs/rightsml-lib-js/ODRLvocabs';
import ConstraintChooser from './ConstraintChooser.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'ConstraintItem',
  components: {
    ConstraintChooser,
    BaseButton,
  },
  props: {
    constraint: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      displayConstraintChooser: false,
    };
  },
  methods: {
    showConstraintChooser() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser() {
      this.displayConstraintChooser = false;
    },
    constraintChosen(chosenConstraint) {
      this.hideConstraintChooser();
      this.$emit('constraint-chosen', chosenConstraint);
    },
    bla(editedConstraint) {
      this.hideConstraintChooser();
      this.$emit('constraint-edited', editedConstraint);
    },
  },
};
</script>

<style scoped>
.constraint-button {
  margin: 0px;
}
</style>
