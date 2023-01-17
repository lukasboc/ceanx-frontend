<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h2 class="text-xl pb-8 text-center">Login</h2>
      <form @submit.prevent="login">
      <div class="form-control w-xl">
        <label class="label" for="email">
          <span class="label-text">E-Mail</span>
        </label>
        <input ref="emailEl" required v-model="form.email" type="email" id="email" placeholder="E-Mail" class="input input-bordered input-primary w-xl">
        <div v-if="errors.email" class="alert alert-warning shadow-lg mt-4 mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{{ errors.email[0] }}</span>
          </div>
        </div>
      </div>
      <div class="form-control w-xl">
        <label class="label" for="password">
          <span class="label-text">Passwort</span>
        </label>
        <input v-model="form.password" required type="password" id="password" placeholder="Passwort" class="input input-bordered input-primary w-xl">
      </div>
      <div v-if="this.loginError" class="alert alert-warning shadow-lg mt-4 mb-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>{{ this.loginError }}</span>
        </div>
      </div>

      <div class="p-2"/>
      <div class="modal-action">
        <div class="mx-auto">
          <button type="submit" class="btn btn-primary mx-1">
            Login
          </button>
          <button class="btn btn-outline mx-1"
                  v-on:click="this.$emit('close');">
            Abbrechen
          </button>
        </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import '@vuepic/vue-datepicker/dist/main.css'
import {nextTick, onMounted, ref} from "vue";

export default {
  name: "Login",
  setup() {
    const emailEl = ref(null);

    onMounted(() => {
      nextTick(() => {
        emailEl.value.focus();
      });
    });

    return {
      emailEl
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: []
    };
  },
  computed: mapState({
    loginError: (state) => state.users.loginError,
  }),
  created() {
    this.$store.commit("users/loginError", "")
  },
  methods: {
    login(){
      this.$store.dispatch("users/login", this.form).then(response => {
        this.$router.push({ name: "Dashboard" });
        if(!this.loginError){
          this.$emit('close')
        }
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      });
    }
  }
}
</script>
<style>
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
}
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: rgb(5, 122, 255);
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: rgb(5, 122, 255);
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
}
</style>
