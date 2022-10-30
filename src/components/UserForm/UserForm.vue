<template>
  <form class="user-form" @submit.prevent="onSubmit">
    <custom-text-input
      inputId="name"
      inputName="name"
      :inputValue="user.name"
      inputPlaceHolder=""
      inputLabel="Name"
      :inputError="this.errors.nameValueError"
      @onInputChange="onInputChange"
    />
    <custom-text-input
      inputId="email"
      inputName="email"
      :inputValue="user.email"
      inputPlaceHolder=""
      inputLabel="Email"
      :inputError="this.errors.emailValueError"
      @onInputChange="onInputChange"
    />
    <div class="location-inputs">
      <span class="title">Location:</span>
      <custom-text-input
        inputId="country"
        inputName="country"
        :inputValue="user.location.country"
        inputPlaceHolder=""
        inputLabel="Country"
        :inputError="this.errors.countryValueError"
        @onInputChange="onInputChange"
      />
      <custom-text-input
        inputId="city"
        inputName="city"
        :inputValue="user.location.city"
        inputPlaceHolder=""
        inputLabel="City"
        :inputError="this.errors.cityValueError"
        @onInputChange="onInputChange"
      />
      <custom-text-input
        inputId="street"
        inputName="street"
        :inputValue="user.location.street"
        inputPlaceHolder=""
        inputLabel="Street"
        :inputError="this.errors.streetValueError"
        @onInputChange="onInputChange"
      />
    </div>
    <button class="save" type="submit">Save</button>
    <button class="cancel" type="button" @click="closeModal">Cancel</button>
  </form>
</template>

<script>
  import { mapGetters } from "vuex";
  import CustomTextInput from "../UI/CustomTextInput.vue";

  export default {
    name: "user-form",
    props: {
      userId: {
        type: String,
      },
    },
    components: {
      CustomTextInput,
    },
    computed: {
      ...mapGetters({ users: "getUsers" }),
    },
    data() {
      return {
        user: {
          name: "",
          email: "",
          location: {
            country: "",
            city: "",
            street: "",
          },
        },
        errors: {
          nameValueError: "",
          emailValueError: "",
          countryValueError: "",
          cityValueError: "",
          streetValueError: "",
        },
      };
    },
    created() {
      if (this.userId) {
        const user = this.users.find((u) => u._id === this.userId);

        this.user = { ...user };
      }
    },
    methods: {
      onInputChange({ target }) {
        const { name, value } = target;
        const inputName = name.replace("_input", "");

        if (
          inputName === "country" ||
          inputName === "city" ||
          inputName === "street"
        ) {
          this.user.location[inputName] = value;
        } else {
          this.user[inputName] = value;
        }

        if (this.errors.hasOwnProperty(`${inputName}ValueError`)) {
          this.errors[`${inputName}ValueError`] = "";
        }
      },
      onSubmit() {
        const isValid = this.validate();

        if (!isValid) {
          return;
        }

        this.$emit("save", this.user);
      },
      validate() {
        let isValid = true;

        const fieldRequiredText = "Field is required";

        if (!this.user.name) {
          this.errors.nameValueError = fieldRequiredText;
        }

        if (!this.user.email) {
          this.errors.emailValueError = fieldRequiredText;
        }

        if (!this.user.location.country) {
          this.errors.countryValueError = fieldRequiredText;
        }

        if (!this.user.location.city) {
          this.errors.cityValueError = fieldRequiredText;
        }

        if (!this.user.location.street) {
          this.errors.streetValueError = fieldRequiredText;
        }

        if (this.user.name && this.user.name.length < 3) {
          this.errors.nameValueError =
            "Name must contain at least 3 characters";
        }

        if (this.user.email) {
          const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          const userByeEmail = this.users.find(
            (u) => u.email === this.user.email
          );

          if (userByeEmail && userByeEmail._id !== this.user._id) {
            this.errors.emailValueError = "Email is already in use";
          }

          if (!RegExp(emailRegex).test(this.user.email)) {
            this.errors.emailValueError = "Email must be valid";
          }
        }

        if (
          this.errors.nameValueError ||
          this.errors.emailValueError ||
          this.errors.countryValueError ||
          this.errors.cityValueError ||
          this.errors.streetValueError
        ) {
          isValid = false;
        }

        return isValid;
      },
      closeModal() {
        this.$emit("closeModal");
      },
    },
  };
</script>

<style></style>
