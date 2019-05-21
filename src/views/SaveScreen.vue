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
      <h1>Überprüfen Sie Ihre Lizenz vor dem Abspeichern</h1>
      <h2>Zusammenfassung</h2>
      <p>{{ summarization }}</p>
    </div>
    Benennen Sie die Lizenz: <BaseInput v-model="name" placeholder="Name" />
    <BaseButton @click="save">Speichern</BaseButton>
    <p class="problem" v-if="problemWhileSaving">Ein Problem ist aufgetreten: Momentan kann die Lizenz nicht gespeichert werden.</p>
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
  data() {
    return {
      name: '',
      problemWhileSaving: false,
    };
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
  },
  computed: {
    summarization() {
      let text = [];
      if (this.policy.permission) {
        text.push('Erlaubnis: ' + this.policy.permission
          .map(p => {
            let actionID = p.action;
            if (Array.isArray(p.action)) {
              actionID = p.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', '));
      };
      if (this.policy.obligation) {
        text.push('Pflicht: ' + this.policy.obligation
          .map(o => {
            let actionID = o.action;
            if (Array.isArray(o.action)) {
              actionID = o.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID));
          })
          .join(', '));
      }
      if (this.policy.prohibition) {
        text.push('Verbot: ' + this.policy.prohibition
          .map(p => {
            let actionID = p.action;
            if (Array.isArray(p.action)) {
              actionID = p.action[0]['rdf:value'];
            }
            return this.$i18n.t(actionList.find(item => item === actionID)); 
          })
          .join(', '));
      }
      return text.join('; ');
    },
  },
  methods: {
    save() {
      this.postLicense(this.policy);
    },
    back() {
      this.$router.push({ name: 'odrl-editor', params: { policy: this.policy }});
    },
    postLicense(policy) {
      return fetch('http://localhost:5050/odrl-licenses', {
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


