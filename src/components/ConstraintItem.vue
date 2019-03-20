<template>
  <div>
    <ConstraintChooser
      v-if="this.displayConstraintChooser"
      v-on:chosen="constraintChosen($event)"
      v-on:abort="hideConstraintChooser()"
    ></ConstraintChooser>
    <div class="constraint-content">Bedingung:
      <br>
      <button
        class="constraint-input"
        v-on:click="showConstraintChooser()"
        name="constraint"
        type="button"
      >{{ constraint.name }}</button>
    </div>
  </div>
</template>

<script>
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";
import ConstraintChooser from "./ConstraintChooser.vue";

export class Constraint {
  constructor() {
    this.name = "";
    this.leftOperand = "";
    this.rightOperand = "";
    this.operator = "";
    this.unit = "";
    this.type = "";
  }
}

export default {
  name: "ConstraintItem",
  components: {
    ConstraintChooser
  },
  data: function() {
    return {
      displayConstraintChooser: false,
      constraint: new Constraint()
    };
  },
  methods: {
    showConstraintChooser: function() {
      this.displayConstraintChooser = true;
    },
    hideConstraintChooser: function() {
      this.displayConstraintChooser = false;
    },
    constraintChosen: function(constraint) {
      console.log(constraint);
      this.hideConstraintChooser();
      this.constraint = constraint;
      this.$emit("constraint-set", this.constraint);
    }
  }
};
</script>

<style scoped>
.constraint-input {
  margin-top: 20px;
  margin-left: 0px;
  width: 700px;
  height: 38px;

  background-color: white;
  border: 0px black solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;
  text-align: left;

  margin: 10px;
  margin-left: 0px;
  padding: 10px 10px;

  box-shadow: inset 0 0 1.5px #000;
}

.constraint-input:hover {
  cursor: text;
}
</style>