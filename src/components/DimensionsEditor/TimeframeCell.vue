<template>
  <div>
    <select @change="$emit('update-timeframe', $event.target.value)">
      <option
        v-for="(timeframeStep, index) in timeframeSteps"
        :key="index"
        :selected="timeframe === timeframeStep"
      >{{ timeframeStep }}</option>
    </select>
    <button @click="$emit('remove-timeframe')" :disabled="preventDelete">
      <i class="fas fa-trash-alt" />
    </button>
  </div>
</template>

<script>
const timeframeSteps = ['10 Jahre', '9 Jahre', '8 Jahre', '7 Jahre', '6 Jahre', '5 Jahre', '48 Stunden', '24 Stunden', 'unbegrenzt'];
export default {
  name: 'TimeframeCell',
  props: {
    timeframe: {
      required: true,
      type: String,
    },
    preventDelete: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    timeframeSteps() {
      return timeframeSteps;
    },
  },
};
</script>

<style scoped>
button {
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0px;
  margin: 0px 8px;
  color: #444;
}
button:hover {
  color: black;
}
button:disabled {
  color: lightgrey;
  cursor: default;
}
select {
  font-size: inherit;
  border: none;
  background-color: transparent;
}
</style>
