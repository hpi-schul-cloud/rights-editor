<template>
  <img
    v-bind:src="imageSource"
    v-on:click="$emit('licenseClicked', this.licenseID)"
    v-bind:class="{active: isActive}"
  >
</template>

<script>
export default {
  name: "CCImage",
  props: {
    imageSource: {
      required: true
    },
    licenseID: {
      type: String,
      required: true
    },
    activeLicense: {
      type: String,
      default: ""
    }
  },
  computed: {
    isActive: function() {
      return this.activeLicense === this.licenseID;
    }
  }
};
</script>

<style scoped>
img {
  opacity: 0.6;
  cursor: pointer;

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
img.active,
img:hover {
  opacity: 1;
}
img.active {
  box-shadow: 0px 6px 3px -3px gray;
}
</style>
