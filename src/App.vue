<template>
  <div id="app">
    <RuleEditor/>
  </div>
</template>

<script>
import RuleEditor from './components/RuleEditor.vue'

export default {
  name: 'app',
  components: {    
    RuleEditor
  }  
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

*:focus {
  outline: none !important;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin-left: 10%;
  margin-right: 10%;
}

li {
  list-style-type: none !important;
}
ul {
  list-style-type: none;
}
</style>