<template>
  <div class="rule-editor">
    <div class="editor-back">
      <router-link to="/">
        <a><i class="fas fa-arrow-circle-left" /> Start</a>
      </router-link>
    </div>
    <div class="editor-header">
      <BaseButton @click="newPermission()">
        <template v-if="lang == 'de'">Erlaubnis</template>
        <template v-if="lang == 'en'">Permission</template>
      </BaseButton>
      <BaseButton @click="newObligation()">
        <template v-if="lang == 'de'">Pflicht</template>
        <template v-if="lang == 'en'">Obligation</template>
      </BaseButton>
      <BaseButton @click="newProhibition()">
        <template v-if="lang == 'de'">Verbot</template>
        <template v-if="lang == 'en'">Prohibition</template>
      </BaseButton>

      <BaseButton textlike @click="switchLanguage()">
        <i class="fas fa-language"></i>
      </BaseButton>

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
      <pre>{{ licenceText }}</pre>
      <h2>Provisorische Lizenz</h2>
      <pre>{{ policy }}</pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getLanguage, setLanguage } from '../libs/language/language.js';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import PolicyTree from './PolicyTree/PolicyTree.vue';
import RuleItem from './RuleItem.vue';
import PolicyItem from './PolicyItem.vue';
import { constants } from 'crypto';

export default {
  name: 'RuleEditor',
  components: {
    BaseButton,
    BaseInput,
    PolicyTree,
    RuleItem,
    PolicyItem,
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
    lang: {
      get() {
        return getLanguage();
      },
      set(l) {
        setLanguage(l);
      }
    },
    showRulePane() {
      return this.editPath.length > 0;
    },
    licenceText() {
      let text = 'Erlaubt ist: ';

      if (typeof this.policy.permission !== 'undefined') {
        text += JSON.stringify(this.policy.permission);
      }

      text += '\nVerpflichtend ist: ';

      if (typeof this.policy.obligation !== 'undefined') {
        text += JSON.stringify(this.policy.obligation);
      }

      text += '\nVerboten ist: ';

      if (typeof this.policy.prohibition !== 'undefined') {
        text += JSON.stringify(this.policy.prohibition);
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

    switchLanguage() {
      /*if (this.lang === 'de') {
        this.lang = 'en';
      } else if (this.lang === 'en') {
        this.lang = 'de';
      }*/

      setLanguage('de');

      // https://vuejs.org/v2/guide/mixins.html
    }
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

.editor-header {
  background-color: white;
  box-shadow: 0px 3px 2px -3px gray;
  overflow: hidden;

  padding-bottom: 20px;
  padding-top: 0px;
  width: 100%;
}

.editor-body {
  padding-top: 24px;
}

.editor-back{
  padding-top: 15px;
  padding-bottom: 5px;
  margin-left: 10px;
  color: #1f3b70;
}

input.guid-input {
  margin-left: 10px;
  width: 175px;
}

@media screen and (max-width: 840px) {
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
