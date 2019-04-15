<template>
  <div class="ccImages">
    <img :src="imageSource" :class="{active: isActive}" @click="$emit('licenseClicked', licenseID)">
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { ccNames } from '../../libs/cc/identifiers.js';

export default {
  name: 'CCImage',
  props: {
    imageSource: {
      required: true,
    },
    licenseID: {
      type: String,
      required: true,
    },
    activeLicense: {
      type: String,
      default: '',
    },
  },
  computed: {
    isActive() {
      return this.activeLicense === this.licenseID;
    },
    name() {
      return ccNames[this.licenseID];
    },
  },
};
</script>

<style scoped>
img {
  opacity: 0.6;
  cursor: pointer;
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
.ccImages{
  color: #1f3b70;
}
</style>
