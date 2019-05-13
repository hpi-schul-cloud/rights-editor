<template>
  <div>
    <h1>Überprüfen Sie Ihre Lizenz vor dem Abspeichern</h1>
    <div style="height: 100px; border: 2px dashed gray; color: gray;">Zusammenfassung</div>
    <BaseButton>Zurück zum Editor (TODO)</BaseButton>
    <BaseButton @click="save">Save</BaseButton>
  </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';

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
  methods: {
    save() {
      this.postLicense(this.policy);
    },
    postLicense(policy) {
      return fetch('http://localhost:5050/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: policy }),
      })
        .then((response) => {
          console.log(`saved license: ${response.ok}`);
        });
    },
  },
};
</script>
