<template>
  <div :class="{ center: !enabled }">
    <input type="checkbox" :checked="enabled" @change="$emit('update:price', $event.target.checked ? backupPrice : false)">
    <input
      :class="{ invisible: !enabled }"
      class="price-input"
      type="number"
      :disabled="!enabled"
      :value="priceVal"
      step="0.01"
      @change="backupPrice = $event.target.value; $emit('update:price', backupPrice)"
    >
    <span :class="{ invisible: !enabled }">EUR</span>
  </div>

</template>

<script>
export default {
  name: 'PriceInput',
  props: {
    price: {
      required: true,
    },
  },
  data() {
    return {
      backupPrice: 20,
    };
  },
  computed: {
    priceVal() {
      return this.enabled ? this.price : this.cachedNum;
    },
    enabled() {
      return !!this.price;
    },
  },
};
</script>

<style scoped>
.invisible {
    display: none;
}
.center {
    text-align: center;
}
.price-input {
    font-size: inherit;
    padding: 0px;
    margin: 0px;
    border: none;
    border-bottom: 1px dotted gray;
    width: 4em;
    background-color: transparent;
}
</style>
