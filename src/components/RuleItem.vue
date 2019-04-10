<template>
  <div class="rule-container">
    <div class="rule-header">
      <h3>
        {{ ruleInfo.name }}
        <i :class="ruleInfo.icon" />
      </h3>
      <BaseButton remove class="remove-button" :on-click="removeRule">
        <i class="far fa-trash-alt" />
      </BaseButton>
    </div>

    <!-- display action -->
    Das
    <ActionItem class="action-item" :policy="policy" :path="[...path, 'action']" />
    {{ ruleInfo.descriptionBefore }}
    <a href="#">
      {{ ruleInfo.descriptionLink }}
    </a>
    {{ ruleInfo.descriptionAfter }}
    <br>
    <br>
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

    <br>
    <!-- display and edit constraints -->
    Insgesamt gilt die
    <a href="#">
      {{ ruleInfo.name }}
    </a> nur, wenn...
    <ConstraintItem
      v-for="(constraint, index) in constraints"
      :key="index"
      :policy="policy"
      :path="[...path, 'constraint', index]"
    />
    <!-- add new constraint -->
    <BaseButton class="add-button" :on-click="addConstraint">
      Einschränkung hinzufügen
    </BaseButton>

    <!-- add subrules -->
    <div v-if="ruleInfo.subrule != ''" class="add-subrule-container">
      <i>Optional können folgende Erweiterungen hinzugefügt werden:</i>
      <br>Eine
      <BaseButton
        class="add-subrule-button"
        :name="subruleInfo.name"
        :on-click="appendNewSubrule"
      >
        {{ subruleInfo.name }}
      </BaseButton>
      <div class="add-subrule-info">
        {{ subruleInfo.descriptionBefore }}
        <a href="#">
          {{ subruleInfo.descriptionLink }}
        </a>
        {{ subruleInfo.descriptionAfter }}
      </div>
    </div>

    <!-- display subrules -->
    <div class="subrule-container">
      <RuleItem
        v-for="(subrule, index) in rule[subruleType]"
        :key="index"
        :policy="policy"
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
      const r = this.path.reduce(
        (result, segment) => result[segment],
        this.policy,
      );
      return r;
    },
    ruleType() {
      return this.path[this.path.length - 2];
    },
    ruleInfo() {
      return RuleTypes[this.ruleType];
    },
    subruleType() {
      return this.ruleInfo.subrule;
    },
    subruleInfo() {
      return RuleTypes[this.ruleInfo.subrule];
    },
    constraints() {
      return this.rule.constraint;
    },
    ruleParent() {
      const pathWithoutLastElement = this.path.slice(0, this.path.length - 1);
      return pathWithoutLastElement.reduce(
        (result, segment) => result[segment],
        this.policy,
      );
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
      Vue.delete(this.ruleParent, this.path[this.path.length - 1]);
      if (this.ruleParent.length === 0) {
        const parentsParent = this.path
          .slice(0, this.path.length - 2)
          .reduce((result, segment) => result[segment], this.policy);
        Vue.delete(parentsParent, this.path[this.path.length - 2]);
      }
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
.rule-container {
  width: 95%;
  margin: 10px;
  margin-top: 0px;
  margin-left: 0px;
  padding: 20px;
}

.rule-header {
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

.subrule-container {
  margin-left: 20px;
}

.add-subrule-container {
  margin-top: 45px;
}

.add-subrule-info {
  display: inline-block;
}

.add-subrule-button {
  margin-left: 6px;
}
</style>
