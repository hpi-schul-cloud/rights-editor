<template>
  <div id="app">    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");

*:focus {
  outline: none !important;
}
li {
  list-style-type: none;
}
ul {
  list-style-type: none;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin-bottom: 100px;
  margin-left: 50px;
  margin-right: 50px;
}
</style>