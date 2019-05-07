<template>
  <div class="tree">
    <PolicyTreeNode
      :label="treeNodeLabel"
      :path="[]"
      :selected-path="selectedPath"
      @followPath="$emit('followPath', $event)"
    />

    <div v-if="policy['permission']" class="rules">
      <PolicyTreeRuleItem
        v-for="(permission, index) in policy['permission']"
        :key="index"
        :policy="policy"
        :path="['permission', index]"
        :selected-path="selectedPath"
        @followPath="$emit('followPath', $event)"
      />
    </div>

    <div v-if="policy['obligation']" class="rules">
      <PolicyTreeRuleItem
        v-for="(obligation, index) in policy['obligation']"
        :key="index"
        :policy="policy"
        :path="['obligation', index]"
        :selected-path="selectedPath"
        @followPath="$emit('followPath', $event)"
      />
    </div>

    <div v-if="policy['prohibition']" class="rules">
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
import { lang } from '../../libs/language/language.js';
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
  computed: {
    treeNodeLabel() {
      if (lang == 'de') {
        return "Lizenz";
      } else if (lang == 'en') {
        return "license";
      }
    }
  }
};
</script>

<style scoped>
.rules {
    padding-left: 20px;
}
</style>
