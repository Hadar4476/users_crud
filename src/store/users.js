const types = {
  INIT_USERS: "INIT_USERS",
  EDIT_USER: "EDIT_USER",
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
};

const state = {
  users: [],
};

const getters = {
  getUsers: (state) => state.users,
};

const mutations = {
  [types.INIT_USERS](state, payload) {
    state.users = payload;
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
};

const actions = {
  initUsers({ commit }, users) {
    commit(types.INIT_USERS, users);
  },
  editUser({ commit }, user) {
    commit(types.EDIT_USER, user);
  },
  addUser({ commit }, user) {
    commit(types.INIT_USERS, user);
  },
  deleteUser({ commit }, userId) {
    commit(types.DELETE_USER, userId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
