<template>
  <div class="rule-editor">

    <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="$emit('abort')">
          <i class="fas fa-arrow-circle-left" /> {{ $t("back") }}
        </a>
      </template>
      <template v-slot:right>
        <a href="#" @click="tryToGoForth()">
          {{ $t("next") }} <i class="fas fa-arrow-circle-right" />
        </a>
      </template>
    </EditorNavBar>

    <div class="header-wrapper">

      <div class="language-container">
        <i class="fas fa-language" />
        {{ $t('languageButtonText') }}:
        <BaseDropdown
          :width="'150px'"
          class="language-dropdown"
          :list="languages"
          :init-value="languages[0]"
          @selected="switchLanguage($event)"
        />
      </div>

      <div class="editor-header">
        <BaseButton @click="newRule('permission')">
          {{ $t('permissionButtonText') }}
        </BaseButton>
        <BaseButton @click="newRule('obligation')">
          {{ $t('obligationButtonText') }}
        </BaseButton>
        <BaseButton @click="newRule('prohibition')">
          {{ $t('prohibitionButtonText') }}
        </BaseButton>
      </div>

      <div v-if="warnings.length > 0" class="warnings">
        {{ warnings.length }} {{ $t('errors_found') }}.
        <ul>
          <li v-for="(warning, index) in warnings" :key="index">
            <a href="#" @click="editPath = warning.path">{{ warning.message }}</a>
          </li>
        </ul>
      </div>

    </div>

    <div class="editor-body">
      <PolicyTree
        class="policy-tree"
        :policy="policy"
        :selected-path="editPath"
        @followPath="editPath = $event"
      />
      <PolicyItem
        v-if="!showRulePane"
        class="policy-detail"
        :policy="policy"
        @followLink="editPath = $event"
      />
      <RuleItem
        v-if="showRulePane"
        class="policy-detail"
        :policy="policy"
        :path="editPath"
        @followLink="editPath = $event"
      />
    </div>

    <div class="policy-meaning">

      <h2>Was bedeutet diese Lizenz?</h2>
      <p v-html="licenceText" />
      <h2>Provisorische Lizenz</h2>
      <pre>{{ policy }}</pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseComponents/BaseButton.vue';
import BaseDropdown from './BaseComponents/BaseDropdown.vue';
import BaseInput from './BaseComponents/BaseInput.vue';
import PolicyTree from './PolicyTree/PolicyTree.vue';
import RuleItem from './RuleItem.vue';
import PolicyItem from './PolicyItem.vue';
import EditorNavBar from './EditorNavBar.vue';

import { jsonPath } from '../libs/jsonpath-0.8.0';
import { actionList } from '../libs/odrl/actions.js';
import { operandMapping } from '../libs/odrl/constraints.js';

