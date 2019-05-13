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
    <ul class="rule-list">
      <li v-for="(rule, index) in rules" :key="index" @click="activeRuleIndex = index" :class="{ selected: selectedRules.indexOf(index) >= 0 ,active: activeRuleIndex === index }">{{ rule.name }}</li>
    </ul>
    <div class="details" v-if="activeRule">
      <h2>{{ activeRule.name }}</h2>
      <p>{{ activeRule.description }}{{ activeRule.name }}.</p>
      <BaseButton v-if="selectedRules.indexOf(activeRuleIndex) >= 0" @click="removeRule(activeRuleIndex)">Regel entfernen</BaseButton>
      <BaseButton v-else @click="addRule(activeRuleIndex)">Regel hinzufügen</BaseButton>
    </div>
  </div>
</template>


<script>
import EditorNavBar from './EditorNavBar.vue';
import BaseButton from './BaseButton.vue';
import Vue from 'vue';


const rules = [
  { name: 'Nichtkommerzielle, öffentliche Vorführung', description: 'TODO: Dies ist die Beschreibung von '},
  { name: 'Download', description: 'TODO: Dies ist die Beschreibung von '},
  { name: 'Streaming', description: 'TODO: Dies ist die Beschreibung von '}, 
  { name: 'Speichern', description: 'TODO: Dies ist die Beschreibung von '},
  { name: 'Remix', description: 'TODO: Dies ist die Beschreibung von '},
  { name: 'Thumbnailerzeugung', description: 'TODO: Dies ist die Beschreibung von '},
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
      return rules;
    },
    activeRule() {
      return rules[this.activeRuleIndex];
    }
  },
  methods: {
    addRule(index) {
      this.selectedRules.push(index);
    },
    removeRule(index) {
      Vue.delete(this.selectedRules, this.selectedRules.indexOf(index));
    },
  }
};
</script>

<style scoped>
.rule-list {
  float: left;
  width: 200px;
  box-sizing: border-box;
  box-shadow: 3px 0px 2px -3px gray;
  padding-right: 8px;
  margin: 0px;
  /* padding-bottom: 12px; */
}

li {
    padding: 12px 4px;
    /* margin: 8px 0px; */
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    margin-bottom: 8px;
    cursor: pointer;
    /* background-color: #eee; */
}

li:last-child {
  margin: 0px;
}

.active {
    color: #1f3b70;
    font-style: italic;
    border-top: 1px solid #1f3b70;
    border-bottom: 1px solid #1f3b70;
}

.selected {
  color: #1f3b70;
    font-weight: bold;
    border-top: 1px solid #1f3b70;
    border-bottom: 1px solid #1f3b70;
    padding-left: 12px;
}

.details {
  margin-left: 232px;
}

</style>
