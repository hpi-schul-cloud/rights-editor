<template>
  <h3>{{ text }}</h3>
</template>

<script>
export default {
  name: 'SubheadingCell',
  props: {
    text: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>
h3 {
    font-size: inherit;
    margin: 0px;
    padding: 0px;
}
</style>
