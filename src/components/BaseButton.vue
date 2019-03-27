<template>
  <button
    class="base-button"
    v-bind:class="{ 'base-button-big': big, 'base-button-textlike': textlike, 'base-button-input': input, 'base-button-remove': remove }"
    v-bind:style="{ width: this.width }"
    v-on:click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    width: {
      default: "",
      type: String,
      required: false
    },
    big: Boolean,
    textlike: Boolean,
    input: Boolean,
    remove: Boolean,
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
  background-color: #222222;
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
  text-align: left;

  margin: 10px;
  padding: 10px;
  margin-left: 0px;

  border-bottom: none;
  box-shadow: inset 0 0 1.5px #000;
  cursor: text;
}

.base-button-remove {
  display: inline-block;
  background-color: transparent;
  color: #880000;
  font-weight: bold;
  font-size: 32px;
  width: 20px;
  height: 32px;
  margin: 0;
  padding: 0;
}
</style>