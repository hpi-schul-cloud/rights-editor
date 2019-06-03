<template>
  <span>{{ name }}</span>
</template>

<script>
export default {
  name: 'LicenseeCell',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
};
</script>
