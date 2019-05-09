<template>
  <div>
    <h1>Gebiete und Laufzeiten</h1>

    <p v-if="warning" class="warning">Einige Laufzeiten sind innerhalb einer Lizenz mehrfach angegeben.</p>

    <table>
      <tr>
        <th />
        <th
          v-for="(licenseInfo, index) in licenseInfos"
          :key="index"
          :colspan="licenseInfo.optionsCount"
          class="policies-first-cell"
        >{{ licenseInfo.label }}</th>
      </tr>
      <tr>
        <th>Lizenzgebiet</th>
        <th
          v-for="(cell, index) in columnInformation"
          :key="index"
          :class="{ 'policies-first-cell': cell.periodIndex === 0, 'duplicate': warning && warning[cell.licenseIndex].duplicates.indexOf(cell.periodIndex) >= 0}"
        >
          <span v-if="cell.type === 'period'">
            <select @change="updatePeriod(cell.licenseIndex, cell.periodIndex, $event.target.value)">
              <option :selected="cell.period === '10 Jahre'">10 Jahre</option>
              <option :selected="cell.period === '9 Jahre'">9 Jahre</option>
              <option :selected="cell.period === '8 Jahre'">8 Jahre</option>
              <option :selected="cell.period === '7 Jahre'">7 Jahre</option>
              <option :selected="cell.period === '6 Jahre'">6 Jahre</option>
              <option :selected="cell.period === '5 Jahre'">5 Jahre</option>
              <option :selected="cell.period === '48 Stunden'">48 Stunden</option>
              <option :selected="cell.period === '24 Stunden'">24 Stunden</option>
              <option :selected="cell.period === 'unbegrenzt'">unbegrenzt</option>
            </select>
            <button @click="removePeriod(cell.licenseIndex, cell.periodIndex)"><i class="fas fa-trash-alt" /></button>
          </span>
          <button v-else @click="addPeriod(cell.licenseIndex)"><i class="fas fa-plus-circle" /></button>
        </th>
      </tr>
      <tr>
        <td>Land</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.periodIndex === 0 }">
          <PriceInput v-if="column.type === 'period'" :price="column.state" @update:price="updatePrice('state', column.licenseIndex, column.periodIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Kreis</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.periodIndex === 0 }">
          <PriceInput v-if="column.type === 'period'" :price="column.county" @update:price="updatePrice('county', column.licenseIndex, column.periodIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Schule</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.periodIndex === 0 }">
          <PriceInput v-if="column.type === 'period'" :price="column.school" @update:price="updatePrice('school', column.licenseIndex, column.periodIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Lehrer</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.periodIndex === 0 }">
          <PriceInput v-if="column.type === 'period'" :price="column.teacher" @update:price="updatePrice('teacher', column.licenseIndex, column.periodIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Schüler/Eltern</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.periodIndex === 0 }">
          <PriceInput v-if="column.type === 'period'" :price="column.pupil" @update:price="updatePrice('pupil', column.licenseIndex, column.periodIndex, $event)" />
        </td>
      </tr>
    </table>
    <pre>{{ policies }}</pre>
  </div>
</template>

<script>
import Vue from 'vue';
import PriceInput from '../components/PriceInput.vue';
import BaseButton from '../components/BaseButton.vue';

const licenseEntities = ['state', 'county', 'school', 'teacher', 'pupil'];

