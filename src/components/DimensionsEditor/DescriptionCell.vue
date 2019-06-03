<template>
  <span>{{ description }}</span>
</template>

<script>
import { ruleOptions } from '../../libs/license-options/license-options';

const optionsMap = ruleOptions.reduce((mapping, option) => {
  mapping[option.id] = option;
  return mapping;
}, {});

export default {
  name: 'DescriptionCell',
  props: {
    policy: {
      required: true,
      type: Object,
    },
  },
  computed: {
    description() {
      return this.policy.odrl.permission.map(permission => (optionsMap[permission.action].name)).join(', ');
    },
  },
};
</script>

<style scoped>
span {
  font-style: italic;
}
</style>
