<template>
  <div>
    <PolicyTreeNode
      :label="name[0]"
      :addition="name[1]"
      :path="path"
      :selected-path="selectedPath"
      :arrow-down="showSubrules"
      :hide-arrow="!subrulesExist"
      @followPath="$emit('followPath', $event)"
      @arrowClicked="arrowClicked($event)"
    />

    <!-- display subrules recursively -->
    <div v-if="showSubrules" class="subrules">
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
import { actionList } from '../../libs/odrl/actions';
import { actionToRefinements, constraintOnlyOperandList } from '../../libs/odrl/constraints';

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
  data() {
    return {
      shouldDisplaySubrules: true,
    };
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
    subrulesExist() {
      if (this.subrules) {
        return this.subrules.length > 0;
      }
      return false;
    },
    showSubrules() {
      return this.rule[this.subruleType] && this.shouldDisplaySubrules;
    },
    ruleLabel() {
      const pathLen = this.path.length;
      const ruleLanguageInfo = this.$i18n.t('rule')[this.path[pathLen - 2]];
      return ruleLanguageInfo.name;
    },
    name() {
      let action = this.rule.action;

      if (Array.isArray(action)) {
        action = action[0]['rdf:value'];
      }

      let actionLabel = this.placeholder;
      if (action && action !== this.placeholder) {
        actionLabel = this.$i18n.t(actionList.find(item => item === action));
      }

      return [this.ruleLabel, actionLabel];
    },
  },
  methods: {
    arrowClicked(path) {
      // if (!this.selectedPath.join().includes(path.join())) {
      this.shouldDisplaySubrules = !this.shouldDisplaySubrules;
      // }
    },
  },
};
</script>
