<template>
  <div class="users-grid container">
    <div
      v-if="users.length"
      class="users-row row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
    >
      <div class="user-col" v-for="user in users" :key="user._id">
        <user-card :user="user" @openModal="openModal" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  import UserCard from "./UserCard/UserCard.vue";

  export default {
    name: "users-grid",
    components: {
      UserCard,
    },
    computed: {
      ...mapGetters({ users: "getUsers" }),
    },
    methods: {
      openModal(action) {
        this.$emit("openModal", action);
      },
    },
  };
</script>

<style scoped>
  .users-grid {
  }
</style>
