<template>
  <RuleEditor @abort="abort()" @goForth="goForth($event)" />
</template>

<script>
import RuleEditor from '../components/RuleEditor.vue';

export default {
  name: 'FullEditor',
  components: {
    RuleEditor,
  },
  data() {
    return {};
  },
  methods: {
    abort() {
      this.$router.push({ name: 'start' });
    },
    goForth(policy) {
      this.$router.push({ name: 'check-before-save', params: { policy } })
    },
  },
};
</script>
