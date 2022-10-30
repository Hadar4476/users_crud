<template>
  <div class="app">
    <span class="title">Users CRUD</span>
    <button class="add-user-btn" @click="onAddUser">Add user</button>
    <search-bar />
    <users-grid @openModal="openModal" />
    <modal v-if="shouldDisplayModal" @closeModal="closeModal">
      <user-form
        v-if="shouldDisplayUserForm"
        :userId="modalActionPayload"
        @save="onSave"
        @closeModal="closeModal"
      />
      <div v-else-if="shouldDisplayDeleteModal" class="delete-modal">
        <span class="text">Are you sure you want to delete this user?</span>
        <div class="actions">
          <button class="confirm" @click="onDeleteUser">Delete</button>
          <button class="cancel" @click="closeModal">Cancel</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  import UsersGrid from "./components/UsersGrid/UsersGrid.vue";
  import Modal from "./components/UI/Modal.vue";
  import UserForm from "./components/UserForm/UserForm.vue";
  import SearchBar from "./components/SearchBar/SearchBar.vue";

  export default {
    name: "app",
    components: {
      UsersGrid,
      Modal,
      UserForm,
      SearchBar,
    },
    data() {
      return {
        shouldDisplayModal: false,
        modalActionType: "",
        modalActionPayload: "",
      };
    },
    computed: {
      shouldDisplayUserForm() {
        return (
          (this.modalActionType === "edit" && this.modalActionPayload) ||
          this.modalActionType === "add"
        );
      },
      shouldDisplayDeleteModal() {
        return this.modalActionType === "delete";
      },
    },
    async created() {
      await this.initUsers();
    },
    methods: {
      ...mapActions(["initUsers", "addUser", "editUser", "deleteUser"]),
      generateUniqueId(length) {
        let uniqueId = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          uniqueId += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return uniqueId;
      },
      openModal({ type, payload }) {
        this.shouldDisplayModal = true;
        this.modalActionType = type;
        this.modalActionPayload = payload;
      },
      closeModal() {
        this.shouldDisplayModal = false;
        this.modalActionType = "";
        this.modalActionPayload = "";
      },
      onAddUser() {
        this.openModal({ type: "add", payload: "" });
      },
      onSave(user) {
        if (this.modalActionType === "add") {
          const _id = this.generateUniqueId(21);

          this.addUser({ _id, ...user });
        } else if (this.modalActionType === "edit" && user._id) {
          this.editUser(user);
        }

        this.closeModal();
      },
      onDeleteUser() {
        if (this.modalActionType === "delete" && this.modalActionPayload) {
          this.deleteUser(this.modalActionPayload);
          this.closeModal();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .app {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .title {
      margin-top: 40px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
    }

    .add-user-btn {
      border: none;
      color: white;
      background-color: red;
      border-radius: 100%;
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }

    .delete-modal {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      width: 100%;
      background-color: white;
      padding: 40px 20px;

      .text {
        font-size: 20px;
        text-align: center;
      }

      .actions {
        align-self: flex-end;
        display: flex;
        gap: 10px;
      }
    }
  }
</style>
