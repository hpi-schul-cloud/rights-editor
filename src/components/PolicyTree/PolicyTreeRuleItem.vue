<template>
  <div>
    <a href="#" class="label" :class="{ selectedRule: isSelected }" @click="$emit('update:selectedPath', path)">
      {{ name }}
    </a>

    <div v-if="subrules" class="subrules">
      <PolicyTreeRuleItem
        v-for="(subrule, index) in subrules"
        :key="index"
        :policy="policy"
        :path="[...path, subruleType, index]"
        :selected-path="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>
  </div>
</template>

<script>
import { RuleTypes } from '../../libs/odrl/rules.js';

export default {
  name: 'PolicyTreeRuleItem',
  props: {
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true,
    },
    selectedPath: {
      type: Array,
      required: true,
    },
  },
  computed: {
    rule() {
      return this.path.reduce((result, segment) => result[segment], this.policy);
    },
    name() {
      const pathLen = this.path.length;
      const rType = RuleTypes[this.path[pathLen - 2]];
      return rType.name;
    },
    subruleType() {
      const pathLen = this.path.length;
      const rType = RuleTypes[this.path[pathLen - 2]];
      return rType.subrule;
    },
    subrules() {
      return this.rule[this.subruleType];
    },
    isSelected() {
      return this.path.join() === this.selectedPath.join();
    },
  },
};
</script>

<style scoped>
.label {
    display: block;
    margin: 0px;
    padding: 4px 0px;
    cursor: pointer;
    color: black;
    font-weight: normal;
    text-decoration: none;
}
.label:hover:not(.selectedRule) {
    font-weight: bold;
    color: #323232;
}
.subrules {
    padding-left: 20px;
}
.selectedRule {
  color: #1f3b70;
  font-weight: bold;
}
</style>
