<template>
  <div class="rule-editor">
    <div class="header">
      <BaseButton v-bind:onClick="newPermission">Erlaubnis</BaseButton>
      <BaseButton v-bind:onClick="newObligation">Pflicht</BaseButton>
      <BaseButton v-bind:onClick="newProhibition">Verbot</BaseButton>
      <span class="licence-name">
        GUID der Lizenz:
        <BaseInput undercover v-model="licenceName" class="guid-input"></BaseInput>
      </span>
      <BaseButton class="float-right" big v-bind:onClick="generateLicence">Update Licence</BaseButton>
    </div>
    <div class="container">
      <RuleTreeItem
        v-on:remove-tree="updateTrees($event)"
        v-for="ruleTree in ruleTrees"
        v-bind:ruleTree="ruleTree"
        v-bind:key="ruleTree.id"
      ></RuleTreeItem>
    </div>
    <div>
      <h2>Provisorische Lizenz</h2>
      <pre>{{policy}}</pre>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import Action from "./ActionItem.vue";

import { Rule, RuleTypes, RuleTree } from "../libs/rules/rules.js";
import RuleTreeItem from "./RuleTreeItem.vue";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export default {
  name: "RuleEditor",
  components: {
    BaseButton,
    BaseInput,
    RuleTreeItem
  },
  data: function() {
    return {
      ruleTrees: [],
      nextId: 0,
      licenceName: "007",
      policy: ""
    };
  },
  methods: {
    newPermission: function() {
      this.newRule(RuleTypes.Permission);
    },
    newObligation: function() {
      this.newRule(RuleTypes.Obligation);
    },
    newProhibition: function() {
      this.newRule(RuleTypes.Prohibition);
    },
    newRule: function(type) {
      let newID = this.nextId++;
      let ruleTree = new RuleTree(newID, type);
      ruleTree.rules.push(new Rule(0, type));
      this.ruleTrees.push(ruleTree);
      this.generateLicence();
    },
    updateTrees(tree_id) {
      for (let i = 0; i < this.ruleTrees.length; i++) {
        if (this.ruleTrees[i].id == tree_id) {
          this.ruleTrees[i].rules = [];
          this.ruleTrees.splice(i, 1);
        }
      }
    },
    scrollToEnd: function() {
      // TODO: make this work
      let container = this.$el.querySelector("#container");
      console.log(container);
      container.scrollTop = container.scrollHeight;
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
      for (let i = 0; i < firstRule.action.constraints.length; i++) {
        permission.addConstraint(
          firstRule.action.constraints[i].leftOperand,
          firstRule.action.constraints[i].operator,
          firstRule.action.constraints[i].rightOperandStr,
          null,
          firstRule.action.constraints[i].unit,
          null
        );
      }

      let duties = [];
      for (let k = 1; k < this.ruleTrees[ruleTreeIndex].rules.length; k++) {
        let currentRule = this.ruleTrees[ruleTreeIndex].rules[k];
        if (currentRule.type == RuleTypes.Duty) {
          duties.push(new Odrl.Duty());
          duties[duties.length - 1].setAction(currentRule.action.name);
          for (let l = 0; l < currentRule.action.constraints.length; l++) {
            console.log(currentRule.action);
            duties[duties.length - 1].addConstraint(
              currentRule.action.constraints[l].leftOperand,
              currentRule.action.constraints[l].operator,
              currentRule.action.constraints[l].rightOperandStr,
              null,
              currentRule.action.constraints[l].unit,
              null
            );
          }
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
      for (let l = 0; l < firstRule.action.constraints.length; l++) {
        obligation.addConstraint(
          firstRule.action.constraints[l].leftOperand,
          firstRule.action.constraints[l].operator,
          firstRule.action.constraints[l].rightOperandStr,
          null,
          firstRule.action.constraints[l].unit,
          null
        );
      }
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

      for (let l = 0; l < firstRule.action.constraints.length; l++) {
        prohibition.addConstraint(
          firstRule.action.constraints[l].leftOperand,
          firstRule.action.constraints[l].operator,
          firstRule.action.constraints[l].rightOperandStrStr,
          null,
          firstRule.action.constraints[l].unit,
          null
        );
      }

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

<style>
a {
  text-decoration: none;
  font-weight: bold;
  color: #1f3b70;
}

a:hover,
a:focus {
}
</style>

<style scoped>
ul {
  padding-inline-start: 0px;
}

.header {
  z-index: 100;
  background-color: white;
  border-bottom: 5px solid gray;
  overflow: hidden;
  position: fixed;

  padding-bottom: 20px;
  padding-top: 20px;
  top: 0;
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