<template>
  <li class="rule-tree-li">
    <RuleItem
      v-on:remove-rule-event="updateRules($event)"
      v-for="rule in ruleTree.rules"
      v-bind:rule="rule"
      v-bind:key="rule.id"
      v-bind:style="{ marginLeft: getRuleMargin(rule.id) + 'px', paddingLeft: 10 + 'px' }"
    ></RuleItem>

    <div class="addon-container" v-if="getPossibleAddons() != null">
      <p>Füge optional Erweiterungen hinzu:</p>
      <ul class="addon-ul">
        <li v-for="(addon, index) in getPossibleAddons()" v-bind:key="index" v-bind:value="addon">
          <BaseButton
            v-bind:onClickParam="addon.name"
            v-bind:onClick="createAddon"
          >{{addon.name}} hinzufügen</BaseButton>
          <div class="addon-info">({{addon.descr}})</div>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import RuleItem, { Rule, RuleTypes } from "./RuleItem.vue";
import BaseButton from "./BaseButton.vue";

export class RuleTree {
  constructor(id, type) {
    this.id = id;
    this.rules = [];
  }
}

class Addon {
  constructor(name, descr) {
    this.name = name;
    this.descr = descr;
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
      nextId: 1,
      leftMarginFactor: 30
    };
  },
  props: {
    ruleTree: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateRules(id) {
      for (let i = 0; i < this.ruleTree.rules.length; i++) {
        if (this.ruleTree.rules[i].id == id) {
          if (i == 0) {
            this.ruleTree.rules.splice(i, this.ruleTree.rules.length);
          } else {
            this.ruleTree.rules.splice(i, 1);
          }
        }
      }
      let bCount = 0;
      let cCount = 0;
      for (let i = 0; i < this.ruleTree.rules.length; i++) {
        if (this.ruleTree.rules[i].id[0] == "b") {
          bCount++;
        } else if (this.ruleTree.rules[i].id[0] == "c") {
          cCount++;
        }
      }
      if (bCount == 0 && cCount > 0) {
        this.ruleTree.rules.splice(1, this.ruleTree.rules.length);
      }
      if (this.ruleTree.rules.length == 0) {
        this.$emit("remove-tree-event", this.ruleTree.id);
      }
    },
    getRuleMargin(id) {
      let x = -1;
      if (id[0] == "b") {
        x = 0;
      } else if (id[0] == "c") {
        x = 1;
      }
      return x * this.leftMarginFactor;
    },
    getPossibleAddons: function() {
      let addon = [];
      let dutyAdded = false;
      let remedyAdded = false;
      let consequenceAdded = false;
      for (let i = 0; i < this.ruleTree.rules.length; i++) {
        if (!dutyAdded && this.ruleTree.rules[i].type == RuleTypes.Permission) {
          addon.push(
            new Addon(
              "Verpflichtung",
              "erlaubt wird dann nur, wenn alle Verpflichtungen erfüllt sind"
            )
          );
          dutyAdded = true;
        } else if (
          !remedyAdded &&
          this.ruleTree.rules[i].type == RuleTypes.Prohibition
        ) {
          addon.push(
            new Addon(
              "Strafe",
              "muss geleistet werden, falls das Verbot missachtet wird"
            )
          );
          remedyAdded = true;
        } else if (
          !consequenceAdded &&
          this.ruleTree.rules[i].type == RuleTypes.Duty
        ) {
          addon.push(
            new Addon(
              "Konsequenz",
              "muss geleistet werden, falls die Verpflichtungen nicht alle erfüllt sind"
            )
          );
          consequenceAdded = true;
        }
      }
      return addon;
    },
    createAddon(name) {
      let dutyType = null;
      let char = "";
      if (name == "Konsequenz") {
        dutyType = RuleTypes.Consequence;
        char = "c";
      } else if (name == "Verpflichtung") {
        dutyType = RuleTypes.Duty;
        char = "b";
      } else if (name == "Strafe") {
        dutyType = RuleTypes.Remedy;
        char = "b";
      }
      if (dutyType != null) {
        let newID = this.nextId++;
        this.ruleTree.rules.push(new Rule(char + newID, dutyType));
        this.ruleTree.rules.sort((a, b) =>
          a.id > b.id ? 1 : a.id < b.id ? -1 : 0
        );
      }
    }
  }
};
</script>

<style>
.addon-container {
  margin-top: 35px;
  margin-bottom: 20px;
  margin-left: -20px;
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
  border: 1px solid DarkGray;
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
</style>
