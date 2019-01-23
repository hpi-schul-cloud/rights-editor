<template>
  <div style="display: inline-block;">
    <li>
      Action: <input type="text" name="action"><br />
      <input type="text" name="leftOperand" list="operand">
      <datalist id="operand">
        <option value="Operand1">Operand 1</option>
        <option value="Operand2">Operand 2</option>
        <option value="Operand3">Operand 3</option>
      </datalist>
      <select>
        <option>Operator 1</option>
        <option>Operator 2</option>
        <option>Operator 3</option>
      </select>
      <input type="text" name="rightOperand" list="operand">
      <button class="remove" v-on:click="removeAction">-</button>
    </li>
  </div>
</template>

<script>
export default {
  name: "ActionItem",
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeAction() {
      console.log("remove action");
    }
  }
};
</script>

<style>
input {
  background-color: transparent;
  border-radius: 0;
  border: 2px #de0f3f solid;
  color: rgb(53, 53, 53);

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;

  margin: 10px;
  padding: 10px 10px;
}

select {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  width: 250px;
}
</style>
