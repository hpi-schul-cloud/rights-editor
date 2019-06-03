<template>
  <!-- next steps:
    show placeholder if empty
    add edit button
    make editable (button action)
-->
  <h2>{{ title }}</h2>
</template>

<script>
export default {
  name: 'TitleCell',
  props: {
    index: {
      required: true,
      type: Number,
    },
    policy: {
      reqired: true,
      type: Object,
    },
  },
  computed: {
    title() {
      return this.policy.label || `Lizenz ${this.index + 1} (unbenannt)`;
    },
  },
};
</script>

<style scoped>
h2 {
    font-size: inherit;
    margin: 0px;
    padding: 0px;
}
</style>
