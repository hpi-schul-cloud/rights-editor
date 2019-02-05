<template>
    <div>
        <input type="text" name="leftOperand" v-model="constraint.leftOperand">
        <input type="text" name="operator" v-model="constraint.operator">
        <input type="text" name="rightOperand" v-model="constraint.rightOperand" >
    </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Constraint {
  constructor() {
      this.leftOperand = "";
      this.rightOperand = "";
      this.operator = "";
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

<style>
</style>
