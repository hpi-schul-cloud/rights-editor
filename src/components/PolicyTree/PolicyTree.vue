<template>
  <div class="tree">
    <PolicyTreeNode
      :label="$i18n.t('license')"
      :addition="$t('general_information')"
      :path="[]"
      :selected-path="selectedPath"
      :arrow-down="shouldDisplayRules"
      @followPath="$emit('followPath', $event)"
      @arrowClicked="arrowClicked($event)"
    />

    <div v-if="policy['permission'] && shouldDisplayRules" class="rules">
      <PolicyTreeRuleItem
        v-for="(permission, index) in policy['permission']"
        :key="index"
        :policy="policy"
        :path="['permission', index]"
        :selected-path="selectedPath"
        @followPath="$emit('followPath', $event)"
      />
    </div>

    <div v-if="policy['obligation'] && shouldDisplayRules" class="rules">
      <PolicyTreeRuleItem
        v-for="(obligation, index) in policy['obligation']"
        :key="index"
        :policy="policy"
        :path="['obligation', index]"
        :selected-path="selectedPath"
        @followPath="$emit('followPath', $event)"
      />
    </div>

    <div v-if="policy['prohibition'] && shouldDisplayRules" class="rules">
      <PolicyTreeRuleItem
        v-for="(prohibition, index) in policy['prohibition']"
        :key="index"
        :policy="policy"
        :path="['prohibition', index]"
        :selected-path="selectedPath"
        @followPath="$emit('followPath', $event)"
      />
    </div>
  </div>
</template>

<script>
import PolicyTreeRuleItem from './PolicyTreeRuleItem.vue';
import PolicyTreeNode from './PolicyTreeNode.vue';

export default {
  name: 'PolicyTree',
  components: {
    PolicyTreeRuleItem,
    PolicyTreeNode,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    selectedPath: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      shouldDisplayRules: true,
    };
  },
  methods: {
    arrowClicked(path) {
      this.shouldDisplayRules = !this.shouldDisplayRules;
    },
  },
};
</script>
