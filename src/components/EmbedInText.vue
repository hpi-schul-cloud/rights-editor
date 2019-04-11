<template>
  <span>
    {{ textBefore }}
    <slot />
    {{ textAfter }}
  </span>
</template>

<script>
export default {
  name: 'EmbedInText',
  props: {
    textBefore: {
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
