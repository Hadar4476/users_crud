<template>
  <div :class="{ 'custom-text-input': true, 'input-error': inputError }">
    <label v-if="inputLabel" :for="inputId || inputName"
      >{{ inputLabel }}:</label
    >
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

<style lang="scss" scoped>
  .custom-text-input {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid black;
    }

    .error {
      color: red;
    }
  }

  .input-error {
    label {
      color: red;
    }

    input {
      border-color: red;
    }
  }
</style>
