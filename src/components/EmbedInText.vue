<template>
  <span>
    {{ textAhead }}
    <slot />
    {{ textAfter }}
  </span>
</template>

<script>
export default {
  name: 'EmbedInText',
  props: {
    textAhead: {
      type: String,
      default: '',
    },
    textAfter: {
      type: String,
      default: '',
    },
  },
};
</script>
