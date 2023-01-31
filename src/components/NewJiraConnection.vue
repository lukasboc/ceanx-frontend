<template>
  <div class="modal modal-open">
    <div class="modal-box  max-h-screen overflow-visible overflow-x-auto">
      <h2 class="text-xl pb-8 text-center">Neue Jira Verbindung</h2>
      <form @submit.prevent="createJirConnection">
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
          <label class="label" for="email">
            <span class="label-text">E-Mail</span>
          </label>
          <input v-model="email" type="email" id="email" placeholder="name@example.com" class="input input-bordered input-primary w-xl">
          <div class="alert alert-warning shadow-lg mt-2" v-for="error of v$.email.$errors" :key="error.$uid">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
        <div class="form-control w-xl">
          <label class="label" for="api_token">
            <span class="label-text">API Token <span class="badge badge-info badge-outline"><a href="https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/" target="_blank">How to?</a></span></span>
          </label>
          <input v-model="api_token" type="text" id="api_token" placeholder="29z2dxePUAHZo3oGG92H97NA" class="input input-bordered input-primary w-xl">
          <div class="alert alert-warning shadow-lg mt-2" v-for="error of v$.api_token.$errors" :key="error.$uid">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
      </div>

        <div class="p-2"/>
      <div class="alert alert-error shadow-lg" v-if="this.jiraErrorMessage !== ''">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Achtung: {{this.jiraErrorMessage}}</span>
        </div>
      </div>
      <div class="alert alert-success shadow-lg" v-if="this.jiraConnectionMessage !== ''">
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
import moment from "moment";

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
      email:'',
      api_token:'',
      emptyTitle:false,
      emptyHost:false,
      emptyEmail:false,
      emptyApiToken:false,
      apiTested:false,
      connectionWorks:false,
      result:'',
      showLoading:false
    }
  },
  created() {
    this.$store.commit("jiraConnections/setJiraConnectionMessage", '')
    this.$store.commit("jiraConnections/setJiraErrorMessage", '')
  },
  computed: mapState({
    jiraErrorMessage: (state) => state.jiraConnections.jiraErrorMessage,
    jiraConnectionMessage: (state) => state.jiraConnections.jiraConnectionMessage,
    loading: (state) => state.jiraConnections.loading,
  }),

  methods: {
    async testConnection(){
      if(await this.v$.$validate()){
        this.showLoading = true
        this.$store.dispatch("jiraConnections/testJiraConnection", {
          host: this.host,
          email: this.email,
          api_token: this.api_token,
        }).then(() => {
          this.showLoading = false
        }).catch((error) => {
          if(error.response.status === 500){
            this.showLoading = false
            this.$store.commit("jiraConnections/setJiraConnectionMessage", '')
            this.$store.commit("jiraConnections/setJiraErrorMessage", 'Die Verbindung zum Host kann nicht hergestellt werden. Bitte beachte, dass bei Cloud-Instanzen die TLD .net und nicht .de verwendet werden muss.')
          }
        });
      } else {
        console.log('Fehlerhafte Eingabe.')
      }
    },
    async createJirConnection(){
      if(await this.v$.$validate()){
        this.$store.dispatch("jiraConnections/createJiraConnection", {
          title: this.title,
          description: this.description,
          host: this.host,
          email: this.email,
          api_token: this.api_token,
        }).then(() => {
          this.$emit('refreshJiraConnections')
          this.$emit('close')
        }).catch((error) => {
          if(error.response.status !== 201){
            this.showLoading = false
            this.$store.commit("jiraConnections/setJiraConnectionMessage", '')
            this.$store.commit("jiraConnections/setJiraErrorMessage", 'Die Verbindung konnte nicht gespeichert werden.')
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
      email: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      },
      api_token: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      }
    }
  }
}
</script>