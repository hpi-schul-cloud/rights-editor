<template>
  <div style="display: block;">
    Ich bin Duty {{ duty.id }}
    <button class="button-dismiss" v-on:click="removeDuty()">&times;</button>
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
.button-dismiss {
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
}
</style>