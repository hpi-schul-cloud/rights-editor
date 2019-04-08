<template>
  <div>
    <h3>{{ ruleLabel }}</h3>
    <ActionItem class="action-item" v-bind:policy="policy" v-bind:path="[...path, 'action']"></ActionItem>
    <ConstraintItem v-for="(refinement, index) in refinements" v-bind:key="index" v-bind:policy="policy" v-bind:path="[...path, 'refinement', index]"></ConstraintItem>
    <BaseButton v-bind:onClick="appendNewSubrule">{{ subruleLabel }} hinzufügen</BaseButton>

    <div class="subrule-section">
      <RuleItem v-for="(subrule, index) in rule[subruleKey]" v-bind:policy="policy" v-bind:path="[...path, subruleKey, index]" v-bind:key="index"></RuleItem>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ActionItem from "./ActionItem.vue";
import ConstraintItem from "./ConstraintItem";
import BaseButton from "./BaseButton.vue";

export default {
  name: "RuleItem",
  components: {
    ConstraintItem,
    BaseButton,
    ActionItem
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    path: {
      type: Array,
      required: true
    },
  },
  methods: {
    furtherPath(nameSegment, indexSegment) {
      let p = this.path.slice();
      p.push(nameSegment, indexSegment);
      return p;
    },
    appendNewSubrule() {
      if (!this.rule[this.subruleKey]) {
        Vue.set(this.rule, this.subruleKey, []);
      }
      this.rule[this.subruleKey].push({})
    }
  },
  computed: {
    rule() {
      let r = this.path.reduce((result, segment) => result[segment], this.policy);
      return r;
    },
    ruleKey() {
      return this.path[this.path.length - 2];
    },
    ruleLabel() {
      return {'permission': 'Erlaubnis', 'prohibition': 'Verbot', 'obligation': 'Verpflichtung',
        'duty': 'Vorbedingung', 'remedy': 'Wiedergutmachung', 'consequence': 'Zusätzliche Pflicht'}[this.ruleKey];
    },
    subruleKey() {
      // TODO: consequences can't have consequences, can they?
      return {'permission': 'duty', 'prohibition': 'remedy', 'obligation': 'consequence',
        'duty': 'consequence', 'remedy': 'consequence', 'consequence': 'consequence'}[this.ruleKey];
    },
    subruleLabel() {
      return {'duty': 'Vorbedingung', 'remedy': 'Wiedergutmachung bei Regelverletzung', 'consequence': 'Zusätzliche Pflicht bei Nichteinhaltung'}[this.subruleKey];
    },
    refinements() {
      let refs = this.path.reduce((result, segment) => result[segment], this.policy);
      return refs ? refs : [];
    }
  }
};
</script>

<style scoped>
.subrule-section {
  margin-left: 20px;
}
</style>

