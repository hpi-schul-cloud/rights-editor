<template>
  <div class="recents-screen">
    <h1>Schul-Cloud Lizenzen</h1>
    <div class="button-container"><BaseButton class="start-empty" @click="startEmpty()">{{ $t('start_empty') }}</BaseButton></div>
    <h2>{{ $t('recently_edited') }}</h2>
    <p>{{ $t('recently_edit_list_explanation') }}</p>
    <p v-if="state === 'loading'" class="message">{{ $t('loading') }}</p>
    <p v-if="state === 'noConnection'" class="message">{{ $t('server_unreachable') }}</p>
    <p v-if="state === 'loaded' && licenses.length === 0" class="message">{{ $t('no_recent_edits') }}</p>
    <ul v-if="state === 'loaded' && licenses.length > 0">
      <li v-for="(license, index) in licenses" :key="index" @click="startWithPolicy(license)">
        <h3>{{ license.name }}</h3>
        <p>{{ $t('edited') }}: {{ date(license.updatedAt) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseButton from '../components/BaseComponents/BaseButton.vue';

export default {
  name: 'SCStart',
  components: {
    BaseButton,
  },
  data() {
    return {
      state: '',
      licenses: [],
    };
  },
  created() {
    this.queryRecentLicenses();
  },
  methods: {
    queryRecentLicenses() {
      this.state = 'loading';
      const setStateNoConnection = () => {
        this.state = 'noConnection';
      };
      fetch('http://51.15.86.82:5050/sc-licenses')
        .then((result) => {
          result.json()
            .then((json) => {
              console.log(json);
              this.licenses = json.data;
              this.state = 'loaded';
            })
            .catch(setStateNoConnection);
        })
        .catch(setStateNoConnection);
    },
    startEmpty() {
      this.$router.push({ name: 'sc-editor' });
    },
    startWithPolicy(policy) {
      this.$router.push({
        name: 'sc-editor',
        params: {
        // white-list the properties we want to pass on
          policy: {
            name: policy.name,
            odrl: policy.odrl,
            options: policy.options,
          },
        },
      });
    },
    date(time) {
      return new Date(time).toLocaleString(this.$i18n.locale);
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
