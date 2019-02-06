<template>
    <button class="base-button"><slot></slot></button>
</template>

<script>
export default {
  name: "BaseButton"
};
</script>

<style scoped>
.base-button {
  font-family: "Montserrat", sans-serif;
  color: white;
  border: 0px black solid;
  background-color: #172b4d;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  margin: 10px;
}
</style>