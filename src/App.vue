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

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");

/deep/ {
  li {
    list-style-type: none;
    padding-inline-start: 0px;
  }
  ul {
    list-style-type: none;
    padding-inline-start: 0px;
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

  @media screen and (max-width: 840px) {
    #app {
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 500px) {
    #app {
      margin-left: 10px;
      margin-right: 10px;
    }
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
}
</style>
