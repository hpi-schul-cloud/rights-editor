<template>
  <div class="rule-editor">
    <div class="header">
      <BaseButton v-bind:onClick="newPermission">Erlaubnis</BaseButton>
      <BaseButton v-bind:onClick="newObligation">Pflicht</BaseButton>
      <BaseButton v-bind:onClick="newProhibition">Verbot</BaseButton>
      <span class="licence-name">
        GUID der Lizenz:
        <BaseInput undercover v-model="policy['uid']" class="guid-input"></BaseInput>
      </span>
    </div>

    <RuleItem v-for="(rule, index) in policy['permission']" v-bind:policy="policy" v-bind:path="['permission', index]" v-bind:key="rule.uid"></RuleItem>
    <RuleItem v-for="(rule, index) in policy['prohibition']" v-bind:policy="policy" v-bind:path="['prohibition', index]" v-bind:key="rule.uid"></RuleItem>
    <RuleItem v-for="(rule, index) in policy['obligation']" v-bind:policy="policy" v-bind:path="['obligation', index]" v-bind:key="rule.uid"></RuleItem>

    <pre>{{json}}</pre>
  </div>
</template>

<script>
import Vue from 'vue';

import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import Action from "./ActionItem.vue";

import RuleItem from "./RuleItem.vue";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export default {
  name: "RuleEditor",
  components: {
    BaseButton,
    BaseInput,
    RuleItem
  },
  data: function() {
    return {
      policy: {
        uid: "007-asdf-3ddfi",
        follow: function(path) {
          let result = this;
          path.forEach(segment => {
            result = result[segment];
          });
          return result;
        }
      }
    };
  },
  computed: {
    json: function() {
      return JSON.stringify(this.policy);
    }
  },
  methods: {
    newPermission: function() {
      if (!this.policy['permission']) {
        Vue.set(this.policy, 'permission', []);
      }
      let p = this.policy['permission'];
      Vue.set(p, p.length, {});
    },
    newObligation: function() {
      if (!this.policy["obligation"]) {
        Vue.set(this.policy, 'obligation', []);
      }
      this.policy["obligation"].push({});
    },
    newProhibition: function() {
      if (!this.policy["prohibition"]) {
        Vue.set(this.policy, 'prohibition', []);
      }
      this.policy["prohibition"].push({});
    }
  }
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