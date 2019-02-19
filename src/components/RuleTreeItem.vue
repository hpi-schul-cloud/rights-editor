<template>
  <li class="rule-tree-li">
    <RuleItem
      v-on:remove-rule-event="updateRules($event)"
      v-for="(rule, index) in ruleTree.rules"
      v-bind:rule="rule"
      v-bind:key="index"
      v-bind:style="{ marginLeft: ((index-1) * 25) + 'px' }"
    ></RuleItem>

    <div class="addon-container"
      v-if="getPossibleAddons() != null">
      <p>Füge optional eine Erweiterung hinzu:</p>
      <ul class="addon-ul">
        <li v-for="(addon, index) in getPossibleAddons()" v-bind:key="index" v-bind:value="addon">
          <BaseButton v-bind:onClick="createAddon">{{addon[0]}} hinzufügen</BaseButton>
          <div class="addon-info">({{addon[1]}})</div>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import RuleItem, { Rule, RuleTypes } from "./RuleItem.vue";
import BaseButton from "./BaseButton.vue";

export class RuleTree {
  constructor(id, title, type) {
    this.id = id;
    this.title = title;
    this.rules = [];
  }
}

export default {
  name: "RuleTreeItem",
  components: {
    RuleItem,
    BaseButton
  },
  data: function() {
    return {
      nextId: 1
    };
  },
  props: {
    ruleTree: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateRules(rule_id) {
      for (let i = 0; i < this.ruleTree.rules.length; i++) {
        if (this.ruleTree.rules[i].id == rule_id) {
          this.ruleTree.rules.splice(i, this.ruleTree.rules.length - i);
        }
      }
      if (this.ruleTree.rules.length == 0) {
        this.$emit("remove-tree-event", this.ruleTree.id);
      }
    },
    getPossibleAddons: function() {
      let lastRule = this.ruleTree.rules[this.ruleTree.rules.length - 1];
      if (lastRule.type["name"] == "Erlaubnis") {
        return [
          [
            "Verpflichtung",
            "erlaubt wird dann nur, wenn die Verpflichtung erfüllt ist"
          ]
        ];
      } else if (lastRule.type["name"] == "Verpflichtung") {
        return [["Konsequenz", "falls die Verpflichtung nicht erfüllt wird"]];
      } else if (lastRule.type["name"] == "Verbot") {
        return [["Strafe", "falls das Verbot missachtet wird"]];
      }
      return null;
    },
    createAddon() {
      let dutyType;
      let lastRule = this.ruleTree.rules[this.ruleTree.rules.length - 1];
      if (lastRule.type["name"] == "Erlaubnis") {
        dutyType = RuleTypes.Duty;
      } else if (lastRule.type["name"] == "Verpflichtung") {
        dutyType = RuleTypes.Consequence;
      } else if (lastRule.type["name"] == "Verbot") {
        dutyType = RuleTypes.Remedy;
      }
      let newID = this.nextId++;
      this.ruleTree.rules.push(new Rule(newID, dutyType));
    }
  }
};
</script>

<style>
.addon-container {
  margin-bottom: 20px;
}

.addon-ul {
  margin-left: 0px !important;
  padding-inline-start: 0px !important;
}

.addon-info {
  display: inline-block;
  font-size: 0.9em;
}

.rule-tree-li {
  border: 1px solid DarkGray;;
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
</style>
