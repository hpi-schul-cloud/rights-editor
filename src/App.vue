<template>
  <div id="app">
    <h1>Elektronisches Lizenz-Bearbeitungsprogramm (ELBP)</h1>
    <h2>erlaubt die automatische Generierung von Lizenzen in maschinenlesbarem Format</h2>
    <RuleEditor v-on:rules-changed="updateLicence($event)"/>
  </div>
</template>

<script>
import Rule from "./components/RuleItem.vue";
import RuleEditor from "./components/RuleEditor.vue";
import { Odrl } from "./libs/rightsml-lib-js/ODRLclasses";

class Policy {
  constructor() {}
}

export default {
  name: "app",
  components: {
    RuleEditor
  },
  methods: {
    updateLicence(rules) {
      let policy = "";
      for (let i = 0; i < rules.length; ++i) {
        policy += rules[i].title + " (" + rules[i].id + "), ";
      }
      console.log(policy);
    }
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

button {
  border-radius: 2px;
}

.big-button {
  font-size: 1.2em;
}
</style>