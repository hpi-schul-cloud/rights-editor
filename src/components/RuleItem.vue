<template>
  <div class="rule-container">
    <div class="rule-header">
      <h3>{{ ruleInfo.name }} <i :class="ruleInfo.icon" /></h3>
      <BaseButton remove class="remove-button" @click="removeRule()">
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
      <em v-if="isLogicalRefinement && logicalRefinementOperatorText == 'ODER'">entweder</em>
    </p>

    <ul>
      <li v-for="(refinement, index) in refinements" :key="index">
        <RefinementItem :policy="policy" :path="[...refinementPath, index]" />
        <BaseButton
          v-if="isLogicalRefinement && index < refinements.length - 1"
          textlike
          class="logical-operator"
          @click="nextLogicalRefinementOperator()"
        >
          {{ logicalRefinementOperatorText }}
        </BaseButton>
      </li>
    </ul>

    <!-- add new refinement -->
    <BaseButton class="add-button" @click="addRefinement()">
      Verfeinerung hinzufügen
    </BaseButton>

    <!-- display and edit constraints -->
    <p class="constraints">
      Insgesamt gilt {{ articles[ruleInfo.gender].def }} <em>{{ ruleInfo.name }}</em> nur, wenn...
      <em v-if="isLogicalConstraint && logicalConstraintOperatorText == 'ODER'">entweder</em>
    </p>

    <ul>
      <li v-for="(constraint, index) in constraints" :key="index">
        <ConstraintItem :policy="policy" :path="[...constraintPath, index]" />
        <BaseButton
          v-if="isLogicalConstraint && index < constraints.length - 1"
          textlike
          class="logical-operator"
          @click="nextLogicalConstraintOperator()"
        >
          {{ logicalConstraintOperatorText }}
        </BaseButton>
      </li>
    </ul>

    <!-- add new constraint -->
    <BaseButton class="add-button" @click="addConstraint()">
      Einschränkung hinzufügen
    </BaseButton>

    <!-- add subrules -->
    <div v-if="canHaveSubrules" class="subrule-container">

      Optional kann um folgende Regeln erweitert werden:
      <p>
        <BaseButton class="add-button" :name="subruleInfo.pluralName" @click="appendNewSubrule">
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
          <a href="#" @click="$emit('followLink', [...path, ruleInfo.subrule, index])">{{ getSubruleActionLabel(subrule) }}</a>
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
import { logicalOperatorList } from '../libs/odrl/constraints.js';

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
      selectedLogicalRefinement: 0,
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
      if (!this.rule.constraint) {
        return null;
      }
      if (this.isLogicalConstraint) {
        return this.rule.constraint[this.logicalConstraintOperatorShort]['@list'];
      }
      return this.rule.constraint;
    },
    isLogicalConstraint() {
      // if rule.constraint is an array, that means that only one refinement has been added
      // otherwise rule.refinement is an object containting a logical operator, which is an object containing a list, which is an array containting more than one refinement instances
      return !Array.isArray(this.rule.constraint);
    },
    constraintPath() {
      if (this.isLogicalConstraint) {
        return [...this.path, 'constraint', this.logicalConstraintOperatorShort, '@list'];
      }
      return [...this.path, 'constraint'];
    },
    refinements() {
      if (!this.action) {
        return null;
      }
      if (!Array.isArray(this.action)) {
        return null;
      }
      if (this.isLogicalRefinement) {
        return this.action[0].refinement[this.logicalRefinementOperatorShort]['@list'];
      }
      return this.action[0].refinement;
    },
    isLogicalRefinement() {
      if (!this.action || !Array.isArray(this.action)) {
        return false;
      }

      // again, there is more than one refinement instance within the policy if the refinement is an object containing a logical operator and so on...
      return !Array.isArray(this.action[0].refinement);
    },
    refinementPath() {
      if (this.refinements) {
        if (this.refinements.length <= 1) {
          return [...this.path, 'action', 0, 'refinement'];
        }
        return [...this.path, 'action', 0, 'refinement', this.logicalRefinementOperatorShort, '@list'];
      }
    },
    articles() {
      return articleMapping;
    },
    logicalConstraintOperatorText() {
      if (!this.rule.constraint) {
        return null;
      }

      return logicalOperatorList[this.logicalConstraintOperatorShort].text;
    },
    logicalConstraintOperatorShort() {
      if (!this.rule.constraint) {
        return null;
      }

      let op = Object.keys(this.rule.constraint)[0];
      if (op == undefined) {
        return Object.keys(logicalOperatorList)[0];
      }
      return op;
    },
    logicalRefinementOperatorText() {
      if (!this.action[0].refinement) {
        return null;
      }

      return logicalOperatorList[this.logicalRefinementOperatorShort].text;
    },
    logicalRefinementOperatorShort() {
      if (!this.action[0].refinement) {
        return null;
      }

      let op = Object.keys(this.action[0].refinement)[0];
      if (op == undefined) {
        return Object.keys(logicalOperatorList)[0];
      }
      return op;
    }
  },
  methods: {

    // rules
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
    getSubruleActionLabel(subrule) {
      if (Array.isArray(subrule.action)) {
        return subrule.action[0]['rdf:value'];
      }
      return subrule.action;
    },
    
    // constraints
    addConstraint() {
      if (!this.constraints) {
        Vue.set(this.rule, 'constraint', []);
      }

      // make use of the logical operator to combine more than one constraint
      if (this.constraints.length == 1) {
        const constraint = this.constraints;
        Vue.set(this.rule, 'constraint', {});
        Vue.set(this.rule.constraint, this.logicalConstraintOperatorShort, { '@list': constraint });
      }

      this.constraints.push(null);
    },
    nextLogicalConstraintOperator() {
      const list = this.rule.constraint[this.logicalConstraintOperatorShort];
      const oldOp = this.logicalConstraintOperatorShort;

      Vue.delete(this.rule.constraint, this.logicalConstraintOperatorShort);

      let keys = Object.keys(logicalOperatorList);
      // get the index of the current operator
      let index = keys.indexOf(oldOp);
      // the new logical operator is just the next one in the list
      let nextOp = keys[(index + 1) % keys.length];
      
      Vue.set(this.rule.constraint, nextOp, list);
    },

    // refinements
    addRefinement() {
      if (this.refinements == null) {
        // action is just a string, but when adding refinements, action becomes an an array
        // holding one refinement element
        const action = this.action;
        Vue.delete(this.rule, 'action');

        Vue.set(this.rule, 'action', [{'rdf:value': action, 'refinement': []}]);
      }

      // and when more refinements are added, these multiple refinements
      // are combined in a list by a logical operator
      if (this.refinements.length == 1) {
        const refinement = this.refinements;
        Vue.set(this.action[0], 'refinement', {});
        Vue.set(this.action[0].refinement, this.logicalRefinementOperatorShort, { '@list': refinement });
      }

      this.refinements.push(null);
    },
    nextLogicalRefinementOperator() {
      const ref = this.action[0].refinement;
      const list = ref[this.logicalRefinementOperatorShort];
      const oldOp = this.logicalRefinementOperatorShort;

      Vue.delete(ref, this.logicalRefinementOperatorShort);

      let keys = Object.keys(logicalOperatorList);
      // get the index of the current operator
      let index = keys.indexOf(oldOp);
      // the new logical operator is just the next one in the list
      let nextOp = keys[(index + 1) % keys.length];
      
      Vue.set(ref, nextOp, list);
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
  text-decoration: none;
  padding: 8px;
  margin: 2px;
  font-weight: bold;
  color: #1f3b70;

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