export default {
  name: 'RuleEditor',
  components: {
    BaseButton,
    BaseInput,
    BaseDropdown,
    PolicyTree,
    RuleItem,
    PolicyItem,
    EditorNavBar,
  },
  data() {
    return {
      editPath: [],
      warnings: [],
      policy: {
        uid: '',
        target: '',
        assigner: '',
        assignee: '',
        follow(path) {
          return path.reduce((result, pathSegment) => result[pathSegment], this);
        },
      },
    };
  },
  computed: {
    languages() {
      return [this.$i18n.t('german'), this.$i18n.t('english')];
    },
    showRulePane() {
      return this.editPath.length > 0;
    },
    licenceText() {
      let text = '';

      if (this.policy.permission) {
        text += 'Erlaubt ist: ';

        // Gets all actions via jsonPath
        const actions = jsonPath(this.policy, '$.permission[*].action');

        // Searches label for each action
        for (let i = 0; i < actions.length; i++) {
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ', ';
        }

        // Removes last comma
        text = text.substr(0, text.length - 2);
      }

      if (this.policy.obligation) {
        text += '<br>Verpflichtend ist: ';

        // Gets all actions via jsonPath
        const actions = jsonPath(this.policy, '$.obligation[*].action');

        // Searches label for each action
        for (let i = 0; i < actions.length; i++) {
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ', ';
        }

        // Removes last comma
        text = text.substr(0, text.length - 2);
      }

      if (this.policy.prohibition) {
        text += '<br>Verboten ist: ';

        // Gets all actions via jsonPath
        const actions = jsonPath(this.policy, '$.prohibition[*].action');

        // Searches label for each action
        for (let i = 0; i < actions.length; i++) {
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ', ';
        }

        // Removes last comma
        text = text.substr(0, text.length - 2);
      }

      return text;
    },
  },
  methods: {
    newRule(type) {
      if (!this.policy[type]) {
        Vue.set(this.policy, type, []);
      }
      const idx = this.policy[type].length;
      Vue.set(this.policy[type], idx, {});
      this.editPath = [type, idx];
    },
    switchLanguage(lang) {
      if (this.$i18n.t('currentLanguage') != lang) {
        this.$i18n.locale = lang[0].toLowerCase() + lang[1];
      }
    },
    tryToGoForth() {
      // validate license
      if (this.validatePolicy()) {
        // this.$emit('goForth', this.policy);
        console.log('VALID');
      }
    },
    validatePolicy() {
      let errors = 0;
      this.warnings = [];

      // target
      if (typeof this.policy.target === 'string') {
        if (this.policy.target.length <= 0) {
          this.warnings.push({ path: [], message: `${this.$i18n.t('error')}: ${this.$i18n.t('target')} ${this.$i18n.t('is_empty')}.` });
          errors++;
        }
      } else if (this.policy.target.uid.length <= 0) {
        this.warnings.push({ path: [], message: `${this.$i18n.t('error')}: ${this.$i18n.t('target')} ${this.$i18n.t('is_empty')}.` });
        errors++;
      }

      // assigner
      if (typeof this.policy.assigner === 'string') {
        if (this.policy.assigner.length <= 0) {
          this.warnings.push({ path: [], message: `${this.$i18n.t('error')}: ${this.$i18n.t('assigner')} ${this.$i18n.t('is_empty')}.` });
          errors++;
        }
      } else if (this.policy.assigner.uid.length <= 0) {
        this.warnings.push({ path: [], message: `${this.$i18n.t('error')}: ${this.$i18n.t('assigner')} ${this.$i18n.t('is_empty')}.` });
        errors++;
      }

      // assignee
      if (typeof this.policy.assignee === 'string') {
        if (this.policy.assignee.length <= 0) {
          this.warnings.push({ path: [], message: `${this.$i18n.t('error')}: ${this.$i18n.t('assignee')} ${this.$i18n.t('is_empty')}.` });
          errors++;
        }
      } else if (this.policy.assignee.uid.length <= 0) {
        this.warnings.push({ path: [], message: `${this.$i18n.t('error')}: ${this.$i18n.t('assignee')} ${this.$i18n.t('is_empty')}.` });
        errors++;
      }

      if (this.policy.permission) {
        this.policy.permission.forEach((rule, index) => {
          errors += this.validateRefinements(rule.action[0].refinement, ['permission', index]);
          errors += this.validateConstraints(rule.constraint, ['permission', index]);
        });
      }

      if (this.policy.obligation) {
        this.policy.obligation.forEach((rule, index) => {
          errors += this.validateRefinements(rule.action[0].refinement, ['obligation', index]);
          errors += this.validateConstraints(rule.constraint, ['obligation', index]);
        });
      }

      if (this.policy.prohibition) {
        this.policy.prohibition.forEach((rule, index) => {
          errors += this.validateRefinements(rule.action[0].refinement, ['prohibition', index]);
          errors += this.validateConstraints(rule.constraint, ['prohibition', index]);
        });
      }

      return errors == 0;
    },
    validateRefinements(refinement, rulePath) {
      return this.validateConstraints(refinement, rulePath, 'refinement');
    },
    validateConstraints(constraint, rulePath, type) {
      if (type === undefined) type = 'constraint';
      let errors = 0;

      if (constraint && !Array.isArray(constraint)) {
        // there is more than one constraint...
        const logicalOperator = Object.keys(constraint)[0];
        const constraints = constraint[logicalOperator]['@list'];

        // collect all conditions
        const conditions = {};
        if (logicalOperator == 'and') {
          constraints.forEach((ref) => {
            if (!conditions[ref.leftOperand]) {
              conditions[ref.leftOperand] = [];
            }
            if (!Array.isArray(ref.rightOperand)) {
              // right operand is number with unit
              conditions[ref.leftOperand].push({ op: ref.operator, val: ref.rightOperand['@value'], unit: ref.unit });
            } else {
              // right operand is selection from list of options
              conditions[ref.leftOperand].push(ref.rightOperand);
            }
          });

          const valuesPerOperator = {
            gt: [], gteq: [], lt: [], lteq: [], eq: [],
          };

          Object.keys(conditions).forEach((key) => {
            const conditionsOfSameOperand = conditions[key];

            if (operandMapping[key].units) {
              // check if units are selected ambiguously
              const units = [];
              conditionsOfSameOperand.forEach((item) => {
                if (!units.includes(item.unit)) {
                  units.push(item.unit);
                }
              });

              if (units.length > 1) {
                this.warnings.push({ path: rulePath, message: `${this.$i18n.t('error')} ${this.$i18n.t('in')} ${this.$i18n.t(`${type}.name`)}: ${this.$i18n.t('units_ambiguous')}.` });
                errors++;
              }

              if (conditionsOfSameOperand.length > 1) {
                conditionsOfSameOperand.forEach((cond) => {
                  valuesPerOperator[cond.op].push(parseFloat(cond.val));
                });
              }
            } else if (operandMapping[key].list) {
              if (conditionsOfSameOperand.length > 1) {
                this.warnings.push({ path: rulePath, message: `${this.$i18n.t('error')} ${this.$i18n.t('in')} ${this.$i18n.t(`${type}.name`)}: ${this.$i18n.t('selection_ambiguous')}.` });
                errors++;
              }
            }
          });

          const uniqueEqualValues = valuesPerOperator.eq.filter((v, i) => valuesPerOperator.eq.indexOf(v) === i);
          if (uniqueEqualValues.length > 1) {
            this.warnings.push({ path: rulePath, message: `${this.$i18n.t('error')} ${this.$i18n.t('in')} ${this.$i18n.t(`${type}.name`)}: ${this.$i18n.t('never_fullfilled')}.` });
            errors++;
          }

          // check if conditions have collisions
          const gtMax = Math.max(...valuesPerOperator.gt);
          const gteqMax = Math.max(...valuesPerOperator.gteq);
          const ltMin = Math.min(...valuesPerOperator.lt);
          const lteqMin = Math.min(...valuesPerOperator.lteq);

          if (gtMax >= ltMin || gtMax >= lteqMin || gteqMax >= ltMin || gteqMax > lteqMin) {
            this.warnings.push({ path: rulePath, message: `${this.$i18n.t('error')} ${this.$i18n.t('in')} ${this.$i18n.t(`${type}.name`)}: ${this.$i18n.t('never_fullfilled')}.` });
            errors++;
          }

          if (uniqueEqualValues.length > 0) {
            const eq = uniqueEqualValues[0];
            if (gtMax >= eq || gteqMax > eq || ltMin <= eq || lteqMin < eq) {
              this.warnings.push({ path: rulePath, message: `${this.$i18n.t('error')} ${this.$i18n.t('in')} ${this.$i18n.t(`${type}.name`)}: ${this.$i18n.t('never_fullfilled')}.` });
              errors++;
            }
          }
        }
      }

      return errors;
    },
  },
};
</script>

