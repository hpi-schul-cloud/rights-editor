<template>
  <div>
    <PolicyTreeNode
      :label="name[0]"
      :addition="name[1]"
      :path="path"
      :selected-path="selectedPath"
      @followPath="$emit('followPath', $event)"
    />

    <!-- Display subrules recursively -->
    <div v-if="subrules" class="subrules">
      <PolicyTreeRuleItem
        v-for="(subrule, index) in subrules"
        :key="index"
        :policy="policy"
        :path="[...path, subruleType, index]"
        :selected-path="selectedPath"
        @followPath="$emit('followPath', $event)"
      />
    </div>
  </div>
</template>

<script>
import { RuleTypes } from '../../libs/odrl/rules';
import PolicyTreeNode from './PolicyTreeNode.vue';

export default {
  name: 'PolicyTreeRuleItem',
  components: {
    PolicyTreeNode,
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
  },
};
</script>

<style scoped>
.subrules {
  padding-left: 20px;
}
</style>
