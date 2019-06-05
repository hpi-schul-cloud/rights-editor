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
        {{ $t('languageButtonText') }}:<br>
        <BaseDropdown
          :width="'150px'"
          class="language-dropdown"
          :list="languages"
          :init-value="languages[0]"
          @selected="switchLanguage($event)"
        />
      </div>

      <div class="add-rule-container">
        {{ $t('addRule') }}: <br>
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
        {{ warnings.length }} {{ $t('errors_found') }}:
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

  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseComponents/BaseButton.vue';
import BaseDropdown from './BaseComponents/BaseDropdown.vue';
import PolicyTree from './PolicyTree/PolicyTree.vue';
import RuleItem from './RuleItem.vue';
import PolicyItem from './PolicyItem.vue';
import EditorNavBar from './EditorNavBar.vue';

import { jsonPath } from '../libs/jsonpath-0.8.0';
import { actionList } from '../libs/odrl/actions';
import { validatePolicy } from '../libs/odrl/validate';

export default {
  name: 'RuleEditor',
  components: {
    BaseButton,
    BaseDropdown,
    PolicyTree,
    RuleItem,
    PolicyItem,
    EditorNavBar,
  },
  props: {
    outsetPolicy: {
      type: Object,
    },
  },
  data() {
    let policy = {
      uid: '',
      target: '',
      assigner: '',
      assignee: '',
      follow(path) {
        return path.reduce((result, pathSegment) => result[pathSegment], this);
      },
    };
    if (this.$props.outsetPolicy) {
      policy = this.$props.outsetPolicy;
      policy.follow = path => path.reduce((result, pathSegment) => result[pathSegment], this.policy);
    }
    return {
      warnings: [],
      validateOnChange: false,
      editPath: [],
      policy,
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
        for (let i = 0; i < actions.length; i += 1) {
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
        for (let i = 0; i < actions.length; i += 1) {
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
        for (let i = 0; i < actions.length; i += 1) {
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ', ';
        }

        // Removes last comma
        text = text.substr(0, text.length - 2);
      }

      return text;
    },
  },
  watch: {
    policy: {
      handler(newPolicy, oldPolicy) {
        if (this.validateOnChange) {
          validatePolicy(this.policy, this.warnings);
        }
      },
      deep: true,
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
      if (this.$i18n.t('currentLanguage') !== lang) {
        this.$i18n.locale = lang[0].toLowerCase() + lang[1];
      }
      if (this.validateOnChange) {
        validatePolicy(this.policy, this.warnings);
      }
    },
    tryToGoForth() {
      this.validateOnChange = true;
      if (validatePolicy(this.policy, this.warnings)) {
        this.$emit('goForth', this.policy);
      }
    },
  },
};
</script>

<style scoped>
.policy-tree {
  float: left;
  width: 250px;
  padding: 0px 8px;
  box-sizing: border-box;
  box-shadow: 3px 0px 2px -3px gray;
  padding-bottom: 12px;
}

.policy-detail {
  margin-left: 270px;
  padding: 0px 0px 0px 15px;
}

.policy-meaning {
  margin-left: 250px;
  padding: 10px;
}

.header-wrapper {
  background-color: white;
  box-shadow: 0px 3px 2px -3px gray;
}

.add-rule-container {
  width: 50%;
  min-width: 350px;
  padding-bottom: 12px;
  padding-top: 0px;
  margin-top: 20px;
}

.language-container {
  float: right;
  text-align: right;
  width: 50%;
  padding-bottom: 20px;
  padding-top: 0px;
  margin-top: 0px;
}

.editor-body {
  padding-top: 24px;
}

.language-dropdown {
  display: inline-block;
}

.fa-language {
  margin-right: 5px;
}

.fa-plus {
  margin-right: 3px;
  margin-left: 10px;
  font-size: 0.9em;
}

.warnings {
  padding-bottom: 5px;
  margin-left: 10px;
}

.warnings a {
  color: rgb(200, 0, 0);
  font-weight: normal;
  line-height: 1.35em;
}

@media screen and (max-width: 840px) {
  .language-container {
    text-align: left;
    float: left;
    width: 100%;
  }

  .fa-language {
    margin-left: 10px;
  }

  .policy-tree {
    margin-bottom: 20px;
    width: 100%;
    box-shadow: none;
    border-bottom: 1px solid darkgray;
    border-top: 1px solid darkgray;
    padding-top: 10px;
    padding-bottom: 18px;
  }

  .policy-detail {
    display: inline-block;
    margin-left: 0px;
  }

  .header-wrapper {
    box-shadow: none;
  }

  .editor-body {
    padding: 10px;
  }

  .policy-detail {
    margin-top: 10px;
  }
}

@media screen and (max-width: 500px) {
  .editor-body {
    margin: 0px;
  }
}
</style>
