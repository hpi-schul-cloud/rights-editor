<template>
  <button @click="$emit('add')"><i class="fas fa-plus-circle" /></button>
</template>

<script>
export default {
  name: 'AddCell',
};
</script>

<style scoped>
button {
    margin: 0px;
}
</style>
