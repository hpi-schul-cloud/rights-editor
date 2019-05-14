<template>
  <div class="preset-editor">
    <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="$emit('abort')">
          <i class="fas fa-arrow-circle-left" /> Zurück
        </a>
      </template>
    </EditorNavBar>
    <h1>Regel-Editor</h1>
    <div class="info">
      <div style="height: 30px; width: 20px; float: left"><i class="fas fa-info" /></div>
      <p>Hier geht es darum, welche Aktionen später mit den Medien erlaubt sein sollen.
        Suchen Sie aus der Liste links die Regeln, die Sie erlauben. Klicken Sie im Fenster
        der jeweiligen Regel auf "Regel hinzufügen" um sie Ihrer Auswahl hinzuzufügen.</p>
    </div>
    <table>
      <tr v-for="(rule, index) in rules" :key="index" @click="activeRuleIndex = index">
        <td><i :class="{ 'transparent-check': !rule.selected }" class="fas fa-check" /></td>
        <td :class="{ selected: rule.selected,active: activeRuleIndex === index }">{{ rule.name }}</td>
      </tr>
    </table>
    <div class="details">
      <div v-if="activeRule">
        <h2>{{ activeRule.name }}</h2>
        <p>{{ activeRule.description }}{{ activeRule.name }}.</p>
        <BaseButton v-if="selectedRules.indexOf(activeRuleIndex) >= 0" @click="removeRule(activeRuleIndex)">Regel entfernen</BaseButton>
        <BaseButton v-else @click="addRule(activeRuleIndex)">Regel hinzufügen</BaseButton>
      </div>
      <p v-else class="placeholder">Es sind noch keine Regeln ausgewählt.</p>
    </div>
  </div>
  </div>
</template>


<script>
import Vue from 'vue';
import EditorNavBar from './EditorNavBar.vue';
import BaseButton from './BaseButton.vue';


const rules = [
  { name: 'Nicht-gewerbliche, öffentliche Vorführung', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Download', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Streaming', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Speichern', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Bearbeitung', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Remix', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Öffentliche Zugänglichmachung bearbeiteter Materialien', description: 'TODO: Dies ist die Beschreibung von ' },
  { name: 'Thumbnailerzeugung', description: 'TODO: Dies ist die Beschreibung von ' },
];

export default {
  name: 'PresetEditor',
  components: {
    EditorNavBar,
    BaseButton,
  },
  data() {
    return {
      activeRuleIndex: -1,
      selectedRules: [],
    };
  },
  computed: {
    rules() {
      return rules.map((rule, index) => ({
        name: rule.name,
        selected: this.selectedRules.indexOf(index) >= 0,
      }));
    },
    activeRule() {
      return rules[this.activeRuleIndex];
    },
  },
  methods: {
    addRule(index) {
      this.selectedRules.push(index);
    },
    removeRule(index) {
      Vue.delete(this.selectedRules, this.selectedRules.indexOf(index));
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  float: left;
  width: 200px;
  box-shadow: 3px 0px 2px -3px gray;
}

td {
  margin: 0px;
  padding: 8px 4px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  cursor: pointer;
}

.selected {
  color: #1f3b70;
}

.active {
    color: #1f3b70;
    font-weight: bold;
}

p {
  margin: 0px;
}

.fas {
  color: #1f3b70;
}
.fas.transparent-check {
  color: transparent;
}

li:hover .border {
  border-bottom-color: transparent;
}

.info {
  margin: 16px 0px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid #1f3b70;
  background-color: #f1f6fb;
}

.details {
  margin-left: 232px;
  height: 360px;
}

.placeholder {
  font-size: 30px;
  font-style: italic;
  color: gray;
  text-align: center;
  padding-top: 150px;
}

</style>
