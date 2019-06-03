<template>
  <div>
    <PresetEditor v-if="mode === 'rules'" @abort="abort()" @goForth="goForth($event)" />
    <DimensionEditor v-if="mode === 'dimensions'" :policy="policy" @addPolicy="editRules()" />
  </div>
</template>

<script>
import Vue from 'vue';
import PresetEditor from '../components/PresetEditor.vue';
import DimensionEditor from '../components/DimensionsEditor/DimensionsEditor.vue';

export default {
  name: 'SCEditor',
  components: {
    PresetEditor,
    DimensionEditor,
  },
  props: {
    policy: {
      type: Object,
      default: () => ({
        name: '',
        odrl: {},
        options: {
          timeframes: ['unbegrenzt'],
          state: [false],
          county: [false],
          school: [false],
          teacher: [false],
          pupil: [false],
        },
      }),
    },
  },
  data() {
    return {
      mode: 'rules',
    };
  },
  methods: {
    abort() {
      if (this.policies.length === 0) {
        // there is nothing to go back to
        this.$router.push({ name: 'start' });
      }
    },
    goForth(odrl) {
      Vue.set(this.policy, 'odrl', odrl);
      this.editDimensions();
    },
    editDimensions() {
      this.mode = 'dimensions';
    },
    editRules() {
      this.mode = 'rules';
    },
  },
};
</script>
