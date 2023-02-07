<template>
  <div class="modal modal-open">
    <div class="modal-box w-screen lg:max-w-5xl max-h-screen overflow-visible overflow-x-auto">
      <h2 class="text-xl pb-8 text-center">Neue Position</h2>

      <ul class="w-full steps">
        <li class="step" :class="{ 'step-primary': step >= 0 }">
          Titel & Beschreibung
        </li>
        <li class="step" :class="{ 'step-primary': step >= 1 }">
          Aufwand
        </li>
        <li class="step" :class="{ 'step-primary': step >= 2 }">
          Kommentar
        </li>
      </ul>

      <div v-if="step === 0">
        <div class="form-control w-xl">
          <label class="label" for="title">
            <span class="label-text">Titel</span>
          </label>
          <input ref="titleEl" v-model="title" type="text" id="title" placeholder="Mega Menü" class="input input-bordered input-primary w-xl">
          <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
            <div class="error-msg text-error">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text">Beschreibung (optional)</span>
          </label>
          <textarea @keydown.tab="step++" v-model="description" id="description" placeholder="Beschreibung" class="textarea textarea-bordered textarea-primary w-full "></textarea>
        </div>
      </div>

      <div v-if="step === 1">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">

          <div class="form-control w-xl">
            <label class="label" for="minimum">
              <span class="label-text">Minmum Schätzung</span>
            </label>
            <input v-model="minimum_estimate" type="text" id="minimum" placeholder="Min"
                   class="input input-bordered input-primary w-xl">
            <div class="input-errors" v-for="error of v$.minimum_estimate.$errors" :key="error.$uid">
              <div class="error-msg text-error">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-control w-xl">
            <label class="label" for="maximum">
              <span class="label-text">Maximum Schätzung</span>
            </label>
            <input @keydown.tab="step++" v-model="maximum_estimate" type="text" id="maximum" placeholder="Max"
                   class="input input-bordered input-primary w-xl">
            <div class="input-errors" v-for="error of v$.maximum_estimate.$errors" :key="error.$uid">
              <div class="error-msg text-error">{{ error.$message }}</div>
            </div>
          </div>

        </div>
          <h3>Assistenten:</h3>
          <div class="card bg-[#F9FCFF] shadow-lg w-full max-w-none mt-2">
            <div class="w-full tabs">
              <a class="tab tab-bordered" @click="tab = 0" :class="{ 'tab-active': tab === 0 }">Jira Aufwände</a>
              <a class="tab tab-bordered" @click="tab = 1" :class="{ 'tab-active': tab === 1 }">Troi Kalkulationspositionen</a>
              <a class="tab tab-bordered" @click="tab = 2" :class="{ 'tab-active': tab === 2 }">CeanX Schätzungen</a>
            </div>
            <div class="card-body w-full max-w-none">
              <div v-if="tab === 0">
                <JiraEstimationAssistant v-bind:title="this.title"></JiraEstimationAssistant>
              </div>
              <div v-if="tab === 1">
                <TroiEstimationAssistant v-bind:title="this.title"></TroiEstimationAssistant>
              </div>
              <div v-if="tab === 2">
                <CeanXEstimationAssistant v-bind:title="this.title"></CeanXEstimationAssistant>
              </div>
            </div>
          </div>

      </div>

      <div v-if="step === 2">

        <div class="form-control w-full">
          <label class="label" for="comment">
            <span class="label-text">Kommentar (optional)</span>
          </label>
          <textarea ref="commentEl" @keydown.tab="editCostEstimationPosition" v-model="comment" id="comment" placeholder="Kommentar" class="textarea textarea-bordered textarea-primary w-full "></textarea>
        </div>
      </div>

        <div class="p-2"/>
        <div class="modal-action">
          <div class="mx-auto">
            <button v-if="step > 0" class="btn btn-outline mx-2" type="button" @click="this.printStep(); this.step--; this.printStep();">Zurück</button>
            <button class="btn btn-outline mx-2" @click="this.$emit('close')" type="button">Abbrechen</button>
            <button class="btn btn-primary mx-2" @click="editCostEstimationPosition()" type="button">Speichern</button>
            <button v-if="step < 2" class="btn btn-outline mx-2" type="button" @click="this.printStep(); this.step++; this.printStep()">Weiter</button>
            <div class="alert alert-error shadow-lg" v-if="this.costEstimationPositionMessage !== ''">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Achtung: {{this.costEstimationPositionMessage}}</span>
              </div>
            </div>
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
import {nextTick, onMounted, ref} from 'vue';
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
import moment from "moment";
import JiraEstimationAssistant from "./JiraEstimationAssistant.vue";
import TroiEstimationAssistant from "./TroiEstimationAssistant.vue";
import CeanXEstimationAssistant from "./CeanXEstimationAssistant.vue";

export default {
  name: "EditCostEstimationPosition",
  props: {
    costEstimationId: Number,
    stepParam: Number,
  },
  components: {CeanXEstimationAssistant, TroiEstimationAssistant, JiraEstimationAssistant, Datepicker},
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
      id: this.costEstimationId,
      step: this.stepParam,
      title:'',
      description:'',
      comment:'',
      tab:0,
      maximum_estimate:'',
      minimum_estimate: '',
      component: '',

      error: '',
    }
  },
  created() {
    this.$store.dispatch("costEstimationPositions/getCostEstimationPositionById", this.id).then(() => {
      this.title = this.costEstimationPosition.title;
      this.description = this.costEstimationPosition.description
      this.minimum_estimate = this.costEstimationPosition.minimum_estimate.toString().replaceAll('.',',')
      this.maximum_estimate = this.costEstimationPosition.maximum_estimate.toString().replaceAll('.',',')
      this.comment = this.costEstimationPosition.comment
      this.description = this.costEstimationPosition.description
      this.component = this.costEstimationPosition.component
    });
  },
  computed: mapState({
    costEstimationPosition: (state) => state.costEstimationPositions.costEstimationPosition,
    costEstimationMessage: (state) => state.costEstimationPositions.costEstimationMessage,
    costEstimationPositionMessage: state => state.costEstimationPositions.costEstimationPositionErrorMessage
  }),

  methods: {
    printStep(){
      console.log(this.step)
    },
    async editCostEstimationPosition(){
      if(await this.v$.$validate()){
        this.$store.dispatch("costEstimationPositions/editCostEstimationPosition", {
          id: this.costEstimationId,
          title: this.title,
          description: this.description,
          minimum_estimate: this.minimum_estimate,
          maximum_estimate: this.maximum_estimate,
          component: this.component,
          comment: this.comment
        }).then(() => {
          console.log('bearbeitet.')
          this.$emit('refresh')
          this.$emit('close')
        }).catch(error => {
          console.log('Ein Fehler ist aufgetreten.')
        });
      } else {
        this.error = 'Bitte prüfe deine Eingaben.';
      }
    },
    validate() {
      this.v$.$validate();
    }
  },
  validations() {
    const dec = helpers.regex(/^-?\d+(\.\d{3})*(\,\d{1,2})?$/)
    //
    return {
      title: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required)
      },
      minimum_estimate: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
        dec: helpers.withMessage('Hier muss eine kommagetrennte Dezimalzahl (xx,xx) oder eine Ganzzahl (x) stehen.', dec)
      },
      maximum_estimate: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
        dec: helpers.withMessage('Hier muss eine kommagetrennte Dezimalzahl stehen (xx,xx) oder eine Ganzzahl (x) stehen.', dec)
      }
    }
  }
}
</script>