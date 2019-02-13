<template>
    <div>
        <input type="text" name="leftOperand" v-model="refinement.constraint.leftOperand">
        <input type="text" name="operator" v-model="refinement.constraint.operator">
        <input type="text" name="rightOperand" v-model="refinement.constraint.rightOperand" >
        <input class="unit-input" autocomplete="false" type="text" v-model="refinement.unit" >
    </div>
</template>

<script>
import { Constraint } from "./ConstraintItem";

export class Refinement {
  constructor() {
      this.constraint = new Constraint();
      this.unit = "";
  }
}

export default {
  name: "RefinementItem",
  props: {
    refinement: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
.unit-input {
  width: 50px;
}
</style>
