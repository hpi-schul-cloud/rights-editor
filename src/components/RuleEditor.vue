<template>
  <div class="rule-editor">
    <template v-if="rules.length > 0">
      <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
      <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
      <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
    </template>
    <ul>
      <RuleItem
        v-on:remove-rule-event="updateRules($event)"
        v-for="rule in rules"
        v-bind:rule="rule"
        v-bind:key="rule.id"
      ></RuleItem>
    </ul>
    <button class="new-rule-button" v-on:click="newPermission">Erlaubnis hinzufügen</button>
    <button class="new-rule-button" v-on:click="newDuty">Verpflichtung hinzufügen</button>
    <button class="new-rule-button" v-on:click="newProhibition">Verbot hinzufügen</button>
    <hr>
    <button class="big-button" v-on:click="generateLicence()">Generate Licence</button>
  </div>
</template>

<script>
import Action from "./ActionItem.vue";
import RuleItem, { Rule, RuleTypes } from "./RuleItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import { Odrl } from "../libs/rightsml-lib-js/ODRLclasses";

export default {
  name: "RuleEditor",
  components: {
    RuleItem
  },
  data: function() {
    return {
      rules: [],
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
      let ruleCount = this.rules.length + 1;
      this.rules.push(
        new Rule("Regel " + ruleCount, this.rules.length, original)
      );
      console.log("emit rules changed");
      this.$emit("rules-changed", this.rules);
    },
    updateRules(rule_id) {
      for (let i = 0; i < this.rules.length; ++i) {
        if (this.rules[i].id == rule_id) {
          this.rules.splice(i, 1);
        }
      }
      console.log("emit rules changed");
      this.$emit("rules-changed", this.rules);
    },
    generateLicence() {
      console.log("Hello from GenerateLicense")
      // TODO: generate json file from input
      let policyGUID = "policy_guid";
      let policy = new Odrl.Policy(policyGUID, "set");
      let permissions = new Array();
      let duties = new Array();
      let prohibitions = new Array();

      for (let i = 0; i < this.rules.length; ++i) {

        let action = "action_" + this.rules[i].title + "_" + this.rules[i].action.nsVocabUri;
        let targetAsset = "target_asset";
        let constraint = this.rules[i].action.constraint;
        let assigner = "assignerParty";
        let assignee = "assigneeParty";

        if (this.rules[i].type == RuleTypes.Prohibition) 
        {          
          let prohibition = new Odrl.Prohibition();
          prohibition.setAction(action);
          prohibition.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
          prohibition.addConstraint(constraint.leftOperand, constraint.operator, constraint.rightOperand, "", "", "");
          prohibition.addParty(assigner, Vocab.PartyRolesCV.assigner, Vocab.PartyRoleScopesCV.individual);
          prohibition.addParty(assignee, Vocab.PartyRolesCV.assignee, Vocab.PartyRoleScopesCV.individual);
          prohibitions.push(prohibition);
        } 
        else if (this.rules[i].type == RuleTypes.Duty) 
        {
          let duty = new Odrl.Duty();
          duty.setAction(action);
          duty.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
          duty.addConstraint(constraint.leftOperand, constraint.operator, constraint.rightOperand, "", "", "");
          duty.addParty(assigner, Vocab.PartyRolesCV.assigner, Vocab.PartyRoleScopesCV.individual);
          duty.addParty(assignee, Vocab.PartyRolesCV.assignee, Vocab.PartyRoleScopesCV.individual);
          duties.push(duty);
        } 
        else if (this.rules[i].type == RuleTypes.Permission) 
        {
          let permission = new Odrl.Permission();
          permission.setAction(action);
          permission.addAsset(targetAsset, Vocab.AssetRelationsCV.target);
          permission.addConstraint(constraint.leftOperand, constraint.operator, constraint.rightOperand, "", "", "");
          permission.addParty(assigner, Vocab.PartyRolesCV.assigner, Vocab.PartyRoleScopesCV.individual);
          permission.addParty(assignee, Vocab.PartyRolesCV.assignee, Vocab.PartyRoleScopesCV.individual);
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
</style>