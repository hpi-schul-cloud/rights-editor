<template>
  <RuleEditor :outset-policy="odrlPolicy" @abort="abort()" @goForth="goForth($event)" />
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
  computed: {
    odrlPolicy() {
      if (this.contextSC) {
        return this.policy.odrl;
      }
      return this.policy;
    },
  },
  methods: {
    abort() {
      this.$router.push({ name: 'start' });
    },
    goForth(policy) {
      if (this.contextSC) {
        this.$router.push({ name: 'sc-save', params: { policy: this.policy } });
      } else {
        this.$router.push({ name: 'odrl-save', params: { policy } });
      }
    },
  },
};
</script>
