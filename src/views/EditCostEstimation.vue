<template>
  <div class="pt-4 container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Kostenschätzung: {{this.title}}</h1>
    <div class="grid grid-auto-rows-min justify-items-end">
      <div class="justify-self-start">
        <p>{{this.description}}</p>
      </div>
      <div class="stats shadow overflow-x-auto">
      <div class="stat place-items-center" v-if="this.unit !== null && this.unit !== ''">
        <div class="stat-title">Einheit</div>
        <div class="stat-value text-2xl">{{unit}}</div>
      </div>
      <div class="stat place-items-center" v-if="this.unit_rate !== null && this.unit_rate !== ''">
        <div class="stat-title">Preis pro Einheit</div>
        <div class="stat-value text-2xl">{{ (this.unit_rate).toString().replaceAll('.',',') }} €</div>
      </div>
      <div class="stat place-items-center" v-if="this.author !== null && this.author !== ''">
        <div class="stat-title">Autor*in</div>
        <div class="stat-value text-2xl">{{ this.author }}</div>
      </div>
        <div class="stat place-items-center" v-if="this.updatedDate !== '' && updatedDate !== null">
          <div class="stat-title">Letzte Änderung</div>
          <div class="stat-value text-2xl">{{ new Date(this.updatedDate).toLocaleDateString('de-DE') }}</div>
        </div>
    </div>
    </div>

    <div class="pb-4 mt-4">
      <div class="w-full">
        <div class="collapse rounded-box w-full">
          <input class="p-0" style="min-height: 0" type="checkbox" />
          <div class="collapse-title text-lg p-0 min-h-0">
            <p class="text-right text-sm pt-1 mr-3">
              Allgemeine Informationen bearbeiten <i class="fas fa-angle-double-down ml-1"></i>
            </p>
            </div>
            <div class="collapse-content">
            <div class="card bg-white shadow-lg">
              <div class="card-body">
                <div class="form-control w-xl">
                  <label class="label" for="title">
                    <span class="label-text">Titel</span>
                  </label>
                  <input v-model="title" type="text" id="title" placeholder="Projekt X" class="input input-primary w-xl">
                  <div v-if="emptyTitle" class="alert alert-warning shadow-lg mt-4 mb-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <span>Dieses Feld darf nicht leer sein.</span>
                    </div>
                  </div>
                </div>
                <div class="form-control w-full">
                  <label class="label" for="description">
                    <span class="label-text">Beschreibung</span>
                  </label>
                  <textarea v-model="description" id="description" placeholder="Beschreibung" class="textarea textarea-primary w-full "></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="form-control w-xl">
                    <label class="label" for="unit">
                      <span class="label-text">Einheit</span>
                    </label>
                    <input v-model="unit" type="text" id="unit" placeholder="Stunden oder Tage" class="input input-primary w-xl">
                  </div>
                  <div class="form-control w-xl">
                    <label class="label" for="unit_rate">
                      <span class="label-text">Preis pro Einheit</span>
                    </label>
                    <input v-model="unit_rate" @keydown="validate" type="text" id="unit_rate" placeholder="XX,XX" class="input input-primary w-xl">
                    <div class="input-errors" v-for="error of v$.unit_rate.$errors" :key="error.$uid">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </div>
                </div>

                <div class="text-center">
                  <button  class="btn btn-primary" @click="editCostEstimation()" type="button">Speichern</button>
                </div>

                <div class="card-actions justify-center">
                  <div v-if="this.costEstimationSuccess" class="alert alert-success shadow-lg mt-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{{ costEstimationSuccess }}</span>
                    </div>
                  </div>
                  <div class="alert alert-error shadow-lg" v-if="this.costEstimationErrorMessage !== ''">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <span>Achtung: {{this.costEstimationErrorMessage}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="prose prose-gray max-w-none" v-for="group in groups" :key="group">
        <h2 class="mb-0 mt-4 md:mt-0">{{ group }}</h2>
        <div class="overflow-x-auto">
          <table class="not-prose table mb-1">
            <thead>
            <tr>
              <th>ID</th>
              <th>Titel</th>
              <th>Beschreibung</th>
              <th>Schätzung<br>(Min.)</th>
              <th>Schätzung<br>(Avg.)</th>
              <th>Schätzung<br>(Max.)</th>
              <th>Kommentar</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover" v-for="position in this.positions">
              <td v-if="position.component === group"><button @click="this.tmpPosId = position.id; this.showDeletePositionModal = true" class="btn gap-2 btn-error btn-link text-error btn-xs">
                <i class="far fa-trash-alt"></i>
              </button> {{ position.id }}</td>
              <td v-if="position.component === group"><button @click="this.tmpCostEstimationId = position.id; this.tmpStep = 0; this.showEditPositionModal = true" class="btn gap-2 btn-link btn-xs">
                <i class="far fa-pencil"></i>
              </button> {{ position.title }}</td>
              <td v-if="position.component === group"><button @click="this.tmpCostEstimationId = position.id; this.tmpStep = 0; this.showEditPositionModal = true" class="btn gap-2 btn-link btn-xs">
                <i class="far fa-pencil"></i>
              </button> {{ position.description }}</td>
              <td v-if="position.component === group"><button @click="this.tmpCostEstimationId = position.id; this.tmpStep = 1; this.showEditPositionModal = true" class="btn gap-2 btn-link btn-xs">
                <i class="far fa-pencil"></i>
              </button> {{ position.minimum_estimate.replaceAll('.', ',') }}</td>
              <td v-if="position.component === group">{{
                  ((parseFloat(position.minimum_estimate) + parseFloat(position.maximum_estimate)) / 2).toFixed(2).replaceAll('.', ',')
                }}</td>
              <td v-if="position.component === group"><button @click="this.tmpCostEstimationId = position.id; this.tmpStep = 1; this.showEditPositionModal = true" class="btn gap-2 btn-link btn-xs">
                <i class="far fa-pencil"></i>
              </button> {{ position.maximum_estimate.replaceAll('.', ',') }}</td>
              <td v-if="position.component === group"><button @click="this.tmpCostEstimationId = position.id; this.tmpStep = 2; this.showEditPositionModal = true;" class="btn gap-2 btn-link btn-xs">
                <i class="far fa-pencil"></i>
              </button> {{ position.comment }}</td>
            </tr>
            <tr class="hover">
              <td>Gesamt</td>
              <td></td>
              <td></td>
              <td>{{ returnMinimumSumForComponent(group) }}</td>
              <td>{{ returnAverageSumForComponent(group) }}</td>
              <td>{{ returnMaximumSumForComponent(group) }}</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center space-x-4">
          <button @click="this.tempComponent = group; this.showNewPositionModal = true" class="btn gap-2 btn-success btn-outline btn-sm">
            <i class="fas fa-plus"></i>
            Neue Position
          </button>
          <button class="btn gap-2 btn-secondary btn-outline btn-sm" @click="this.tmpGroupName = group; this.showEditGroupModal = true">
            <i class="fas fa-pencil"></i>
            Gruppe umbennenen
          </button>
        </div>
      </div>
      <div class="prose prose-gray mx-auto text-center" v-if="loading">
        <button class="btn loading btn-ghost btn-xl">Einen Moment bitte</button>
      </div>
      <button @click="this.showNewGroupModal = true" class="btn gap-2 btn-success btn-outline btn-sm">
        <i class="fas fa-plus"></i>
        Neue Gruppe
      </button>
      <div class="divider" v-if="returnTotalMinimumEffort() !== '0,00' || returnTotalMaximumEffort() !== '0,00' "></div>
      <h1 class="text-2xl font-bold mb-4" v-if="returnTotalMinimumEffort() !== '0,00' || returnTotalMaximumEffort() !== '0,00' ">Gesamtschätzung</h1>

      <div class="grid grid-cols-2 sm:grid-cols-1 sm:grid-auto-rows-min justify-items-start">

      <div class="stats stats-vertical sm:stats-horizontal shadow ml-2 sm:ml-0">
        <div class="stat" v-if="returnTotalMinimumEffort() !== '0,00'">
          <div class="stat-title">Minimaler Aufwand</div>
          <div class="stat-value">{{ returnTotalMinimumEffort() }}</div>
          <div class="stat-desc" v-if="this.unit !== '' && this.unit !== null">{{this.unit}}</div>
          <div class="stat-desc" v-else><i class="far fa-user-clock"></i></div>
        </div>

        <div class="stat" v-if="returnTotalAverageEffort() !== '0,00'">
          <div class="stat-title">Gemittelter Aufwand</div>
          <div class="stat-value">{{ returnTotalAverageEffort() }}</div>
          <div class="stat-desc" v-if="this.unit !== '' && this.unit !== null">{{this.unit}}</div>
          <div class="stat-desc" v-else><i class="far fa-user-clock"></i></div>
        </div>

        <div class="stat" v-if="returnTotalMaximumEffort() !== '0,00'">
          <div class="stat-title">Maximaler Aufwand</div>
          <div class="stat-value">{{ returnTotalMaximumEffort() }}</div>
          <div class="stat-desc" v-if="this.unit !== '' && this.unit !== null">{{this.unit}}</div>
          <div class="stat-desc" v-else><i class="far fa-user-clock"></i></div>
        </div>

      </div>

      <div class="stats stats-vertical sm:stats-horizontal shadow sm:mt-8">
        <div class="stat" v-if="returnTotalMinimumCost() !== null && returnTotalMinimumCost() !== 'null' && returnTotalMinimumCost() !== '0,00'">
          <div class="stat-title">Minimale Kosten</div>
          <div class="stat-value">{{returnTotalMinimumCost()}}</div>
          <div class="stat-desc"><i class="far fa-coins"></i></div>
        </div>

        <div class="stat" v-if="returnTotalAverageCost() !== null && returnTotalAverageCost() !== 'null' && returnTotalAverageCost() !== '0,00'">
          <div class="stat-title">Gemittelte Kosten</div>
          <div class="stat-value">{{returnTotalAverageCost()}}</div>
          <div class="stat-desc"><i class="far fa-coins"></i></div>
        </div>

        <div class="stat" v-if="returnTotalMaximumCost() !== null && returnTotalMaximumCost() !== 'null' && returnTotalMaximumCost() !== '0,00'">
          <div class="stat-title">Maximale Kosten</div>
          <div class="stat-value">{{ returnTotalMaximumCost() }}</div>
          <div class="stat-desc"><i class="far fa-coins"></i></div>
        </div>

      </div>
        </div>
    </div>

  </div>
  <span v-if="showNewGroupModal">
    <NewGroup v-on:close="showNewGroupModal = false" @save="addGroup" />
  </span>
  <span v-if="showEditGroupModal">
    <EditGroup v-bind:oldGroupName="this.tmpGroupName" v-bind:costEstimationId="this.id" v-on:close="showEditGroupModal = false" v-on:refresh="this.refreshPositions()"/>
  </span>
  <span v-if="showNewPositionModal">
    <NewCostEstimationPosition v-model:costEstimationId="this.id" v-model:component="this.tempComponent"  v-on:close="showNewPositionModal = false" v-on:refresh="this.refreshPositions()" />
  </span>
  <span v-if="showEditPositionModal">
    <EditCostEstimationPosition v-bind:costEstimationId="tmpCostEstimationId" v-bind:stepParam="tmpStep"  v-on:close="showEditPositionModal = false" v-on:refresh="this.refreshPositions()" />
  </span>
  <span v-if="showDeletePositionModal">
    <DeleteEstimationPosition v-bind:entryId="this.tmpPosId" v-on:close="showDeletePositionModal = false" v-on:refresh="this.refreshPositions()" />
  </span>

</template>

<script>
import {mapState} from "vuex";
import {helpers} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import NewGroup from "../components/NewGroup.vue";
import NewCostEstimationPosition from "../components/NewCostEstimationPosition.vue";
import EditCostEstimationPosition from "../components/EditCostEstimationPosition.vue";
import EditGroup from "../components/EditGroup.vue";
import DeleteEstimationPosition from "../components/DeleteEstimationPositionEntry.vue";
export default {
  components: {
    DeleteEstimationPosition,
    EditGroup, EditCostEstimationPosition, NewGroup, NewCostEstimationPosition},
  props: {
    id: String,
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      title: '',
      description: '',
      unit: '',
      unit_rate: '',
      author:'',
      id: this.id,
      emptyTitle: false,
      positions: [],
      groups: [],
      showNewGroupModal: false,
      showEditGroupModal: false,
      showNewPositionModal: false,
      showEditPositionModal: false,
      showDeletePositionModal: false,
      tempComponent:'',
      minimumSums:[],
      maximumSums:[],
      averageSums:[],
      updatedDate: '',

      tmpCostEstimationId:null,
      tmpStep:0,
      tmpPosId:0,

      tmpGroupName:'',
      loading:true,
    };
  },
  computed: mapState({
    costEstimationSuccess: (state) => state.costEstimations.costEstimationSuccess,
    costEstimationErrorMessage: (state) => state.costEstimations.costEstimationErrorMessage,
    costEstimation: (state) => state.costEstimations.costEstimation,
    allPositions: (state) => state.costEstimationPositions.all,
  }),
  created() {
    this.$store.commit("costEstimations/setCostEstimationSuccess", '')
      this.$store.dispatch("costEstimations/getCostEstimationById", this.id).then(() => {
        this.title = this.costEstimation.title;
        this.description = this.costEstimation.description
        this.unit = this.costEstimation.unit
        this.unit_rate = this.costEstimation.unit_rate
        this.author = this.costEstimation.user.name
        this.updatedDate = this.costEstimation.updated_at
      });
    this.$store.dispatch("costEstimationPositions/getAllForCostEstimation", this.id).then(() => {
      this.positions = this.allPositions
      let components = this.positions.map( row=>row.component)
      this.groups = [...new Set(components)]
      //minimums
      let newData = [];
      this.positions.forEach(function (a) {
        if ( !this[a.component] ) {
          this[a.component] = { component: a.component, total: parseFloat(a.minimum_estimate) };
          newData.push(this[a.component]);
          return
        }
        this[a.component].total += parseFloat(a.minimum_estimate);
      }, Object.create(null));
      this.minimumSums = newData;

      //maximums
      let newMaximums = [];
      this.positions.forEach(function (a) {
        if ( !this[a.component] ) {
          this[a.component] = { component: a.component, total: parseFloat(a.maximum_estimate) };
          newMaximums.push(this[a.component]);
          return
        }
        this[a.component].total += parseFloat(a.maximum_estimate);
      }, Object.create(null));
      this.maximumSums = newMaximums;

      //avg
      let newAverages = [];
      this.positions.forEach(function (a) {
        if ( !this[a.component] ) {
          this[a.component] = { component: a.component, total: ((parseFloat(a.minimum_estimate) + parseFloat(a.maximum_estimate))/2) };
          newAverages.push(this[a.component]);
          return
        }
        this[a.component].total += ((parseFloat(a.minimum_estimate) + parseFloat(a.maximum_estimate))/2);
      }, Object.create(null));
      this.averageSums = newAverages;
      this.loading = false;
    });
  },
  methods: {
    editCostEstimation() {
      if (this.title === '') {
        this.emptyTitle = true;
      } else {
        this.emptyTitle = false;
        this.$store.dispatch("costEstimations/editCostEstimation", {
          id: this.id,
          title: this.title,
          description: this.description,
          unit: this.unit,
          unit_rate: this.unit_rate
        }).then(response => {
          this.$store.dispatch("costEstimations/getCostEstimationById", this.id).then(() => {
            this.title = this.costEstimation.title;
            this.description = this.costEstimation.description
            this.unit = this.costEstimation.unit
            this.unit_rate = this.costEstimation.unit_rate
            this.author = this.costEstimation.user.name
            this.updatedDate = this.costEstimation.updated_at
          })
        }).catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
      }
    },
    refreshPositions(){
      this.$store.dispatch("costEstimationPositions/getAllForCostEstimation", this.id).then(() => {
        this.positions = this.allPositions
        let components = this.positions.map( row=>row.component)
        this.groups = [...new Set(components)]

        //minima
        let newData = [];
        this.positions.forEach(function (a) {
          if ( !this[a.component] ) {
            this[a.component] = { component: a.component, total: parseFloat(a.minimum_estimate) };
            newData.push(this[a.component]);
            return
          }
          this[a.component].total += parseFloat(a.minimum_estimate);
        }, Object.create(null));
        this.minimumSums = newData;

        //maxima
        let newMaximums = [];
        this.positions.forEach(function (a) {
          if ( !this[a.component] ) {
            this[a.component] = { component: a.component, total: parseFloat(a.maximum_estimate) };
            newMaximums.push(this[a.component]);
            return
          }
          this[a.component].total += parseFloat(a.maximum_estimate);
        }, Object.create(null));
        this.maximumSums = newMaximums;

        //avg
        let newAverages = [];
        this.positions.forEach(function (a) {
          if ( !this[a.component] ) {
            this[a.component] = { component: a.component, total: ((parseFloat(a.minimum_estimate) + parseFloat(a.maximum_estimate))/2) };
            newAverages.push(this[a.component]);
            return
          }
          this[a.component].total += ((parseFloat(a.minimum_estimate) + parseFloat(a.maximum_estimate))/2);
        }, Object.create(null));
        this.averageSums = newAverages;

      });
      this.$store.dispatch("costEstimations/getCostEstimationById", this.id).then(() => {
        this.title = this.costEstimation.title;
        this.description = this.costEstimation.description
        this.unit = this.costEstimation.unit
        this.unit_rate = this.costEstimation.unit_rate
        this.author = this.costEstimation.user.name
        this.updatedDate = this.costEstimation.updated_at
      });
    },
    addGroup(name){
      this.groups.indexOf(name) === -1 ? this.groups.push(name) : console.log("This item already exists");
      console.log(this.groups)
      this.showNewGroupModal = false;
    },
    returnMinimumSumForComponent(component){
      for (let sum in this.minimumSums) {
        if(this.minimumSums[sum].component === component){
          return parseFloat(this.minimumSums[sum].total).toFixed(2).toString().replaceAll('.',',')
        }
      }
    },
    returnMaximumSumForComponent(component){
      for (let sum in this.maximumSums) {
        if(this.maximumSums[sum].component === component){
          return parseFloat(this.maximumSums[sum].total).toFixed(2).toString().replaceAll('.',',')
        }
      }
    },
    returnAverageSumForComponent(component){
      for (let sum in this.averageSums) {
        if(this.averageSums[sum].component === component){
          return parseFloat(this.averageSums[sum].total).toFixed(2).toString().replaceAll('.',',')
        }
      }
    },
    returnTotalMinimumEffort(){
      let sum = 0;
      this.minimumSums.forEach(function (a) {
          sum += parseFloat(a.total);
      }, Object.create(null));
      return parseFloat(sum).toFixed(2).toString().replaceAll('.',',');
    },
    returnTotalMaximumEffort(){
      let sum = 0;
      this.maximumSums.forEach(function (a) {
        sum += parseFloat(a.total);
      }, Object.create(null));
      return parseFloat(sum).toFixed(2).toString().replaceAll('.',',');
    },
    returnTotalAverageEffort(){
      let sum = 0;
      this.averageSums.forEach(function (a) {
        sum += parseFloat(a.total);
      }, Object.create(null));
      return parseFloat(sum).toFixed(2).toString().replaceAll('.',',');
    },
    returnTotalAverageCost(){
      if(this.returnTotalAverageEffort() !== null && this.unit_rate !== null && this.unit_rate !== ''){
        return (parseFloat(this.returnTotalAverageEffort().toString().replaceAll(',','.')) * parseFloat(this.unit_rate)).toFixed(2).toString().replaceAll('.',',');
      } else return 'null'
    },
    returnTotalMaximumCost(){
      if(this.returnTotalMaximumEffort() !== null && this.unit_rate !== null && this.unit_rate !== ''){
        return (parseFloat(this.returnTotalMaximumEffort().toString().replaceAll(',','.')) * parseFloat(this.unit_rate)).toFixed(2).toString().replaceAll('.',',');
      } else return 'null'
    },
    returnTotalMinimumCost(){
      if(this.returnTotalMinimumEffort() !== null && this.unit_rate !== null && this.unit_rate !== ''){
        return (parseFloat(this.returnTotalMinimumEffort().toString().replaceAll(',','.')) * parseFloat(this.unit_rate)).toFixed(2).toString().replaceAll('.',',');
      } else return 'null'
    },
    validate() {
      this.v$.$validate();
    }
  },
  validations() {
    const dec = helpers.regex(/^-?\d+(\.\d{3})*(\,\d{1,2})?$/)
    //
    return {
      unit_rate: {
        dec: helpers.withMessage('Hier muss eine kommagetrennte Dezimalzahl stehen (xx,xx).', dec)
      }
    }
  }
};
</script>