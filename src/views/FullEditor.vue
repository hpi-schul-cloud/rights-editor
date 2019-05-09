<template>
  <RuleEditor @abort="abort()" @goForth="goForth()" />
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
    goForth() {
      console.error('not implemented');
    },
  },
};
</script>
