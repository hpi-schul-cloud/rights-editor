<template>
    <button class="base-button" v-bind:class="{ 'base-button-big': big, 'base-button-textlike': textlike}" v-on:click="onClick"><slot></slot></button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    big: Boolean,
    textlike: Boolean,
    onClick: { type: Function, required: true }
  },
};
 
</script>

<style scoped>
.base-button {
  font-family: "Montserrat", sans-serif;
  color: white;
  display: inline-block;
  
  border: 0px black solid;
  border-radius: 2px;
  background-color: #172b4d;
  margin: 10px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

.base-button-big {
  font-size: 1.2em;
}
.base-button.base-button-textlike {
  color: #172b4d;
  background: none;
  border: none;
}
</style>