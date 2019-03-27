<template>
  <input
    v-bind:class="{ 'base-input-undercover': undercover }"
    v-bind:style="{ width: this.width }"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {},
    width: {
      default: "",
      type: String,
      required: false
    },
    undercover: Boolean
  }
};
</script>

<style scoped>
input {
  background-color: white;
  border: 0px black solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;
  text-align: left;

  margin: 10px;
  padding: 10px;
  margin-left: 0px;

  border-bottom: none;
  box-shadow: inset 0 0 1.5px #000;
}

.base-input-undercover {
  box-shadow: none;
  border-bottom: 1px solid DarkGray;
}

.base-input-undercover:focus {
  box-shadow: inset 0 0 1.5px #000;
  border-bottom: none;
}
</style>