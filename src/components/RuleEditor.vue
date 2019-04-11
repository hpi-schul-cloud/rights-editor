<template>
  <div class="rule-editor">
    <div class="editor-header">
      <BaseButton :on-click="newPermission">
        Erlaubnis
      </BaseButton>
      <BaseButton :on-click="newObligation">
        Pflicht
      </BaseButton>
      <BaseButton :on-click="newProhibition">
        Verbot
      </BaseButton>

      <div class="guid-container">
        <span class="guid-label">
          GUID der Lizenz:
          <BaseInput v-model="policy['uid']" undercover class="guid-input" />
        </span>
      </div>
    </div>

    <div class="editor-body">
      <PolicyTree class="policy-tree" :policy="policy" :selected-path.sync="editPath" />
      <div class="detail-pane">
        <RuleItem
          v-if="showRulePane"
          :policy="policy"
          :path="editPath"
          @followLink="editPath = $event"
        />
      </div>
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
  computed: {
    showRulePane() {
      return this.editPath.length > 0;
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
  },
};
</script>

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

.editor-body {
  margin: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.guid-container {
  display: inline;
}

.guid-label {
  margin-left: 20px;
}

input.guid-input {
  margin-left: 10px;
  width: 175px;
}

@media screen and (max-width: 840px) {
  .editor-body {
    padding: 0px;
  }

  .guid-container {
    display: block;
  }
}

@media screen and (max-width: 500px) {
  .editor-body {
    margin: 0px;
  }

  .guid-container {
    margin-top: 20px;
  }
}
</style>
