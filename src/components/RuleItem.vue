<template>
  <div class="container">
    <!-- header with title and remove button -->
    <div class="header">
      <b>
        {{ rule.type.name }}
        <i :class="rule.type.icon" />
      </b>
      <BaseButton
        remove
        class="remove-button"
        :on-click="removeRule"
      >
        <i class="far fa-trash-alt" />
      </BaseButton>
    </div>

    <!-- display action -->
    Das
    <ActionItem :action="rule.action" />
    {{ rule.type.descriptionBefore }}
    <a href="#">
      {{ rule.type.descriptionLink }}
    </a>
    {{ rule.type.descriptionAfter }}

    <!-- add new refinement -->
    <br>
    <br>Das
    <a href="#">
      {{ rule.action.name }}
    </a> darf nur auf die folgende Art und Weise erfolgen...
    <br>
    <BaseButton
      class="add-button"
      :on-click="function(){/* TODO: implement this functionality */}"
    >
      Verfeinerung hinzufügen
    </BaseButton>

    <!-- display and edit constraints -->
    <div class="constraint-container">
      <div class="constraint-text">
        <span>
          <br>Insgesamt gilt die
          <a href="#">
            {{ rule.type.name }}
          </a> nur, wenn...
        </span>
      </div>
      <ConstraintItem
        v-for="constraint in rule.action.constraints"
        :key="constraint.id"
        class="constraint-edit"
        :constraint="constraint"
        @constraint-chosen="setConstraint($event)"
        @constraint-edited="editConstraint($event)"
        @remove-constraint="removeConstraint($event)"
      />

      <!-- add new constraint -->
      <BaseButton
        class="add-button"
        :on-click="showConstraintChooser"
      >
        Einschränkung hinzufügen
      </BaseButton>
      <ConstraintChooser
        v-if="displayConstraintChooser"
        @chosen="setConstraint($event)"
        @abort="hideConstraintChooser()"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import { Odrl as Vocab } from '../libs/rightsml-lib-js/ODRLvocabs';
import { Rule, RuleTypes } from '../libs/rules/rules.js';
import ActionItem, { Action } from './ActionItem.vue';
import { Constraint } from '../libs/constraints/constraints';
import ConstraintItem from './ConstraintItem';
import ConstraintChooser from './ConstraintChooser.vue';

export default {
  name: 'RuleItem',
  components: {
    BaseButton,
    ActionItem,
    ConstraintItem,
    ConstraintChooser,
  },
  props: {
    rule: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      displayConstraintChooser: false,
      nextId: 0,
    };
  },
  methods: {
    removeRule() {
      this.$emit('remove-rule', this.rule.id);
    },
    showConstraintChooser() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser() {
      this.displayConstraintChooser = false;
    },
    setConstraint(constraint) {
      constraint.id = this.nextId;
      this.rule.action.constraints.push(constraint);
      this.nextId++;
      this.hideConstraintChooser();
    },
    editConstraint(constraint) {
      for (let i = 0; i < this.rule.action.constraints.length; i++) {
        if (this.rule.action.constraints[i].id == constraint.id) {
          this.rule.action.constraints[i] = constraint;
        }
      }
      this.$forceUpdate();
    },
    removeConstraint(id) {
      for (let i = 0; i < this.rule.action.constraints.length; i++) {
        if (this.rule.action.constraints[i].id == id) {
          this.rule.action.constraints.splice(i, 1);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 10px;
  margin-left: 0px;
  padding: 20px;
}

.header {
  position: relative;
  margin-bottom: 10px;
}

.remove-button {
  position: absolute;
  left: calc(100% - 20px);
  top: -20px;
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

.add-button {
  display: block;
  margin-top: 10px;
  margin-left: 0px;
}
</style>
