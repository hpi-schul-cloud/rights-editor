<template>
  <div>
    <h1>Überprüfen Sie Ihre Lizenz vor dem Abspeichern</h1>
    <h2>Zusammenfassung</h2>
    <div>{{ summarization }}</div>
    <BaseButton>Zurück zum Editor (TODO)</BaseButton>
    <BaseButton @click="save">Save</BaseButton>
  </div>
</template>

<script>
import BaseButton from '../components/BaseComponents/BaseButton.vue';

export default {
  name: 'SaveScreen',
  components: {
    BaseButton,
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
          .map(p => p.action)
          .join(', '));
      };
      if (this.policy.obligation) {
        text.push('Pflicht: ' + this.policy.obligation
          .map(o => o.action)
          .join(', '));
      }
      if (this.policy.prohibition) {
        text.push('Verbot: ' + this.policy.prohibition
          .map(p => p.action)
          .join(', '));
      }
      return text.join('; ');
    },
  },
  methods: {
    save() {
      this.postLicense(this.policy);
    },
    postLicense(policy) {
      return fetch('http://localhost:5050/odrl-licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'some name',
          odrl: policy,
        }),
      })
        .then((response) => {
          console.log(`saved license: ${response.ok}`);
          console.log(JSON.stringify({
          name: 'some name',
          odrl: policy,
        }));
        })
        .catch((response) => {
          console.log('problem');
          console.log(response);
        });
    },
  },
};
</script>
