<template>
  <div>
    <h3>{{ ruleTypeName }}</h3>
    <ActionItem class="action-item" v-bind:action="rule.action"></ActionItem>

    <div v-if="!hasRelatedRule">
      <BaseButton v-bind:onClick="createRelatedRule">{{ relatedRuleRole.label }} hinzufügen</BaseButton>
      <p class="related-rule-info">{{ relatedRuleRole.description }}</p>
    </div>

    <div class="nested-rule" v-if="hasRelatedRule">
      <h3>{{ relatedRuleRole.label }}</h3>
      <RuleItem v-bind:rule="relatedRule"></RuleItem>
    </div>
  </div>
</template>

<script>
import ActionItem from "./ActionItem.vue";
import BaseButton from "./BaseButton.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import { ID_PERMISSION_CLASS, ID_PROHIBITION_CLASS, ID_DUTY_CLASS } from "../libs/ODRL/concepts";

export default {
  name: "RuleItem",
  components: {
    BaseButton,
    ActionItem
  },
  props: {
    rule: {
      type: Object,
      required: true
    },
  },
  methods: {
    removeRule: function() {
      this.$emit("remove-rule", this.rule.id);
      // TODO(hk): move rule removal to parent element
    },
    createRelatedRule(event) {
      // TODO(hk): think about id generation
      let relatedRule = new Rule(this.rule.id+1, RuleTypes.Duty);
      switch (this.rule.type) {
        case RuleTypes.Permission:
          // http://www.w3.org/ns/odrl/2/duty
          this.rule.duty = relatedRule;
          break;
        case RuleTypes.Prohibition:
          // http://www.w3.org/ns/odrl/2/remedy
          this.rule.remedy = relateRule;
          break;
        case RuleTypes.Duty:
          // http://www.w3.org/ns/odrl/2/consequence
          this.rule.consequence = relatedRule;
          break;
        default:
          throw new Exception("unsupported rule type");
      }
    }
  },
  computed: {
    ruleTypeName: function() {
      let nameMapping = {
        ID_PERMISSION_CLASS: 'Erlaubnis',
        ID_PROHIBITION_CLASS: 'Verbot',
        ID_DUTY_CLASS: 'Verpflichtung',
      };
      return nameMapping[this.rule.type];
    },
    relatedRule: function() {
      // TODO(hk): change this in the style of ruleTypeName
      switch (this.rule.type) {
        case ID_PERMISSION_CLASS:
          // http://www.w3.org/ns/odrl/2/duty
          return this.rule.duty;
        case ID_PROHIBITION_CLASS:
          // http://www.w3.org/ns/odrl/2/remedy
          return this.rule.remedy;
        case ID_DUTY_CLASS:
          // http://www.w3.org/ns/odrl/2/consequence
          return this.rule.consequence;
        default:
          throw new Exception("unsupported rule type");
      }
    },
    hasRelatedRule: function() {
      return this.relatedRule !== null;
    },
    relatedRuleRole: function() {
      switch (this.rule.type) {
        case ID_PERMISSION_CLASS:
          return { uri: "http://www.w3.org/ns/odrl/2/duty", label: "Bedingung", description: "Die Erlaubnis gilt nur, wenn die Bedingungen erfüllt ist." };
        case ID_PROHIBITION_CLASS:
          return { uri: "http://www.w3.org/ns/odrl/2/remedy", label: "Strafe", description: "Die Strafe (bzw. Wiedergutmachung muss geleistet werden, falls das Verbot missachtet wird." };
        case ID_DUTY_CLASS:
          // TODO(hk): check description; not sure if it is correct.
          return { uri: "http://www.w3.org/ns/odrl/2/consequence", label: "Konsequenz", description: "muss geleistet werden, falls die dazugehörige Verpflichtung nicht erfüllt wird" };
        default:
          throw new Exception("unsupported rule type");
      }
    }
  }
};
</script>

<style scoped>
.nested-rule {
  margin-left: 10px;
}
</style>
