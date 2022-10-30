<template>
  <div class="user-card">
    <div class="actions">
      <button class="edit" @click="emitEdit">Edit</button>
      <button class="delete" @click="emitDelete">Delete</button>
    </div>
    <div class="information">
      <img v-if="user.image" class="image" :src="user.image" :alt="user.name" />
      <div class="details">
        <span class="name">{{ user.name }}</span>
        <span class="email">{{ user.email }}</span>
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

<style lang="scss" scoped>
  .elipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .user-card {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    gap: 10px;
    width: 100%;
    height: 100%;

    .actions {
      align-self: flex-end;
      display: flex;
      align-items: center;
      gap: 10px;

      .edit {
      }

      .delete {
      }
    }

    .information {
      display: flex;
      align-items: center;
      gap: 10px;

      .image {
        border-radius: 100%;
      }

      .details {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        gap: 5px;

        .name {
          font-size: 20px;
          font-weight: bold;
          line-height: 20px;
          @extend .elipsis;
        }

        .email {
          font-size: 14px;
          line-height: 14px;
          @extend .elipsis;
        }

        .location {
          line-height: 20px;
          @extend .elipsis;
        }
      }
    }
  }
</style>
