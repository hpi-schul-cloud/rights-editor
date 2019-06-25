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
  name: 'DimensionEditor',
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
      console.log(JSON.stringify(this.policy));
      const policy = this.policy.odrl;
      this.$router.push({ name: 'odrl-editor', params: { policy } });
    },
  },
};
</script>

<style scoped>
.section-heading {
  margin-top: 40px;
}

.name-input {
  display: block;
  width: 100%;
}
.save-button,
.details-button {
  float: right;
}

table.prices-table {
  margin-top: 15px;
  border-collapse: collapse;
}
th {
  font-weight: normal;
  vertical-align: bottom;
}
td, th {
  padding: 8px;
}

.warning {
  background-color: rgb(255, 219, 219);
  border-radius: 3px 3px;
  color: rgb(204, 0, 0);
  padding: 8px;
}
th.duplicate {
  background-color: rgb(255, 219, 219);
}


.subheading-cell:first-child, .timeframe-cell, .add-timeframe-cell, .price-cell {
  border-bottom: 1px solid black;
}
.timeframe-cell, .price-cell{
  border-right: 1px solid black;
}
.timeframe-cell, .price-cell {
  border-left: 1px solid black;
}
.timeframe-cell, .add-timeframe-cell, .subheading-cell:first-child {
  padding-top: 0px;
}
</style>
