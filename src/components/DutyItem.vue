<template>
  <li>
    <div class="disabled-text">
      <b>{{ duty.type["name"] }}:</b>
    </div>
    <button class="remove-button" v-on:click="removeDuty()">&times;</button>
    <ActionItem class="action-item" v-bind:action="duty.action"></ActionItem>

    <!-- addon-->
    <button class="modal-btn" v-on:click="openModal()">+</button>
    <div class="modal">
      <div class="modal-content">
        <button class="modal-close remove-button" v-on:click="closeModal()">&times;</button>
        <p>Füge
          <i>{{ duty.type["name"] }}</i> -Erweiterung hinzu:
        </p>
        <ul>
          <li v-for="(addon, index) in getPossibleAddons()" v-bind:key="index" v-bind:value="addon">
            <button typ="button" class="addon-btn">{{addon}}</button>
          </li>
        </ul>
      </div>
    </div>
    <!-- /addon -->
    <p></p>
    <hr>
  </li>
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
    getPossibleAddons: function() {
      if (this.duty.type["name"] == "Pflicht") {
        return ["Konsequenz"];
      } else {
        return [];
      }
    },
    removeDuty() {
      this.$emit("remove-duty-event", this.duty.id);
    },
    openModal: function() {
      if (this.getPossibleAddons().length > 0) {
        document.getElementsByClassName("modal")[this.duty.id].style.display =
          "block";
      }
    },
    closeModal() {
      document.getElementsByClassName("modal")[this.duty.id].style.display =
        "none";
    }
  }
};
</script>

<style>
.addon-btn {
  float: left;
}
.modal-btn {
  display: block;
  font-size: 26px;
  font-weight: bold;
  margin: 0px 50px 3px 0px;
  padding: 4px 12px !important;
}
.modal {
  display: none; /* Hidden by default */
  z-index: 1;
  border: 1px solid #172b4d;
  padding-left: 20px;
  margin-left: -2px;
  padding-right: 20px;
  margin-bottom: 20px;
  height: 125px;
  width: 700px;
}

/* The Close Button */
.modal-close {
  float: left;
  margin-top: -20px;
  margin-left: -28px;
  color: #172b4d !important;
}

.modal-close:hover,
.modal-close:focus {
  text-decoration: none;
  cursor: pointer;
}

/* --- */

.disabled-text {
  width: 150px;
  display: inline-block;
}

button {
  font-family: "Montserrat", sans-serif;
  color: white;
  border: 0px black solid;
  background-color: #172b4d;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  margin: 10px;
}

.duty-type-select {
  width: 170px;
}

.remove-button {
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  font-size: 32px;
}
</style>
<style scoped>
.duty header {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-template-areas:
    "duty-type action-name edit-icon icons"
    ".         action-uri  .         .    ";
}
h3.duty-heading-type {
  grid-area: duty-type;
  margin: 10px 0em 0px;
  font-size: 1.17em;
}
button.change-action {
  grid-area: action-name;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  text-align: left;
  margin: 0px;
  padding: 0px;
  align-self: end;
  font-size: 1.17em;
}
button.change-action:hover {
  background-color: #f2f2f2;
  box-shadow: 4px 0px 1px 1px #f7f7f7 inset;
}
button.change-action div {
  display: inline-block;
  margin: 10px auto 0px 8px;
}
a.action-uri {
  grid-area: action-uri;
  padding: 0em 8px;
  font-size: 0.8em;
}
button.remove {
  grid-area: icons;
  background-color: transparent;
  color: inherit;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}
.edit-button {
  grid-area: edit-icon;
  align-self: end;
  margin-bottom: 0.2em;
}
</style>