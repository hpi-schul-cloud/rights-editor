<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
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
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin-bottom: 100px;
  margin-left: 50px;
  margin-right: 50px;
}

em, a {
  text-decoration: none;
  font-weight: bold;
  color: #1f3b70;
  font-style: normal;
}

a:hover,
a:focus {
  text-decoration: underline;
}
</style>
