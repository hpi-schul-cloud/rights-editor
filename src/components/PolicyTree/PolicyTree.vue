<template>
  <div>
    <p class="label">
      Policy
    </p>

    <div v-if="policy['permission']" class="rules">
      <PolicyTreeRuleItem
        v-for="(permission, index) in policy['permission']"
        :key="index"
        :policy="policy"
        :path="['permission', index]"
        :selectedPath="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>

    <div v-if="policy['obligation']" class="rules">
      <PolicyTreeRuleItem
        v-for="(obligation, index) in policy['obligation']"
        :key="index"
        :policy="policy"
        :path="['obligation', index]"
        :selectedPath="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>

    <div v-if="policy['prohibition']" class="rules">
      <PolicyTreeRuleItem
        v-for="(prohibition, index) in policy['prohibition']"
        :key="index"
        :policy="policy"
        :path="['prohibition', index]"
        :selectedPath="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>
  </div>
</template>

<script>
import PolicyTreeRuleItem from './PolicyTreeRuleItem';

export default {
  name: 'PolicyTree',
  components: {
    PolicyTreeRuleItem,
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
};
</script>

<style scoped>
.label {
    margin: 4px 0px;
}
.rules {
    padding-left: 20px;
}
</style>
