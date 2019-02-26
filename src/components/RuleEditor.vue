<template>
  <div class="rule-editor">
    <div>
      <input id="licence-name" class="under-cover" placeholder="Name der Lizenz">
    </div>
    <template v-if="ruleTrees.length > 0">
      <BaseButton v-bind:onClick="newPermission">Erlaubnis hinzufügen</BaseButton>
      <BaseButton v-bind:onClick="newDuty">Verpflichtung hinzufügen</BaseButton>
      <BaseButton v-bind:onClick="newProhibition">Verbot hinzufügen</BaseButton>
    </template>
    <ul>
      <RuleTreeItem
        v-on:remove-tree-event="updateTrees($event)"
        v-for="ruleTree in ruleTrees"
        v-bind:ruleTree="ruleTree"
        v-bind:key="ruleTree.id"
      ></RuleTreeItem>
    </ul>
    <BaseButton v-bind:onClick="newPermission">Erlaubnis hinzufügen</BaseButton>
    <BaseButton v-bind:onClick="newDuty">Verpflichtung hinzufügen</BaseButton>
    <BaseButton v-bind:onClick="newProhibition">Verbot hinzufügen</BaseButton>
    <hr>
    <BaseButton big v-bind:onClick="generateLicence">Generate Licence</BaseButton>
    <div style="min-height: 150px; border: dotted black 1px">
      <i>divider</i>
    </div>
    <ChooserEditor></ChooserEditor>
    <div style="min-height: 150px;"></div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
import Action from "./ActionItem.vue";

import { Rule, RuleTypes } from "./RuleItem.vue";
import ChooserEditor from "./ChooserEditor";
import RuleTreeItem, { RuleTree } from "./RuleTreeItem.vue";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export default {
  name: "RuleEditor",
  components: {
    BaseButton,
    RuleTreeItem,
    ChooserEditor
  },
  data: function() {
    return {
      ruleTrees: [],
      nextId: 1
    };
  },
  methods: {
    newPermission: function() {
      this.newRule(RuleTypes.Permission);
    },
    newDuty: function() {
      this.newRule(RuleTypes.Duty);
    },
    newProhibition: function() {
      this.newRule(RuleTypes.Prohibition);
    },
    newRule: function(original) {
      let newID = this.nextId++;
      let ruleTree = new RuleTree(newID, "Regel " + newID, original);
      ruleTree.rules.push(new Rule(0, original));
      this.ruleTrees.push(ruleTree);
    },
    updateTrees(tree_id) {
      for (let i = 0; i < this.ruleTrees.length; i++) {
        if (this.ruleTrees[i].id == tree_id) {
          this.ruleTrees[i].rules = [];
          this.ruleTrees.splice(i, 1);
        }
      }
    },
    generateLicence() {
      let licenceName = document.getElementById("licence-name").value;
      let policyGUID = "";
      if (licenceName == "") {
        policyGUID = "001";
      } else {
        policyGUID = licenceName;
      }

      let policy = new Odrl.Policy(policyGUID, "set");
      let targetAsset = "target_asset";
      let assigner = "assigner_party";
      let assignee = "assignee_party";
      
      let duty = new Array();
      let prohibition = new Odrl.Prohibition();

      for (let i = 0; i < this.ruleTrees.length; i++) {
        for (let j = 0; j < this.ruleTrees[i].rules.length; j++) {          
          let currentRule = this.ruleTrees[i].rules[j];
          let constraint = currentRule.action.constraint;

          // permission:
          if (currentRule.type == RuleTypes.Permission) {
            console.log(currentRule.action.name);

            let permission = new Odrl.Permission();
            permission.setAction(currentRule.action.name);
            permission.addConstraint(
              constraint.leftOperand,
              constraint.operator,
              constraint.rightOperand,
              null,
              constraint.unit,
              null
            );
            permission.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
            permission.addParty(
              assigner,
              Vocab.PartyRolesCV.assigner,
              Vocab.PartyRoleScopesCV.individual
            );
            permission.addParty(
              assignee,
              Vocab.PartyRolesCV.assignee,
              Vocab.PartyRoleScopesCV.individual
            );

            policy.addPermission(permission);
          }
        }
      }

      let outStr = policy.serializeJson();
      console.log(outStr);
    }
  }
};
</script>

<style>
ul {
  padding-inline-start: 0px;
}
</style>