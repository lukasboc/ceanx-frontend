<template>
  <div class="pt-24 container mx-auto">
    <div class="">
    <h1 class="text-2xl font-bold mb-4">Einstellungen</h1>
    <div class="card bg-white shadow-lg">
      <div class="w-full tabs">
        <a class="tab tab-bordered" @click="step = 0" :class="{ 'tab-active': step === 0 }">Verbindungen</a>
        <a class="tab tab-bordered" @click="step = 1" :class="{ 'tab-active': step === 1 }">Komponenten</a>
        <a class="tab tab-bordered" @click="step = 2" :class="{ 'tab-active': step === 2 }">Passwort ändern</a>
        <a class="tab tab-bordered" @click="step = 3" :class="{ 'tab-active': step === 3 }">Registrierungen</a>
      </div>
      <div class="card-body">
        <div v-if="step === 0">
          <div class="alert alert-info shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Hier findest du alle genutzten Jira und Troi Verbindungen, die zur Unterstützung für Aufwandschätzungen genutzt werden können. Diese Verbindungen werden global genutzt. Mehrfache Einträge für z.B. eine Jira Instanz sind also <strong>nicht nötig</strong>. Das Löschen einer Verbindung geschieht ebenfalls global.</span>
            </div>
          </div>
          <p></p>
          <h2 class="text-xl mt-4">Verbindungsübersicht</h2>
          <h3 class="text-lg">Jira</h3>
          <button @click="this.showNewJiraConnectionModal = true" class="btn gap-2 btn-success btn-outline btn-sm">
            <i class="fas fa-plus"></i>
            Neue Jira Verbindung
          </button>
          <p v-if="!jiraConnections.length" class="mt-4">Bisher wurden keine Jira Verbindungen hinzugefügt.</p>
          <div v-if="jiraConnections.length" class="overflow-x-auto mt-2">
            <table class="table table-compact w-full">
              <thead>
              <tr>
                <th>Verbindungsname</th>
                <th>Beschreibung</th>
                <th>Host</th>
                <th>Aktionen</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="jiraConnection in jiraConnections" :key="jiraConnection.id">
                <td>{{ jiraConnection.title }}</td>
                <td>{{ jiraConnection.description }}</td>
                <td>{{ jiraConnection.host }}</td>
                <td><button class="btn btn-error btn-outline btn-sm" @click="this.tmpId = jiraConnection.id; this.showDeleteJira = true"><i class="far fa-trash-alt mr-2"></i>löschen</button></td>
              </tr>
              </tbody>
            </table>
          </div>
          <h3 class="text-lg mt-4">Troi</h3>
          <button @click="this.showNewTroiConnectionModal = true" class="btn gap-2 btn-success btn-outline btn-sm">
            <i class="fas fa-plus"></i>
            Neue Troi Verbindung
          </button>
          <p v-if="!troiConnections.length" class="mt-4">Bisher wurden keine Troi Verbindungen hinzugefügt.</p>
          <div v-if="troiConnections.length" class="overflow-x-auto mt-2">
            <table class="table table-compact w-full">
              <thead>
              <tr>
                <th>Verbindungsname</th>
                <th>Beschreibung</th>
                <th>Host</th>
                <th>Aktionen</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="troiConenction in troiConnections" :key="troiConenction.id">
                <td>{{ troiConenction.title }}</td>
                <td>{{ troiConenction.description }}</td>
                <td>{{ troiConenction.host }}</td>
                <td><button class="btn btn-error btn-outline btn-sm" @click="this.tmpId = troiConenction.id; this.showDeleteTroi = true"><i class="far fa-trash-alt mr-2"></i>löschen</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="step === 1">
          <h3 class="text-lg">Komponenten</h3>
          <button @click="this.showNewComponentModal = true" class="btn gap-2 btn-success btn-outline btn-sm">
            <i class="fas fa-plus"></i>
            Neue Komponenten
          </button>
          <p v-if="!components.length" class="mt-4">Bisher wurden keine Komponenten hinzugefügt.</p>
          <div v-if="components.length" class="overflow-x-auto mt-2">
            <table class="table table-compact w-full">
              <thead>
              <tr>
                <th>Titel</th>
                <th>Hinzugefügt von</th>
                <th>Aktionen</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="component in components" :key="component.id">
                <td>{{ component.title }}</td>
                <td>{{ component.user.name }}</td>
                <td><button class="btn btn-error btn-outline btn-sm" @click="this.tmpId = component.id; this.showDeleteComponent = true"><i class="far fa-trash-alt mr-2"></i>löschen</button></td>
              </tr>
              </tbody>
            </table>
          </div>


        </div>
        <div v-if="step === 2">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h2 class="text-xl">Passwort ändern</h2>
              <form @submit.prevent="updatePassword">
                <div class="form-control w-xl">
                  <label class="label" for="currentPassword">
                    <span class="label-text">Aktuelles Passwort</span>
                  </label>
                  <input v-model="currentPassword" type="password" id="currentPassword" placeholder="Aktuelles Passwort"
                         class="input input-bordered input-primary w-xl">
                </div>
                <div class="form-control w-xl">
                  <label class="label" for="newPassword">
                    <span class="label-text">Neues Passwort</span>
                  </label>
                  <input v-model="newPassword" type="password" id="newPassword" placeholder="Neues Passwort"
                         class="input input-bordered input-primary w-xl">
                </div>
                <div class="form-control w-xl">
                  <label class="label" for="passwordConfirm">
                    <span class="label-text">Wiederholung</span>
                  </label>
                  <input v-model="confirmPassword" @keyup="this.checkIfPasswordConfirmMatches" type="password"
                         id="passwordConfirm" placeholder="Wiederholung"
                         class="input input-bordered input-primary w-xl">
                </div>
                <div v-if="this.changePasswordError" class="alert alert-warning shadow-lg mt-4">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span>Das Passwort wurde nicht geändert. Versuche es erneut.</span>
                  </div>
                </div>
                <div v-if="!passwordConfirmMatches" class="alert shadow-lg mt-4">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         class="stroke-info flex-shrink-0 w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Die Passwortbestätigung stimmt nicht mit dem neuen Passwort überein.</span>
                  </div>
                </div>
                <div v-if="this.changePasswordSuccess" class="alert alert-success shadow-lg mt-4">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Das Passwort wurde geändert. Bitte verwende es ab jetzt für den Login.</span>
                  </div>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary mt-4 text-center" type="submit">Passwort ändern</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div v-if="step === 3">
          <h3 class="text-lg">Registrierungen</h3>

          <span v-if="registerAllowed" class="alert alert-warning shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Achtung: das System ist offen für neue Registrierungen. Bitte beachte, dass jeder neue Nutzer alles sehen kann, was du auch siehst.</span>
            </div>
          </span>
          <p v-if="registerAllowed" class="my-4">Sofern du aktuell keine neuen Nutzer erwartest, schalte die Registrierung besser aus:</p>
          <p v-if="!registerAllowed" class="my-4">Falls du neue Nutzer erwartest, kannst du die Registrierungsfunktion hier einschalten:</p>
          <button v-if="registerAllowed" class="btn btn-error btn-outline " @click="toggleRegisterAllowed">Registrierungen verhindern</button>
          <button v-if="!registerAllowed" class="btn btn-success btn-outline " @click="toggleRegisterAllowed">Registrierungen erlauben</button>
        </div>
      </div>
      </div>
    </div>
  </div>
  <span v-if="showNewJiraConnectionModal">
    <NewJiraConnection v-on:close="showNewJiraConnectionModal = false" v-on:refreshJiraConnections="this.refreshJiraConnections()" />
  </span>
  <span v-if="showNewTroiConnectionModal">
    <NewTroiConnection v-on:close="showNewTroiConnectionModal = false" v-on:refreshTroiConnections="this.refreshTroiConnections()" />
  </span>
  <span v-if="showNewComponentModal">
    <NewComponent v-on:close="showNewComponentModal = false" v-on:refreshComponents="this.refreshComponents()" />
  </span>
  <span v-if="showDeleteJira">
    <DeleteJiraConnection v-bind:entry-id="tmpId" v-on:close="showDeleteJira = false" v-on:refresh="this.refreshJiraConnections()" />
  </span>
  <span v-if="showDeleteTroi">
    <DeleteTroiConnection v-bind:entry-id="tmpId" v-on:close="showDeleteTroi = false" v-on:refresh="this.refreshTroiConnections()" />
  </span>
  <span v-if="showDeleteComponent">
    <DeleteComponent v-bind:entry-id="tmpId" v-on:close="showDeleteComponent = false" v-on:refresh="this.refreshComponents()" />
  </span>
