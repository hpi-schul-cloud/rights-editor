<template>
  <div class="context-container" v-closable="onOutsideClick" v-closable:x="x" v-closable:y="y"></div>
</template>

<script>
import Vue from "vue";

// This variable will hold the reference to
// document's click handler
let handleOutsideClick;
Vue.directive("closable", {
  bind(el, binding, vnode) {
    
    // Set correct margin to position the context menu at the mouse position
    if (binding.rawName === "v-closable:x") {
      el.style.marginLeft = `${binding.value}px`;      
    } else if (binding.rawName === "v-closable:y") {
      el.style.marginTop = `${binding.value}px`;
    } else {
      // Here's the click/touchstart handler
      // (it is registered below)
      handleOutsideClick = e => {
        e.stopPropagation();
        // Get the handler method name and the exclude array
        // from the object used in v-closable
        const handler = binding.value;
        // We check to see if the clicked element is not
        // the dialog element
        if (!el.contains(e.target)) {
          // If the clicked element is outside the dialog
          // and not the button, then call the outside-click handler
          // from the same component this directive is used in
          handler();
        }
      };
      // Register click/touchstart event listeners on the whole page
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
  },
  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  }
});

export default {
  name: "ContextMenu",
  components: {},
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  computed: {},
  methods: {
    onOutsideClick() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.context-container {
  background-color: green;
  width: 180px;
  height: 200px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}
</style>
