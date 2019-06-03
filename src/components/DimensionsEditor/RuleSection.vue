<template>
  <div>
    <h2 class="section-heading">Regeln</h2>
    <p>
      Hier geht es darum, welche Aktionen später mit den Medien erlaubt sein sollen.
      Suchen Sie aus der Liste links die Regeln, die Sie erlauben.
    </p>
    <table
      v-for="rule in rules"
      :key="rule.id"
    >
      <tr>
        <td><input type="checkbox" @click="toggle(rule.id, $event.target.checked)" :checked="indexOfRule(rule.id) >= 0"></td>
        <td><h3>{{ rule.name }}</h3></td>
      </tr>
      <tr>
        <td />
        <td><p>{{ rule.description }}</p></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ruleOptions } from '../../libs/license-options/license-options';
import Vue from 'vue';

export default {
  name: 'RuleSection',
  props: {
    permissions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    rules() {
      return ruleOptions;
    },
  },
  methods: {
    toggle(uri, selected) {
      const index = this.indexOfRule(uri);
      const hasRule = index >= 0;
      if (hasRule && !selected) {
        Vue.delete(this.permissions, index);
        return;
      }
      if (!hasRule && selected) {
        this.permissions.push({
          action: uri,
        });
      }
      this.$emit('update:permissions', this.permissions);
    },
    indexOfRule(uri) {
      return this.permissions.findIndex(rule => rule.action === uri);
    },
  },
};
</script>
<style scoped>
h3 {
    font-weight: bold;
    font-size: inherit;
    margin: 0px;
    padding: 0px;
}
table {
    margin: 0px 0px 16px;
    padding: 0px;
}
td, th {
    margin: 0px;
    padding: 0px;
}
p {
    margin: 0px;
    padding: 0px;
}
</style>
