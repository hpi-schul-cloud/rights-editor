<template>
  <div>
    <h3>{{ ruleLabel }} <i v-bind:class="ruleIcon"></i></h3>
    <BaseButton remove class="remove-button" v-bind:onClick="removeRule">
      <i class="far fa-trash-alt"></i>
    </BaseButton>

    <!-- display action -->
    Das
    <ActionItem class="action-item" v-bind:policy="policy" v-bind:path="[...path, 'action']"></ActionItem>
    {{ rule.type.descriptionBefore }}
    <a href="#">{{ rule.type.descriptionLink }}</a>
    {{ rule.type.descriptionAfter }}
    
    <!-- add new refinement -->
    Das
    <a href="#">{{ rule['action'] }}</a> darf nur auf die folgende Art und Weise erfolgen...
    <BaseButton
      class="add-button"
      v-bind:onClick="function(){/* TODO: implement this functionality */}"
    >Verfeinerung hinzufügen</BaseButton>

    <!-- display and edit constraints -->
    Insgesamt gilt die
    <a href="#">{{ ruleLabel }}</a> nur, wenn...
    <ConstraintItem v-for="(constraint, index) in constraint" v-bind:key="index" v-bind:policy="policy" v-bind:path="[...path, 'constraint', index]"></ConstraintItem>
    <!-- add new constraint -->
    <BaseButton class="add-button" v-bind:onClick="showConstraintChooser">Einschränkung hinzufügen</BaseButton>
    <ConstraintChooser
      v-if="displayConstraintChooser"
      v-on:chosen="setConstraint($event)"
      v-on:abort="hideConstraintChooser()"
    ></ConstraintChooser>
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
import ConstraintChooser from "./ConstraintChooser.vue";

export default {
  name: "RuleItem",
  components: {
    ConstraintItem,
    BaseButton,
    ActionItem,
    ConstraintItem,
    ConstraintChooser
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
  data: function() {
    return {
      displayConstraintChooser: false,
      nextId: 0
    };
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

.container {
  width: 95%;
  margin: 10px;
  margin-left: 0px;
  padding: 20px;
}

.header {
  position: relative;
  margin-bottom: 10px;
}

.remove-button {
  position: absolute;
  left: calc(100% - 20px);
  top: -20px;
}

.constraint-container {
  display: inline;
}

.constraint-text {
  display: inline;
  margin-right: 10px;
}

.constraint-edit {
  margin: 0px;
  padding: 0px;
}

.add-button {
  display: block;
  margin-top: 10px;
  margin-left: 0px;
}
</style>
