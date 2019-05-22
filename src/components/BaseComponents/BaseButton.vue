<template>
  <button
    class="base-button"
    :disabled="disabled"
    :class="{ 'base-button-disabled': disabled, 'base-button-big': big, 'base-button-textlike': textlike, 'base-button-input': input, 'base-button-remove': remove }"
    :style="{ width: this.width }"
    v-on="$listeners"
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
    disabled: Boolean,
  },
};
</script>

<style scoped>
.base-button {
  display: inline-block;
  color: white;
  border: 0px black solid;
  border-radius: 2px;
  background-color: #1f3b70;

  margin: 10px;
  padding: 10px 20px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.base-button:active {
  -webkit-box-shadow: 0px 2px 4px 3px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 2px 4px 3px rgba(0,0,0,0.1);
  box-shadow: 0px 2px 4px 3px rgba(0,0,0,0.1);
}

.base-button-disabled {
  background-color: gray;
}

.base-button-big {
  font-size: 1.2em;
}

.base-button-textlike {
  color: black;
  background: none;
  border: 1px solid transparent;
}

.base-button-textlike:active {
  background: none;
  box-shadow: none;
}

.base-button-input {
  background-color: white;
  border: 1px solid rgb(169, 169, 169);
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;
  cursor: text;

  margin: 10px;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
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

.base-button-remove:active,
.base-button-input:active {
  box-shadow: none;
}

@media screen and (max-width: 500px) {
  .base-button {
    padding: 8px;
    margin: 5px;
    font-size: 14px;
  }
}
</style>
