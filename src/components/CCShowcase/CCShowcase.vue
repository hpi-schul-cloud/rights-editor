<template>
  <div class="showcase">
    <CCImage
      class="image"
      :imageSource="image_by"
      licenseID="http://creativecommons.org/licenses/by/4.0/"
      :activeLicense="activeLicense"
      v-on:licenseClicked="$emit('licenseClicked', $event)"
    />
    <CCImage
      class="image"
      :imageSource="image_by_nd"
      licenseID="http://creativecommons.org/licenses/by-nd/4.0/"
      :activeLicense="activeLicense"
      v-on:licenseClicked="$emit('licenseClicked', $event)"
    />
    <CCImage
      class="image"
      :imageSource="image_by_sa"
      licenseID="http://creativecommons.org/licenses/by-sa/4.0/"
      :activeLicense="activeLicense"
      v-on:licenseClicked="$emit('licenseClicked', $event)"
    />
    <CCImage
      class="image"
      :imageSource="image_by_nc"
      licenseID="http://creativecommons.org/licenses/by-nc/4.0/"
      :activeLicense="activeLicense"
      v-on:licenseClicked="$emit('licenseClicked', $event)"
    />
    <CCImage
      class="image"
      :imageSource="image_by_nc_nd"
      licenseID="http://creativecommons.org/licenses/by-nc-nd/4.0/"
      :activeLicense="activeLicense"
      v-on:licenseClicked="$emit('licenseClicked', $event)"
    />
    <CCImage
      class="image"
      :imageSource="image_by_nc_sa"
      licenseID="http://creativecommons.org/licenses/by-nc-sa/4.0/"
      :activeLicense="activeLicense"
      v-on:licenseClicked="$emit('licenseClicked', $event)"
    />
  </div>
</template>

<script>
import CCImage from "./CCImage.vue";

export default {
  name: "CCShowcase",
  components: {
    CCImage
  },
  props: {
    activeLicense: {
      type: String,
      required: true
    }
  },
  computed: {
    image_by() {
      return require("../../img/cc/CC-BY.svg");
    },
    image_by_sa() {
      return require("../../img/cc/CC-BY-SA.svg");
    },
    image_by_nd() {
      return require("../../img/cc/CC-BY-ND.svg");
    },
    image_by_nc() {
      return require("../../img/cc/CC-BY-ND.svg");
    },
    image_by_nc_sa() {
      return require("../../img/cc/CC-BY-NC-SA.svg");
    },
    image_by_nc_nd() {
      return require("../../img/cc/CC-BY-NC-ND.svg");
    }
  }
};
</script>

<style scoped>
.showcase {
  display: grid;
  grid-template-columns: repeat(6, 16.66%);
  grid-column-gap: 10px;
}
.showcase .image {
  width: 100%;
}
</style>
