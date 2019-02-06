<template> 
<BaseModal> 
    <template v-slot:header><h1>Aktion auswählen</h1></template>
    <template v-slot:body>
        <ul>
            <li v-on:click="actionClicked($event)">Aggregieren</li>
            <li v-on:click="actionClicked($event)">Annotieren</li>
            <li v-on:click="actionClicked($event)">Annonymisieren</li>
            <li v-on:click="actionClicked($event)">Archivieren</li>
            <li v-on:click="actionClicked($event)">Kompensieren</li>
            <li v-on:click="actionClicked($event)">Löschen</li>
        </ul>
    </template>
    <template v-slot:footer>
        <BaseButton v-bind:onClick="function() {$emit('abort');}">Abbrechen</BaseButton>
        <BaseButton v-bind:disabled="currentAction == ''" v-bind:onClick="function() {$emit('action', currentAction);}">Annehmen</BaseButton>
    </template>
</BaseModal>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";


export default {
  name: "ActionChooser",
  components: {
    BaseButton,
    BaseModal
  },

  data: function() {
      return {
          currentAction: ""
      };
  },
  methods: {
      actionClicked: function(e) {
          this.currentAction = e.target.textContent;
      },

  }
};
</script>

<style>


</style>
