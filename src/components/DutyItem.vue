<template>
  <div class="duty-container">
    <div class="duty-header">
      <b>{{ duty.type.name }}</b>
      <button
        class="button-dismiss-duty"
        v-on:click="removeDuty()"
      >&times;</button>
      <br>
    </div>
    <ActionItem v-bind:action="duty.action"></ActionItem>
    <RefinementItem v-bind:refinement="duty.refinement"></RefinementItem>
    <br>
  </div>
</template>

<script>
import RefinementItem, { Refinement } from "./RefinementItem.vue";
import ActionItem, { Action } from "./ActionItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Duty {
  constructor(title, id, type) {
    this.title = title;
    this.id = id;
    this.type = type;
    this.action = new Action("Löschen", Vocab.ActionsCV.use);
    this.refinement = new Refinement();
  }
}

export let DutyTypes = Object.freeze({
  Duty: { name: "Pflicht" },
  Consequence: { name: "Konsequenz" },
  Remedy: { name: "Strafe" }
});

export default {
  name: "DutyItem",
  components: {
    ActionItem,
    RefinementItem
  },
  props: {
    duty: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeDuty() {
      this.$emit("remove-duty-event", this.duty.id);
    }
  }
};
</script>

<style>
.duty-container {
  padding: 10px 10px 10px 10px;
}

.duty-header {
  width: 175px;
  position: relative;
  margin-bottom: 20px;
}

.button-dismiss-duty {
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
  border: 0px solid;
  cursor: pointer;
  margin-left: 10px;
  float: right;
  position: absolute;
  top: -50%;
  right: 0%;
}
</style>