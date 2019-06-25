<template>
  <RuleEditor :outset-policy="policy" @abort="abort()" @goForth="goForth($event)" />
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
  },
  data() {
    return {};
  },
  methods: {
    abort() {
      this.$router.push({ name: 'start' });
    },
    goForth(policy) {
      this.$router.push({ name: 'odrl-save', params: { policy } });
    },
  },
};
</script>
