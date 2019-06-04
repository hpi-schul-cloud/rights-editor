<template>
  <div>
    <BaseButton class="save-button" @click="save()">Speichern</BaseButton>
    <h1>Lizenz zusammenstellen</h1>

    <p v-if="problemWhileSaving" class="warning">Während des Speicherns ist ein Problem aufgetreten</p>

    <h2 class="section-heading">Name des Lizenzangebotes</h2>
    <p>Bennenen Sie das Lizenzangebot, damit Sie in Übersichten schneller erkennen, um welches es sich handelt.</p>
    <BaseInput
      v-model="policy.name"
      type="text"
      placeholder="Name für das Lizenzangebot"
      class="name-input"
    />

    <RuleSection :permissions.sync="policy.odrl.permission" />

    <h2 class="section-heading">Gebiete und Laufzeiten</h2>
    <p>Stellen Sie verschiedene Lizenzmodelle zu einer flexiblen Lizenz zusammen.

    </p><p v-if="duplicates.length > 0" class="warning">Einige Laufzeiten sind innerhalb einer Lizenz mehrfach angegeben.</p>

    <table class="prices-table">
      <tr><th colspan="2"></th><th colspan="policy.options.timeframes.length">Laufzeit</th><th></th></tr>
      <tr><th></th><th>Geltungsbereiche</th>
        <th v-for="(timeframe, index) in policy.options.timeframes" :key="index">{{ timeframe }}</th><th> + </th></tr>
      <tr><td></td><td>Land</td>
        <td v-for="(price, index) in policy.options.state" :key="index">{{ price }}</td><td></td></tr>
      <tr><td></td><td>Kreis</td>
        <td v-for="(price, index) in policy.options.county" :key="index">{{ price }}</td><td></td></tr>
      <tr><td></td><td>Schule</td>
        <td v-for="(price, index) in policy.options.school" :key="index">{{ price }}</td><td></td></tr>
      <tr><td></td><td>Lehrer</td>
        <td v-for="(price, index) in policy.options.teacher" :key="index">{{ price }}</td><td></td></tr>
      <tr><td></td><td>Schüler/Eltern</td>
        <td v-for="(price, index) in policy.options.pupil" :key="index">{{ price }}</td><td></td></tr>
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


    <table class="prices-table">
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

    <pre>{{ duplicates }}</pre>
    <pre>{{ policy }}</pre>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseInput from '../BaseComponents/BaseInput.vue';
import BaseButton from '../BaseComponents/BaseButton.vue';

import RuleSection from './RuleSection.vue';

import TitleCell from './TitleCell.vue';
import DescriptionCell from './DescriptionCell.vue';
import SubheadingCell from './SubheadingCell.vue';
import LicenseeCell from './LicenseeCell.vue';
import TimeframeCell from './TimeframeCell.vue';
import PriceCell from './PriceCell.vue';
import AddCell from './AddCell.vue';

import { ruleOptions } from '../../libs/license-options/license-options';

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
  constructor(_policy) {
    this.policy = _policy;
  }

  rows(emitFunc) {
    return [
      new SubheadingRow(this.policy),
      new TimeframesRow(this.policy),
      ...licenseEntities.map(entity => new LicenseeRow(this.policy, entity)),
    ];
  }
}

class DimensionRow {
  constructor(_policy) {
    this.policy = _policy;
    this.isHeadRow = false;
  }

  cellsCount() {
    const policyCellCount = this.policy.options.timeframes.length;
    return 2 + policyCellCount + 1;
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

class SubheadingRow extends DimensionRow {
  constructor(_policy) {
    super(_policy, null);
    this.isHeadRow = true;
  }

  cells() {
    return [
      this.areaCell(),
      // new DimensionCell(),
      this.timeframeCell(),
      new DimensionCell(),
    ];
  }

  areaCell() {
    return {
      type: subheadingCellName,
      classes: [subheadingCellName],
      rowspan: 2,
      component: SubheadingCell,
      props: {
        text: 'Geltungsbereiche',
      },
    };
  }

  timeframeCell() {
    return {
      type: subheadingCellName,
      classes: [subheadingCellName],
      colspan: this.policy.options.timeframes.length,
      component: SubheadingCell,
      props: {
        text: 'Laufzeit',
      },
    };
  }
}

class TimeframesRow extends DimensionRow {
  constructor(_policy) {
    super(_policy);
    this.isHeadRow = true;
  }

  cells() {
    return [
      // new DimensionCell(),
      ...this.timeframeCells(),
      this.addingCell(),
    ];
  }

  timeframeCells() {
    return this.policy.options.timeframes.map((timeframe, timeframeIndex) => ({
      type: timeframeCellName,
      classes: [timeframeCellName],
      component: TimeframeCell,
      props: { timeframe },
      events: {
        'update-timeframe': (newTimeframe) => {
          Vue.set(this.policy.options.timeframes, timeframeIndex, newTimeframe);
        },
        'remove-timeframe': () => {
          const options = Object.keys(this.policy.options);
          options.map((optionName) => {
            Vue.delete(this.policy.options[optionName], timeframeIndex);
          });
        },
      },
    }));
  }

  addingCell() {
    return {
      type: addTimeframeCellName,
      classes: [addTimeframeCellName],
      component: AddCell,
      events: {
        add: () => {
          licenseEntities.forEach((entity) => {
            const index = this.policy.options[entity].length;
            Vue.set(this.policy.options[entity], index, false);
          });
          this.policy.options.timeframes.push('unbegrenzt');
        },
      },
    };
  }
}

class LicenseeRow extends DimensionRow {
  constructor(_policy, _licensee) {
    super(_policy);
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
      // new DimensionCell(),
      ...this.priceCells(),
      new DimensionCell(),
    ];
  }

  priceCells() {
    return this.policy.options[this.licensee].map((price, optionsIndex) => ({
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
          Vue.set(this.policy.options[this.licensee], optionsIndex, price);
        },
      },
    }));
  }
}


export default {
  name: 'DimensionEditor',
  components: {
    BaseInput,
    BaseButton,
    RuleSection,
  },
  props: {
    policy: {
      type: Object,
      default: () => ({
        name: '',
        odrl: {},
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
    return {
      problemWhileSaving: false,
    };
  },
  computed: {
    rules() {
      return ruleOptions;
    },
    rows() {
      const emitFunc = (eventName) => { this.$emit(eventName); };
      return new DimensionTable(this.policy).rows(emitFunc);
    },
    duplicates() {
        const attachIndex = ((timeframe, index) => ({ timeframe, index}));
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
    timeframeSteps() {
      return timeframeSteps;
    },
  },
  methods: {
    save() {
      return fetch('http://localhost:5050/sc-licenses', {
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
.name-input {
  display: block;
  width: 100%;
}
.save-button {
  float: right;
  background-color: green;
}

table.prices-table {
  border-collapse: collapse;
  margin: 0px auto;
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
.subheading-cell:first-child, .licensee-cell, .timeframe-cell, .add-timeframe-cell, .price-cell {
  border-bottom: 1px solid black;
}
.licensee-cell, .title-cell, .timeframe-cell, .price-cell{
  border-right: 1px solid black;
}
.title-cell, .timeframe-cell, .price-cell {
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
