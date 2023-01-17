<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <router-link v-if="!loggedIn" class="btn btn-ghost normal-case text-xl text-primary" :to="{ name: 'Home' }">CeanX</router-link>
      <router-link v-if="loggedIn" class="btn btn-ghost normal-case text-xl text-primary" :to="{ name: 'Dashboard' }">CeanX</router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li v-if="loggedIn"><router-link :to="{ name: 'Dashboard' }">Home</router-link></li>
        <li v-if="loggedIn"><router-link :to="{ name: 'CostEstimations' }">Kostenschätzungen</router-link></li>
        <li v-if="loggedIn" @click="showAssistants = true"><span>Assistenten öffnen</span></li>
        <li v-if="loggedIn"><router-link :to="{ name: 'Settings' }">Einstellungen</router-link></li>
        <li v-if="!loggedIn">
          <router-link
              :to="{ name: 'Register' }"
          v-if="registerAllowed">Registrieren
          </router-link>
        </li>
        <li v-if="!loggedIn">
          <a @click="this.showLogin = true">Login
          </a>
        </li>
        <li v-if="loggedIn">
          <a @click="logout">Logout
          </a>
        </li>
      </ul>
    </div>
  </div>

  <span v-if="showLogin">
    <Login v-on:close="showLogin = false" />
  </span>
  <span v-if="showAssistants">
    <CostEstimationAssistant v-on:close="showAssistants = false" />
  </span>
</template>
<script>
import { mapState } from "vuex";
import Login from "../components/Login.vue";
import CostEstimationAssistant from "./CostEstimationAssistants.vue";

export default {
  name: "navigation",
  components: {CostEstimationAssistant, Login},
  data() {
    return {
      showHamburgerMenu: false,
      showLogin: false,
      showFixedPrice: false,
      showTimeBasedPrice: false,
      showSettings: false,
      showAssistants: false
    };
  },

  computed: mapState({
    loggedIn: (state) => state.users.loggedIn,
    registerAllowed: (state) => state.settings.registerAllowed
  }),

  created() {
    this.$store.dispatch("settings/getRegisterAllowed")
  },
  methods: {
    logout(){
      this.$store.dispatch("users/logout").then(response => {
        this.$router.push({ name: "Home" })
      });
    },
    checkAndCloseDropDown: function (el) {
      let targetEl = el;
      if (targetEl && targetEl.matches(":focus")) {
        setTimeout(function () {
          targetEl.blur();
        }, 0);
      }
    },
    closeUserFunctionNav: function () {
      let targetEl = this.$refs.userDropdown;
      targetEl.focus();
      this.checkAndCloseDropDown(targetEl);
    },
  },
};
</script>