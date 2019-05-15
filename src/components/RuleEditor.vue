<template>
  <div class="rule-editor">

    <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="$emit('abort')">
          <i class="fas fa-arrow-circle-left" /> {{ $t("back") }}
        </a>
      </template>
      <template v-slot:right>
        <a href="#" @click="$emit('goForth', policy)">
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
        <BaseButton @click="newPermission()">
          {{ $t('permissionButtonText') }}
        </BaseButton>
        <BaseButton @click="newObligation()">
          {{ $t('obligationButtonText') }}
        </BaseButton>
        <BaseButton @click="newProhibition()">
          {{ $t('prohibitionButtonText') }}
        </BaseButton>
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
import BaseButton from './BaseButton.vue';
import BaseDropdown from './BaseDropdown.vue';
import BaseInput from './BaseInput.vue';
import PolicyTree from './PolicyTree/PolicyTree.vue';
import RuleItem from './RuleItem.vue';
import PolicyItem from './PolicyItem.vue';
import EditorNavBar from './EditorNavBar.vue';

import { jsonPath } from '../libs/jsonpath-0.8.0';
import { actionList } from '../libs/odrl/actions.js';

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
      policy: {
        uid: '',
        target: '',
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
        let actions = jsonPath(this.policy, "$.permission[*].action");

        // Searches label for each action
        for (let i = 0; i < actions.length; i++) { 
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ", ";
        }

        // Removes last comma
        text = text.substr(0, text.length-2)
      }

      if (this.policy.obligation) {
        text += '<br>Verpflichtend ist: ';
        
        // Gets all actions via jsonPath
        let actions = jsonPath(this.policy, "$.obligation[*].action");

        // Searches label for each action
        for (let i = 0; i < actions.length; i++) { 
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ", ";
        }

        // Removes last comma
        text = text.substr(0, text.length-2)
      }

      if (this.policy.prohibition) {
        text += '<br>Verboten ist: ';

        // Gets all actions via jsonPath
        let actions = jsonPath(this.policy, "$.prohibition[*].action");

        // Searches label for each action
        for (let i = 0; i < actions.length; i++) { 
          text += this.$i18n.t(actionList.find(item => item === (actions[i])));
          text += ", ";
        }

        // Removes last comma
        text = text.substr(0, text.length-2)
      }

      return text;
    },
  },
  methods: {
    newPermission() {
      if (!this.policy.permission) {
        Vue.set(this.policy, 'permission', []);
      }
      const idx = this.policy.permission.length;
      Vue.set(this.policy.permission, idx, {});
      this.editPath = ['permission', idx];
    },
    newObligation() {
      if (!this.policy.obligation) {
        Vue.set(this.policy, 'obligation', []);
      }
      const idx = this.policy.obligation.length;
      Vue.set(this.policy.obligation, idx, {});
      this.editPath = ['obligation', idx];
    },
    newProhibition() {
      if (!this.policy.prohibition) {
        Vue.set(this.policy, 'prohibition', []);
      }
      const idx = this.policy.prohibition.length;
      Vue.set(this.policy.prohibition, idx, {});
      this.editPath = ['prohibition', idx];
    },
    switchLanguage(lang) {
      if (this.$i18n.t('currentLanguage') != lang) {
        this.$i18n.locale = lang[0].toLowerCase() + lang[1];
      }
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
