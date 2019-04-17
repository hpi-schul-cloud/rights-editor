<template>
  <div id="app">
    <ContextMenu 
    v-if="displayContextMenu"
    :x="mousePosition.x"
    :y="mousePosition.y"
    v-on:context-menu-close="displayContextMenu = false"
    ></ContextMenu>
    <router-view/>    
  </div>
</template>

<script>
import EventBus from './eventbus.js';
import ContextMenu from './components/ContextMenu.vue';

export default {
  name: 'App',
  components: {
    ContextMenu
  },
  data() {
    return {
      displayContextMenu: false,
      mousePosition: {
        x: 0,
        y: 0
      }
    };
  },
  mounted () {
    EventBus.$on('context-menu-open', (event) => {
      this.mousePosition.x = event.pageX;
      this.mousePosition.y = event.pageY;
      this.displayContextMenu = true;
    });
  }
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
</style>
