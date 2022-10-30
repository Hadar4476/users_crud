<template>
  <form class="user-form" @submit.prevent="onSubmit">
    <div class="body">
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
        <span class="title">Location</span>
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
    </div>
    <div class="actions">
      <button class="save" type="submit">Save</button>
      <button class="cancel" type="button" @click="closeModal">Cancel</button>
    </div>
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

        const mappedUser = {
          name: this.user.name.trim(),
          name: this.user.email.trim(),
          location: {
            country: this.user.location.country.trim(),
            city: this.user.location.city.trim(),
            street: this.user.location.street.trim(),
          },
        };

        if (this.userId) {
          mappedUser._id = this.user._id;
        }

        this.$emit("save", mappedUser);
      },
      validate() {
        let isValid = true;

        const fieldRequiredText = "Field is required";

        if (!this.user.name.trim()) {
          this.errors.nameValueError = fieldRequiredText;
        }

        if (!this.user.email.trim()) {
          this.errors.emailValueError = fieldRequiredText;
        }

        if (!this.user.location.country.trim()) {
          this.errors.countryValueError = fieldRequiredText;
        }

        if (!this.user.location.city.trim()) {
          this.errors.cityValueError = fieldRequiredText;
        }

        if (!this.user.location.street.trim()) {
          this.errors.streetValueError = fieldRequiredText;
        }

        if (this.user.name.trim() && this.user.name.trim().length < 3) {
          this.errors.nameValueError =
            "Name must contain at least 3 characters";
        }

        if (this.user.email.trim()) {
          const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          const userByeEmail = this.users.find(
            (u) => u.email.toLoweCase() === this.user.email.toLoweCase().trim()
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

<style lang="scss" scoped>
  .user-form {
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 40px 20px;
    gap: 20px;

    .body {
      display: flex;
      flex-direction: column;
      gap: 40px;

      .location-inputs {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .title {
          font-weight: bold;
          font-size: 18px;
        }
      }
    }

    .actions {
      display: flex;
      gap: 10px;
    }
  }
</style>