export default {
  name: 'DimensionEditor',
  components: {
    PriceInput,
    BaseButton,
  },
  data() {
    return {};
  },
  props: {
    policies: {
        type: Array,
        required: [],
    },
  },
  computed: {
    licenseInfos() {
      // return this.policies.map(license => ({ label: license.label, optionsCount: license.options.timeframes.length }));
      const infos = this.columnInformation.reduce((agregate, cell) => {
        if (agregate.length === 0) {
          return [{ label: this.policies[cell.licenseIndex].label, licenseIndex: cell.licenseIndex, optionsCount: 1 }];
        }
        const prev = agregate[agregate.length - 1];
        if (prev.licenseIndex === cell.licenseIndex) {
          prev.optionsCount++;
          agregate[agregate.length - 1] = prev;
          return agregate;
        }
        return [...agregate, { label: this.policies[cell.licenseIndex].label, licenseIndex: cell.licenseIndex, optionsCount: 1 }];
      }, []);
      return infos;
    },
    columnInformation() {
      const info = [];
      this.policies.forEach((license, lIndex) => {
        const licenseInfos = license.options.timeframes.map((timeframe, tIndex) => ({
          type: 'period',
          period: timeframe,
          licenseIndex: lIndex,
          periodIndex: tIndex,
          state: license.options.state[tIndex],
          county: license.options.county[tIndex],
          school: license.options.school[tIndex],
          teacher: license.options.teacher[tIndex],
          pupil: license.options.pupil[tIndex],
        }));
        info.push(...licenseInfos);
        info.push({ type: 'add', licenseIndex: lIndex });
      });
      return info;
    },
    warning() {
      const howManyDuplicatesPerLicense = ((license, index) => {
        const attachIndex = ((timeframe, index) => ({ timeframe, index }));
        const onlyDuplicates = (counts => (periodInfo) => {
          const count = (counts[periodInfo.timeframe] || 0);
          return (counts[periodInfo.timeframe] = counts + 1) > 1;
        })({});
        const stripToIndex = (info => info.index);
        const duplicatesIndices = license.options.timeframes
          .map(attachIndex)
          .filter(onlyDuplicates)
          .map(stripToIndex);
        return {
          licenseIndex: index,
          hasDuplicates: duplicatesIndices.length > 0,
          duplicates: duplicatesIndices,
        };
      });
      const duplicatesInfo = this.policies.map(howManyDuplicatesPerLicense);
      const orAll = (seenAnyDuplicate, info) => (seenAnyDuplicate || info.hasDuplicates);
      const anyDuplicates = duplicatesInfo.reduce(orAll, false);
      if (anyDuplicates) {
        return duplicatesInfo;
      }
      return false;
    },
  },
  methods: {
    updatePrice(area, licenseIndex, periodIndex, priceInfo) {
      let price = priceInfo;
      if (priceInfo) {
        price = Number(parseFloat(price).toFixed(2));
      }
      Vue.set(this.policies[licenseIndex].options[area], periodIndex, price);
    },
    updatePeriod(licenseIndex, periodIndex, period) {
      Vue.set(this.policies[licenseIndex].options.timeframes, periodIndex, period);
    },
    removePeriod(licenseIndex, periodIndex) {
      Vue.delete(this.policies[licenseIndex].options.timeframes, periodIndex);
      licenseEntities.forEach((entity) => {
        Vue.delete(this.policies[licenseIndex].options[entity], periodIndex);
      });
    },
    addPeriod(licenseIndex) {
      licenseEntities.forEach((entity) => {
        const index = this.policies[licenseIndex].options[entity].length;
        Vue.set(this.policies[licenseIndex].options[entity], index, false);
      });
      this.policies[licenseIndex].options.timeframes.push('unbegrenzt');
    },
  },
};
</script>

<style scoped>
td, th {
    padding: 8px;
    margin-left: 4px;
}
td:not(.policies-first-cell):not(:first-child), th:not(.policies-first-cell):not(:first-child) {
  border-left: 4px solid white;
}
tr:nth-child(even) {
    background-color: #DDD;
}
table {
    border-collapse: collapse;
}
.policies-first-cell {
  border-left: 1px solid black;
}
button {
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0px;
  margin: 0px 8px;
  color: #444;
}
button:hover {
  color: black;
}
select {
  font-size: inherit;
  border: none;
  background-color: transparent;
}
.warning {
  background: rgb(255, 219, 219);
  border-radius: 3px 3px;
  color: rgb(204, 0, 0);
  padding: 8px;
}
th.duplicate {
  background-color: rgb(255, 219, 219);
}
</style>
