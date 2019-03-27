<template>
  <li class="rule-tree-li">
    <RuleItem
      v-on:remove-rule="updateRules($event)"
      v-for="rule in ruleTree.rules"
      v-bind:rule="rule"
      v-bind:key="rule.id"
      v-bind:style="{ marginLeft: getRuleMargin(rule.type) + 'px', paddingLeft: 10 + 'px' }"
    ></RuleItem>

    <div class="addon-container" v-if="getPossibleAddons() != null">
      <p>Füge optional Erweiterungen hinzu:</p>
      <ul class="addon-ul">
        <li v-for="(addon, index) in getPossibleAddons()" v-bind:key="index" v-bind:value="addon">
          <BaseButton v-bind:name="addon.name" v-bind:onClick="createAddon">{{addon.name}}</BaseButton>
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
            let deleteCount = 1;
            let r = this.ruleTree.rules[i];
            if (r.type == RuleTypes.Duty) {
              for (let j = i + 1; j < this.ruleTree.rules.length; j++) {
                if (this.ruleTree.rules[j].type != RuleTypes.Consequence) {
                  break;
                }
                if (this.ruleTree.rules[j].type == RuleTypes.Consequence) {
                  deleteCount++;
                }
              }
            }
            this.ruleTree.rules.splice(i, deleteCount);
          }
        }
      }
      if (this.ruleTree.rules.length == 0) {
        this.$emit("remove-tree", this.ruleTree.id);
      }
    },
    getRuleMargin(type) {
      let x = -1;
      if (type == RuleTypes.Duty || type == RuleTypes.Remedy) {
        x = 0;
      } else if (type == RuleTypes.Consequence) {
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
          (this.ruleTree.rules[i].type == RuleTypes.Duty ||
            this.ruleTree.rules[i].type == RuleTypes.Obligation)
        ) {
          addon.push(
            new Addon(
              "Konsequenz",
              "muss geleistet werden, falls die dazugehörige Verpflichtung nicht erfüllt wird"
            )
          );
          consequenceAdded = true;
        }
      }
      return addon;
    },
    createAddon(event) {
      let name = event.target.name;
      let dutyType = null;
      if (name == "Konsequenz") {
        dutyType = RuleTypes.Consequence;
      } else if (name == "Verpflichtung") {
        dutyType = RuleTypes.Duty;
      } else if (name == "Strafe") {
        dutyType = RuleTypes.Remedy;
      }
      if (dutyType != null) {
        let newID = this.nextId++;
        this.ruleTree.rules.push(new Rule(newID, dutyType));
      }
    }
  }
};
</script>

<style scoped>
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
