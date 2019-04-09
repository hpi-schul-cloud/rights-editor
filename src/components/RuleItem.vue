<template>
  <div>
    <h3>{{ ruleLabel }} <i v-bind:class="ruleInfo.icon"></i></h3>
    <BaseButton remove class="remove-button" v-bind:onClick="removeRule">
      <i class="far fa-trash-alt"></i>
    </BaseButton>

    <!-- display action -->
    Das
    <ActionItem class="action-item" v-bind:policy="policy" v-bind:path="[...path, 'action']"></ActionItem>
    {{ ruleInfo.descriptionBefore }}
    <a href="#">{{ ruleInfo.descriptionLink }}</a>
    {{ ruleInfo.descriptionAfter }}
    
    <!-- add new refinement -->
    Das
    <a href="#">{{ rule['action'] }}</a> darf nur auf die folgende Art und Weise erfolgen...
    <BaseButton
      class="add-button"
      v-bind:onClick="function(){/* TODO: implement this functionality */}"
    >Verfeinerung hinzufügen</BaseButton>

    <!-- display and edit constraints -->
    Insgesamt gilt die
    <a href="#">{{ ruleLabel }}</a> nur, wenn...
    <ConstraintItem v-for="(constraint, index) in constraints" v-bind:key="index" v-bind:policy="policy" v-bind:path="[...path, 'constraint', index]"></ConstraintItem>
    <!-- add new constraint -->
    <BaseButton class="add-button" v-bind:onClick="addConstraint">Einschränkung hinzufügen</BaseButton>
    <BaseButton v-bind:onClick="appendNewSubrule">{{ subruleLabel }} hinzufügen</BaseButton>

    <div class="subrule-section">
      <RuleItem v-for="(subrule, index) in rule[subruleType]" v-bind:policy="policy" v-bind:path="[...path, subruleType, index]" v-bind:key="index"></RuleItem>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ActionItem from "./ActionItem.vue";
import ConstraintItem from "./ConstraintItem";
import BaseButton from "./BaseButton.vue";
import ConstraintChooser from "./ConstraintChooser.vue";

import { RuleTypes } from '../libs/rules/rules.js';

export default {
  name: "RuleItem",
  components: {
    ConstraintItem,
    BaseButton,
    ActionItem,
    ConstraintItem,
    ConstraintChooser
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true
    },
  },
  data: function() {
    return {
      displayConstraintChooser: false,
      nextId: 0
    };
  },
  methods: {
    furtherPath(nameSegment, indexSegment) {
      let p = this.path.slice();
      p.push(nameSegment, indexSegment);
      return p;
    },
    appendNewSubrule() {
      if (!this.rule[this.subruleType]) {
        Vue.set(this.rule, this.subruleType, []);
      }
      this.rule[this.subruleType].push({})
    },
    removeRule() {
      // TODO
      throw new Exception("not implemented yet");
    },
    showConstraintChooser: function() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser: function() {
      this.displayConstraintChooser = false;
    },
    addConstraint: function() {
      if (!this.constraints) {
        Vue.set(this.rule, 'constraint', []);
      }
      this.constraints.push(null);
    }
  },
  computed: {
    rule() {
      let r = this.path.reduce((result, segment) => result[segment], this.policy);
      return r;
    },
    ruleType() {
      return this.path[this.path.length - 2];
    },
    ruleLabel() {
      return {'permission': 'Erlaubnis', 'prohibition': 'Verbot', 'obligation': 'Verpflichtung',
        'duty': 'Vorbedingung', 'remedy': 'Wiedergutmachung', 'consequence': 'Zusätzliche Pflicht'}[this.ruleType];
    },
    subruleType() {
      // TODO: consequences can't have consequences, can they?
      return {'permission': 'duty', 'prohibition': 'remedy', 'obligation': 'consequence',
        'duty': 'consequence', 'remedy': 'consequence', 'consequence': 'consequence'}[this.ruleType];
    },
    subruleLabel() {
      return {'duty': 'Vorbedingung', 'remedy': 'Wiedergutmachung bei Regelverletzung', 'consequence': 'Zusätzliche Pflicht bei Nichteinhaltung'}[this.subruleType];
    },
    constraints() {
      return this.rule['constraint'];
    },
    ruleInfo() {
      return RuleTypes[this.ruleType];
    }
  }
};
</script>

<style scoped>
.subrule-section {
  margin-left: 20px;
}

.container {
  width: 95%;
  margin: 10px;
  margin-left: 0px;
  padding: 20px;
}

.header {
  position: relative;
  margin-bottom: 10px;
}

.remove-button {
  position: absolute;
  left: calc(100% - 20px);
  top: -20px;
}

.constraint-container {
  display: inline;
}

.constraint-text {
  display: inline;
  margin-right: 10px;
}

.constraint-edit {
  margin: 0px;
  padding: 0px;
}

.add-button {
  display: block;
  margin-top: 10px;
  margin-left: 0px;
}
</style>