</template>

<script>
import {mapState} from "vuex";
import moment from "moment";
import NewJiraConnection from "../components/NewJiraConnection.vue";
import NewTroiConnection from "../components/NewTroiConnection.vue";
import NewComponent from "../components/NewComponent.vue";
import DeleteJiraConnection from "../components/DeleteJiraConnection.vue";
import DeleteTroiConnection from "../components/DeleteTroiConnection.vue";
import DeleteComponent from "../components/DeleteComponent.vue";

export default {
  components: {
    DeleteComponent,
    DeleteTroiConnection, DeleteJiraConnection, NewComponent, NewJiraConnection,NewTroiConnection},
  data() {
    return {
      step: 0,
      name: '',
      description: '',

      eMailValid: true,
      emptyName: false,
      emptyAccessCode: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordConfirmMatches: true,

      jiraConnections:[],
      showNewJiraConnectionModal:false,
      showDeleteJira: false,

      troiConnections:[],
      showNewTroiConnectionModal:false,
      showDeleteTroi:false,

      components:[],
      showNewComponentModal:false,
      showDeleteComponent:false,

      tmpId:null,

    };
  },
  computed: mapState({
    changePasswordError: (state) => state.users.changePasswordError,
    changePasswordSuccess: (state) => state.users.changePasswordSuccess,

    allJiraConnections: (state) => state.jiraConnections.allJiraConnections,
    allTroiConnections: (state) => state.troiConnections.allTroiConnections,
    allComponents: (state) => state.components.components,
    registerAllowed: (state) => state.settings.registerAllowed
  }),
  created() {
    this.$store.dispatch("settings/getRegisterAllowed")
    this.$store.commit("users/changePasswordError", false)
    this.$store.commit("users/changePasswordSuccess", false)
    this.$store.dispatch("jiraConnections/getAllJiraConnections").then(() => {
      this.jiraConnections = this.allJiraConnections
    })
    this.$store.dispatch("troiConnections/getAllTroiConnections").then(() => {
      this.troiConnections = this.allTroiConnections
    })
    this.$store.dispatch("components/getComponents").then(() => {
      this.components = this.allComponents
    })
  },
  methods: {
    toggleRegisterAllowed(){
      this.$store.dispatch("settings/toggleRegisterAllowed", {
        current: this.registerAllowed,
      }).catch(error => {
        console.log(error.message)
      });
    },
    refreshJiraConnections(){
      this.$store.dispatch("jiraConnections/getAllJiraConnections").then(() => {
        this.jiraConnections = this.allJiraConnections
      })
    },
    refreshTroiConnections(){
      this.$store.dispatch("troiConnections/getAllTroiConnections").then(() => {
        this.troiConnections = this.allTroiConnections
      })
    },
    refreshComponents(){
      this.$store.dispatch("components/getComponents").then(() => {
        this.components = this.allComponents
      })
    },
    checkIfPasswordConfirmMatches() {
      this.passwordConfirmMatches = this.newPassword === this.confirmPassword;
    },
    updatePassword() {
      const payload = {
        current_password: this.currentPassword,
        password: this.newPassword,
        password_confirmation: this.confirmPassword,
      };
      this.$store.dispatch("users/updatePassword", payload)
    },
    moment: function (date) {
      return moment(date);
    },
  }
};
</script>