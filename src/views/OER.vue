<template>
  <div class="oer-page">
    <CCEditor
      class="cc-editor"
      :active-license="license"
      @activeLicense="license = $event"
    />
    <CCShowcase
      :active-license="license"
      @licenseClicked="license = $event"
    />
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
  name: 'Oer',
  components: {
    CCEditor,
    CCShowcase,
  },
  data() {
    return {
      license: 'http://creativecommons.org/licenses/by/4.0/',
    };
  },
  computed: {
    odrl() {
      return ccIDToODRL(this.license);
    },
  },
};
</script>

<style scoped>
.oer-page > *:not(:last-child) {
  margin-bottom: 50px;
}
</style>
