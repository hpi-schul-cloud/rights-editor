<template>
  <div>
    <h1>Gebiete und Laufzeiten</h1>

    <p v-if="warning" class="warning">Einige Laufzeiten sind innerhalb einer Lizenz mehrfach angegeben.</p>

    <table>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
      >
        <template v-if="row.isHeadRow">
          <th
            v-for="(cell, columnIndex) in row.cells()"
            :key="columnIndex"
            :rowspan="cell.rowspan || 1"
            :colspan="cell.colspan || 1"
          >
            <component :is="cell.component" v-if="cell.component" />
            <span v-else>({{ rowIndex }}:{{ columnIndex }}) {{ cell }}</span>
          </th>
        </template>
        <template v-else>
          <td
            v-for="(cell, columnIndex) in row.cells()"
            :key="columnIndex"
            :rowspan="cell.rowspan || 1"
            :colspan="cell.colspan || 1"
            :class="[cell.type]"
          >
            <component
              :is="cell.component"
              v-if="cell.component"
              v-bind="cell.props"
              class="cell"
              v-on="cell.events || {}"
            />
            <div v-else-if="cell.type === 'empty-cell'" class="cell" />
            <span v-else>({{ rowIndex }}:{{ columnIndex }}) {{ cell }}</span>
          </td>
        </template>
      </tr>
    </table>

    <table>
      <tr>
        <th />
        <th
          v-for="(licenseInfo, index) in licenseInfos"
          :key="index"
          :colspan="licenseInfo.optionsCount"
          class="policies-first-cell"
        >{{ licenseInfo.label }} </th>
        <th><button @click="$emit('addPolicy')"><i class="fas fa-plus-circle" /></button></th>
      </tr>
      <tr>
        <th>Lizenzgebiet</th>
        <th
          v-for="(cell, index) in columnInformation"
          :key="index"
          :class="{ 'policies-first-cell': cell.timeframeIndex === 0, 'duplicate': warning && warning[cell.licenseIndex].duplicates.indexOf(cell.timeframeIndex) >= 0}"
        >
          <span v-if="cell.type === 'timeframe'">
            <select @change="updatetimeframe(cell.licenseIndex, cell.timeframeIndex, $event.target.value)">
              <option v-for="(timeframeStep, index) in timeframeSteps" :key="index" :selected="cell.timeframe === timeframeStep">{{ timeframeStep }}</option>
            </select>
            <button @click="removetimeframe(cell.licenseIndex, cell.timeframeIndex)"><i class="fas fa-trash-alt" /></button>
          </span>
          <button v-if="cell.type === 'add'" @click="addtimeframe(cell.licenseIndex)"><i class="fas fa-plus-circle" /></button>
        </th>
      </tr>
      <tr>
        <td>Land</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.timeframeIndex === 0 }">
          <PriceInput v-if="column.type === 'timeframe'" :price="column.state" @update:price="updatePrice('state', column.licenseIndex, column.timeframeIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Kreis</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.timeframeIndex === 0 }">
          <PriceInput v-if="column.type === 'timeframe'" :price="column.county" @update:price="updatePrice('county', column.licenseIndex, column.timeframeIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Schule</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.timeframeIndex === 0 }">
          <PriceInput v-if="column.type === 'timeframe'" :price="column.school" @update:price="updatePrice('school', column.licenseIndex, column.timeframeIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Lehrer</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.timeframeIndex === 0 }">
          <PriceInput v-if="column.type === 'timeframe'" :price="column.teacher" @update:price="updatePrice('teacher', column.licenseIndex, column.timeframeIndex, $event)" />
        </td>
      </tr>
      <tr>
        <td>Schüler/Eltern</td>
        <td v-for="(column, index) in columnInformation" :key="index" :class="{ 'policies-first-cell': column.timeframeIndex === 0 }">
          <PriceInput v-if="column.type === 'timeframe'" :price="column.pupil" @update:price="updatePrice('pupil', column.licenseIndex, column.timeframeIndex, $event)" />
        </td>
      </tr>
    </table>
    <pre>{{ policies }}</pre>
  </div>
</template>

<script>
import Vue from 'vue';
import TitleCell from './TitleCell.vue';
import PriceInput from './PriceInput.vue';
import BaseButton from '../BaseComponents/BaseButton.vue';
import DescriptionCell from './DescriptionCell.vue';
import SubheadingCell from './SubheadingCell.vue';
import LicenseeCell from './LicenseeCell.vue';
import TimeframeCell from './TimeframeCell.vue';
import PriceCell from './PriceCell.vue';
import AddCell from './AddCell.vue';

