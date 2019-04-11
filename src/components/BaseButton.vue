<template>
  <button
    class="base-button"
    :class="{ 'base-button-big': big, 'base-button-textlike': textlike, 'base-button-input': input, 'base-button-remove': remove }"
    :style="{ width: this.width }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    width: {
      default: 'auto',
      type: String,
      required: false,
    },
    big: Boolean,
    textlike: Boolean,
    input: Boolean,
    remove: Boolean,
    onClick: { type: Function, required: false },
  },
};
</script>

<style scoped>
.base-button {
  font-family: "Roboto", sans-serif;
  color: white;
  display: inline-block;

  border: 0px rgb(0, 0, 0) solid;
  border-radius: 2px;
  background-color: #1f3b70;
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

.base-button-textlike {
  color: black;
  background: none;
  border: none;
}

.base-button-input {
  background-color: white;
  border: 0px #222222 solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;

  margin: 10px;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;

  border-bottom: none;
  box-shadow: inset 0 0 1.5px #000;
  cursor: text;
}

.base-button-remove {
  background-color: transparent;
  color: black;
  font-weight: bold;
  width: 20px;
  height: 20px;
  margin: 8px;
  padding: 0;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
