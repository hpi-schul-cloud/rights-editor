<template>
  <div>
    <!-- <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="back">
          <i class="fas fa-arrow-circle-left" /> {{ $t("back") }}
        </a>
      </template>
    </EditorNavBar> -->
    <div>
      <BaseButton class="save-button" @click="save()">Speichern</BaseButton>
      <h1>{{ $t('check_before_save') }}</h1>
      <!-- <h2>{{ $t('summarization') }}</h2>
      <p>{{ summarization }}</p> -->
    </div>

    <p v-if="problemWhileSaving" class="warning">Während des Speicherns ist ein Problem aufgetreten</p>

    <h2 class="section-heading">Name des Lizenzangebotes</h2>
    <p>Bennenen Sie das Lizenzangebot, damit Sie in Übersichten schneller erkennen, um welches es sich handelt.</p>
    <p v-if="problemNoName" class="warning">Bitte geben Sie einen Namen an.</p>
    <BaseInput
      v-model="policy.name"
      type="text"
      placeholder="Name für das Lizenzangebot"
      class="name-input"
    />

    <h2 class="section-heading">Gebiete und Laufzeiten</h2>
    <p>Stellen Sie verschiedene Lizenzmodelle zu einer flexiblen Lizenz zusammen.</p>

    <p v-if="duplicates.length > 0" class="warning">Einige Laufzeiten sind innerhalb einer Lizenz mehrfach angegeben.</p>

    <table class="prices-table">
      <tr>
        <th colspan="2" />
        <th colspan="policy.options.timeframes.length" class="subheading-cell"><SubheadingCell text="Laufzeit" /></th>
        <th /></tr>
      <tr>
        <th />
        <th class="subheading-cell"><SubheadingCell text="Geltungsbereiche" /></th>
        <th
          v-for="(timeframe, index) in policy.options.timeframes"
          :key="index"
          :class="{'duplicate': duplicates.indexOf(index) >= 0}"
          class="timeframe-cell"
        >
          <TimeframeCell
            :timeframe="timeframe"
            :prevent-delete="policy.options.timeframes.length === 1"
            @update-timeframe="updateTimeframe(index, $event)"
            @remove-timeframe="removeTimeframe(index)"
          />
        </th>
        <th class="add-timeframe-cell"><AddCell @add="addTimeframe()" /></th>
      </tr>
      <tr v-for="entity in licenseEntities" :key="entity.key">
        <td />
        <td>{{ entity.label }}</td>
        <td v-for="(price, index) in policy.options[entity.key]" :key="index" class="price-cell">
          <PriceCell :price="price" @update:price="updatePrice(entity.key, index, $event)" />
        </td>
        <td />
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from '../components/BaseComponents/BaseButton.vue';
import BaseInput from '../components/BaseComponents/BaseInput.vue';
import { actionList } from '../libs/odrl/actions.js';

import SubheadingCell from '../components/SCEditor/SubheadingCell.vue';
import TimeframeCell from '../components/SCEditor/TimeframeCell.vue';
import PriceCell from '../components/SCEditor/PriceCell.vue';
import AddCell from '../components/SCEditor/AddCell.vue';

import { backendAddr } from '../settings';

const licenseEntities = [
  { key: 'state', label: 'Land' },
  { key: 'county', label: 'Kreis' },
  { key: 'school', label: 'Schule' },
  { key: 'teacher', label: 'Lehrer' },
  { key: 'pupil', label: 'Schüler' }];


export default {
  name: 'SaveScreen',
  components: {
    BaseButton,
    BaseInput,
    SubheadingCell,
    TimeframeCell,
    PriceCell,
    AddCell,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      problemWhileSaving: false,
      problemNoName: false,
    };
  },
  computed: {
    summarization() {
      const text = [];
      if (this.policy.permission) {
        text.push(`${this.$t('rule.permission.name')}: ${this.policy.permission
          .map((p) => {
            let actionID = p.action;
            if (Array.isArray(p.action)) {
              actionID = p.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', ')}`);
      }
      if (this.policy.obligation) {
        text.push(`${this.$t('rule.obligation.name')}: ${this.policy.obligation
          .map((o) => {
            let actionID = o.action;
            if (Array.isArray(o.action)) {
              actionID = o.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', ')}`);
      }
      if (this.policy.prohibition) {
        text.push(`${this.$t('rule.prohibition.name')}: ${this.policy.prohibition
          .map((p) => {
            let actionID = p.action;
            if (Array.isArray(p.action)) {
              actionID = p.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', ')}`);
      }
      return text.join('; ');
    },
    licenseEntities() {
      return licenseEntities;
    },
    duplicates() {
      const attachIndex = ((timeframe, index) => ({ timeframe, index }));
      const onlyDuplicates = (counts => (timeframeInfo) => {
        // counts is a map the function closes over
        // below the outer function is invoced with {} as argument
        const count = (counts[timeframeInfo.timeframe] || 0);
        return (counts[timeframeInfo.timeframe] = count + 1) > 1;
      })({});
      const stripToIndex = (info => info.index);
      return this.policy.options.timeframes
        .map(attachIndex)
        .filter(onlyDuplicates)
        .map(stripToIndex);
    },
  },
  methods: {
    updateTimeframe(index, updatedTimeframe) {
      Vue.set(this.policy.options.timeframes, index, updatedTimeframe);
    },
    removeTimeframe(index) {
      const options = Object.keys(this.policy.options);
      options.forEach((optionName) => {
        Vue.delete(this.policy.options[optionName], index);
      });
    },
    addTimeframe() {
      licenseEntities.forEach((entity) => {
        const index = this.policy.options[entity.key].length;
        Vue.set(this.policy.options[entity.key], index, false);
      });
      this.policy.options.timeframes.push('unbegrenzt');
    },
    updatePrice(licenseEntityKey, timeframeIndex, updatedPrice) {
      let price = updatedPrice;
      if (price) {
        price = Number(parseFloat(price).toFixed(2));
      }
      Vue.set(this.policy.options[licenseEntityKey], timeframeIndex, price);
    },
    save(policy) {
      if (this.policy.name.length === 0) {
        this.problemNoName = true;
        return;
      }
      if (this.duplicates.length > 0) {
        return;
      }
      fetch(backendAddr + '/sc-licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.policy),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response;
        }).then((response) => {
          console.log(response);
          this.problemWhileSaving = false;
          this.$router.push({ name: 'sc-start' });
        }).catch((error) => {
          console.error(error);
          this.problemWhileSaving = true;
        });
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

.save-button {
  float: right;
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
