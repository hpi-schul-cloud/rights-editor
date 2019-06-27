<template>
  <div>
    <BaseButton class="save-button" @click="save()">Speichern</BaseButton>
    <BaseButton class="details-button" @click="goToDetails()">Detailansicht</BaseButton>
    <h1>Lizenz zusammenstellen</h1>

    <RuleSection :permissions.sync="policy.odrl.permission" />

  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from '../BaseComponents/BaseButton.vue';
import RuleSection from './RuleSection.vue';

export default {
  name: 'SimpleRuleEditor',
  components: {
    BaseButton,
    RuleSection,
  },
  props: {
    policy: {
      type: Object,
      default: () => ({
        name: '',
        odrl: {
          uid: '',
          target: '',
          assigner: '',
          assignee: '',
        },
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
    return {};
  },
  methods: {
    save() {
      console.error('check at least one rule is selected MISSING');
      this.$router.push({ name: 'sc-save', params: { policy: this.policy } });
    },
    goToDetails() {
      this.$router.push({ name: 'odrl-editor', params: { policy: this.policy, contextSC: true } });
    },
  },
};
</script>

<style scoped>
.save-button,
.details-button {
  float: right;
}
</style>
