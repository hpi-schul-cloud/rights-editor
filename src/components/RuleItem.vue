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
    <p>
      <!-- main explanation -->
      <EmbedInText text-before="Das" :text-after="ruleInfo.description">
        <ActionItem :policy="policy" :path="[...path, 'action']" />
      </EmbedInText>
      <!-- additional explanation -->
      <EmbedInText v-if="hasParentRule" :text-before="ruleInfo.descriptionAddition[0]" :text-after="ruleInfo.descriptionAddition[1]">
        {{ ruleInfo.definiteArticle }}
        <a href="#" @click="$emit('followLink', path.slice(0, path.length - 2))">
          {{ parentruleInfo.name }}
        </a>
      </EmbedInText>
    </p>

    <!-- add new refinement -->
    <p>
      Das <em>{{ rule['action'] }}</em> darf nur auf die folgende Art und Weise erfolgen...
      <BaseButton class="add-button" :on-click="function(){console.error('not implemented')}">
        Verfeinerung hinzufügen
      </BaseButton>
    </p>


    <!-- display and edit constraints -->
    <p>
      Insgesamt gilt {{ ruleInfo.definiteArticle }} <em>{{ ruleInfo.name }}</em> nur, wenn...
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
      <i>Optional können folgende Erweiterungen hinzugefügt werden:</i>
      <br>{{ subruleInfo.indefiniteArticle }}
      <BaseButton :name="subruleInfo.name" :on-click="appendNewSubrule">
        {{ subruleInfo.name }}
      </BaseButton>
      {{ subruleInfo.description }}
      <!-- additional explanation -->
      <EmbedInText :text-before="subruleInfo.descriptionAddition[0]" :text-after="subruleInfo.descriptionAddition[1]">
        {{ ruleInfo.definiteArticle }} <em>{{ ruleInfo.name }}</em>
      </EmbedInText>
    </div>

    <p>TODO: Link to subrules if present</p>
  </div>
</template>

<script>
import Vue from 'vue';
import ActionItem from './ActionItem.vue';
import ConstraintItem from './ConstraintItem';
import BaseButton from './BaseButton.vue';
import ConstraintChooser from './ConstraintChooser.vue';
import EmbedInText from './EmbedInText.vue';
import { RuleTypes } from '../libs/odrl/rules.js';

export default {
  name: 'RuleItem',
  components: {
    EmbedInText,
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
      return this.policy.follow(this.path);
    },
    ruleInfo() {
      const ruleTypeName = this.path[this.path.length - 2];
      return RuleTypes[ruleTypeName];
    },
    subruleInfo() {
      return RuleTypes[this.ruleInfo.subrule];
    },
    parentruleInfo() {
      if (this.ruleInfo.parentrule != '') {
        return RuleTypes[this.ruleInfo.parentrule];
      }
      return null;
    },
    hasParentRule() {
      return !!this.parentruleInfo;
    },
    canHaveSubrules() {
      return this.ruleInfo.subrule != '';
    },
    constraints() {
      return this.rule.constraint;
    },
    ruleParent() {
      const containerPath = this.path.slice(0, this.path.length - 1);
      return this.policy.follow(containerPath);
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
  },
};
</script>

<style scoped>
.rule-container {
  width: 100%;
  min-width: 200px;
  margin-left: 10px;
  padding-top: 10px;
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

.subrule-container {
  margin-top: 50px;
}
</style>
