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
import PolicyTreeNode from './PolicyTreeNode.vue';
import { RuleTypes } from '../../libs/odrl/rules';
import { actionList } from '../../libs/odrl/actions.js';
import { actionToRefinements } from '../../libs/odrl/constraints';

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
    lang() {
      return this.$i18n.locale;
    },
    placeholder() {
      return this.$i18n.t('placeholder');
    },
    rule() {
      return this.policy.follow(this.path);
    },
    ruleInfo() {
      const pathLen = this.path.length;
      return RuleTypes[this.path[pathLen - 2]];
    },
    subruleType() {      
      return this.ruleInfo.subrule;
    },
    subrules() {
      return this.rule[this.subruleType];
    },
    ruleLabel() {
      const pathLen = this.path.length;
      let ruleLanguageInfo = this.$i18n.t('rule')[this.path[pathLen - 2]];
      return ruleLanguageInfo.name;
    },
    name() {
      let action = this.rule.action;

      if (Array.isArray(action)) {
        action = action[0]['rdf:value'];
      }

      let actionLabel = this.placeholder;
      if (action && action != this.placeholder) {
        actionLabel = this.$i18n.t(actionList.find(item => item === action));
      }

      return [this.ruleLabel, actionLabel];
    },    
  },
};
</script>

<style scoped>
.subrules {
  padding-left: 20px;
}
</style>