const licenseEntities = ['state', 'county', 'school', 'teacher', 'pupil'];
const licenseEntitiesName = {
  state: 'Land', county: 'Kreis', school: 'Schule', teacher: 'Lehrer', pupil: 'Schüler/Eltern',
};
const timeframeSteps = ['10 Jahre', '9 Jahre', '8 Jahre', '7 Jahre', '6 Jahre', '5 Jahre', '48 Stunden', '24 Stunden', 'unbegrenzt'];

const emptyCellName = 'empty-cell';
const addLicenseCellName = 'add-license-cell';
const titleCellName = 'title-cell';
const descriptionCellName = 'description-cell';
const subheadingCellName = 'subheading-cell';
const timeframeCellName = 'timeframe-cell';
const addTimeframeCellName = 'add-timeframe-cell';
const licenseeCellName = 'licensee-cell';
const priceCellName = 'price-cell';

class DimensionTable {
  constructor(_policies) {
    this.policies = _policies;
  }

  rows(emitFunc) {
    return [
      new TitleRow(this.policies, emitFunc),
      new DescriptionRow(this.policies),
      new DimensionRow(this.policies),
      new SubheadingRow(this.policies),
      new TimeframesRow(this.policies),
      ...licenseEntities.map(entity => new LicenseeRow(this.policies, entity)),
    ];
  }
}

class DimensionRow {
  constructor(_policies) {
    this.policies = _policies;
    this.isHeadRow = false;
  }

  cellsCount() {
    const byAdding = (sum, count) => sum + count;
    const licenseCells = this.policyCellsCounts().reduce(byAdding, 0);
    return 2 + licenseCells + 1;
  }

  policyCellsCounts() {
    const toCellsCount = policy => policy.options.timeframes.length + 1;
    return this.policies.map(toCellsCount);
  }

  cells() {
    const initializeCells = () => new DimensionCell();
    return Array(...new Array(this.cellsCount())).map(
      () => new DimensionCell(),
    );
  }
}

class DimensionCell {
  constructor() {
    this.type = emptyCellName;
  }
}

class TitleRow extends DimensionRow {
  constructor(_policies, _emit) {
    super(_policies);
    this.emit = _emit;
  }

  cells() {
    return [
      new DimensionCell(),
      new DimensionCell(),
      ...this.titleCells(),
      {
        type: addLicenseCellName,
        component: AddCell,
        events: {
          add: () => {
            this.emit('addPolicy');
          },
        },
      },
    ];
  }

  titleCells() {
    return this.policies.map(
      (policy, index) => ({
        type: titleCellName,
        colspan: this.policyCellsCounts()[index],
        component: TitleCell,
        props: {
          policy,
          index,
        },
      }),
    );
  }
}

class DescriptionRow extends TitleRow {
  constructor(_policies) {
    super(_policies, null);
  }

  cells() {
    const titleToDescriptionCells = (cell) => {
      if (cell.type !== titleCellName) {
        return new DimensionCell();
      }

      return {
        type: descriptionCellName,
        colspan: cell.colspan,
        component: DescriptionCell,
        props: {
          policy: cell.props.policy,
        },
      };
    };
    return super.cells().map(titleToDescriptionCells);
  }
}

class SubheadingRow extends TitleRow {
  constructor(_policies) {
    super(_policies, null);
  }

  cells() {
    const titleToSubheadingCells = (cell) => {
      if (cell.type !== titleCellName) {
        return new DimensionCell();
      }

      return {
        type: subheadingCellName,
        colspan: cell.colspan,
        component: SubheadingCell,
        props: {
          text: 'Laufzeit',
        },
      };
    };

    const subheadings = super.cells().map(titleToSubheadingCells);
    subheadings[0] = {
      type: subheadingCellName,
      rowspan: 2,
      component: SubheadingCell,
      props: {
        text: 'Geltungsbereiche',
      },
    };
    return subheadings;
  }
}

class TimeframesRow extends DimensionRow {
  constructor(_policies) {
    super(_policies);
  }

  cells() {
    return [
      new DimensionCell(),
      ...this.timeframeCells(),
      new DimensionCell(),
    ];
  }

  timeframeCells() {
    const toTimeframeCells = (policy, policyIndex) => [
      ...policy.options.timeframes.map((timeframe, timeframeIndex) => ({
        type: timeframeCellName,
        component: TimeframeCell,
        props: { timeframe },
        events: {
          'update-timeframe': (newTimeframe) => {
            Vue.set(this.policies[policyIndex].options.timeframes, timeframeIndex, newTimeframe);
          },
          'remove-timeframe': () => {
            const options = Object.keys(this.policies[policyIndex].options);
            options.map((optionName) => {
              Vue.delete(this.policies[policyIndex].options[optionName], timeframeIndex);
            });
          },
        },
      })),
      {
        type: addTimeframeCellName,
        component: AddCell,
        events: {
          add: () => {
            licenseEntities.forEach((entity) => {
              const index = this.policies[policyIndex].options[entity].length;
              Vue.set(this.policies[policyIndex].options[entity], index, false);
            });
            this.policies[policyIndex].options.timeframes.push('unbegrenzt');
          },
        },
      },
    ];
    const flattenArray = (result, array) => [...result, ...array];
    return this.policies.map(toTimeframeCells).reduce(flattenArray);
  }
}

