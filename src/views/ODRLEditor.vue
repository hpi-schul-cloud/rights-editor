<template>
  <RuleEditor :outset-policy="policy.odrl" @abort="abort()" @goForth="goForth()" />
</template>

<script>
import RuleEditor from '../components/RuleEditor.vue';

export default {
  name: 'ODRLEditor',
  components: {
    RuleEditor,
  },
  props: {
    policy: {
      type: Object,
    },
    contextSC: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    abort() {
      this.$router.push({ name: 'start' });
    },
    goForth() {
      const policy = this.policy;
      if (this.contextSC) {
        this.$router.push({ name: 'sc-save', params: { policy } });
      } else {
        this.$router.push({ name: 'odrl-save', params: { policy } });
      }
    },
  },
};
</script>
