<template>
  <BaseChooser
    v-bind:objectToEdit="constraintToEdit"
    v-bind:name="'Einschränkung'"
    v-bind:operands="operandList"
    v-bind:operandMapping="operandMapping"></BaseChooser>
</template>

<script>
import Vue from 'vue';
import BaseChooser from './BaseChooser.vue';
import {
  operandList,
  operandMapping,
} from '../libs/odrl/constraints';

export default {
  name: 'ConstraintChooser',
  components: {
    BaseChooser
  },
  props: {
    constraintToEdit: {
      type: Object,
      default: null,
      required: false,
    },
  },
};
</script>