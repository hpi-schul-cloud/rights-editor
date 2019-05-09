<template>
  <div>
    <RuleEditor v-if="mode === 'rules'" @abort="abort()" @goForth="goForth($event)" />
    <DimensionEditor v-if="mode === 'dimensions'" :policies="policies" />
  </div>
</template>

<script>
import RuleEditor from '../components/RuleEditor.vue';
import DimensionEditor from '../components/DimensionEditor.vue';

export default {
  name: 'Proprietary',
  components: {
    RuleEditor,
    DimensionEditor,
  },
  data() {
    return {
      mode: 'rules',
      policies: [],
    };
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
          timeframes: [],
          state: [],
          county: [],
          school: [],
          teacher: [],
          pupil: [],
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
