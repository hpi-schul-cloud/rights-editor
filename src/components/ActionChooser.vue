<template> 
<BaseModal> 
    <h1 slot="header">Aktion auswählen </h1> 
    <ul slot="body">
        <li v-on:click="actionClicked($event)">Aggregieren</li>
        <li v-on:click="actionClicked($event)">Annotieren</li>
        <li v-on:click="actionClicked($event)">Annonymisieren</li>
        <li v-on:click="actionClicked($event)">Archivieren</li>
        <li v-on:click="actionClicked($event)">Kompensieren</li>
        <li v-on:click="actionClicked($event)">Löschen</li>
    </ul>
    <button slot="footer" v-if="this.currentAction!==''" v-on:click="$emit('action', currentAction)">annehmen</button>
</BaseModal>
</template>

<script>
import BaseModal from "./BaseModal.vue";


export default {
  name: "ActionChooser",
  components: {
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
