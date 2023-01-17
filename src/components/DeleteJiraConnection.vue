<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h2 class="text-xl pb-8 text-center">Jira Verbindung löschen</h2>

      <p>Bist du sicher, dass du diese Jira Verbindung löschen möchtest?</p>
        <div class="p-2"/>
        <div class="modal-action">
          <div class="mx-auto">
            <button class="btn btn-error mx-1"
                    v-on:click="deleteJira">
              Löschen
            </button>
            <button class="btn btn-outline mx-1"
                    v-on:click="this.$emit('close');">
              Abbrechen
            </button>
          </div>

        </div>
      <div class="alert alert-error shadow-lg mt-4" v-if="this.error !== ''">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Achtung: {{this.error}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  name: "DeleteJiraConnection",
  props: {
    entryId: String,
  },
  components: {Datepicker},
  data() {
    return {
      id: this.entryId,
      error: '',
    }
  },
  created() {

  },
  methods: {
    async deleteJira(){
        this.$store.dispatch("jiraConnections/deleteConnection", this.id).then(() => {
          this.$emit('refresh')
          this.$emit('close')
        }).catch(error => {
          this.error = error.message
        });
      }
    },
}
</script>