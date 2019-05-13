<template>
  <div class="editor-nav">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
    <div class="clear" />
  </div></template>


<style scoped>

.editor-nav{
  padding-top: 15px;
  padding-bottom: 5px;
  margin-left: 10px;
  color: #1f3b70;
  height: 25px;
}

.editor-nav .left{
  float: left;
}

.editor-nav .right {
  float: right;
}

editor-nav .clear {
  clear: both;
}
</style>
