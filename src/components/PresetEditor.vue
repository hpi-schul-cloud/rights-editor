<template>
  <div class="preset-editor">
    <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="$emit('abort')">
          <i class="fas fa-arrow-circle-left" /> Zurück
        </a>
      </template>
    </EditorNavBar>
    <h1>Regel-Editor</h1>
    <ul class="rule-list">
      <li>Drucken</li>
      <li class="selected">Kopieren</li>
      <li>Drucken</li>
      <li>Drucken</li>
      <li class="active">Kopieren</li>
      <li>Drucken</li>
    </ul>
  </div>
</template>


<script>
import EditorNavBar from './EditorNavBar.vue';

export default {
  name: 'PresetEditor',
  components: {
    EditorNavBar,
  },
};
</script>

<style scoped>
.rule-list {
  float: left;
  width: 200px;
  box-sizing: border-box;
  box-shadow: 3px 0px 2px -3px gray;
  padding-right: 8px;
  /* padding-bottom: 12px; */
}

.rule-list li {
    padding: 12px 4px;
    border-bottom: 1px solid gray;
    /* background-color: #eee; */
}

li.active {
    color: #1f3b70;
    font-weight: bold;
    /* font-style: italic; */
    border-bottom: 1px solid #1f3b70;

}

.selected {

}
</style>
