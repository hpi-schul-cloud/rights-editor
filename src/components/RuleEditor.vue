<template>
  <div class="rule-editor">
    <EditorNavBar>
      <template v-slot:left>
        <router-link to="/">
          <i class="fas fa-arrow-circle-left" /> Start
        </router-link>
      </template>
      <template v-slot:right>
        <router-link :to="{ name: 'check-before-save', params: { policy } }">
          Fertig <i class="fas fa-check-circle" />
        </router-link>
      </template>
    </EditorNavBar>

    <div class="editor-header">
      <BaseButton @click="newPermission()">
        Erlaubnis
      </BaseButton>
      <BaseButton @click="newObligation()">
        Pflicht
      </BaseButton>
      <BaseButton @click="newProhibition()">
        Verbot
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
      <p v-html="licenceText" />
      <h2>Provisorische Lizenz</h2>
      <pre>{{ policy }}</pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import PolicyTree from './PolicyTree/PolicyTree.vue';
import RuleItem from './RuleItem.vue';
import PolicyItem from './PolicyItem.vue';
import EditorNavBar from './EditorNavBar.vue';

export default {
  name: 'RuleEditor',
  components: {
    BaseButton,
    BaseInput,
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
    showRulePane() {
      return this.editPath.length > 0;
    },
    licenceText() {
      let text = '';

      if (this.policy.permission) {
        text += 'Erlaubt ist: ';
        text += this.policy.permission[0].action;

        for (let permissionNumber = 1; permissionNumber < this.policy.permission.length; permissionNumber++) {
          text += ', ';
          text += this.policy.permission[permissionNumber].action;
        }
      }

      if (this.policy.obligation) {
        text += '<br>Verpflichtend ist: ';
        text += this.policy.obligation[0].action;

        for (let obligationNumber = 1; obligationNumber < this.policy.obligation.length; obligationNumber++) {
          text += ', ';
          text += this.policy.obligation[obligationNumber].action;
        }
      }

      if (this.policy.prohibition) {
        text += '<br>Verboten ist: ';
        text += this.policy.prohibition[0].action;

        for (let prohibitionNumber = 1; prohibitionNumber < this.policy.prohibition.length; prohibitionNumber++) {
          text += ', ';
          text += this.policy.prohibition[prohibitionNumber].action;
        }
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
