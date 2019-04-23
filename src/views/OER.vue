<template>
  <div class="oer-page">
    <router-link to="/">
      <a><i class="fas fa-arrow-circle-left" /> Start</a>
    </router-link>
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
      <h2>Was bedeutet diese Lizenz?</h2>
      <p v-html="licenceText" />
    </div>
    <div>
      <h2>Provisorische Lizenz:</h2>
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
    licenceText() {
      let text = '';

      if (this.license === 'http://creativecommons.org/licenses/by/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.<br>';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nd/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.<br>';
        text += 'Ich darf das Medium nicht bearbeiten.<br>';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-sa/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.<br>';
        text += 'Ich muss das Medium unter gleichen Bedingungen weitergeben.<br>';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.<br>';
        text += 'Ich darf das Medium nicht kommerziell verwenden.<br>';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc-nd/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.<br>';
        text += 'Ich darf das Medium nicht kommerziell verwenden.<br>';
        text += 'Ich darf das Medium nicht bearbeiten.<br>';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc-sa/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.<br>';
        text += 'Ich darf das Medium nicht kommerziell verwenden.<br>';
        text += 'Ich muss das Medium unter gleichen Bedingungen weitergeben.<br>';
      }

      return text;
    },
  },
};
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
