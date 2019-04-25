<template>
  <div class="rule-container">
    <div class="rule-header">
      <h3>{{ ruleInfo.name }} <i :class="ruleInfo.icon" /></h3>
      <BaseButton remove class="remove-button" :on-click="removeRule">
        <i class="far fa-trash-alt" />
      </BaseButton>
    </div>

    <!-- display action -->
    <p class="actions">
      <!-- main explanation -->
      <EmbedInText text-before="Das" :text-after="ruleInfo.description">
        <ActionItem :policy="policy" :path="[...path, 'action']" :remove-callback="removeRule" />
      </EmbedInText>
      <!-- additional explanation -->
      <EmbedInText v-if="ruleInfo.hasParentRule" :text-before="ruleInfo.descriptionAddon[0]" :text-after="ruleInfo.descriptionAddon[1]">
        {{ articles[parentRuleInfo.gender].def }}
        <a href="#" @click="$emit('followLink', path.slice(0, path.length - 2))">{{ parentRuleInfo.name }}</a>
      </EmbedInText>
    </p>

    <!-- display and edit refinements -->
    <p class="refinements">
      Das <em>{{ actionLabel }}</em> darf nur auf die folgende Art und Weise erfolgen...
      <RefinementItem
        v-for="(refinement, index) in refinements"
        :key="index"
        :policy="policy"
        :path="[...path, 'action', 0, 'refinement', index]"
      />
      <!-- add new refinement -->
      <BaseButton class="add-button" :on-click="addRefinement">
        Verfeinerung hinzufügen
      </BaseButton>
    </p>

    <!-- display and edit constraints -->
    <p class="constraints">
      Insgesamt gilt {{ articles[ruleInfo.gender].def }} <em>{{ ruleInfo.name }}</em> nur, wenn...
      <em v-if="logicalOpText == 'ODER'">entweder</em>
    </p>

    <li v-for="(constraint, index) in constraints" :key="index">
      <ConstraintItem :policy="policy" :path="[...constraintPath, index]" />
      <a
        v-if="Array.isArray(constraints) && constraints.length > 1 && index < constraints.length - 1"
        class="logical-operator"
        @click="nextLogicalOperator()"
      >
        {{ logicalOpText }}
      </a>
    </li>

    <!-- add new constraint -->
    <BaseButton class="add-button" :on-click="addConstraint">
      Einschränkung hinzufügen
    </BaseButton>

    <!-- add subrules -->
    <div v-if="canHaveSubrules" class="subrule-container">

      Optional kann um folgende Regeln erweitert werden:
      <p>
        <BaseButton class="add-button" :name="subruleInfo.pluralName" :on-click="appendNewSubrule">
          {{ subruleInfo.name }} hinzufügen</BaseButton>

        {{ subruleInfo.pluralName }} sind Pflichten, die geleistet werden müssen,
        <EmbedInText :text-before="subruleInfo.descriptionAddon[0]" :text-after="subruleInfo.descriptionAddon[1]">
          {{ articles[ruleInfo.gender].def }} <em>{{ ruleInfo.name }}</em>
        </EmbedInText>
      </P>

      <!-- list all available subrules -->
      <p v-if="subrules">
        Die {{ subrules.length == 1 ? subruleInfo.name : subruleInfo.pluralName }} diese{{ ruleInfo.gender === 'f' ? 'r' : 's' }} {{ ruleInfo.name }}{{ ruleInfo.gender === 'f' ? '' : 's' }}
        {{ subrules.length === 1 ? 'ist' : 'sind' }}<br>
        <span v-for="(subrule, index) in subrules" :key="index">
          <a href="#" @click="$emit('followLink', [...path, ruleInfo.subrule, index])">{{ subrule.action }}</a>
          <span v-if="index + 1 < subrules.length">, <br></span>
        </span>.
      </p>

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EmbedInText from './EmbedInText.vue';
import BaseButton from './BaseButton.vue';
import ActionItem from './ActionItem.vue';
import ConstraintItem from './ConstraintItem.vue';
import RefinementItem from './RefinementItem.vue';
import { RuleTypes } from '../libs/odrl/rules.js';
import { articles as articleMapping } from '../libs/language/language.js';

