<template>
  <div class="start-page">
    <!-- TODO(hks): Breadcrums wär cool -->
    <div>
      <h1>Elektronisches Lizenz-Bearbeitungsprogramm (ELBP)</h1>
      <h2>erlaubt die automatische Generierung von Lizenzen in maschinenlesbarem Format</h2>
    </div>
    <p>Welche Art Lizenz möchten Sie anlegen?</p>
    <div class="mode-choosing" v-for="mode in modes" v-bind:key="mode.name">
      <router-link v-bind:to="mode.path">
        <BaseButton>{{mode.name}}</BaseButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
export default {
  name: "start",
  components: {
    BaseButton
  },
  data: function() {
    return {
      modes: [
        { name: "OER (Creative Commons)", path: { name: "oer" } },
        { name: "Proprietär (RightsML)", path: { name: "proprietary" } }
      ]
    };
  }
};
</script>

<style scoped>
.mode-choosing a {
  display: block;
  float: left;
}
</style>

