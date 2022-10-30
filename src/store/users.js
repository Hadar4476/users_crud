import axios from "axios";

const types = {
  INIT_USERS: "INIT_USERS",
  EDIT_USER: "EDIT_USER",
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
  SEARCH_USERS: "SEARCH_USERS",
};

const state = {
  users: [],
};

const getters = {
  getUsers: (state) => state.users,
};

const mutations = {
  async [types.INIT_USERS](state, payload) {
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

      state.users = mappedUsers;
    }
  },
  [types.EDIT_USER](state, payload) {
    const userIndex = state.users.findIndex((u) => u._id === payload._id);

    state.users[userIndex] = payload;
  },
  [types.ADD_USER](state, payload) {
    state.users.push(payload);
  },
  [types.DELETE_USER](state, payload) {
    const userIndex = state.users.findIndex((u) => u._id === payload);

    state.users.splice(userIndex, 1);
  },
  [types.SEARCH_USERS](state, payload) {
    state.users = state.users.filter((u) => {
      return (
        u.email.toLowerCase().includes(payload) ||
        u.name.toLowerCase().includes(payload) ||
        u._id.startsWith(payload) ||
        Object.keys(u.location).some((k) =>
          u.location[k].toLowerCase().includes(payload)
        )
      );
    });
  },
};

const actions = {
  initUsers({ commit }, users) {
    commit(types.INIT_USERS, users);
  },
  editUser({ commit }, user) {
    commit(types.EDIT_USER, user);
  },
  addUser({ commit }, user) {
    commit(types.ADD_USER, user);
  },
  deleteUser({ commit }, userId) {
    commit(types.DELETE_USER, userId);
  },
  searchUsers({ commit }, value) {
    commit(types.SEARCH_USERS, value);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
