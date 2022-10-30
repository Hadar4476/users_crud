<template>
  <div class="users-grid container">
    <div
      v-if="users.length"
      class="users-row row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3"
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

<style lang="scss" scoped>
  .users-grid {
    padding: 0 20px 20px 20px;
    max-width: 1440px;

    .users-row {
      .user-col {
        padding: 20px 10px 0 10px;
      }
    }

    @media (min-width: 1024px) {
      padding: 0 40px 40px 40px;
    }

    @media (min-width: 1440px) {
    }
  }
</style>
