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
      <div class="prose prose-gray max-w-none" v-for="group in groups" :key="group">
        <h2 class="mb-0 mt-4 md:mt-0">{{ group }}</h2>
        <div class="overflow-x-auto">
          <table class="table mb-1">
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
              <td v-if="position.component === group">{{ position.id }}</td>
              <td v-if="position.component === group">{{ position.title }}</td>
              <td v-if="position.component === group">{{ position.description }}</td>
              <td v-if="position.component === group">{{ position.minimum_estimate.replaceAll('.', ',') }}</td>
              <td v-if="position.component === group">{{
                  ((parseFloat(position.minimum_estimate) + parseFloat(position.maximum_estimate)) / 2).toFixed(2).replaceAll('.', ',')
                }}</td>
              <td v-if="position.component === group">{{ position.maximum_estimate.replaceAll('.', ',') }}</td>
              <td v-if="position.component === group">{{ position.comment }}</td>
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
      </div>
      <div class="prose prose-gray mx-auto" v-if="groups.length === 0 && !loading">
        <div class="alert shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Ziemlich leer hier... Dies ist eine Kostenschätzung ohne Positionen.</span>
          </div>
        </div>
      </div>
      <div class="prose prose-gray mx-auto text-center" v-if="loading">
        <button class="btn loading btn-ghost btn-xl">Einen Moment bitte</button>
      </div>
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
        <div class="stat" v-if="returnTotalMinimumCost() !== null && returnTotalMinimumCost() !== 'null' && returnTotalMinimumCost !== '0,00'">
          <div class="stat-title">Minimale Kosten</div>
          <div class="stat-value">{{returnTotalMinimumCost()}}</div>
          <div class="stat-desc"><i class="far fa-coins"></i></div>
        </div>

        <div class="stat" v-if="returnTotalAverageCost() !== null && returnTotalAverageCost() !== 'null'">
          <div class="stat-title">Gemittelte Kosten</div>
          <div class="stat-value">{{returnTotalAverageCost()}}</div>
          <div class="stat-desc"><i class="far fa-coins"></i></div>
        </div>

        <div class="stat" v-if="returnTotalMaximumCost() !== null && returnTotalMaximumCost() !== 'null'">
          <div class="stat-title">Maximale Kosten</div>
          <div class="stat-value">{{ returnTotalMaximumCost() }}</div>
          <div class="stat-desc"><i class="far fa-coins"></i></div>
        </div>

      </div>
        </div>
    </div>

  </div>
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

      this.loading = false
    });
  },
  methods: {
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
  }
};
</script>