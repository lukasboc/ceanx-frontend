<template>
  <div class="pt-24 container md:w-6/12 mx-auto">
    <h1 class="text-2xl font-bold mb-4">Registrierung</h1>
    <div class="card bg-white shadow-lg">
      <div class="card-body">
<form @submit.prevent="register">
          <div class="form-control w-xl">
            <label class="label" for="email">
              <span class="label-text">E-Mail</span>
            </label>
            <input required ref="emailEl" v-model="form.email" type="email" id="email" placeholder="name@example.de"
                   class="input input-bordered input-primary w-xl">
            <div v-if="errors.email" class="alert alert-warning shadow-lg mt-4 mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{{ errors.email[0] }}</span>
              </div>
            </div>
          </div>

        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Anzeigename</span>
          </label>
          <input required v-model="form.name" type="text" id="name" placeholder="Anzeigename"
                 class="input input-bordered input-primary w-xl">
          <div v-if="errors.name" class="alert alert-warning shadow-lg mt-4 mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>{{ errors.name[0] }}</span>
            </div>
          </div>
        </div>

          <div class="form-control w-xl">
            <label class="label" for="password">
              <span class="label-text">Passwort</span>
            </label>
            <input required v-model="form.password" type="password" id="password" placeholder="*********"
                   class="input input-bordered input-primary w-xl">
            <div v-if="errors.password" class="alert alert-warning shadow-lg mt-4 mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{{ errors.password[0] }}</span>
              </div>
            </div>
          </div>

          <div class="form-control w-xl">
            <label class="label" for="password_confirm">
              <span class="label-text">Passwort bestätigen</span>
            </label>
            <input required v-model="form.password_confirmation" type="password" id="password_confirm" placeholder="*********"
                   class="input input-bordered input-primary w-xl">
            <div v-if="errors.password_confirmation" class="alert alert-warning shadow-lg mt-4 mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{{ errors.password_confirmation[0] }}</span>
              </div>
            </div>
          </div>
    <div class="card-actions justify-center mt-4">
      <button v-if="step === 0" class="btn btn-primary" v-bind:disabled="this.disableRegisterButton" type="submit" >Registrieren</button>
    </div>
        <div v-if="!registerAllowed" class="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Die Registrierungsfunktion wurde deaktiviert. Bitte gib einem Nutzer Bescheid, die Funktionalität vorübergehend zu aktivieren.</span>
          </div>
        </div>
</form>
      </div>
  </div>
  </div>
</template>

<script>
import User, {sendVerification} from "../apis/User";
import {mapState} from "vuex";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import {nextTick, onMounted, ref} from "vue";
import useVuelidate from "@vuelidate/core";

export default {
  components: {StripeCheckout},
  setup() {
    const emailEl = ref(null);

    onMounted(() => {
      nextTick(() => {
        emailEl.value.focus();
      });
    });

    return {
      emailEl,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      step: 0,
      disableRegisterButton: false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: [],
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
    registerAllowed: (state) => state.settings.registerAllowed
  }),

  created() {
    this.$store.dispatch("settings/getRegisterAllowed")
  },

methods: {
    register() {
      this.disableRegisterButton = true;
      User.register(this.form)
          .then(() => {
            console.log('registrierung erfolgt.')
            this.disableRegisterButton = false;
            this.login()
          })
          .catch(error => {
            this.disableRegisterButton = false;
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            } else {
              console.log(error)
            }
          });
    },
    login(){
      this.$store.dispatch("users/login", {
        email: this.form.email,
        password: this.form.password
      }).then(response => {
        console.log('login erfoglreich, suche user')
        this.$store.dispatch("users/getUser").then(() => {
          console.log('user gefunden, sende email')
          this.$router.push({ name: "Dashboard" });
        })
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      });
    }
    ,
    /* Mail wird automatisch nach Registreirung verschickt
    sendVerification() {
      this.$store.dispatch("users/sendVerification", {
        user: this.user.id
      }).then(response => {
        //this.$router.push({ name: "Dashboard" });
        console.log('email verifikation gesendet')
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      });
    }
    */
  }
};
</script>