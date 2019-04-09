<template>
  <div>
    <h3>{{ ruleLabel }} <i :class="ruleInfo.icon" /></h3>
    <BaseButton remove class="remove-button" :on-click="removeRule">
      <i class="far fa-trash-alt" />
    </BaseButton>

    <!-- display action -->
    Das
    <ActionItem class="action-item" :policy="policy" :path="[...path, 'action']" />
    {{ ruleInfo.descriptionBefore }}
    <a href="#">
      {{ ruleInfo.descriptionLink }}
    </a>
    {{ ruleInfo.descriptionAfter }}

    <!-- add new refinement -->
    Das
    <a href="#">
      {{ rule['action'] }}
    </a> darf nur auf die folgende Art und Weise erfolgen...
    <BaseButton
      class="add-button"
      :on-click="function(){/* TODO: implement this functionality */}"
    >
      Verfeinerung hinzufügen
    </BaseButton>

    <!-- display and edit constraints -->
    Insgesamt gilt die
    <a href="#">
      {{ ruleLabel }}
    </a> nur, wenn...
    <ConstraintItem
      v-for="(constraint, index) in constraints" :key="index" :policy="policy"
      :path="[...path, 'constraint', index]"
    />
    <!-- add new constraint -->
    <BaseButton class="add-button" :on-click="addConstraint">
      Einschränkung hinzufügen
    </BaseButton>
    <BaseButton :on-click="appendNewSubrule">
      {{ subruleLabel }} hinzufügen
    </BaseButton>

    <div class="subrule-section">
      <RuleItem
        v-for="(subrule, index) in rule[subruleType]" :key="index" :policy="policy"
        :path="[...path, subruleType, index]"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ActionItem from './ActionItem.vue';
import ConstraintItem from './ConstraintItem';
import BaseButton from './BaseButton.vue';
import ConstraintChooser from './ConstraintChooser.vue';

import { RuleTypes } from '../libs/rules/rules.js';

export default {
  name: 'RuleItem',
  components: {
    ConstraintItem,
    BaseButton,
    ActionItem,
    ConstraintItem,
    ConstraintChooser,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      displayConstraintChooser: false,
      nextId: 0,
    };
  },
  computed: {
    rule() {
      const r = this.path.reduce((result, segment) => result[segment], this.policy);
      return r;
    },
    ruleType() {
      return this.path[this.path.length - 2];
    },
    ruleLabel() {
      return {
        permission: 'Erlaubnis',
        prohibition: 'Verbot',
        obligation: 'Verpflichtung',
        duty: 'Vorbedingung',
        remedy: 'Wiedergutmachung',
        consequence: 'Zusätzliche Pflicht',
      }[this.ruleType];
    },
    subruleType() {
      // TODO: consequences can't have consequences, can they?
      return {
        permission: 'duty',
        prohibition: 'remedy',
        obligation: 'consequence',
        duty: 'consequence',
        remedy: 'consequence',
        consequence: 'consequence',
      }[this.ruleType];
    },
    subruleLabel() {
      return { duty: 'Vorbedingung', remedy: 'Wiedergutmachung bei Regelverletzung', consequence: 'Zusätzliche Pflicht bei Nichteinhaltung' }[this.subruleType];
    },
    constraints() {
      return this.rule.constraint;
    },
    ruleInfo() {
      return RuleTypes[this.ruleType];
    },
  },
  methods: {
    furtherPath(nameSegment, indexSegment) {
      const p = this.path.slice();
      p.push(nameSegment, indexSegment);
      return p;
    },
    appendNewSubrule() {
      if (!this.rule[this.subruleType]) {
        Vue.set(this.rule, this.subruleType, []);
      }
      this.rule[this.subruleType].push({});
    },
    removeRule() {
      // TODO
      throw new Exception('not implemented yet');
    },
    showConstraintChooser() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser() {
      this.displayConstraintChooser = false;
    },
    addConstraint() {
      if (!this.constraints) {
        Vue.set(this.rule, 'constraint', []);
      }
      this.constraints.push(null);
    },
  },
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