export default {
  name: 'RuleItem',
  components: {
    EmbedInText,
    ConstraintItem,
    BaseButton,
    ActionItem,
    RefinementItem,
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
      logicalOperators: [
        {
          text: 'UND/ODER',
          short: 'or',
        },
        {
          text: 'ODER',
          short: 'xone',
        },
        {
          text: 'UND',
          short: 'and',
        }],
      selectedLogicalOperator: 0,
    };
  },
  computed: {
    rule() {
      return this.policy.follow(this.path);
    },
    ruleInfo() {
      const ruleTypeName = this.path[this.path.length - 2];
      return RuleTypes[ruleTypeName];
    },
    subruleInfo() {
      return RuleTypes[this.ruleInfo.subrule];
    },
    parentRuleInfo() {
      if (!this.ruleInfo.hasParentRule) {
        console.error('has no parent');
        return null;
      }
      const parentRuleTypeName = this.path[this.path.length - 4];
      return RuleTypes[parentRuleTypeName];
    },
    canHaveSubrules() {
      return this.ruleInfo.subrule !== '';
    },
    subrules() {
      const subruleTypeName = this.ruleInfo.subrule;
      return this.rule[subruleTypeName];
    },
    hasParentRule() {
      return !!this.parentRuleInfo;
    },
    action() {
      return this.rule.action;
    },
    actionLabel() {
      return Array.isArray(this.action) ? this.action[0]['rdf:value'] : this.action;
    },
    constraints() {
      if (this.rule.constraint) { 
        if (this.rule.constraint.length <= 1) {
          return this.rule.constraint;
        }
        return this.rule.constraint[this.logicalOpShort]['@list'];
      }
    },
    constraintPath() {
      if (this.rule.constraint.length <= 1) {
        return [...this.path, 'constraint'];
      }
      return [...this.path, 'constraint', this.logicalOpShort, '@list'];
    },
    refinements() {
      if (this.action === undefined) {
        return undefined;
      }
      if (!Array.isArray(this.action)) {
        return null;
      }
      return this.action[0].refinement;
    },
    articles() {
      return articleMapping;
    },
    logicalOpText() {
      return this.logicalOperators[this.selectedLogicalOperator].text;
    },
    logicalOpShort() {
      return this.logicalOperators[this.selectedLogicalOperator].short;
    },
  },
  methods: {
    appendNewSubrule() {
      const subruleTypeName = this.ruleInfo.subrule;
      if (!this.rule[subruleTypeName]) {
        Vue.set(this.rule, subruleTypeName, []);
      }
      const subrules = this.rule[subruleTypeName];
      const idx = subrules.length;
      Vue.set(subrules, idx, {});
      this.$emit('followLink', [...this.path, subruleTypeName, idx]);
    },
    removeRule() {
      const containerPath = this.path.slice(0, this.path.length - 1);
      const ruleContainer = this.policy.follow(containerPath);
      const idx = this.path[this.path.length - 1];
      ruleContainer.splice(idx, 1);
      if (ruleContainer.length > 0) {
        const redirectIdx = idx >= ruleContainer.length ? ruleContainer.length - 1 : idx;
        this.$emit('followLink', [...containerPath, redirectIdx]);
        return;
      }

      // If the array containing the rule is empty due to deleting the
      // last rule it contained, we also delete the array.
      const parentPath = containerPath.slice(0, containerPath.length - 1);
      const ruleParent = this.policy.follow(parentPath);
      const containerName = containerPath[containerPath.length - 1];
      Vue.delete(ruleParent, containerName);
      this.$emit('followLink', parentPath);
    },
    addConstraint() {
      if (!this.constraints) {
        Vue.set(this.rule, 'constraint', []);
      }

      // make use of the logical operator to combine more than one constraint
      if (this.constraints.length >= 1) {
        const constraint = this.constraints;
        Vue.delete(this.rule, 'constraint');
        Vue.set(this.rule, 'constraint', {});
        Vue.set(this.rule.constraint, this.logicalOpShort, {});
        Vue.set(this.rule.constraint[this.logicalOpShort], '@list', constraint);
      }

      this.constraints.push(null);
    },
    nextLogicalOperator() {
      const list = this.rule.constraint[this.logicalOpShort];
      Vue.delete(this.rule.constraint, this.logicalOpShort);

      this.selectedLogicalOperator++;
      if (this.selectedLogicalOperator >= this.logicalOperators.length) {
        this.selectedLogicalOperator = 0;
      }

      Vue.set(this.rule.constraint, this.logicalOpShort, {});
      Vue.set(this.rule.constraint, this.logicalOpShort, list);
    },
    addRefinement() {
      if (this.refinements == null) {
        // action is just a string, but when adding refinements, action becomes an an array
        const action = this.action;
        Vue.delete(this.rule, 'action');

        Vue.set(this.rule, 'action', [{}]);
        Vue.set(this.action[0], 'rdf:value', action);
        Vue.set(this.action[0], 'refinement', []);
      }
      this.refinements.push(null);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0px;
}

a {
  text-decoration: underline;
}

.rule-container {
  min-width: 200px;
}

.rule-header {
  position: relative;
  margin-bottom: 10px;
}

.remove-button {
  position: absolute;
  right: 0px;
  top: -10px;
}

.add-button {
  display: block;
  margin-top: 10px;
  margin-left: 0px;
}

p {
  line-height: 1.2em;
}

p.constraints {
  margin-top: 40px;
}

.logical-operator {
  line-height: 2.5em;
  text-decoration: none;
  padding: 8px;


  /* disable text selection highlighting */
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}

.logical-operator:hover {
  cursor: pointer;
}

.subrule-container {
  margin-top: 50px;
}
</style>
