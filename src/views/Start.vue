<template>
<div class="start-page">
  <!-- TODO(hks): Breadcrums wär cool -->
  <p>Welche Art Lizenz möchten Sie anlegen?</p>
  <div class="mode-choosing">
    <router-link v-for="mode in modes" v-bind:to="mode.path" v-bind:key="mode.name">{{mode.name}}</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'start',
  data: function() {
    return {
      modes: [
        {name: "OER (Creative Commons)", path: {name: "oer"}},
        {name: "Proprietär", path: {name: "proprietary"}}
      ]
    };
  },
}
</script>

<style scoped>
.mode-choosing a {
  display: block;
  padding: 0.5em;
}
</style>

