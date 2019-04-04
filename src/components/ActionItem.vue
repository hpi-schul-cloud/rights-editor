<template>
  <div class="action-container">
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      v-bind:allowAbort="actionChooserSettings.allowAbort"
      v-on:chosen="hideActionChooser(); action.name=$event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>

    <!-- display and edit action -->
    <BaseButton
      input
      v-bind:value="actionName"
      v-bind:onClick="showActionChooserWithAbort"
      list="actions"
      name="action"
      type="button"
    >{{action.name}}</BaseButton>
    <slot></slot>

    <!-- display and edit constraints -->
    <div class="constraint-container">
      <div class="constraint-text">
        <span>, nur wenn...</span>
      </div>
      <ConstraintItem
        class="constraint-edit"
        v-for="constraint in action.constraints"
        v-bind:key="constraint.id"
        v-bind:constraint="constraint"
        v-on:constraint-chosen="setConstraint($event)"
        v-on:constraint-edited="editConstraint($event)"
        v-on:remove-constraint="removeConstraint($event)"
      ></ConstraintItem>

      <!-- add new constraint -->
      <BaseButton
        class="constraint-add"
        v-bind:onClick="showConstraintChooser"
      >Einschränkung hinzufügen</BaseButton>
      <ConstraintChooser
        v-if="displayConstraintChooser"
        v-on:chosen="setConstraint($event)"
        v-on:abort="hideConstraintChooser()"
      ></ConstraintChooser>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import { Constraint } from "../libs/constraints/constraints";
import BaseButton from "./BaseButton.vue";
import ConstraintItem from "./ConstraintItem";
import ConstraintChooser from "./ConstraintChooser.vue";
import ActionChooser from "./ActionChooser.vue";

export class Action {
  constructor(name, nsVocabUri) {
    this.name = name;
    this.nsVocabUri = nsVocabUri;
    this.constraints = new Array();
  }

  name() {
    return this.nsVocabUri.split("/").pop();
  }
}

export default {
  name: "ActionItem",
  components: {
    ConstraintItem,
    ConstraintChooser,
    ActionChooser,
    BaseButton
  },
  data: function() {
    return {
      nextId: 0,
      constraints: [],
      displayConstraintChooser: false,
      actionChooserSettings: {
        displayActionChooser: false,
        allowAbort: true
      }
    };
  },
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  mounted: function() {
    this.showActionChooser(false);
  },
  methods: {
    showActionChooserWithAbort: function() {
      this.showActionChooser(true);
    },
    showActionChooser: function(allowAbort) {
      this.actionChooserSettings.displayActionChooser = true;
      this.actionChooserSettings.allowAbort = allowAbort;
    },
    hideActionChooser: function() {
      this.actionChooserSettings.displayActionChooser = false;
      this.actionChooserSettings.allowAbort = true;
    },
    showConstraintChooser: function() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser: function() {
      this.displayConstraintChooser = false;
    },
    setConstraint: function(constraint) {
      constraint.id = this.nextId;
      this.action.constraints.push(constraint);
      this.nextId++;
      this.hideConstraintChooser();
    },
    editConstraint: function(constraint) {
      this.action.constraints[constraint.id] = constraint;
      this.$forceUpdate();
    },
    removeConstraint: function(id) {
      for (let i = 0; i < this.action.constraints.length; i++) {
        if (this.action.constraints[i].id == id) {
          this.action.constraints.splice(i, 1);
        }
      }
    }
  },
  computed: {
    actionName: function() {
      return this.action.name;
    }
  }
};
</script>

<style scoped>
.action-container {
  display: inline;
}

.constraint-container {
  display: inline;
}

.constraint-text {
  display: inline;
  margin-right: 10px;
}

.constraint-edit {
  margin: 0px;
  padding: 0px;
}

.constraint-add {
  display: block;
  margin-top: 10px;
  margin-left: 0px;
}
</style>
