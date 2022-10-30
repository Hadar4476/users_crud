<template>
  <div class="user-card">
    <div class="actions">
      <button class="edit" @click="emitEdit">Edit</button>
      <button class="delete" @click="emitDelete">Delete</button>
    </div>
    <div class="information">
      <div class="image">
        <img :src="user.image" :alt="user.name" />
      </div>
      <div class="details">
        <span class="name">{{ user.name }}</span>
        <br />
        <span class="email">{{ user.email }}</span>
        <br />
        <span class="location">{{ userLocation }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user-card",
    props: {
      user: {
        type: Object,
      },
    },
    computed: {
      userLocation() {
        const { country, city, street } = this.user.location;

        return `${country}, ${city}, ${street}`;
      },
    },
    methods: {
      emitEdit() {
        this.$emit("openModal", { type: "edit", payload: this.user._id });
      },
      emitDelete() {
        this.$emit("openModal", { type: "delete", payload: this.user._id });
      },
    },
  };
</script>

<style scoped></style>
