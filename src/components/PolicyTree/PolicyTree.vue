<template>
  <div class="tree">
    <p
      class="label"
      :class="{ 'active': rightClicked }"
      @contextmenu="rightClickHandler($event)"
    >Policy</p>

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
import EventBus from "../../eventbus";
import PolicyTreeRuleItem from "./PolicyTreeRuleItem.vue";

export default {
  name: "PolicyTree",
  components: {
    PolicyTreeRuleItem
  },
  data() {
    return {
      rightClicked: false
    };
  },
  props: {
    policy: {
      type: Object,
      required: true
    },
    selectedPath: {
      type: Array,
      required: true
    }
  },
  methods: {
    rightClickHandler: function(e) {
      EventBus.$emit("context-menu-open", e, "<h1>DAS!</h1>");
      e.preventDefault(); // prevents the default context menu
      this.rightClicked = true;
    }
  },
  mounted() {
    EventBus.$on("context-menu-closed", event => {      
      this.rightClicked = false;
    });
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
.label:hover,
.label.active {
  font-weight: bold;
  color: #323232;
}
.rules {
  padding-left: 20px;
}
</style>
