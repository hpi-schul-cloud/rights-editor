<template>
  <div class="rule-editor">
    <div>
      <input class="under-cover" v-model="licenceName" placeholder="Name der Lizenz">
    </div>
    <hr>
    <div id="container" style="max-height:600px; overflow-y: auto;">
      <ul>
        <RuleTreeItem
          v-on:remove-tree-event="updateTrees($event)"
          v-for="ruleTree in ruleTrees"
          v-bind:ruleTree="ruleTree"
          v-bind:key="ruleTree.id"
        ></RuleTreeItem>
      </ul>
    </div>
    <BaseButton v-bind:onClick="newPermission">Erlaubnis</BaseButton>
    <BaseButton v-bind:onClick="newObligation">Verpflichtung</BaseButton>
    <BaseButton v-bind:onClick="newProhibition">Verbot</BaseButton>
    <hr>
    <BaseButton style="margin-bottom: 50px;" big v-bind:onClick="generateLicence">Generate Licence</BaseButton>
    <pre class="json-textarea">{{policy}}</pre>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
import Action from "./ActionItem.vue";

import { Rule, RuleTypes } from "./RuleItem.vue";
import RuleTreeItem, { RuleTree } from "./RuleTreeItem.vue";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export default {
  name: "RuleEditor",
  components: {
    BaseButton,
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
      this.scrollToEnd();
    },
    updateTrees(tree_id) {
      for (let i = 0; i < this.ruleTrees.length; i++) {
        if (this.ruleTrees[i].id == tree_id) {
          this.ruleTrees[i].rules = [];
          this.ruleTrees.splice(i, 1);
        }
      }
      this.scrollToEnd();
    },
    scrollToEnd: function() {    	
      let container = this.$el.querySelector("#container");
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

<style>
ul {
  padding-inline-start: 0px;
}

.fas-left {  
  margin-right: 8px;
}

.fas-right {
  margin-left: 8px;
}

.json-textarea {
  width: 800px;
  height: 400px;
  resize: none;
  border: 1px solid gray;
}
</style>