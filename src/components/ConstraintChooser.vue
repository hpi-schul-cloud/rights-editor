<template>
  <BaseChooser
    v-bind:objectToEdit="constraintToEdit"
    v-bind:name="'Einschränkung'"
    v-bind:operandList="opList"
    v-bind:operandMapping="opMapping"
    v-on:abort="function() { $emit('abort'); }"
    v-on:chosen="forward">
    </BaseChooser>
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
  computed: {
    opList() {
      return operandList;
    },
    opMapping() {
      return operandMapping;
    }
  },
  methods: {
    forward(constraint) {
      this.$emit('chosen', constraint);
    }
  }
};
</script>