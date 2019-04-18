<template>
  <div>
    <span class="guid-label">
      GUID der Lizenz:
      <BaseInput v-model="policy['uid']" undercover class="guid-input" />
    </span>
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue';

export default {
  name: 'PolicyItem',
  components: {
    BaseInput,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
