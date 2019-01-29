<template>
  <div id="app">
    <h1>Elektronisches Lizenz-Bearbeitungsprogramm (ELBP)</h1>
    <h2>erlaubt die automatische Generierung von Lizenzen in maschinenlesbarem Format</h2>
    <RuleEditor/>
  </div>
</template>

<script>
import RuleEditor from "./components/RuleEditor.vue";

export default {
  name: "app",
  components: {
    RuleEditor
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

hr {
  border: 0.5px solid #172b4d;
  margin-top: 40px;
  margin-bottom: 20px;
}

*:focus {
  outline: none !important;
}

body {
  background-color: rgb(248, 248, 248);
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