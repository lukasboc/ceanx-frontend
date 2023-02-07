<template>
  <div class="">

    <div class="grid grid-cols-9 gap-x-4">
    <div class="form-control col-span-full sm:col-span-3 mb-2 lg:mb-0">
      <input
          class="input input-bordered "
          id="searchString"
          v-model="searchString"
          type="text"
          placeholder="Mega Menu"
      />
    </div>
      <div class="form-control mb-1 col-span-full sm:col-span-3">
        <div class="dropdown dropdown-end col-span-3" id="compDropdown">
          <div tabindex="0" class="lg:ml-1 btn btn-outline w-full">Komponenten<i class="ml-2 fas fa-chevron-down"></i></div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 overflow-y-auto max-h-[300px]">
            <li v-for="component in components" :key="component.id">
              <label class="label cursor-pointer">
              <span class="label-text">{{ component.title }}</span>
              <input type="checkbox" v-on:click="this.toggleComponent(component.title)" class="checkbox" />
            </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="form-control mb-1 col-span-full sm:col-span-3">
        <button class="btn btn-primary btn-outline" @click="this.searchJiraWorklogs()" type="button">Suche starten</button>
      </div>
      </div>
    <div v-if="!emptyInputs" class="overflow-x-auto mb-1 mt-1 py-1 pl-1">
      <div class="stats shadow mx-auto">
        <div class="stat place-items-center" v-if="this.minumum !== null">
          <div class="stat-title">Minimum</div>
          <div class="stat-value">{{ (parseFloat(this.minumum / 60 / 60).toFixed(2)).toString().replaceAll('.',',') }} h</div>
        </div>
        <div class="stat place-items-center" v-if="this.average !== null">
          <div class="stat-title">Durchschnitt</div>
          <div class="stat-value">{{ (parseFloat(this.average / 60 / 60).toFixed(2)).toString().replaceAll('.',',') }} h</div>
        </div>
        <div class="stat place-items-center" v-if="this.median !== null">
          <div class="stat-title">Median</div>
          <div class="stat-value">{{ (parseFloat(this.median / 60 / 60).toFixed(2)).toString().replaceAll('.',',') }} h</div>
        </div>
        <div class="stat place-items-center" v-if="this.maximum !== null">
          <div class="stat-title">Maximum</div>
          <div class="stat-value">{{ (parseFloat(this.maximum / 60 / 60).toFixed(2)).toString().replaceAll('.',',') }} h</div>
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
        <div class="overflow-x-auto overflow-y-auto max-h-52">
          <table class="table mb-1">
            <thead>
            <tr>
              <th>ID</th>
              <th>Titel</th>
              <th>Aufwand</th>
              <th>Status</th>
              <th>Letztes Update</th>
              <th>Zugewiesen an</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover" v-for="result in this.result">
              <td>{{ result.key }}</td>
              <td>{{ result.fields.summary }}</td>
              <td>{{ (parseFloat(result.fields.timespent / 60 / 60).toFixed(2)).toString().replaceAll('.',',') }} h</td>
              <td>{{ result.fields.status.statusCategory.name }}</td>
              <td>{{ new Date(result.fields.updated).toLocaleString() }}</td>
              <td v-if="result.fields.assignee !== null">{{ result.fields.assignee.displayName }}</td>
              <td v-else></td>
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
  name: "JiraEstimationAssistant",
  props: {
    title: String,
  },
  data() {
    return {
      searchString:'',
      components:[],
      selectedComponents:[],
      result:[],
      average: null,
      minumum: null,
      maximum: null,
      median: null,
      emptyInputs: false
    };
  },
  computed: mapState({
    allComponents: (state) => state.components.components,
    jiraResult: (state) => state.jiraConnections.searchResult,
  }),
  created() {
    this.$store.dispatch("components/getComponents").then(() => {
      this.components = this.allComponents
    })
    if(this.title !== '' && this.title !== null){
    this.searchString = this.title;
    this.searchJiraWorklogs();
    }
  },
  methods: {
    async searchJiraWorklogs(){
      if(this.searchString === '' && this.selectedComponents.length === 0){
        this.emptyInputs = true;
        this.$store.commit("jiraConnections/setJiraResult",null)
        this.result = this.jiraResult;
        return;
      }
      this.$store.dispatch("jiraConnections/getJiraResult", {
          text: this.searchString,
          components: this.selectedComponents,
        }).then(() => {
        this.emptyInputs = false;
        this.result = this.jiraResult;
          this.returnAverage()
          this.getMaximum()
          this.getMinimum()
          this.getMedian()
        }).catch(error => {
            console.log(error.response.data);
        });
    },
    toggleComponent(component){
      if(this.selectedComponents.every(a => a !== component)){
        this.selectedComponents.push(component)
      } else {
        let index = this.selectedComponents.findIndex(a => a === component);
        if (index > -1) {
          this.selectedComponents.splice(index, 1);
        }
      }
    },
    returnAverage(){
      if(this.getTimeSpents().length === 0){
        this.average = 0;
        return;
      }
      let sum = 0;
      for (let resultEntry in this.result) {
       sum += this.result[resultEntry].fields.timespent
      }
      this.average = sum / this.result.length
    },
    getTimeSpents(){
      return this.result.map(d => d.fields.timespent);
    },
    getMinimum(){
      if(this.getTimeSpents().length === 0){
        this.minumum = 0;
        return;
      }
      this.minumum = Math.min(...this.getTimeSpents());
      },
    getMaximum(){
      if(this.getTimeSpents().length === 0){
        this.maximum = 0;
        return;
      }
      this.maximum = Math.max(...this.getTimeSpents());
    },
    getMedian() {
      if(this.getTimeSpents().length === 0){
        this.median = 0;
        return;
      }
      let concat = this.getTimeSpents().sort(
          function (a, b) { return a - b });

      let length = concat.length;

      if (length % 2 === 1) {
        this.median = concat[(length / 2) - .5]
      }
      else {
        this.median = (concat[length / 2]
            + concat[(length / 2) - 1]) / 2;
      }
    },
    reloadTitle(){
      this.searchString = this.title;
    }
}

};
</script>