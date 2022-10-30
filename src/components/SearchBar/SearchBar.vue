<template> </template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "search-bar",
    data() {
      return {
        value: "",
      };
    },
    methods: {
      ...mapActions(["searchUsers"]),
      onSearchUsers() {},
    },
  };
</script>

<style></style>
