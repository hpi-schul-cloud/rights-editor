<template>
  <button
    class="base-button"
    v-bind:class="{ 'base-button-big': big, 'base-button-textlike': textlike}"
    v-on:click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    big: Boolean,
    textlike: Boolean,
    onClick: { type: Function, required: true }
  }
};
</script>

<style scoped>
.base-button {
  font-family: "Montserrat", sans-serif;
  color: white;
  display: inline-block;

  border: 0px rgb(0, 0, 0) solid;
  border-radius: 2px;
  background-color: #ff5943;
  margin: 10px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
}

.base-button-big {
  font-size: 1.2em;
}
.base-button.base-button-textlike {
  color: #ff5943;
  background: none;
  border: none;
}
</style>