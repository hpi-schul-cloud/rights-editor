<template>
  <div>
    <PresetEditor v-if="mode === 'rules'" @abort="abort()" @goForth="goForth($event)" />
    <DimensionEditor v-if="mode === 'dimensions'" :policies="policies" @addPolicy="editRules()" />
  </div>
</template>

<script>
import PresetEditor from '../components/PresetEditor.vue';
import DimensionEditor from '../components/DimensionsEditor/DimensionsEditor.vue';

export default {
  name: 'Proprietary',
  components: {
    PresetEditor,
    DimensionEditor,
  },
  data() {
    return {
      mode: 'dimensions',
    };
  },
  props: {
    policies: {
      type: Array,
      default: () => {return []},
    },
  },
  methods: {
    abort() {
      if (this.policies.length === 0) {
        // there is nothing to go back to
        this.$router.push({ name: 'start' });
      }
    },
    goForth(policy) {
      this.policies.push({
        label: `Lizenz ${this.policies.length + 1}`,
        odrl: policy,
        options: {
          timeframes: ['unbegrenzt'],
          state: [false],
          county: [false],
          school: [false],
          teacher: [false],
          pupil: [false],
        },
      });
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
