<template>
  <div class="app"></div>
</template>

<script>
  import axios from "axios";
  import { mapActions } from "vuex";

  export default {
    name: "app",
    async created() {
      const { results } = (
        await axios.get("https://randomuser.me/api/?results=10")
      ).data;

      if (results && results.length) {
        const mappedUsers = results.map((u) => {
          const _id = u.login.uuid;
          const fullname = `${u.name.title} ${u.name.first} ${u.name.last}`;
          const location = {
            country: u.location.country,
            city: u.location.city,
            street: u.location.street.name,
          };

          return {
            _id,
            name: fullname,
            email: u.email,
            image: u.picture.medium,
            location,
          };
        });

        this.initUsers(mappedUsers);
      }
    },
    methods: {
      ...mapActions(["initUsers"]),
    },
  };
</script>

<style></style>
