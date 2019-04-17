<template>
  <div>
    <a
      href="#"
      class="label"
      :class="{ selectedRule: isSelected }"
      @click="$emit('update:selectedPath', path)"
    >{{ name[0] }}<br><span class="action">{{ name[1] }}</span></a>

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
import { RuleTypes } from '../../libs/odrl/rules';

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
      return this.policy.follow(this.path);
    },
    name() {
      const pathLen = this.path.length;
      const rType = RuleTypes[this.path[pathLen - 2]];
      let action = this.rule.action;
      if (Array.isArray(action)) {
        action = action[0]['rdf:value'];
      }
      return [`${rType.name}: `, action];
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-top: 1px transparent solid;
    border-bottom: 1px transparent solid;
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
  border-top: 1px #1f3b70 solid;
  border-bottom: 1px #1f3b70 solid;
}
.action {
  font-size: 15px;
}
.selectedRule .action {
  font-weight: normal;
  font-style: italic;
}
</style>
