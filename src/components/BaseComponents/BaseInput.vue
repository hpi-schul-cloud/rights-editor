<template>
  <input
    :class="{ 'base-input-undercover': undercover }"
    :style="{ width: this.width }"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
    },
    width: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    undercover: Boolean,
  },
};
</script>

<style scoped>
input {
  background-color: white;
  border: 1px solid rgb(169, 169, 169);
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;
  text-align: left;

  margin: 10px;
  padding: 10px;
  margin-left: 0px;
}

.base-input-undercover {
  border: 1px solid white;
  border-bottom: 1px solid rgb(169, 169, 169);
}

.base-input-undercover:focus {
  border: 1px solid rgb(169, 169, 169);
}

.input:disabled {
  color: gray;
}
</style>
