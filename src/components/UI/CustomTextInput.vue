<template>
  <div :class="{ 'custom-text-input': true, 'input-error': inputError }">
    <label :for="inputId || inputName">{{ inputLabel }}:</label>
    <input
      :id="inputId || inputName"
      :name="inputName"
      type="text"
      :value="inputValue"
      :placeholder="inputPlaceHolder"
      @input="emitOnInputChange($event)"
    />
    <span v-if="inputError" class="error">{{ inputError }}</span>
  </div>
</template>

<script>
  export default {
    name: "custom-text-input",
    props: {
      inputId: {
        type: String,
      },
      inputName: {
        type: String,
      },
      inputPlaceHolder: {
        type: String,
      },
      inputValue: {
        type: String,
        default: () => "",
      },
      inputLabel: {
        type: String,
      },
      inputError: {
        type: String,
        default: () => "",
      },
    },
    methods: {
      emitOnInputChange({ target }) {
        this.$emit("onInputChange", event);
      },
    },
  };
</script>

<style scoped></style>
