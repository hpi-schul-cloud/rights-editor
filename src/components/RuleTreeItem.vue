<template>
  <div class="tree-container">
    <RuleItem
      v-for="rule in ruleTree.rules"
      :key="rule.id"
      :rule="rule"
      @remove-rule="updateRules($event)"
    />

    <div
      v-if="getPossibleAddons() != null"
      class="addon-container"
    >
      <i>Optional können folgende Erweiterungen hinzugefügt werden:</i>
      <br>
      <ul class="addon-ul">
        <li
          v-for="(addon, index) in getPossibleAddons()"
          :key="index"
          :value="addon"
        >
          Eine
          <BaseButton
            class="addon-button"
            :name="addon.name"
            :on-click="createAddon"
          >
            {{ addon.name }}
          </BaseButton>
          <!-- TODO: link to the parent rule -->
          <div class="addon-info">
            {{ addon.descriptionBefore }} <a href="#">
              {{ addon.descriptionLink }}
            </a> {{ addon.descriptionAfter }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Rule, RuleTypes, RuleTree } from '../libs/rules/rules.js';
import RuleItem from './RuleItem.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'RuleTreeItem',
  components: {
    RuleItem,
    BaseButton,
  },
  props: {
    ruleTree: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nextId: 1,
      leftMarginFactor: 30,
    };
  },
  methods: {
    updateRules(id) {
      for (let i = 0; i < this.ruleTree.rules.length; i++) {
        if (this.ruleTree.rules[i].id == id) {
          if (i == 0) {
            this.ruleTree.rules.splice(i, this.ruleTree.rules.length);
          } else {
            let deleteCount = 1;
            const r = this.ruleTree.rules[i];
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
        this.$emit('remove-tree', this.ruleTree.id);
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
    getPossibleAddons() {
      const addon = [];
      let dutyAdded = false;
      let remedyAdded = false;
      let consequenceAdded = false;
      for (let i = 0; i < this.ruleTree.rules.length; i++) {
        if (!dutyAdded && this.ruleTree.rules[i].type == RuleTypes.Permission) {
          addon.push(RuleTypes.Duty);
          dutyAdded = true;
        } else if (
          !remedyAdded
          && this.ruleTree.rules[i].type == RuleTypes.Prohibition
        ) {
          addon.push(RuleTypes.Remedy);
          remedyAdded = true;
        } else if (
          !consequenceAdded
          && (this.ruleTree.rules[i].type == RuleTypes.Duty
            || this.ruleTree.rules[i].type == RuleTypes.Obligation)
        ) {
          addon.push(RuleTypes.Consequence);
          consequenceAdded = true;
        }
      }
      return addon;
    },
    createAddon(event) {
      const name = event.target.name;
      let dutyType = null;
      if (name == 'Konsequenz') {
        dutyType = RuleTypes.Consequence;
      } else if (name == 'Pflicht') {
        dutyType = RuleTypes.Duty;
      } else if (name == 'Strafe') {
        dutyType = RuleTypes.Remedy;
      }
      if (dutyType != null) {
        const newID = this.nextId++;
        this.ruleTree.rules.push(new Rule(newID, dutyType));
      }
    },
  },
};
</script>

<style scoped>
.tree-container {
  padding: 10px;
}

.addon-container {
  margin-top: 35px;
}

.addon-ul {
  margin-left: 0px;
  padding-inline-start: 0px;
}

.addon-info {
  display: inline-block;
}

.addon-button {
  margin-left: 6px;
}
</style>
