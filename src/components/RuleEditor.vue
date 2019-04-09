<template>
  <div class="rule-editor">
    <div class="header">
      <BaseButton :on-click="newPermission">
        Erlaubnis
      </BaseButton>
      <BaseButton :on-click="newObligation">
        Pflicht
      </BaseButton>
      <BaseButton :on-click="newProhibition">
        Verbot
      </BaseButton>
      <span class="licence-name">
        GUID der Lizenz:
        <BaseInput v-model="policy['uid']" undercover class="guid-input" />
      </span>
    </div>

    <RuleItem
      v-for="(rule, index) in policy['permission']" :key="rule.uid" :policy="policy"
      :path="['permission', index]"
    />
    <RuleItem
      v-for="(rule, index) in policy['prohibition']" :key="rule.uid" :policy="policy"
      :path="['prohibition', index]"
    />
    <RuleItem
      v-for="(rule, index) in policy['obligation']" :key="rule.uid" :policy="policy"
      :path="['obligation', index]"
    />

    <pre>{{ json }}</pre>
  </div>
</template>

<script>
import Vue from 'vue';

import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import Action from './ActionItem.vue';

import RuleItem from './RuleItem.vue';
import { Odrl } from '../libs/rightsml-lib-js/ODRLclasses';
import { Odrl as Vocab } from '../libs/rightsml-lib-js/ODRLvocabs';

export default {
  name: 'RuleEditor',
  components: {
    BaseButton,
    BaseInput,
    RuleItem,
  },
  data() {
    return {
      policy: {
        uid: '007-asdf-3ddfi',
        follow(path) {
          let result = this;
          path.forEach((segment) => {
            result = result[segment];
          });
          return result;
        },
      },
    };
  },
  computed: {
    json() {
      return JSON.stringify(this.policy);
    },
  },
  methods: {
    newPermission() {
      if (!this.policy.permission) {
        Vue.set(this.policy, 'permission', []);
      }
      const p = this.policy.permission;
      Vue.set(p, p.length, {});
    },
    newObligation() {
      if (!this.policy.obligation) {
        Vue.set(this.policy, 'obligation', []);
      }
      this.policy.obligation.push({});
    },
    newProhibition() {
      if (!this.policy.prohibition) {
        Vue.set(this.policy, 'prohibition', []);
      }
      this.policy.prohibition.push({});
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
  font-weight: bold;
  color: #1f3b70;
}

a:hover,
a:focus {
}
</style>

<style scoped>
.header {
  background-color: white;
  border-bottom: 5px solid gray;
  overflow: hidden;

  padding-bottom: 20px;
  padding-top: 20px;
  width: calc(100% - 116px);
}

.licence-name {
  margin-left: 20px;
}

input.guid-input {
  margin-left: 10px;
  width: 175px;
}
</style>
