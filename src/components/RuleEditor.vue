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
      <div class="policy-detail">
        <RuleItem
          v-if="showRulePane"
          :policy="policy"
          :path="editPath"
          @followLink="editPath = $event"
        />
      </div>
    </div>

    <pre>{{ policy }}</pre>
    <div>
      <h2>Was bedeutet diese Lizenz?</h2>
      <pre>{{ licenceText }}</pre>
    </div>
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
    licenceText() {

      let text = "Erlaubt ist: "

      if (typeof this.policy.permission !== 'undefined') {
        //text = text + Object.values(this.policy.permission)
        text += JSON.stringify(this.policy.permission);
      }

      text += "\nVerpflichtend ist: "

      if (typeof this.policy.obligation !== 'undefined') {
        text += JSON.stringify(this.policy.obligation);
      }

      text += "\nVerboten ist: "

      if (typeof this.policy.prohibition !== 'undefined') {
        text += JSON.stringify(this.policy.prohibition);
      }
      
      if (this.license === 'http://creativecommons.org/licenses/by-nd/4.0/') {
        text = text + 'Ich muss den Namen des Urhebers nennen.\n';
        text = text + 'Ich darf das Medium nicht bearbeiten.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-sa/4.0/') {
        text = text + 'Ich muss den Namen des Urhebers nennen.\n';
        text = text + 'Ich muss das Medium unter gleichen Bedingungen weitergeben.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc/4.0/') {
        text = text + 'Ich muss den Namen des Urhebers nennen.\n';
        text = text + 'Ich darf das Medium nicht kommerziell verwenden.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc-nd/4.0/') {
        text = text + 'Ich muss den Namen des Urhebers nennen.\n';
        text = text + 'Ich darf das Medium nicht kommerziell verwenden.\n';
        text = text + 'Ich darf das Medium nicht bearbeiten.\n';
      }
      if (this.license === 'http://creativecommons.org/licenses/by-nc-sa/4.0/') {
        text = text + 'Ich muss den Namen des Urhebers nennen.\n';
        text = text + 'Ich darf das Medium nicht kommerziell verwenden.\n';
        text = text + 'Ich muss das Medium unter gleichen Bedingungen weitergeben.\n';
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
  box-shadow: 3px 0px 2px -3px gray;
  margin-top: 24px;
  padding-bottom: 12px;
}

.policy-detail {
  margin-left: 200px;
  padding: 10px;
}

pre {
  margin-left: 200px;
  padding: 10px;
}
.editor-header {
  background-color: white;
  border-bottom: 5px solid gray;
  overflow: hidden;

  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
}

.editor-body {
  padding-left: 10px;
  padding-right: 10px;
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
  .policy-detail {
    display: inline-block;
    margin-left: 0px;
  }

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
