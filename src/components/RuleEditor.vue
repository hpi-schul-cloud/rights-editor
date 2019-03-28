<template>
  <div class="rule-editor">
    <div class="header">
      <BaseButton v-bind:onClick="newPermission">Erlaubnis</BaseButton>
      <BaseButton v-bind:onClick="newObligation">Verpflichtung</BaseButton>
      <BaseButton v-bind:onClick="newProhibition">Verbot</BaseButton>
      <span class="licence-name">
        GUID der Lizenz:
        <BaseInput undercover v-model="licenceName" class="guid-input"></BaseInput>
      </span>
      <BaseButton class="float-right" big v-bind:onClick="generateLicence">Generate Licence</BaseButton>
    </div>
    <template v-for="rule in rules">
      <RuleItem v-bind:rule="rule" v-bind:key="rule.uid"></RuleItem>
    </template>
    <pre>{{policy}}</pre>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import Action from "./ActionItem.vue";

import RuleItem from "./RuleItem.vue";
import { Permission, Duty, Prohibition } from "../libs/ODRL/rule.js";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export default {
  name: "RuleEditor",
  components: {
    BaseButton,
    BaseInput,
    RuleItem
  },
  data: function() {
    return {
      rules: [],
      licenceName: "007",
      policy: ""
    };
  },
  methods: {
    newPermission: function() {
      this.rules.push(new Permission());
    },
    newObligation: function() {
      this.rules.push(new Duty());
    },
    newProhibition: function() {
      this.rules.push(new Prohibition());
    },
    generateLicence() {
      let policy = new Odrl.Policy(this.licenceName, "set");
      let targetAsset = "target_asset";
      let assigner = "assigner_party";
      let assignee = "assignee_party";

      for (let i = 0; i < this.ruleTrees.length; i++) {
        for (let j = 0; j < this.ruleTrees[i].rules.length; j++) {
          let currentRule = this.ruleTrees[i].rules[j];

          if (currentRule.type == RuleTypes.Permission) {
            this.addPermissionToPolicy(i, policy);
          } else if (currentRule.type == RuleTypes.Obligation) {
            this.addObligationToPolicy(i, policy);
          } else if (currentRule.type == RuleTypes.Prohibition) {
            this.addProhibitionToPolicy(i, policy);
          }
        }
      }

      this.policy = policy.serializeJson();
    },
    addPermissionToPolicy(ruleTreeIndex, policy) {
      let permission = new Odrl.Permission();
      let firstRule = this.ruleTrees[ruleTreeIndex].rules[0];

      permission.setAction(firstRule.action.name);
      permission.addConstraint(
        firstRule.action.constraint.leftOperand,
        firstRule.action.constraint.operator,
        firstRule.action.constraint.rightOperand,
        null,
        firstRule.action.constraint.unit,
        null
      );

      let duties = [];
      for (let k = 1; k < this.ruleTrees[ruleTreeIndex].rules.length; k++) {
        let currentRule = this.ruleTrees[ruleTreeIndex].rules[k];
        if (currentRule.type == RuleTypes.Duty) {
          duties.push(new Odrl.Duty());
          duties[duties.length - 1].setAction(currentRule.action.name);
          duties[duties.length - 1].addConstraint(
            currentRule.action.constraint.leftOperand,
            currentRule.action.constraint.operator,
            currentRule.action.constraint.rightOperand,
            null,
            currentRule.action.constraint.unit,
            null
          );
        } else if (currentRule.type == RuleTypes.Consequence) {
          let cons = new Odrl.Failure();
          cons.setAction(currentRule.action.name);
          duties[duties.length - 1].addConsequence(cons);
        }
      }
      for (let k = 0; k < duties.length; k++) {
        permission.addDuty(duties[k]);
      }
      policy.addPermission(permission);
    },
    addObligationToPolicy(ruleTreeIndex, policy) {
      let obligation = new Odrl.Duty();
      let firstRule = this.ruleTrees[ruleTreeIndex].rules[0];

      obligation.setAction(firstRule.action.name);
      obligation.addConstraint(
        firstRule.action.constraint.leftOperand,
        firstRule.action.constraint.operator,
        firstRule.action.constraint.rightOperand,
        null,
        firstRule.action.constraint.unit,
        null
      );

      for (let k = 1; k < this.ruleTrees[ruleTreeIndex].rules.length; k++) {
        let currentRule = this.ruleTrees[ruleTreeIndex].rules[k];
        if (currentRule.type == RuleTypes.Consequence) {
          let cons = new Odrl.Failure();
          cons.setAction(currentRule.action.name);
          obligation.addConsequence(cons);
        }
      }
      policy.addDuty(obligation);
    },
    addProhibitionToPolicy(ruleTreeIndex, policy) {
      let prohibition = new Odrl.Prohibition();
      let firstRule = this.ruleTrees[ruleTreeIndex].rules[0];

      prohibition.setAction(firstRule.action.name);
      prohibition.addConstraint(
        firstRule.action.constraint.leftOperand,
        firstRule.action.constraint.operator,
        firstRule.action.constraint.rightOperand,
        null,
        firstRule.action.constraint.unit,
        null
      );

      for (let k = 1; k < this.ruleTrees[ruleTreeIndex].rules.length; k++) {
        let currentRule = this.ruleTrees[ruleTreeIndex].rules[k];
        if (currentRule.type == RuleTypes.Remedy) {
          let rem = new Odrl.Failure();
          rem.setAction(currentRule.action.name);
          prohibition.addRemedy(rem);
        }
      }
      policy.addProhibition(prohibition);
    }
  }
};
</script>

<style scoped>
.header {
  background-color: white;
  border-bottom: 5px solid gray;
  overflow: hidden;

  padding-bottom: 20px;
  padding-top: 20px;
  width: calc(100% - 116px);
}

.container {
  margin-top: 100px;
}

.licence-name {
  margin-left: 20px;
}

button.float-right {
  float: right;
}

input.guid-input {
  margin-left: 10px;
  width: 175px;
}
</style>