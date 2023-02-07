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
      />
    </div>
      <div class="form-control mb-1 col-span-full sm:col-span-3">
        <button class="btn btn-primary btn-outline" @click="this.searchCeanXPositions()" type="button">Suche starten</button>
      </div>
      </div>
    <div v-if="!emptyInputs" class="overflow-x-auto mb-1 mt-1 py-1 pl-1">
      <div class="stats shadow mx-auto">
        <div class="stat place-items-center" v-if="this.minimum !== null">
          <div class="stat-title">Minimum</div>
          <div class="stat-value">{{ (parseFloat(this.minimum).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Minimum Schätzung</div>
        </div>
        <div class="stat place-items-center" v-if="this.average !== null">
          <div class="stat-title">Durchschnitt</div>
          <div class="stat-value">{{ (parseFloat(this.average).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Minimum Schätzung</div>
        </div>
        <div class="stat place-items-center" v-if="this.median !== null">
          <div class="stat-title">Median</div>
          <div class="stat-value">{{ (parseFloat(this.median).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Minimum Schätzung</div>
        </div>
        <div class="stat place-items-center" v-if="this.maximum !== null">
          <div class="stat-title">Maximum</div>
          <div class="stat-value">{{ (parseFloat(this.maximum).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Minimum Schätzung</div>
        </div>
      </div>
    </div>
    <div v-if="!emptyInputs" class="overflow-x-auto mb-1 mt-1 py-1 pl-1">
      <div class="stats shadow mx-auto">
        <div class="stat place-items-center" v-if="this.minimumMax !== null">
          <div class="stat-title">Minimum</div>
          <div class="stat-value">{{ (parseFloat(this.minimumMax).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Maximum Schätzung</div>
        </div>
        <div class="stat place-items-center" v-if="this.averageMax !== null">
          <div class="stat-title">Durchschnitt</div>
          <div class="stat-value">{{ (parseFloat(this.averageMax).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Maximum Schätzung</div>
        </div>
        <div class="stat place-items-center" v-if="this.medianMax !== null">
          <div class="stat-title">Median</div>
          <div class="stat-value">{{ (parseFloat(this.medianMax).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Maximum Schätzung</div>
        </div>
        <div class="stat place-items-center" v-if="this.maximumMax !== null">
          <div class="stat-title">Maximum</div>
          <div class="stat-value">{{ (parseFloat(this.maximumMax).toFixed(2)).toString().replaceAll('.',',') }}</div>
          <div class="stat-desc">Maximum Schätzung</div>
        </div>
      </div>
    </div>
    <div class="alert alert-info shadow-lg mt-2" v-else>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Bitte gib ein Suchwort ein oder wähle Sie eine Komponente aus, um eine Suche zu starten.</span>
      </div>
    </div>
    <div class="collapse rounded-box w-full">
      <input class="p-0" style="min-height: 0" type="checkbox" />
      <div class="collapse-title text-lg p-0 min-h-0">
        <p class="text-right text-sm pt-1 mr-3">
          Einträge ansehen <i class="fas fa-angle-double-down ml-1"></i>
        </p>
      </div>
      <div class="collapse-content">
        <div class="overflow-x-auto overflow-y-auto max-h-44">
          <table class="table mb-1">
            <thead>
            <tr>
              <th>ID</th>
              <th>Titel</th>
              <th>Minimum Schätzung</th>
              <th>Maximum Schätzung</th>
              <th>Letztes Update</th>
              <th>Von</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover" v-for="result in this.result">
              <td>{{ result.id }}</td>
              <td>{{ result.title }}</td>
              <td>{{ result.minimum_estimate }}</td>
              <td>{{ result.maximum_estimate }}</td>
              <td>{{ new Date(result.updated_at).toLocaleString() }}</td>
              <td v-if="result.user !== null">{{ result.user.name }}</td>
              <td v-else>-</td>
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
  name: "CeanXEstimationAssistant",
  components: {},
  props: {
    title: String,
  },
  data() {
    return {
      searchString:'',
      result:[],
      average: null,
      minimum: null,
      maximum: null,
      median: null,
      emptyInputs: false,
      averageMax: null,
      minimumMax: null,
      maximumMax: null,
      medianMax: null,

    };
  },
  computed: mapState({
    searchResult: (state) => state.costEstimationPositions.searchResult,
  }),
  created() {
    if(this.title !== '' && this.title !== null){
      this.searchString = this.title;
      this.searchCeanXPositions();
    }
  },

  methods: {
    async searchCeanXPositions(){
      if(this.searchString === ''){
        this.emptyInputs = true;
        this.$store.commit("costEstimationPositions/setSearchResult",null)
        this.result = this.searchResult;
        return;
      }
      this.$store.dispatch("costEstimationPositions/getSearchResult", {
          text: this.searchString,
        }).then(() => {
          this.emptyInputs = false;
          this.result = this.searchResult;
          this.returnAverage()
          this.getMaximum()
          this.getMinimum()
          this.getMedian()
        }).catch(error => {
            console.log(error.response.data);
        });
    },
    returnAverage(){
      if(this.getMinimumEstimates().length === 0){
        this.average = 0;
        return;
      }
      let sum = 0;
      for (let resultEntry in this.result) {
       sum += parseFloat(this.result[resultEntry].minimum_estimate)
      }
      this.average = sum / this.result.length
      //max estimates
      if(this.getMaximumEstimates().length === 0){
        this.averageMax = 0;
        return;
      }
      let sum2 = 0;
      for (let resultEntry in this.result) {
        sum2 += parseFloat(this.result[resultEntry].maximum_estimate)
      }
      this.averageMax = sum2 / this.result.length
    },
    getMinimumEstimates(){
      return this.result.map(d => parseFloat(d.minimum_estimate));
    },
    getMaximumEstimates(){
      return this.result.map(d => parseFloat(d.maximum_estimate));
    },
    getMinimum(){
      if(this.getMinimumEstimates().length === 0){
        this.minimum = 0;
        return;
      }
      this.minimum = Math.min(...this.getMinimumEstimates());
      //max estimates
      if(this.getMaximumEstimates().length === 0){
        this.minimumMax = 0;
        return;
      }
      this.minimumMax = Math.min(...this.getMaximumEstimates());
      },
    getMaximum(){
      if(this.getMinimumEstimates().length === 0){
        this.maximum = 0;
        return;
      }
      this.maximum = Math.max(...this.getMinimumEstimates());
      //max estimates
      if(this.getMaximumEstimates().length === 0){
        this.maximumMax = 0;
        return;
      }
      this.maximumMax = Math.max(...this.getMaximumEstimates());
    },
    getMedian() {
      if(this.getMinimumEstimates().length === 0){
        this.median = 0;
        return;
      }
      let concat = this.getMinimumEstimates().sort(
          function (a, b) { return a - b });

      let length = concat.length;

      if (length % 2 === 1) {
        this.median = concat[(length / 2) - .5]
      }
      else {
        this.median = (concat[length / 2]
            + concat[(length / 2) - 1]) / 2;
      }
      //Max Estimates
      if(this.getMaximumEstimates().length === 0){
        this.medianMax = 0;
        return;
      }
      let concat2 = this.getMaximumEstimates().sort(
          function (a, b) { return a - b });

      let length2 = concat.length;

      if (length2 % 2 === 1) {
        this.medianMax = concat[(length2 / 2) - .5]
      }
      else {
        this.medianMax = (concat2[length2 / 2]
            + concat2[(length2 / 2) - 1]) / 2;
      }
    },
    reloadTitle(){
      this.searchString = this.title;
    }
}

};
</script>