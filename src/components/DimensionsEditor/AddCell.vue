<template>
  <div>
    <button @click="$emit('add')"><i class="fas fa-plus-circle" /></button>
  </div>
</template>

<script>
export default {
  name: 'AddCell',
};
</script>

<style scoped>
button {
  display: block;
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0px;
  margin: 0px 8px;
  color: #444;
}
button:hover {
  color: black;
}
</style>
