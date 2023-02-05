<template>
  <div class="modal modal-open">
    <div class="modal-box  max-h-screen overflow-visible overflow-x-auto">
      <h2 class="text-xl pb-8 text-center">Neue Troi Verbindung</h2>
      <form @submit.prevent="createTroiConnection">
      <div>
        <div class="form-control w-xl">
          <label class="label" for="title">
            <span class="label-text">Titel</span>
          </label>
          <input ref="titleEl" v-model="title" type="text" id="title" placeholder="Firma XY" class="input input-bordered input-primary w-xl">
          <div class="alert alert-warning shadow-lg mt-2" v-for="error of v$.title.$errors" :key="error.$uid">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{{ error.$message }}</span>
          </div>
        </div>
        </div>
        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text">Beschreibung (optional)</span>
          </label>
          <textarea v-model="description" id="description" placeholder="Beschreibung" class="textarea textarea-bordered textarea-primary w-full "></textarea>
        </div>
        <div class="form-control w-xl">
          <label class="label" for="host">
            <span class="label-text">Host</span>
          </label>
          <input v-model="host" type="text" id="host" placeholder="https://example.atlassian.net" class="input input-bordered input-primary w-xl">
          <div class="alert alert-warning shadow-lg mt-2" v-for="error of v$.host.$errors" :key="error.$uid">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
        <div class="form-control w-xl">
          <label class="label" for="username">
            <span class="label-text">Benutzername</span>
          </label>
          <input v-model="username" type="text" id="username" placeholder="maxMuser" class="input input-bordered input-primary w-xl">
          <div class="alert alert-warning shadow-lg mt-2" v-for="error of v$.username.$errors" :key="error.$uid">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
        <div class="form-control w-xl">
          <label class="label" for="password">
            <span class="label-text">Passwort</span>
          </label>
          <input v-model="password" type="password" id="password" placeholder="29z2dxePUAHZo3oGG92H97NA" class="input input-bordered input-primary w-xl">
          <div class="alert alert-warning shadow-lg mt-2" v-for="error of v$.password.$errors" :key="error.$uid">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
      </div>

        <div class="p-2"/>
      <div class="alert alert-error shadow-lg" v-if="this.troiErrorMessage !== ''">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Achtung: {{this.troiErrorMessage}}</span>
        </div>
      </div>
      <div class="alert alert-success shadow-lg" v-if="this.troiConnectionMessage !== ''">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Sieht gut aus! Die Verbindung kann hergestellt werden und der verwendete Account hat Admin-Rechte.</span>
        </div>
      </div>

      <div class="modal-action">
          <div class="mx-auto">
            <button class="btn btn-primary mx-2" type="submit">Speichern</button>
            <button class="btn btn-accent mx-2" :class="{ loading: this.showLoading }" :disabled="this.showLoading" @click="testConnection()" type="button">Verbindung Testen</button>
            <button class="btn btn-secondary btn-outline mx-2" type="button" @click="this.$emit('close')">Abbrechen</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {nextTick, onMounted, ref} from 'vue';
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  name: "NewTroiConnection",
  components: {Datepicker},
  setup() {
    const titleEl = ref(null);

    onMounted(() => {
      nextTick(() => {
        titleEl.value.focus();
      });
    });

    return {
      titleEl,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      title:'',
      description:'',
      host:'',
      username:'',
      password:'',
      emptyTitle:false,
      emptyHost:false,
      emptyUsername:false,
      emptyPassword:false,
      apiTested:false,
      connectionWorks:false,
      result:'',
      showLoading:false
    }
  },
  created() {
    this.$store.commit("troiConnections/setTroiConnectionMessage", '')
    this.$store.commit("troiConnections/setTroiErrorMessage", '')
  },
  computed: mapState({
    troiErrorMessage: (state) => state.troiConnections.troiErrorMessage,
    troiConnectionMessage: (state) => state.troiConnections.troiConnectionMessage,
    loading: (state) => state.troiConnections.loading,
  }),

  methods: {
    async testConnection(){
      if(await this.v$.$validate()){
        this.showLoading = true
        this.$store.dispatch("troiConnections/testTroiConnection", {
          host: this.host,
          username: this.username,
          password: this.password,
        }).then(() => {
          this.showLoading = false
        }).catch((error) => {
          if(error.response.status === 500){
            this.showLoading = false
            this.$store.commit("troiConnections/setTroiConnectionMessage", '')
            this.$store.commit("troiConnections/setTroiErrorMessage", 'Die Verbindung zum Host kann nicht hergestellt werden.')
          }
        });
      } else {
        console.log('Fehlerhafte Eingabe.')
      }
    },
    async createTroiConnection(){
      if(await this.v$.$validate()){
        this.$store.dispatch("troiConnections/createTroiConnection", {
          title: this.title,
          description: this.description,
          host: this.host,
          username: this.username,
          password: this.password,
        }).then(() => {
          this.$emit('refreshTroiConnections')
          this.$emit('close')
        }).catch((error) => {
          if(error.response.status !== 201){
            this.showLoading = false
            this.$store.commit("troiConnections/setTroiConnectionMessage", '')
            this.$store.commit("troiConnections/setTroiErrorMessage", 'Die Verbindung konnte nicht gespeichert werden.')
          }
        });
      } else {
        console.log('fehlerhafte eingabe.')
      }
    },
    validate() {
      this.v$.$validate();
    }
  },
  validations() {
    return {
      host: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      },
      title: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      },
      username: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      },
      password: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      }
    }
  }
}
</script>
