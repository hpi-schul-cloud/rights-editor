<template>
  <div>
    <BaseButton class="save-button" @click="save()">Speichern</BaseButton>
    <h1>Lizenz zusammenstellen</h1>

    <p v-if="problemWhileSaving" class="warning">Während des Speicherns ist ein Problem aufgetreten</p>

    <h2 class="section-heading">Name des Lizenzangebotes</h2>
    <p>Bennenen Sie das Lizenzangebot, damit Sie in Übersichten schneller erkennen, um welches es sich handelt.</p>
    <BaseInput
      v-model="name"
      type="text"
      placeholder="Name für das Lizenzangebot"
      class="name-input"
    />
    <h2 class="section-heading">Gebiete und Laufzeiten</h2>
    <p>Stellen Sie verschiedene Lizenzmodelle zu einer flexiblen Lizenz zusammen.

    </p><p v-if="warning" class="warning">Einige Laufzeiten sind innerhalb einer Lizenz mehrfach angegeben.</p>

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
            :class="cell.classes"
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
          </th>
        </template>
        <template v-else>
          <td
            v-for="(cell, columnIndex) in row.cells()"
            :key="columnIndex"
            :rowspan="cell.rowspan || 1"
            :colspan="cell.colspan || 1"
            :class="cell.classes"
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

    <pre>{{ policies }}</pre>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseInput from '../BaseComponents/BaseInput.vue';
import BaseButton from '../BaseComponents/BaseButton.vue';

import TitleCell from './TitleCell.vue';
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
  constructor(_classes = []) {
    this.type = emptyCellName;
    this.classes = [this.type];
  }
}

class TitleRow extends DimensionRow {
  constructor(_policies, _emit) {
    super(_policies);
    this.emit = _emit;
    this.isHeadRow = true;
  }

  cells() {
    return [
      new DimensionCell(),
      new DimensionCell(),
      ...this.titleCells(),
      {
        type: addLicenseCellName,
        classes: [addLicenseCellName],
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
        classes: [titleCellName],
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
        classes: [descriptionCellName],
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
        classes: [subheadingCellName],
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
      classes: [subheadingCellName],
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
    this.isHeadRow = true;
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
        classes: [timeframeCellName],
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
        classes: [addTimeframeCellName],
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
        classes: [licenseeCellName],
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
        classes: [priceCellName],
        component: PriceCell,
        props: { price },
        events: {
          'update:price': (newValue) => {
            let price = newValue;
            if (price) {
              price = Number(parseFloat(price).toFixed(2));
            }
            Vue.set(this.policies[policyIndex].options[this.licensee], optionsIndex, price);
          },
        },
      })),
      new DimensionCell(),
    ];
    const flattenArray = (result, array) => [...result, ...array];
    return this.policies.map(toPriceCells).reduce(flattenArray);
  }
}


export default {
  name: 'DimensionEditor',
  components: {
    BaseInput,
    BaseButton,
  },
  props: {
    policies: {
      type: Array,
      required: [],
    },
  },
  data() {
    return {
      name: '',
      problemWhileSaving: false,
    };
  },
  computed: {
    rows() {
      const emitFunc = (eventName) => { this.$emit(eventName); };
      return new DimensionTable(this.policies).rows(emitFunc);
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
    save() {
      return fetch('http://localhost:5050/sc-licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name || 'Unbenannte Lizenz',
          policies: this.policies,
        }),
      })
        .then((response) => {
          this.problemWhileSaving = false;
          // this.$router.push({ name: 'sc-start' });
        })
        .catch((response) => {
          console.log('Problem:');
          console.log(response);
          this.problemWhileSaving = true;
        });
    },
  },
};
</script>

<style scoped>
.section-heading {
  margin-top: 50px;
}
.name-input {
  display: block;
  width: 100%;
}
.save-button {
  float: right;
  background-color: green;
}

table {
  margin-top: 30px;
  border-collapse: collapse;
}
th {
  font-weight: normal;
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
.subheading-cell:first-child, .licensee-cell, .timeframe-cell, .description-cell, .add-timeframe-cell, .price-cell {
  border-bottom: 1px solid black;
}
.subheading-cell:not(:first-child), .licensee-cell, .title-cell, .timeframe-cell, .description-cell, .add-timeframe-cell, .price-cell{
  border-right: 1px solid black;
}
.subheading-cell:not(:first-child), .title-cell, .timeframe-cell, .description-cell, .price-cell {
  border-left: 1px solid black;
}

.subheading-cell {
  vertical-align: bottom;
}

.timeframe-cell, .add-timeframe-cell, .description-cell, .subheading-cell:first-child {
  padding-top: 0px;
}

td, th {
  padding: 8px;
}

</style>