class LicenseeRow extends DimensionRow {
  constructor(_policies, _licensee) {
    super(_policies);
    this.licensee = _licensee;
  }

  cells() {
    return [
      {
        type: licenseeCellName,
        component: LicenseeCell,
        props: {
          name: licenseEntitiesName[this.licensee],
        },
      },
      new DimensionCell(),
      ...this.priceCells(),
      new DimensionCell(),
    ];
  }

  priceCells() {
    const toPriceCells = (policy, policyIndex) => [
      ...policy.options[this.licensee].map((price, optionsIndex) => ({
        type: priceCellName,
        component: PriceCell,
        props: { price },
        events: {
          'update:price': (newValue) => {
            Vue.set(this.policies[policyIndex].options[this.licensee], optionsIndex, newValue);
          },
        },
      })),
      { type: emptyCellName },
    ];
    const flattenArray = (result, array) => [...result, ...array];
    return this.policies.map(toPriceCells).reduce(flattenArray);
  }
}


export default {
  name: 'DimensionEditor',
  components: {
    PriceInput,
    BaseButton,
  },
  props: {
    policies: {
      type: Array,
      required: [],
    },
  },
  data() {
    return {};
  },
  computed: {
    rows() {
      const emitFunc = (eventName) => {this.$emit(eventName);};
      return new DimensionTable(this.policies).rows(emitFunc);
    },
    licenseNamesCells() {
      const toNameCells = policy => ({
        kind: 'NameCell',
        label: policy.label,
      });
      return [
        this.emptyCell(),
        this.emptyCell(),
        ...this.policies.map(toNameCells),
      ];
    },
    licenseDetailsCells() {
      const toDetailsCells = policy => ({
        kind: 'DetailsCell',
        label: 'TODO',
      });
      return [
        this.emptyCell(),
        this.emptyCell(),
        ...this.policies.map(toDetailsCells),
      ];
    },


    licenseInfos() {
      const infos = this.columnInformation.reduce((agregate, cell) => {
        if (cell.type === 'empty') {
          return agregate;
        }
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
          type: 'timeframe',
          timeframe,
          licenseIndex: lIndex,
          timeframeIndex: tIndex,
          state: license.options.state[tIndex],
          county: license.options.county[tIndex],
          school: license.options.school[tIndex],
          teacher: license.options.teacher[tIndex],
          pupil: license.options.pupil[tIndex],
        }));
        info.push(...licenseInfos);
        info.push({ type: 'add', licenseIndex: lIndex });
      });
      info.push({ type: 'empty' });
      return info;
    },
    warning() {
      const howManyDuplicatesPerLicense = ((license, index) => {
        const attachIndex = ((timeframe, index) => ({ timeframe, index }));
        const onlyDuplicates = (counts => (timeframeInfo) => {
          const count = (counts[timeframeInfo.timeframe] || 0);
          return (counts[timeframeInfo.timeframe] = counts + 1) > 1;
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
    timeframeSteps() {
      return timeframeSteps;
    },
  },
  methods: {
    updatePrice(area, licenseIndex, timeframeIndex, priceInfo) {
      let price = priceInfo;
      if (priceInfo) {
        price = Number(parseFloat(price).toFixed(2));
      }
      Vue.set(this.policies[licenseIndex].options[area], timeframeIndex, price);
    },
    updatetimeframe(licenseIndex, timeframeIndex, timeframe) {
      Vue.set(this.policies[licenseIndex].options.timeframes, timeframeIndex, timeframe);
    },
    removetimeframe(licenseIndex, timeframeIndex) {
      Vue.delete(this.policies[licenseIndex].options.timeframes, timeframeIndex);
      licenseEntities.forEach((entity) => {
        Vue.delete(this.policies[licenseIndex].options[entity], timeframeIndex);
      });
    },
    addtimeframe(licenseIndex) {
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


.empty-cell {
  min-width: 8px;
  min-height: 8px;
}
td:not(.empty-cell) .cell, th:not(.empty-cell) .cell {
  background-color: #dfdfdf;
  display: block;
  padding: 8px;
}

</style>
