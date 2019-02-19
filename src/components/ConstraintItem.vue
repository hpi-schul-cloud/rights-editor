<template>
    <div>
        <input type="text" name="leftOperand" autocomplete="false" v-model="constraint.leftOperand">
        <input type="text" name="operator" autocomplete="false" v-model="constraint.operator">
        <input type="text" name="rightOperand" autocomplete="false" v-model="constraint.rightOperand" >
        <input class="unit-input" type="text" autocomplete="false" v-model="constraint.unit">
    </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Constraint {
  constructor() {
      this.leftOperand = "";
      this.rightOperand = "";
      this.operator = "";
      this.unit = "";
  }
}

export default {
  name: "ConstraintItem",
  props: {
    constraint: {
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