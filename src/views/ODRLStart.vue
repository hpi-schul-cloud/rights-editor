<template>
  <div class="recents-screen">
    <h1>ODRL-Editor</h1>
    <div class="button-container"><BaseButton class="start-empty" @click="startEmpty()">Leer starten</BaseButton></div>
    <h2>Kürzlich bearbeitet</h2>
    <p>
      Bitte beachten Sie, dass Sie die bereits erstellten Lizenzen nicht ändern können.
      Sie stehen Ihnen hier zur Verfügung, um als Vorlage benutzt zu werden.
    </p>
    <p v-if="state === 'loading'" class="message">Wird geladen...</p>
    <p v-if="state === 'noConnection'" class="message">Server ist nicht erreichbar!</p>
    <p v-if="state === 'loaded' && policies.length === 0" class="message">Es sind keine vorige Bearbeitungen vorhanden.</p>
    <ul v-if="state === 'loaded' && policies.length > 0">
      <li :key="index" v-for="(policy, index) in policies" @click="startWithPolicy(policy.odrl)">
        <h3>{{ policy.name }}</h3>
        <p>Bearbeitet: {{ date(policy.updatedAt) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseButton from '../components/BaseComponents/BaseButton.vue';

export default {
  name: 'RecentsScreen',
  components: {
    BaseButton,
  },
  data() {
    return {
      state: '',
      data: null,
    };
  },
  computed: {
    policies() {
      return this.data.data;
    },
  },
  created() {
    this.queryRecentPolicies();
  },
  methods: {
    queryRecentPolicies() {
      this.state = 'loading';
      const setStateNoConnection = () => {
        this.state = 'noConnection';
      };
      fetch('http://localhost:5050/odrl-licenses')
        .then((result) => {
          result.json()
            .then((json) => {
              console.log(json);
              this.data = json;
              this.state = 'loaded';
            })
            .catch(setStateNoConnection);
        })
        .catch(setStateNoConnection);
    },
    startEmpty() {
      this.$router.push({ name: 'odrl-editor' });
    },
    startWithPolicy(policy) {
      this.$router.push({ name: 'odrl-editor', params: { policy }})
    },
    date(time) {
      return new Date(time).toLocaleString('de-DE');
    },
  },
};
</script>

<style scoped>
.recents-screen {
    overflow: hidden;
}
h1 {
    float: left;
    margin-top: 21px;
    margin-bottom: 21px;
    padding: 0px;
}
.button-container {
    text-align: right;
    margin-top: 21px;
    margin-bottom: 21px;
}
.button-container::after {
    content: "";
    display: block;
    clear: both;
}
.start-empty {
    margin: 4px;
}
.message {
    padding: 40px;
    color: lightgrey;
    font-size: 32px;
}
li {
  border-bottom: 1px solid #1f3b70;
  padding: 16px 8px;
}
li:first-child {
  border-top: 1px solid #1f3b70;
}
li:hover {
  color: #1f3b70;
  cursor: pointer;
}

li h3 {
  margin: 0px 0px 8px;
}
li p {
  margin: 0px;
}
</style>
