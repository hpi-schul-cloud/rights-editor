<template>
  <div style="display: inline-block;">
    <li>
      Aktion:
      <input placeholder="Bezeichner eingeben..." type="text" name="action">
      <br>
      <div class="action-input">
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
      </div>
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
  }
};
</script>

<style>
.remove-button {
  height: 42px;
  background-color: transparent;
  color: #b1063a;
  font-weight: bold;
  padding: 0;
  font-size: 1.1em;
}

input.under-cover {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid DarkGray;
  box-shadow: none;
}

input,
input.under-cover:focus {
  background-color: white;
  border-radius: 0;
  border: 0px black solid;
  border-bottom: 1px transparent solid;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: 1em;

  margin: 10px;
  padding: 10px 10px;

  -webkit-box-shadow: inset 0 0 1px #000;
  -moz-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
}

.action-input {
  margin-bottom: 35px;
  margin-left: 60px;
}

select {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  width: 250px;
  /*border: 1px solid black;*/
}
</style>
