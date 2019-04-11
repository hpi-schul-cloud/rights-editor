<template>
<div class="oer-page">
  <CCEditor class="cc-editor" v-bind:activeLicense="license" v-on:activeLicense="license = $event"></CCEditor>
  <CCShowcase v-bind:activeLicense="license" v-on:licenseClicked="license = $event"></CCShowcase>
  <div>
    <h2>Provisorische Lizenz</h2>
    <pre>{{ odrl }}</pre>
  </div>
</div>
</template>

<script>
import CCEditor from '../components/CCEditor.vue';
import CCShowcase from '../components/CCShowcase/CCShowcase.vue';

import { ccIDToODRL } from '../libs/cc/odrl';

export default {
  name: 'oer',
  data: function() {
    return {
      license: 'http://creativecommons.org/licenses/by/4.0/'
    };
  },
  components: {
    CCEditor,
    CCShowcase
  },
  computed: {
    odrl: function() {
      return ccIDToODRL(this.license);
    }
  }
}
</script>

<style scoped>
.oer-page > *:not(:last-child) {
  margin-bottom: 50px;
}
.oer-page{
  margin-left: 10%;
  margin-right: 10%;
}
</style>
