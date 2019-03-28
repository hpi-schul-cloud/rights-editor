<template>
  <div>
    <ActionChooser
      v-if="actionChooserSettings.displayActionChooser"
      v-bind:allowAbort="actionChooserSettings.allowAbort"
      v-on:chosen="hideActionChooser(); action.name=$event"
      v-on:abort="hideActionChooser()"
    ></ActionChooser>Aktion:
    <div>
      <BaseButton
        input
        v-bind:width="'600px'"
        v-bind:value="actionName"
        v-bind:onClick="showActionChooserWithAbort"
        list="actions"
        name="action"
        type="button"
      >{{this.action.name}}</BaseButton>
      <br>
      <ConstraintItem
        v-for="constraint in constraints"
        v-bind:key="constraint.id"
        v-bind:constraint="constraint"
        v-on:constraint-chosen="setConstraint($event)"
        v-on:remove-constraint="removeConstraint($event)"
      ></ConstraintItem>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import { Constraint } from "../libs/ODRL/constraint";
import BaseButton from "./BaseButton.vue";
import ConstraintItem from "./ConstraintItem";
import ActionChooser from "./ActionChooser.vue";

export default {
  name: "ActionItem",
  components: {
    ConstraintItem,
    ActionChooser,
    BaseButton
  },
  data: function() {
    return {
      nextId: 0,
      constraints: [],
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
  created: function() {
    this.constraints.push(new Constraint(this.nextId));
    this.nextId++;
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
    setConstraint: function(constraint) {
      constraint.id = this.nextId;
      this.action.constraint = constraint;
      this.constraints.push(constraint);
      this.nextId++;
    },
    removeConstraint: function(id) {
      for (let i = 0; i < this.constraints.length; i++) {
        if (this.constraints[i].id == id) {
          this.constraints.splice(i, 1);
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
