<template>
  <div class="search-bar">
    <custom-text-input
      inputId="search"
      inputName="search"
      :inputValue="value"
      inputPlaceHolder="Search by email, name, id and location"
      inputLabel=""
      @onInputChange="onInputChange"
    />
    <button class="search-btn" :disabled="!value.trim()" @click="onSearchUsers"
      >Search</button
    >
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  import CustomTextInput from "../UI/CustomTextInput.vue";

  export default {
    name: "search-bar",
    components: {
      CustomTextInput,
    },
    data() {
      return {
        value: "",
      };
    },
    computed: {
      ...mapGetters({ users: "getUsers" }),
    },
    watch: {
      async value(val) {
        if (!val && this.users.length !== 10) {
          await this.initUsers();
        }
      },
    },
    methods: {
      ...mapActions(["initUsers", "searchUsers"]),
      onInputChange({ target }) {
        const { value } = target;

        this.value = value;
      },
      onSearchUsers() {
        if (this.value.trim()) {
          this.searchUsers(this.value.toLowerCase());
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .search-bar {
    display: flex;
    gap: 10px;
    width: calc(100% - 30px);
    margin: 0 auto;
    max-width: 680px;

    .custom-text-input {
      flex: 1;
    }
  }
</style>
