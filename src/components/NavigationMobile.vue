<template>
  <div
      class="space-x-1 navbar bg-white w-full md:hidden fixed z-40 top-0 shadow"
  >
    <div class="flex items-center flex-none">
      <router-link v-if="!loggedIn" class="btn btn-ghost normal-case text-xl" :to="{ name: 'Home' }">CeanX</router-link>
      <router-link v-if="loggedIn" class="btn btn-ghost normal-case text-xl" :to="{ name: 'Dashboard' }">CeanX</router-link>
    </div>
    <div class="flex-1"></div>
    <div class="dropdown dropdown-end">
      <div
          tabindex="0"
          ref="navDropdown"
          v-on:mousedown="checkAndCloseDropDown(this.$refs.navDropdown)"
          class="m-1 normal-case btn-ghost btn"
      >
        <i class="fa fas fa-bars text-xl"></i>
      </div>
      <div
          class="mt-16 overflow-y-auto shadow-2xl top-px dropdown-content h-auto max-h-nearlyScreen w-52 rounded-b-box bg-base-200 text-base-content"
      >
        <ul class="px-4 pt-4 menu compact">
          <li class="nav-item rounded" v-if="!loggedIn">
            <router-link
                class="rounded-xl"
                tabindex="0"
                :to="{ name: 'Home' }"
                v-on:click="closeMobileNav()"
            >Home
            </router-link>
          </li>
          <li class="nav-item rounded" v-if="loggedIn">
            <router-link
                class="rounded-xl"
                tabindex="0"
                :to="{ name: 'Dashboard' }"
                v-on:click="closeMobileNav()"
            >Home
            </router-link>
          </li>
          <li v-if="registerAllowed && !this.loggedIn">
            <router-link
                class="rounded-xl"
                tabindex="0"
                :to="{ name: 'Register' }"
                v-on:click="closeMobileNav()"
            >Registrieren
            </router-link>
          </li>
          <li>
            <a
                class="rounded-xl"
                tabindex="0"
                v-on:click="showLogin = true"
                v-if="!this.loggedIn"
            >
              Login
            </a>
          </li>
          <li v-if="this.loggedIn">
            <router-link
                class="rounded-xl"
                tabindex="0"
                :to="{ name: 'CostEstimations' }"
                v-on:click="closeMobileNav()"
            >
              Kostenschätzungen
            </router-link>
          </li>
          <li>
            <a
                class="rounded-xl"
                tabindex="0"
                @click="showAssistants = true"
                v-if="this.loggedIn"
            >
              Assistenten öffnen
            </a>
          </li>
          <li v-if="this.loggedIn">
            <router-link
                class="rounded-xl"
                tabindex="0"
                :to="{ name: 'Settings' }"
                v-on:click="closeMobileNav()"
            >
              Einstellungen
            </router-link>
          </li>
          <li v-if="this.loggedIn">
            <a
                class="btn-ghost rounded-xl"
                tabindex="0"
                v-on:click="
                logout();
                closeMobileNav();
              "
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
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
import Login from "../components/Login.vue";
import CostEstimationAssistant from "./CostEstimationAssistants.vue";

import { mapState } from "vuex";

export default {
  name: "navigation",
  components: {
    Login,
    CostEstimationAssistant
  },
  data() {
    return {
      showLogin: false,
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
    closeMobileNav: function () {
      let targetEl = this.$refs.navDropdown;
      targetEl.focus();
      this.checkAndCloseDropDown(targetEl);
    },
    checkAndCloseDropDown: function (el) {
      let targetEl = el;
      if (targetEl && targetEl.matches(":focus")) {
        setTimeout(function () {
          targetEl.blur();
        }, 0);
      }
    },
    logout(){
      this.$store.dispatch("users/logout").then(response => {
        this.$router.push({ name: "Home" })
      });
    },
  },
};
</script>
<style>
.divider-gray:before {
  background-color: lightgrey;
}

.divider-gray:after {
  background-color: lightgrey;
}
</style>
