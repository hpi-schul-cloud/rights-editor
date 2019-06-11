<template>
  <div class="rule-container">
    <div class="rule-header">
      <h3>{{ ruleLanguageInfo.name }} <i :class="ruleInfo.icon" /></h3>
      <BaseButton
        remove
        class="remove-button"
        :title="removeRuleText"
        @click="removeRule()"
      >
        <i class="far fa-trash-alt" />
      </BaseButton>
    </div>

    <!-- display action -->
    <p class="actions">
      <!-- main explanation -->
      <EmbedInText :text-ahead="$i18n.t('textAheadOfActionLabel')" :text-after="ruleLanguageInfo.description">
        <ActionItem :policy="policy" :path="[...path, 'action']" :remove-callback="removeRule" />
      </EmbedInText>
      <!-- additional explanation -->
      <EmbedInText v-if="ruleInfo.hasParentRule" :text-ahead="ruleLanguageInfo.descriptionExtension[0]" :text-after="ruleLanguageInfo.descriptionExtension[1]">
        {{ article[parentRuleInfo.gender].definite }}
        <a href="#" @click="$emit('followLink', path.slice(0, path.length - 2))">{{ parentRuleLanguageInfo.name }}</a>
      </EmbedInText>
    </p>

    <!-- display and edit refinements -->
    <p class="refinements">
      {{ $t('textAheadOfActionLabel') }}
      <em>{{ actionLabel }}</em>
      {{ $t('refinementTextAfterActionLabel') }}
      <em v-if="isLogicalRefinement && logicalRefinementOperator == 'xone'">
        {{ $t('either') }}
      </em>
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
          {{ $t(logicalRefinementOperator) }}
        </BaseButton>
      </li>
    </ul>

    <!-- add new refinement -->
    <BaseButton class="add-button" @click="addRefinement()">
      {{ $t('refinement.add') }}
    </BaseButton>

    <!-- display and edit constraints -->
    <p class="constraints">
      {{ $t('constraintTextAheadOfRuleName') }}
      {{ article[ruleInfo.gender].definite }}
      <em>{{ ruleLanguageInfo.name }}</em>
      {{ $t('constraintTextAfterRuleName') }}
      <em v-if="isLogicalConstraint && logicalConstraintOperator == 'xone'">
        {{ $t('either') }}
      </em>
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
          {{ $t(logicalConstraintOperator) }}
        </BaseButton>
      </li>
    </ul>

    <!-- add new constraint -->
    <BaseButton class="add-button" @click="addConstraint()">
      {{ $t('constraint.add') }}
    </BaseButton>

    <!-- add subrules -->
    <div v-if="canHaveSubrules" class="subrule-container">

      {{ $t('subRuleText') }}
      <p>
        <BaseButton class="add-button" :name="subruleLanguageInfo.pluralName" @click="appendNewSubrule">
          {{ subruleLanguageInfo.name }}
        </BaseButton>

        {{ subruleLanguageInfo.pluralName }}
        {{ $t('subRuleDescription') }}
        <EmbedInText :text-ahead="subruleLanguageInfo.descriptionExtension[0]" :text-after="subruleLanguageInfo.descriptionExtension[1]">
          {{ article[ruleInfo.gender].definite }} <em>{{ ruleLanguageInfo.name }}</em>
        </EmbedInText>
      </P>

      <!-- list all available subrules -->
      <p v-if="subrules">
        {{ subruleNameArticle }}
        {{ $tc(subruleDynamicName, subrules.length) }}

        <template v-if="lang == 'de'">diese{{ ruleInfo.gender === 'f' ? 'r' : 's' }} {{ ruleLanguageInfo.name }}{{ ruleInfo.gender === 'f' ? '' : 's' }}</template>
        <template v-if="lang == 'en'">of this {{ ruleLanguageInfo.name }}</template>
        {{ $tc('is_are', subrules.length) }}:<br>

        <span v-for="(subrule, index) in subrules" :key="index">
          <a href="#" @click="$emit('followLink', [...path, ruleInfo.subrule, index])">{{ getSubruleActionLabel(subrule) }}</a>
          <span v-if="index + 1 < subrules.length">, <br></span>
        </span>
      </p>

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EmbedInText from './EmbedInText.vue';
import BaseButton from './BaseComponents/BaseButton.vue';
import ActionItem from './ActionItem.vue';
import ConstraintItem from './ConstraintItem.vue';
import RefinementItem from './RefinementItem.vue';
import { RuleTypes } from '../libs/odrl/rules';
import { capitalize } from '../libs/language/language';
import { actionList } from '../libs/odrl/actions';
import { logicalOperatorList } from '../libs/odrl/constraints';

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
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    placeholder() {
      return this.$i18n.t('placeholder');
    },
    subruleNameArticle() {
      return capitalize(this.article[this.subruleInfo.gender].definite);
    },
    rule() {
      return this.policy.follow(this.path);
    },
    ruleTypeName() {
      return this.path[this.path.length - 2];
    },
    ruleInfo() {
      return RuleTypes[this.ruleTypeName];
    },
    ruleLanguageInfo() {
      return this.$i18n.t('rule')[this.ruleTypeName];
    },
    removeRuleText() {
      return this.$i18n.t('removeRule');
    },
    subruleTypeName() {
      return this.ruleInfo.subrule;
    },
    subruleInfo() {
      return RuleTypes[this.subruleTypeName];
    },
    subruleLanguageInfo() {
      return this.$i18n.t('rule')[this.ruleInfo.subrule];
    },
    subruleDynamicName() {
      return `rule.${this.subruleTypeName}.dynamicName`;
    },
    parentRuleTypeName() {
      if (this.ruleInfo.hasParentRule) {
        return this.path[this.path.length - 4];
      }
    },
    parentRuleInfo() {
      if (!this.ruleInfo.hasParentRule) {
        console.error('has no parent');
        return null;
      }
      return RuleTypes[this.parentRuleTypeName];
    },
    parentRuleLanguageInfo() {
      return this.$i18n.t('rule')[this.parentRuleTypeName];
    },
    canHaveSubrules() {
      return this.ruleInfo.subrule !== '';
    },
    subrules() {
      return this.rule[this.subruleTypeName];
    },
    hasParentRule() {
      return !!this.parentRuleInfo;
    },
    action() {
      return this.rule.action;
    },
    actionString() {
      return Array.isArray(this.action) ? this.action[0]['rdf:value'] : this.action;
    },
    actionLabel() {
      if (this.actionString && this.actionString !== this.placeholder) {
        return this.$i18n.t(actionList.find(item => item === this.actionString));
      }
      return this.placeholder;
    },
    constraints() {
      if (!this.rule.constraint) {
        return null;
      }
      if (this.isLogicalConstraint) {
        return this.rule.constraint[this.logicalConstraintOperator]['@list'];
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
        return [...this.path, 'constraint', this.logicalConstraintOperator, '@list'];
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
        return this.action[0].refinement[this.logicalRefinementOperator]['@list'];
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
        return [...this.path, 'action', 0, 'refinement', this.logicalRefinementOperator, '@list'];
      }
    },
    article() {
      return this.$i18n.t('article');
    },
    logicalConstraintOperator() {
      if (!this.rule.constraint) {
        return null;
      }

      const op = Object.keys(this.rule.constraint)[0];
      if (op === undefined) {
        return logicalOperatorList[0];
      }
      return op;
    },
    logicalRefinementOperator() {
      if (!this.action[0].refinement) {
        return null;
      }

      const op = Object.keys(this.action[0].refinement)[0];
      if (op === undefined) {
        return logicalOperatorList[0];
      }
      return op;
    },
  },
  methods: {

    // rules
    appendNewSubrule() {
      if (!this.rule[this.subruleTypeName]) {
        Vue.set(this.rule, this.subruleTypeName, []);
      }
      const subrules = this.rule[this.subruleTypeName];
      const idx = subrules.length;
      Vue.set(subrules, idx, {});
      this.$emit('followLink', [...this.path, this.subruleTypeName, idx]);
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
        return this.$i18n.t(actionList.find(item => item === subrule.action[0]['rdf:value']));
      }
      return this.$i18n.t(actionList.find(item => item === subrule.action));
    },

    // constraints
    addConstraint() {
      if (!this.constraints) {
        Vue.set(this.rule, 'constraint', []);
      }

      // make use of the logical operator to combine more than one constraint
      if (this.constraints.length === 1) {
        const constraint = this.constraints;
        Vue.set(this.rule, 'constraint', {});
        Vue.set(this.rule.constraint, this.logicalConstraintOperator, { '@list': constraint });
      }

      this.constraints.push(null);
    },
    nextLogicalConstraintOperator() {
      const list = this.rule.constraint[this.logicalConstraintOperator];
      const oldOp = this.logicalConstraintOperator;

      Vue.delete(this.rule.constraint, this.logicalConstraintOperator);

      // get the index of the current operator
      const index = logicalOperatorList.indexOf(oldOp);
      // the new logical operator is just the next one in the list
      const nextOp = logicalOperatorList[(index + 1) % logicalOperatorList.length];

      Vue.set(this.rule.constraint, nextOp, list);
    },

    // refinements
    addRefinement() {
      if (this.refinements == null) {
        // action is just a string, but when adding refinements, action becomes an an array
        // holding one refinement element
        const action = this.action;
        Vue.delete(this.rule, 'action');

        Vue.set(this.rule, 'action', [{ 'rdf:value': action, refinement: [] }]);
      }

      // and when more refinements are added, these multiple refinements
      // are combined in a list by a logical operator
      if (this.refinements.length === 1) {
        const refinement = this.refinements;
        Vue.set(this.action[0], 'refinement', {});
        Vue.set(this.action[0].refinement, this.logicalRefinementOperator, { '@list': refinement });
      }

      this.refinements.push(null);
    },
    nextLogicalRefinementOperator() {
      const ref = this.action[0].refinement;
      const list = ref[this.logicalRefinementOperator];
      const oldOp = this.logicalRefinementOperator;

      Vue.delete(ref, this.logicalRefinementOperator);

      // get the index of the current operator
      const index = logicalOperatorList.indexOf(oldOp);
      // the new logical operator is just the next one in the list
      const nextOp = logicalOperatorList[(index + 1) % logicalOperatorList.length];

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
  margin: 3px;
  font-weight: bold;
  color: #1f3b70;
  border: 1px solid #1f3b70;

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
