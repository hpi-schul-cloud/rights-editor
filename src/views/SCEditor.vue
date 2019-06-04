<template>
  <div>
    <EditorNavBar>
      <template v-slot:left>
        <a href="#" @click="back">
          <i class="fas fa-arrow-circle-left" /> Zurück zur Übersicht</a>
      </template>
    </EditorNavBar>
    <DimensionEditor :policy="policy" @addPolicy="editRules()" />
  </div>
</template>

<script>
import Vue from 'vue';
import PresetEditor from '../components/PresetEditor.vue';
import DimensionEditor from '../components/DimensionsEditor/DimensionsEditor.vue';
import EditorNavBar from '../components/EditorNavBar.vue';

export default {
  name: 'SCEditor',
  components: {
    PresetEditor,
    DimensionEditor,
    EditorNavBar,
  },
  props: {
    policy: {
      type: Object,
      default: () => ({
        name: '',
        odrl: {},
        options: {
          timeframes: ['unbegrenzt'],
          state: [false],
          county: [false],
          school: [false],
          teacher: [false],
          pupil: [false],
        },
      }),
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goForth(odrl) {
      Vue.set(this.policy, 'odrl', odrl);
      this.editDimensions();
    },
    editDimensions() {
      this.mode = 'dimensions';
    },
    editRules() {
      this.mode = 'rules';
    },
  },
};
</script>
