<template>
  <div>
    <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="back">
          <i class="fas fa-arrow-circle-left" /> {{ $t("back") }}
        </a>
      </template>
    </EditorNavBar>
    <div>
      <h1>{{ $t('check_before_save') }}</h1>
      <h2>{{ $t('summarization') }}</h2>
      <p>{{ summarization }}</p>
    </div>
    {{ $t('name_the_license') }}: <BaseInput v-model="name" placeholder="Name" />
    <BaseButton @click="save">{{ $t('save') }}</BaseButton>
    <p v-if="problemWhileSaving" class="problem">{{ $t('problem_cannot_save_license') }}</p>
  </div>
</template>

<script>
import BaseButton from '../components/BaseComponents/BaseButton.vue';
import BaseInput from '../components/BaseComponents/BaseInput.vue';
import EditorNavBar from '../components/EditorNavBar.vue';
import { actionList } from '../libs/odrl/actions.js';

export default {
  name: 'SaveScreen',
  components: {
    BaseButton,
    EditorNavBar,
    BaseInput,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      problemWhileSaving: false,
    };
  },
  computed: {
    summarization() {
      const text = [];
      if (this.policy.permission) {
        text.push(`${this.$t('rule.permission.name')}: ${this.policy.permission
          .map((p) => {
            let actionID = p.action;
            if (Array.isArray(p.action)) {
              actionID = p.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', ')}`);
      }
      if (this.policy.obligation) {
        text.push(`${this.$t('rule.obligation.name')}: ${this.policy.obligation
          .map((o) => {
            let actionID = o.action;
            if (Array.isArray(o.action)) {
              actionID = o.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', ')}`);
      }
      if (this.policy.prohibition) {
        text.push(`${this.$t('rule.prohibition.name')}: ${this.policy.prohibition
          .map((p) => {
            let actionID = p.action;
            if (Array.isArray(p.action)) {
              actionID = p.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', ')}`);
      }
      return text.join('; ');
    },
  },
  methods: {
    save() {
      this.postLicense(this.policy);
    },
    back() {
      this.$router.push({ name: 'odrl-editor', params: { policy: this.policy } });
    },
    postLicense(policy) {
      return fetch('http://51.15.86.82:5050/odrl-licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          odrl: policy,
        }),
      })
        .then((response) => {
          this.problemWhileSaving = false;
          this.$router.push({ name: 'odrl-start' });
        })
        .catch((response) => {
          console.log('Problem:');
          console.log(response);
          this.problemWhileSaving = true;
        });
    },
  },
};
</script>

<style scoped>
.problem {
  color: darkred;
}
</style>