<style scoped>
.policy-tree {
  float: left;
  width: 200px;
  padding: 0px 8px;
  box-sizing: border-box;
  box-shadow: 3px 0px 2px -3px gray;
  padding-bottom: 12px;
}

.policy-detail {
  margin-left: 220px;
  padding: 0px 0px 0px 15px;
}

.policy-meaning{
  margin-left: 200px;
  padding: 10px;
}

.header-wrapper {
  background-color: white;
  box-shadow: 0px 3px 2px -3px gray;
}

.editor-header {
  overflow: hidden;

  padding-bottom: 20px;
  padding-top: 0px;
  width: 50%;
  min-width: 350px;
}

.editor-body {
  padding-top: 24px;
}

.editor-nav{
  padding-top: 15px;
  padding-bottom: 5px;
  margin-left: 10px;
  color: #1f3b70;
}

.editor-nav .left{
  float: left;
}

.editor-nav .right {
  float: right;
}

editor-nav .clear {
  clear: both;
}

input.guid-input {
  margin-left: 10px;
  width: 175px;
}

.language-container {
  float: right;
  text-align: right;
  width: 50%;
  margin: 0px;
  padding: 0px;
}

.language-dropdown {
  display: inline-block;
}

.fa-language {
  margin-right: 5px;
}

.warnings {
  padding-bottom: 5px;
}

.warnings a {
  color: rgb(200, 0, 0);
  font-weight: normal;
}

@media screen and (max-width: 840px) {
  .language-container {
    text-align: left;
    float: left;
    width: 100%;
  }

  .policy-detail {
    display: inline-block;
    margin-left: 0px;
  }

  .editor-body {
    padding: 0px;
  }
}

@media screen and (max-width: 500px) {
  .editor-body {
    margin: 0px;
  }
}
</style>
