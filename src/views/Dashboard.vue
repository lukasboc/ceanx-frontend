<template>
  <div class="pt-24 container mx-auto">
    <div class="prose max-w-none">
    <h1>Willkommen, {{ user.name }}!</h1>
      <p>Alles wichtige auf einen Blick:</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      <div v-if="registerAllowed" class="card bg-white shadow-lg float-left" >
        <div class="card-body">
          <span class="card-title">Wichtiger Hinweis</span>
          <span class="alert alert-warning shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Achtung: das System ist offen für neue Registrierungen.</span>
        </div>
      </span>
          Die Registrierungsfunktion kann in den Einstellungen ausgeschaltet werden.
        </div>

      </div>

      <div class="card bg-white shadow-lg float-left" >
        <div class="card-body">
            <span class="card-title">Die aktuellsten Kostenschätzungen</span>
          <table class="table table-compact w-full">
            <thead>
            <tr>
              <th>Titel</th>
              <th>Autor*in</th>
              <th>Datum</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="costEstimation in this.latestCostEstimations" :key="costEstimation.id">
              <td>{{ costEstimation.title }}</td>
              <td>{{ costEstimation.user.name }}</td>
              <td>{{ new Date(costEstimation.updated_at).toLocaleString() }}</td>
            </tr>
            </tbody>
          </table>
          </div>

        </div>
      <div class="card bg-white shadow-lg float-left" >
        <div class="card-body">
          <span class="card-title">Die neusten Benutzer*innen</span>
          <table class="table table-compact w-full">
            <thead>
            <tr>
              <th>Titel</th>
              <th>Autor*in</th>
              <th>Datum</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in this.latestUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ new Date(user.created_at).toLocaleString() }}</td>
            </tr>
            </tbody>
          </table>


        </div>

      </div>

    </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  data() {
    return {
    };
  },
  created() {
    this.$store.dispatch("settings/getRegisterAllowed")
    this.$store.dispatch("users/getUser")
    this.$store.dispatch("costEstimations/getLatestEstimations")
    this.$store.dispatch("users/getLatestUsers")
  },
  computed: mapState({
    user: (state) => state.users.user,
    latestCostEstimations: (state) => state.costEstimations.latest,
    latestUsers: (state) => state.users.latestUsers,
    registerAllowed: (state) => state.settings.registerAllowed
  }),
  methods: {

  }
};
</script>