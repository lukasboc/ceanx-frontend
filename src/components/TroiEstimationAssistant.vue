<template>
  <div class="">

    <div class="grid grid-cols-9 gap-x-4">
    <div class="form-control col-span-full sm:col-span-6 mb-2 lg:mb-0">
      <input
          class="input input-bordered "
          id="searchString"
          v-model="searchString"
          type="text"
          placeholder="Mega Menu"
          @keydown.enter="this.searchTroiCalculationPositions()"
      />
    </div>
      <div class="form-control mb-1 col-span-full sm:col-span-3">
        <button class="btn btn-primary btn-outline" @click="this.searchTroiCalculationPositions()" type="button">Suche starten</button>
      </div>
      </div>
    <div v-if="!emptyInputs" class="mt-2 overflow-x-auto py-1 pl-1">
      <div class="stats shadow">
        <div class="stat place-items-center" v-if="this.minumumQuantity !== null">
          <div class="stat-title">Minimum</div>
          <div class="stat-value">{{ (parseFloat(this.minumumQuantity).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Quantität</div>
        </div>
        <div class="stat place-items-center" v-if="this.averageQuantity !== null">
          <div class="stat-title">Durchschnitt</div>
          <div class="stat-value">{{ (parseFloat(this.averageQuantity).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Quantität</div>
        </div>
        <div class="stat place-items-center" v-if="this.medianQuantity !== null">
          <div class="stat-title">Median</div>
          <div class="stat-value">{{ (parseFloat(this.medianQuantity).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Quantität</div>
        </div>
        <div class="stat place-items-center" v-if="this.maximumQuantity !== null">
          <div class="stat-title">Maximum</div>
          <div class="stat-value">{{ (parseFloat(this.maximumQuantity).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Quantität</div>
        </div>
      </div>
    </div>
    <div v-if="!emptyInputs" class="overflow-x-auto mb-2 py-1 pl-1">
      <div class="stats shadow">
        <div class="stat place-items-center" v-if="this.minumum !== null">
          <div class="stat-title">Minimum</div>
          <div class="stat-value">{{ (parseFloat(this.minumum).toFixed(2)).toString().replaceAll('.',',') }} €</div>
          <div class="stat-desc">Gesamtkosten</div>
        </div>
        <div class="stat place-items-center" v-if="this.average !== null">
          <div class="stat-title">Durchschnitt</div>
          <div class="stat-value">{{ (parseFloat(this.average).toFixed(2)).toString().replaceAll('.',',') }} €</div>
          <div class="stat-desc">Gesamtkosten</div>
        </div>
        <div class="stat place-items-center" v-if="this.median !== null">
          <div class="stat-title">Median</div>
          <div class="stat-value">{{ (parseFloat(this.median).toFixed(2)).toString().replaceAll('.',',') }} €</div>
          <div class="stat-desc">Gesamtkosten</div>
        </div>
        <div class="stat place-items-center" v-if="this.maximum !== null">
          <div class="stat-title">Maximum</div>
          <div class="stat-value">{{ (parseFloat(this.maximum).toFixed(2)).toString().replaceAll('.',',') }} €</div>
          <div class="stat-desc">Gesamtkosten</div>
        </div>
      </div>
    </div>
    <div class="alert alert-info shadow-lg mt-2" v-else>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Bitte gib ein Suchwort ein, um eine Suche zu starten.</span>
      </div>
    </div>
    <div class="collapse rounded-box w-full">
      <input class="p-0" style="min-height: 0" type="checkbox" />
      <div class="collapse-title text-lg p-0 min-h-0">
        <p class="text-right text-sm pt-1 mr-3">
          Positionen ansehen <i class="fas fa-angle-double-down ml-1"></i>
        </p>
      </div>
      <div class="collapse-content">
        <div class="overflow-x-auto overflow-y-auto max-h-80">
          <table class="table mb-1">
            <thead>
            <tr>
              <th>Nr.</th>
              <th>Titel</th>
              <th>Gesamtkosten</th>
              <th>Einzelpreis</th>
              <th>Quantität</th>
              <th>Einheit</th>
              <th>Änderungsdatum</th>
              <th>Pfad</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover" v-for="result in this.result">
              <td>K{{ result.id }}</td>
              <td>{{ result.Name }}</td>
              <td>{{result.TotalCalculation}}</td>
              <td>{{result.SalePrice}}</td>
              <td>{{ result.Quantity }}</td>
              <td v-if="result.Unit.Name !== null">{{ result.Unit.Name }}</td>
              <td v-else>-</td>
              <td>{{ new Date(result.ModifiedAt).toLocaleString() }}</td>
              <td>{{ result.DisplayPath }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TroiEstimationAssistant",
  components: {},
  props: {
    title: String,
  },
  data() {
    return {
      searchString:'',
      result:[],
      average: null,
      minumum: null,
      maximum: null,
      median: null,
      averageQuantity: null,
      minumumQuantity: null,
      maximumQuantity: null,
      medianQuantity: null,

      emptyInputs: false
    };
  },
  computed: mapState({
    allComponents: (state) => state.components.components,
    troiResult: (state) => state.troiConnections.searchResult,
  }),
  created() {
    this.searchString = this.title;
    this.searchTroiCalculationPositions();
  },

  methods: {
    async searchTroiCalculationPositions(){
      if(this.searchString === ''){
        this.emptyInputs = true;
        this.$store.commit("troiConnections/setTroiResult",null)
        this.result = this.troiResult;
        return;
      }
      this.$store.dispatch("troiConnections/getTroiResult", {
          text: this.searchString
        }).then(() => {
          this.emptyInputs = false;
          this.result = this.troiResult;
          this.returnAverage()
          this.getMaximum()
          this.getMinimum()
          this.getMedian()
        }).catch(error => {
            console.log(error.response.data);
        });
    },
    returnAverage(){
      if(this.getTotalCalulation().length === 0){
        this.average = 0;
        return;
      }
      let sum = 0;
      for (let resultEntry in this.result) {
       sum += this.result[resultEntry].TotalCalculation
      }
      this.average = sum / this.result.length
      //Quantity
      if(this.getQuantities().length === 0){
        this.averageQuantity = 0;
        return;
      }
      let sum2 = 0;
      for (let resultEntry in this.result) {
        sum2 += this.result[resultEntry].Quantity
      }
      this.averageQuantity = sum2 / this.result.length
    },
    getTotalCalulation(){
      return this.result.map(d => d.TotalCalculation);
    },
    getQuantities(){
      return this.result.map(d => d.Quantity);
    },
    getMinimum(){
      if(this.getTotalCalulation().length === 0){
        this.minumum = 0;
        return;
      }
      this.minumum = Math.min(...this.getTotalCalulation());
      //Quantities
      if(this.getQuantities().length === 0){
        this.minumumQuantity = 0;
        return;
      }
      this.minumumQuantity = Math.min(...this.getQuantities());
    },
    getMaximum(){
      if(this.getTotalCalulation().length === 0){
        this.maximum = 0;
        return;
      }
      this.maximum = Math.max(...this.getTotalCalulation());
      //Quantitites
      if(this.getQuantities().length === 0){
        this.maximumQuantity = 0;
        return;
      }
      this.maximumQuantity = Math.max(...this.getQuantities());
    },
    getMedian() {
      if(this.getTotalCalulation().length === 0){
        this.median = 0;
        return;
      }
      let concat = this.getTotalCalulation().sort(
          function (a, b) { return a - b });
      let length = concat.length;

      if (length % 2 === 1) {
        this.median = concat[(length / 2) - .5]
      }
      else {
        this.median = (concat[length / 2]
            + concat[(length / 2) - 1]) / 2;
      }
      //Quantities
      if(this.getQuantities().length === 0){
        this.medianQuantity = 0;
        return;
      }
      let concat2 = this.getQuantities().sort(
          function (a, b) { return a - b });
      let length2 = concat2.length;

      if (length % 2 === 1) {
        this.medianQuantity = concat2[(length2 / 2) - .5]
      }
      else {
        this.medianQuantity = (concat2[length2 / 2]
            + concat2[(length2 / 2) - 1]) / 2;
      }
    },
    reloadTitle(){
      this.searchString = this.title;
    }
}

};
</script>