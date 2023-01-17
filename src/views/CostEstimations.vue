<template>
  <div class="pt-24 container mx-auto min-h-screen">
    <div class="pt-8 grid grid-cols-2 sm:grid-cols-2 gap-4 ">
    <h1 class="text-2xl font-bold mb-4">Kostenschätzungen</h1>
    <span class="text-right"><router-link :to="{ name: 'NewCostEstimation' }" class="btn btn-primary">Neue Kostenschätzung</router-link></span>
      </div>
      <div>
        <div class="grid grid-cols-10 gap-x-4">
          <div class="form-control col-span-full sm:col-span-7 mb-2 lg:mb-0">
            <label class="label" for="searchString">
                <span class="label-text"
                >Kostenschätzung suchen:</span
                >
            </label>
            <input
                class="input input-bordered"
                @keyup="searchCostEstimation()"
                id="searchString"
                v-model="searchString"
                type="text"
                placeholder="Suchen"
            />
          </div>
          <div class="form-control col-span-full sm:col-span-3">
            <label class="label" for="sortCostEstimationsSelect">
              <span class="label-text">
                Sortieren:
              </span>
            </label>
            <select @change="sortCostEstimations($event)" class="select select-bordered" id="sortCostEstimationsSelect">
              <option disabled value>Sortieren</option>
              <option value="titleAsc">
                Titel (aufsteigend)
              </option>
              <option value="titleDesc">
                Titel (absteigend)
              </option>
              <option value="dateAsc">
                Datum (aufsteigend)
              </option>
              <option value="dateDesc">
                Datum (absteigend)
              </option>
              <option value="authorAsc">
                Verfasser*in (aufsteigend)
              </option>
              <option value="authorDesc">
                Verfasser*in (absteigend)
              </option>
            </select>
          </div>
        </div>
      </div>
    <div class="pt-8 grid grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
      <div class="card bg-white shadow-lg float-left" v-for="ce in filteredCostEstimations" :key="ce.id">
        <div class="card-body">
          <div class="form-control">
              <span class="card-title my-2">{{ ce.title }}</span>
            <p class="font-light">{{ ce.description }}</p>
            <span class="text-sm">verfasst von {{ ce.user.name }}. Letzte Änderung: {{ new Date(ce.updated_at).toLocaleString() }}</span>
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-outline btn-error btn-sm" @click="this.tmpId = ce.id; this.showDeleteCostEstimationModal = true"><i class="far fa-trash-alt mr-2"></i>löschen</button>
            <button class="btn btn-outline btn-primary btn-sm" @click="this.tmpId = ce.id; this.duplicateCostEstimation()"><i class="far fa-copy mr-2"></i>Kopieren</button>
            <router-link :to="{ name: 'EditCostEstimation', params: {id: ce.id} }" class="btn btn-outline btn-primary btn-sm"><i class="far fa-edit mr-2"></i>bearbeiten</router-link>
            <router-link :to="{ name: 'ShowCostEstimation', params: {id: ce.id} }" class="btn btn-outline btn-primary  btn-sm"><i class="far fa-eye mr-2"></i>anzeigen</router-link>
          </div>

        </div>
      </div>
    </div>
    <div class="prose prose-gray mx-auto text-center" v-if="loading">
      <button class="btn loading btn-ghost btn-xl">Einen Moment bitte</button>
    </div>
  </div>
  <span v-if="showDeleteCostEstimationModal">
    <DeleteCostEstimation v-bind:entryId="tmpId" v-on:close="showDeleteCostEstimationModal = false" v-on:refresh="this.refreshCostEstimations()"/>
  </span>
</template>

<script>
import {mapState} from "vuex";
import DeleteCostEstimation from "../components/DeleteCostEstimation.vue";

export default {
  components: {DeleteCostEstimation},
  data() {
    return {
      searchString: "",
      sortVariable: "",
      ascending: false,
      filteredCostEstimations: [],

      showDeleteCostEstimationModal: false,
      tmpId: 0,
      loading:true,
    };
  },
  created() {
    this.$store.dispatch("costEstimations/getAll").then(() => {
      this.filteredCostEstimations = JSON.parse(
          JSON.stringify(this.costEstimations)
      );
      this.loading = false;
    });

  },
  computed: mapState({
    costEstimations: (state) => state.costEstimations.all,
  }),
  methods: {
    duplicateCostEstimation() {
        this.$store.dispatch("costEstimations/duplicateCostEstimation", {
          cost_estimation_id: this.tmpId,
        }).then(response => {
          this.refreshCostEstimations()
        }).catch(error => {
          if (error) {
            console.log(error.message);
          }
        });
    },
    refreshCostEstimations(){
      this.$store.dispatch("costEstimations/getAll").then(() => {
        this.filteredCostEstimations = JSON.parse(
            JSON.stringify(this.costEstimations)
        );
      });
    },
    searchCostEstimation() {
      this.filteredCostEstimations = JSON.parse(
          JSON.stringify(this.costEstimations)
      );
      if (this.searchString.length > 0) {
        let searchString = this.searchString.toLowerCase();
        let results = [];
        this.filteredCostEstimations.forEach(function (ce) {
          if (
              ce.title.toLowerCase().includes(searchString) ||
              ce.description.toLowerCase().includes(searchString)
          )
            results.push(ce);
        });
        this.filteredCostEstimations = results;
      }
      this.sortCostEstimations();
    },
    sortCostEstimations(event) {
      this.sortVariable = event.target.value
      switch (this.sortVariable) {
        case "titleAsc":
          this.sortByTitle(true);
          break;
        case "titleDesc":
          this.sortByTitle(false);
          break;
        case "dateAsc":
          this.sortByDate(true);
          break;
        case "dateDesc":
          this.sortByDate(false);
          break;
        case "authorAsc":
          this.sortByAuthor(true);
          break;
        case "authorDesc":
          this.sortByAuthor(false);
          break;
        default:
          break;
      }
    },
    sortByTitle(ascending) {
      this.sortVariable = "title";
      this.ascending = ascending;
      this.filteredCostEstimations.sort((a, b) => {
        if (ascending) return a.title.localeCompare(b.title);
        return -a.title.localeCompare(b.title);
      });
    },
    sortByDate(ascending) {
      this.sortVariable = "date";
      this.ascending = ascending;
      this.filteredCostEstimations.sort((a, b) => {
        if (ascending)
          return -(new Date(b.updated_at) - new Date(a.updated_at));
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
    },
    sortByAuthor(ascending) {
      this.sortVariable = "author";
      this.ascending = ascending;
      this.filteredCostEstimations.sort((a, b) => {
        if (ascending)
          return -(new Date(b.user.name) - new Date(a.user.name));
        return new Date(b.user.name) - new Date(a.user.name);
      });
    },
  }
};
</script>