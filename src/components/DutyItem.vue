<template>
  <div class="duty-container">
    Ich bin Duty {{ duty.id }}
    <button class="button-dismiss-duty" v-on:click="removeDuty()">&times;</button>
  </div>
</template>

<script>
import ActionItem, { Action } from "./ActionItem.vue";
import { Odrl as Vocab } from "../libs/rightsml-lib-js/ODRLvocabs";

export class Duty {
  constructor(title, id, type) {
    this.title = title;
    this.id = id;
    this.type = type;
    this.action = new Action("Löschen", Vocab.ActionsCV.use);
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
    ActionItem
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
  width: 225px;
  position: relative;
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
  top: 0%;
  right: 0%;
}
</style>