import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { createPersistedState } from "vuex-electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    errors: "",
    token: localStorage.getItem("token") || "",
    user_id: localStorage.getItem("user_id") || "",
    is_admin: localStorage.getItem("is_admin") == "true" || "",
    is_superadmin: localStorage.getItem("is_superadmin") == "true" || "",
    maxGames: 3,
    maxCampaigns: 3,
    gamepad: {
      listening: true,
      A: false,
      B: false,
      X: false,
      Y: false,
      Right: false,
      Left: false,
      Top: false,
      Bottom: false,
      Start: false
    }
  },
  mutations: {
    stopListening(state) {
      state.gamepad.listening = false;
    },
    startListening(state) {
      state.gamepad.listening = true;
    },
    toggleA(state, value) {
      state.gamepad.A = value;
    },
    toggleB(state, value) {
      state.gamepad.B = value;
    },
    toggleX(state, value) {
      state.gamepad.X = value;
    },
    toggleY(state, value) {
      state.gamepad.Y = value;
    },
    toggleRight(state, value) {
      state.gamepad.Right = value;
    },
    toggleLeft(state, value) {
      state.gamepad.Left = value;
    },
    toggleTop(state, value) {
      state.gamepad.Top = value;
    },
    toggleBottom(state, value) {
      state.gamepad.Bottom = value;
    },
    toggleStart(state, value) {
      state.gamepad.Start = value;
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.user_id = payload.user_id;
      state.is_admin = payload.is_admin;
      state.is_superadmin = payload.is_superadmin;
    },
    auth_error(state, payload) {
      state.status = "error";
      state.errors = payload.response;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user_id = "";
      state.is_admin = false;
      state.is_superadmin = false;
    },
    setSessionId(state, id) {
      state.session.id = id;
    }
  },
  actions: {
    startSession({ commit }) {
      // Creating a new donator
      axios.post("donator/", {}).then(resp => {
        commit("saveCurrentDonator", resp.data);
        // Saving the new session
        axios
          .post("session/", this.state.session)
          .then(resp => {
            commit("setSessionId", resp.data.id);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    updateSession() {
      axios.put("session/" + this.state.session.id + "/", this.state.session);
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("auth/", user)
          .then(resp => {
            const token = "Token " + resp.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user_id", resp.data.user_id);
            localStorage.setItem("is_admin", resp.data.is_admin);
            localStorage.setItem("is_superadmin", resp.data.is_superadmin);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", {
              token: token,
              user_id: resp.data.user_id,
              is_admin: resp.data.is_admin,
              is_superadmin: resp.data.is_superadmin
            });
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("api/user/", credentials)
          .then(response => {
            // Connexion et ajout du token
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        if (!this.getters.isAdmin) {
          axios.get("terminal/mine/off/").then(resp => {
            resolve(resp);
          });
          commit("logout");
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("is_admin");
          localStorage.removeItem("is_superadmin");
          delete axios.defaults.headers.common["Authorization"];
        }
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAdmin: state => state.is_admin,
    isSuperAdmin: state => state.is_superadmin
  },
  plugins: [createPersistedState()], //createSharedMutations()
  strict: process.env.NODE_ENV !== "production"
});
