<template>
  <div class="tree">
    <ContextMenu v-if="showContextMenu"
    :x="rightClickPosition.x"
    :y="rightClickPosition.y"
    v-on:close="showContextMenu = false"></ContextMenu>

    <p class="label" @contextmenu="rightClickHandler($event)">Policy</p>

    <div v-if="policy['permission']" class="rules">
      <PolicyTreeRuleItem
        v-for="(permission, index) in policy['permission']"
        :key="index"
        :policy="policy"
        :path="['permission', index]"
        :selected-path="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>

    <div v-if="policy['obligation']" class="rules">
      <PolicyTreeRuleItem
        v-for="(obligation, index) in policy['obligation']"
        :key="index"
        :policy="policy"
        :path="['obligation', index]"
        :selected-path="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>

    <div v-if="policy['prohibition']" class="rules">
      <PolicyTreeRuleItem
        v-for="(prohibition, index) in policy['prohibition']"
        :key="index"
        :policy="policy"
        :path="['prohibition', index]"
        :selected-path="selectedPath"
        @update:selectedPath="$emit('update:selectedPath', $event)"
      />
    </div>
  </div>
</template>

<script>
import PolicyTreeRuleItem from './PolicyTreeRuleItem.vue';
import ContextMenu from '../ContextMenu.vue'

export default {
  name: 'PolicyTree',
  components: {
    PolicyTreeRuleItem,
    ContextMenu
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    selectedPath: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showContextMenu: false,
      rightClickPosition: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    rightClickHandler: function(e) {
        this.showContextMenu = true;
        this.rightClickPosition.x = e.pageX;
        this.rightClickPosition.y = e.pageY;
        e.preventDefault();
    }
  }
};
</script>

<style scoped>
.tree {
  padding: 0px 8px;
  box-sizing: border-box;
}
.label {
  margin: 0px;
  padding: 4px 0px;
  cursor: pointer;
}
.label:hover {
  font-weight: bold;
  color: #323232;
}
.rules {
  padding-left: 20px;
}
</style>
