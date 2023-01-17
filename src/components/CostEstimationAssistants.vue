<template>
  <div class="modal modal-open">
    <div class="modal-box w-screen lg:max-w-5xl max-h-screen overflow-visible overflow-x-auto">
      <h2 class="text-xl pb-8 text-center">Schätzungsassistenten</h2>

      <div class="form-control col-span-full mb-2 lg:mb-0">
        <input
            ref="searchStringEl"
            class="input input-bordered "
            id="searchString"
            v-model="searchString"
            @keyup="updateChildren()"
            @keydown.enter="searchInChildren()"
            @keypress.esc="this.$emit('close');"
            type="text"
            placeholder="Mega Menu"
        />
      </div>
        <div class="card bg-[#F9FCFF] shadow-lg w-full max-w-none mt-2">
          <div class="w-full tabs">
            <a class="tab tab-bordered" @click="tab = 0" :class="{ 'tab-active': tab === 0 }">Jira Aufwände</a>
            <a class="tab tab-bordered" @click="tab = 1" :class="{ 'tab-active': tab === 1 }">Troi Kalkulationspositionen</a>
            <a class="tab tab-bordered" @click="tab = 2" :class="{ 'tab-active': tab === 2 }">CeanX Schätzungen</a>
          </div>
          <div class="card-body w-full max-w-none">
            <div v-if="tab === 0">
              <JiraEstimationAssistant ref="jiraAssitant" v-bind:title="this.searchString"></JiraEstimationAssistant>
            </div>
            <div v-if="tab === 1">
              <TroiEstimationAssistant ref="troiAssitant" v-bind:title="this.searchString"></TroiEstimationAssistant>
            </div>
            <div v-if="tab === 2">
              <CeanXEstimationAssistant ref="ceanXAssitant" v-bind:title="this.searchString"></CeanXEstimationAssistant>
            </div>
          </div>
        </div>
      <div class="modal-action">
        <div class="mx-auto">
          <button class="btn btn-outline mx-1"
                  v-on:click="this.$emit('close');">
            Schließen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import JiraEstimationAssistant from "./JiraEstimationAssistant.vue";
import TroiEstimationAssistant from "./TroiEstimationAssistant.vue";
import CeanXEstimationAssistant from "./CeanXEstimationAssistant.vue";
import {nextTick, onMounted, ref} from "vue";

export default {
  name: "CostEstimationAssistant",
  components: {CeanXEstimationAssistant, TroiEstimationAssistant, JiraEstimationAssistant, Datepicker},
  setup() {
    const searchStringEl = ref(null);

    onMounted(() => {
      nextTick(() => {
        searchStringEl.value.focus();
      });
    });

    return {
      searchStringEl,
    }
  },
  data() {
    return {
      component:this.component,
      costEstimationId:this.costEstimationId,
      tab: 0,
      searchString: '',
    }
  },
  created() {

  },
  methods: {
    updateChildren(){
      this.$refs.jiraAssitant.reloadTitle()
      this.$refs.troiAssitant.reloadTitle()
      this.$refs.ceanXAssitant.reloadTitle()
    },
    searchInChildren(){
      this.$refs.jiraAssitant.searchJiraWorklogs()
      this.$refs.troiAssitant.searchTroiCalculationPositions()
      this.$refs.ceanXAssitant.searchCeanXPositions()
    }
  },
}
</script>