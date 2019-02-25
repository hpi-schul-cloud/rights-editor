<template>
  <div class="rule-editor">
    <div>
      <input class="under-cover" placeholder="Name der Lizenz">
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
    <div style="min-height: 150px; border: dotted black 1px"><i>divider</i></div>
    <ChooserEditor></ChooserEditor>
    <div style="min-height: 150px;"></div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
import Action from "./ActionItem.vue";
import { Rule, RuleTypes } from "./RuleItem.vue";
import ChooserEditor from "./ChooserEditor"
import RuleTreeItem, { RuleTree } from "./RuleTreeItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";

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
      // TODO: generate json file from input
      let policyGUID = "policy_guid";
      let policy = new Odrl.Policy(policyGUID, "set");
      let permissions = new Array();
      let duties = new Array();
      let prohibitions = new Array();

      for (let i = 0; i < this.ruleTrees.length; ++i) {
        let action =
          "action_" +
          this.ruleTrees[i].title +
          "_" +
          this.ruleTrees[i].action.nsVocabUri;
        let targetAsset = "target_asset";
        let constraint = this.ruleTrees[i].action.constraint;
        let assigner = "assignerParty";
        let assignee = "assigneeParty";

        if (this.ruleTrees[i].type == RuleTypes.Prohibition) {
          let prohibition = new Odrl.Prohibition();
          prohibition.setAction(action);
          prohibition.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
          prohibition.addConstraint(
            constraint.leftOperand,
            constraint.operator,
            constraint.rightOperand,
            "",
            "",
            ""
          );
          prohibition.addParty(
            assigner,
            Vocab.PartyRolesCV.assigner,
            Vocab.PartyRoleScopesCV.individual
          );
          prohibition.addParty(
            assignee,
            Vocab.PartyRolesCV.assignee,
            Vocab.PartyRoleScopesCV.individual
          );
          prohibitions.push(prohibition);
        } else if (this.ruleTrees[i].type == RuleTypes.Duty) {
          let duty = new Odrl.Duty();
          duty.setAction(action);
          duty.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
          duty.addConstraint(
            constraint.leftOperand,
            constraint.operator,
            constraint.rightOperand,
            "",
            "",
            ""
          );
          duty.addParty(
            assigner,
            Vocab.PartyRolesCV.assigner,
            Vocab.PartyRoleScopesCV.individual
          );
          duty.addParty(
            assignee,
            Vocab.PartyRolesCV.assignee,
            Vocab.PartyRoleScopesCV.individual
          );
          duties.push(duty);
        } else if (this.ruleTrees[i].type == RuleTypes.Permission) {
          let permission = new Odrl.Permission();
          permission.setAction(action);
          permission.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
          permission.addConstraint(
            constraint.leftOperand,
            constraint.operator,
            constraint.rightOperand,
            "",
            "",
            ""
          );
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
          permissions.push(permission);
        }
      }

      for (let i = 0; i < prohibitions.length; ++i) {
        policy.addProhibition(prohibitions[i]);
      }

      for (let i = 0; i < permissions.length; ++i) {
        policy.addPermission(permissions[i]);
      }

      for (let i = 0; i < duties.length; ++i) {
        // TODO: add duty to licence
        /**
         * Method for adding a duty to the Permission
         * @method addParty
         * @param {Duty} newDuty A duty instance
         */
      }

      let outStr = policy.serializeJson();
      console.log(outStr);
      outStr = policy.serializeXml();
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