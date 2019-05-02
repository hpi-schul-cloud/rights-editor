<template>
  <div class="start-page">
    <!-- TODO(hks): Breadcrums wär cool -->
    <div>
      <h1>Elektronisches Lizenz-Bearbeitungsprogramm (ELBP)</h1>
      <h2>Erlaubt die automatische Generierung von Lizenzen in maschinenlesbarem Format</h2>
    </div>
    <p>Welche Art Lizenz möchten Sie anlegen?</p>
    <div v-for="mode in modes" :key="mode.name" class="mode-choosing">
      <router-link :to="mode.path">
        <BaseButton :on-click="function(){}">{{ mode.name }}</BaseButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';

export default {
  name: 'Start',
  components: {
    BaseButton,
  },
  data() {
    return {
      modes: [
        { name: 'OER (Creative Commons)', path: { name: 'oer' } },
        { name: 'Proprietär (RightsML)', path: { name: 'proprietary' } }
      ],
    };
  },
};
</script>

<style scoped>
.mode-choosing a {
  display: block;
  float: left;
}
</style>
