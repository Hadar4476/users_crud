<template>
  <div class="modal-wrapper">
    <div class="backdrop" @click="emitCloseModal"></div>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modal",
    methods: {
      emitCloseModal() {
        this.$emit("closeModal");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .modal-wrapper {
    position: fixed;

    .backdrop {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000cc;
    }

    .modal {
      position: fixed;
      display: flex;
      top: 0;
      width: 100%;
      height: 100%;
      bottom: 0;
      max-width: 680px;
      z-index: 200;
      left: 0;
      right: 0;
      margin: 0 auto;
    }

    @media (min-width: 680px) {
      .modal {
        top: 50%;
        transform: translateY(-50%);
        height: fit-content;
      }
    }
  }
</style>
