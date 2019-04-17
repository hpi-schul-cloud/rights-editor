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
      <h2>Provisorische Lizenz:</h2>
      <pre>{{ odrl }}</pre>
    </div>
    <div>
      <h2>Was bedeutet diese Lizenz?</h2>
      <pre>{{ licenceText }}</pre>
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

      let text = ""

      if (this.license === 'http://creativecommons.org/licenses/by/4.0/') {
        text += 'Ich muss den Namen des Urhebers nennen.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nd/4.0/') {
        text +=  'Ich muss den Namen des Urhebers nennen.\n';
        text +=  'Ich darf das Medium nicht bearbeiten.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-sa/4.0/') {
        text +=  'Ich muss den Namen des Urhebers nennen.\n';
        text = text + 'Ich muss das Medium unter gleichen Bedingungen weitergeben.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc/4.0/') {
        text +=  'Ich muss den Namen des Urhebers nennen.\n';
        text +=  'Ich darf das Medium nicht kommerziell verwenden.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc-nd/4.0/') {
        text +=  'Ich muss den Namen des Urhebers nennen.\n';
        text +=  'Ich darf das Medium nicht kommerziell verwenden.\n';
        text +=  'Ich darf das Medium nicht bearbeiten.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc-sa/4.0/') {
        text +=  'Ich muss den Namen des Urhebers nennen.\n';
        text +=  'Ich darf das Medium nicht kommerziell verwenden.\n';
        text +=  'Ich muss das Medium unter gleichen Bedingungen weitergeben.\n';
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
