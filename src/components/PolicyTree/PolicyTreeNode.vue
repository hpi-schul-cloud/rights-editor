<template>
  <a
    href="#"
    class="label"
    :class="{ selected: isSelected }"
    @click="$emit('followPath', path)"
  >
    {{ label }}
    <span class="action" if="addition"><br>{{ addition }}</span>
  </a>
</template>

<script>
export default {
  name: 'PolicyTreeNode',
  props: {
    label: {
      type: String,
      required: true,
    },
    addition: {
      type: String,
      required: false,
    },
    path: {
      type: Array,
      required: true,
    },
    selectedPath: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isSelected() {
      return this.path.join() === this.selectedPath.join();
    },
  },
};
</script>

<style scoped>
.label {
    display: block;
    margin: 0px;
    padding: 8px 0px;
    cursor: pointer;

    color: black;
    font-weight: normal;
    text-decoration: none;
    border-top: 1px transparent solid;
    border-bottom: 1px transparent solid;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.label:hover:not(.selected) {
    font-weight: bold;
    color: #323232;
}
.subrules {
    padding-left: 20px;
}
.label.selected {
  color: #1f3b70;
  font-weight: bold;
  border-top: 1px #1f3b70 solid;
  border-bottom: 1px #1f3b70 solid;
}
.action {
  font-size: 15px;
}
.selected .action {
  font-weight: normal;
  font-style: italic;
}
</style>
