<template>
    <div :class="{ center: !enabled }">
        <input type="checkbox" :checked="enabled" @change="$emit('update:price', $event.target.checked ? backupPrice : false)">
        <input :class="{ invisible: !enabled }" class="price-input" type="number" :disabled="!enabled" :value="priceVal" @change="backupPrice = $event.target.value; $emit('update:price', backupPrice)" step="0.01">
        <span :class="{ invisible: !enabled }">EUR</span>
    </div>

</template>

<script>
import { constants } from 'crypto';
export default {
  name: 'PriceInput',
  data() {
    return {
        backupPrice: 20,
    }
  },
  props: {
      price: {
          required: true,
      },
  },
  computed: {
      priceVal() {
          return this.enabled ? this.price : this.cachedNum;
      },
      enabled() {
          return !!this.price
      }
  },
  methods: {
      write(what) {
          console.log(what);
      },
  },
}
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
