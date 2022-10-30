<template>
  <div class="app">
    <button class="add-user" @click="onAddUser">Add user</button>
    <search-bar />
    <users-grid @openModal="openModal" />
    <modal v-if="shouldDisplayModal">
      <user-form
        v-if="shouldDisplayUserForm"
        :userId="modalActionPayload"
        @save="onSave"
        @closeModal="closeModal"
      />
      <div v-else-if="shouldDisplayDeleteModal" class="delete-modal">
        <span class="text">Are you sure you want to delete this user?</span>
        <button class="confirm" @click="onDeleteUser">Delete</button>
        <button class="cancel" @click="closeModal">Cancel</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapActions } from "vuex";

  import UsersGrid from "./components/UsersGrid/UsersGrid.vue";
  import Modal from "./components/UI/Modal.vue";
  import UserForm from "./components/UserForm/UserForm.vue";

  export default {
    name: "app",
    components: {
      UsersGrid,
      Modal,
      UserForm,
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
      ...mapActions(["initUsers", "addUser", "editUser", "deleteUser"]),
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
          this.addUser(user);
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

<style>
  /* @import "assets/scss/global.scss"; */
</style>
