<template>
  <div class="rule-container">
    <div class="rule-header">
      <h3>{{ ruleInfo.name }} <i :class="ruleInfo.icon" /></h3>
      <BaseButton remove class="remove-button" :on-click="removeRule">
        <i class="far fa-trash-alt" />
      </BaseButton>
    </div>

    <!-- display action -->
    <p>
      <!-- main explanation -->
      <EmbedInText text-before="Das" :text-after="ruleInfo.description">
        <ActionItem :policy="policy" :path="[...path, 'action']" />
      </EmbedInText>
      <!-- additional explanation -->
      <EmbedInText v-if="ruleInfo.hasParentRule" :text-before="ruleInfo.descriptionAddon[0]" :text-after="ruleInfo.descriptionAddon[1]">
        {{ articles[parentRuleInfo.gender].def }}
        <a href="#" @click="$emit('followLink', path.slice(0, path.length - 2))">{{ parentRuleInfo.name }}</a>
      </EmbedInText>
    </p>

    <!-- add new refinement -->
    <p class="refinements-paragraph">
      Das <em>{{ rule['action'] }}</em> darf nur auf die folgende Art und Weise erfolgen...
      <RefinementItem
        v-for="(refinement, index) in refinements"
        :key="index"
        :policy="policy"
        :path="[...path, 'refinement', index]"
      />
      <BaseButton class="add-button" :on-click="addRefinement">
        Verfeinerung hinzufügen
      </BaseButton>
    </p>

    <!-- display and edit constraints -->
    <p class="paragraph">
      Insgesamt gilt {{ articles[ruleInfo.gender].def }} <em>{{ ruleInfo.name }}</em> nur, wenn...
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
    </p>

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
      <p class="paragraph" v-if="subrules">
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
      return this.ruleInfo.subrule != '';
    },
    subrules() {
      const subruleTypeName = this.ruleInfo.subrule;
      return this.rule[subruleTypeName];
    },
    hasParentRule() {
      return !!this.parentRuleInfo;
    },
    constraints() {
      return this.rule.constraint;
    },
    refinements() {
      return this.rule.refinement;
    },
    articles() {
      return articleMapping;
    },
  },
  methods: {
    furtherPath(nameSegment, indexSegment) {
      const p = this.path.slice();
      p.push(nameSegment, indexSegment);
      return p;
    },
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
      this.constraints.push(null);
    },
    addRefinement() {
      if (!this.refinements) {
        Vue.set(this.rule, 'refinement', []);
      }
      this.refinements.push(null);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: underline;
}

.rule-container {
  width: 100%;
  min-width: 200px;
  margin: 10px;
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

.paragraph {
  margin-top: 40px;
  line-height: 1.5em;
}

.subrule-container {
  margin-top: 50px;
}
</style>
