<template>
  <div class="rule-editor">
    <div class="editor-header">
      <BaseButton :onClick="newPermission">
        Erlaubnis
      </BaseButton>
      <BaseButton :onClick="newObligation">
        Pflicht
      </BaseButton>
      <BaseButton :onClick="newProhibition">
        Verbot
      </BaseButton>
      <span class="licence-name">
        GUID der Lizenz:
        <BaseInput v-model="policy['uid']" undercover class="guid-input" />
      </span>
    </div>

    <PolicyTree class="policy-tree" :policy="policy" :selectedPath.sync="editPath" />

    <div class="detail-pane">
      <RuleItem :policy="policy" :path="editPath" v-if="showRulePane" />
    </div>

    <pre>{{ policy }}</pre>
  </div>
</template>

<script>
import Vue from 'vue';

import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import PolicyTree from './PolicyTree/PolicyTree.vue';
import RuleItem from './RuleItem.vue';


export default {
  name: 'RuleEditor',
  components: {
    BaseButton,
    BaseInput,
    PolicyTree,
    RuleItem,
  },
  data() {
    return {
      editPath: [],
      policy: {
        uid: '007-asdf-3ddfi',
        follow(path) {
          return path.reduce((result, pathSegment) => result[pathSegment], this);
        },
      },
    };
  },
  methods: {
    newPermission() {
      if (!this.policy.permission) {
        Vue.set(this.policy, 'permission', []);
      }
      let idx = this.policy.permission.length
      Vue.set(this.policy.permission, idx, {});
      this.editPath = ['permission', idx];
    },
    newObligation() {
      if (!this.policy.obligation) {
        Vue.set(this.policy, 'obligation', []);
      }
      let idx = this.policy.obligation.length
      Vue.set(this.policy.obligation, idx, {});
      this.editPath = ['obligation', idx];
    },
    newProhibition() {
      if (!this.policy.prohibition) {
        Vue.set(this.policy, 'prohibition', []);
      }
      let idx = this.policy.prohibition.length
      Vue.set(this.policy.prohibition, idx, {});
      this.editPath = ['prohibition', idx];
    },
  },
  computed: {
    showRulePane() {
      return this.editPath.length > 0;
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
  text-decoration: underline;
}
</style>

<style scoped>
.policy-tree {
  float: left;
  width: 200px;
}
.detail-pane {
  margin-left: 200px;
}
.editor-header {
  background-color: white;
  border-bottom: 5px solid gray;
  overflow: hidden;

  padding-bottom: 20px;
  padding-top: 20px;
  width: calc(100% - 20px);
}

.licence-name {
  margin-left: 20px;
}

input.guid-input {
  margin-left: 10px;
  width: 175px;
}
</style>
