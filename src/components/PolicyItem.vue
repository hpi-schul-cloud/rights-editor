<template>
  <div>
    <div>
      <b>ID der Lizenz:</b>
      <BaseInput v-model="policy['uid']" undercover class="id-input"/>
    </div>

    <div class="asset-container">
      <BaseButton @click="switchAssetType()" textlike>
        <i class="fas fa-caret-left"></i>
      </BaseButton>

      <div class="asset-label-container"><b>{{ assetLabel }}:</b></div>

      <BaseButton @click="switchAssetType()" textlike>
        <i class="fas fa-caret-right"></i>
      </BaseButton>

      <br>
      <BaseInput v-model="assetId" undercover class="asset-input"/>
    </div>

    <div class="constraints-container">
      <h2>Global geltende Einschränkungen hinzufügen...</h2>Die Lizenz gilt nur, wenn
      <em v-if="isLogicalConstraint && logicalConstraintOperatorText == 'ODER'">entweder</em>

      <ul>
        <li v-for="(constraint, index) in constraints" :key="index">
          <ConstraintItem :policy="policy" :path="[...constraintPath, index]"/>
          <BaseButton
            v-if="isLogicalConstraint && index < constraints.length - 1"
            textlike
            class="logical-operator"
            @click="nextLogicalConstraintOperator()"
          >{{ logicalConstraintOperatorText }}</BaseButton>
        </li>
      </ul>

      <!-- add new constraint -->
      <BaseButton class="add-constraint" type="button" @click="addConstraint()">
        <i class="fas fa-plus"/>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BaseInput from "./BaseInput.vue";
import BaseChooser from "./BaseChooser.vue";
import BaseButton from "./BaseButton.vue";
import ConstraintItem from "./ConstraintItem.vue";
import {
  operandList,
  operandMapping,
  operatorList,
  logicalOperatorList
} from "../libs/odrl/constraints";

export default {
  name: "PolicyItem",
  components: {
    BaseInput,
    BaseButton,
    BaseChooser,
    ConstraintItem
  },
  props: {
    policy: {
      type: Object,
      required: true
    }
  },
  computed: {
    constraints() {
      if (!this.policy.constraint) {
        return null;
      }
      if (this.isLogicalConstraint) {
        return this.policy.constraint[this.logicalConstraintOperatorShort][
          "@list"
        ];
      }
      return this.policy.constraint;
    },
    isLogicalConstraint() {
      // if policy.constraint is an array, that means that only one refinement has been added
      // otherwise policy.refinement is an object containting a logical operator,
      // which is an object containing a list, which is an array containting more than one refinement instances
      return !Array.isArray(this.policy.constraint);
    },
    constraintPath() {
      if (this.isLogicalConstraint) {
        return ["constraint", this.logicalConstraintOperatorShort, "@list"];
      }
      return ["constraint"];
    },
    opList() {
      const filteredOperands = operandList.filter(
        (value, index, arr) =>
          value != "Nutzungsdauer" &&
          value != "Nutzeranzahl" &&
          value != "Speichermedium" &&
          value != "Anteil" &&
          value != "Anzahl" &&
          value != "Auflösung" &&
          value != "Teilnehmer" &&
          value != "Verbreitungsmethode" &&
          value != "Dateiformat"
      );
      return filteredOperands;
    },
    opMapping() {
      return operandMapping;
    },
    logicalConstraintOperatorText() {
      if (!this.policy.constraint) {
        return null;
      }

      return logicalOperatorList[this.logicalConstraintOperatorShort].text;
    },
    logicalConstraintOperatorShort() {
      if (!this.policy.constraint) {
        return null;
      }

      const op = Object.keys(this.policy.constraint)[0];
      if (op == undefined) {
        return Object.keys(logicalOperatorList)[0];
      }
      return op;
    },
    assetIsString() {
      return typeof this.policy.target == "string";
    },
    assetLabel() {
      if (this.assetIsString) {
        return "Medieninhalt";
      }
      return "Inhaltesammlung";
    },
    assetId: {
      get() {
        if (this.assetIsString) {
          return this.policy.target;
        }
        return this.policy.target.uid;
      },
      set(id) {
        if (this.assetIsString) {
          this.policy.target = id;
        } else {
          this.policy.target.uid = id;
        }
      }
    }
  },
  methods: {
    // constraints
    addConstraint() {
      if (!this.constraints) {
        Vue.set(this.policy, "constraint", []);
      }

      // make use of the logical operator to combine more than one constraint
      if (this.constraints.length == 1) {
        const constraint = this.constraints;
        Vue.set(this.policy, "constraint", {});
        Vue.set(this.policy.constraint, this.logicalConstraintOperatorShort, {
          "@list": constraint
        });
      }

      this.constraints.push(null);
    },
    nextLogicalConstraintOperator() {
      const list = this.policy.constraint[this.logicalConstraintOperatorShort];
      const oldOp = this.logicalConstraintOperatorShort;

      Vue.delete(this.policy.constraint, this.logicalConstraintOperatorShort);

      const keys = Object.keys(logicalOperatorList);
      // get the index of the current operator
      const index = keys.indexOf(oldOp);
      // the new logical operator is just the next one in the list
      const nextOp = keys[(index + 1) % keys.length];

      Vue.set(this.policy.constraint, nextOp, list);
    },

    // assets
    switchAssetType() {
      if (this.assetIsString) {
        Vue.set(this.policy, "target", {
          "@type": "AssetCollection",
          uid: this.assetId
        });
      } else {
        Vue.set(this.policy, "target", this.assetId);
      }
    }
  }
};
</script>

<style scoped>
.id-input {
  margin-left: 15px;
  width: 175px;
}

.asset-container {
  margin-bottom: 25px;
  margin-left: -30px;
}

.asset-input {
  margin-left: 20px;
  margin-top: 0px;
  width: 195px;
}

.asset-label-container {
  display: inline-block; 
  width: 125px;
}

.base-button-textlike {
  padding-top: 5px;
  padding-bottom: 5px;
}

.constraints-container {
  margin-top: 40px;
}

.add-constraint {
  margin-left: 0px;
  margin-bottom: 20px;
  padding: 10px 15px;
}

.logical-operator {
  text-decoration: none;
  padding: 8px;
  margin: 2px;
  font-weight: bold;
  color: #1f3b70;

  /* disable text selection highlighting */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.logical-operator:hover {
  cursor: pointer;
}
</style>
