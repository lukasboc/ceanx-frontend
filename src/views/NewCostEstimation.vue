<template>
  <div class="pt-24 container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Neue Kostenschätzung</h1>
      <div class="card bg-white shadow-lg">
        <ul class="w-full steps">
          <li class="step" :class="{ 'step-primary': step >= 0 }">
            Allgemeines
          </li>
          <li class="step" :class="{ 'step-primary': step >= 1 }">
            Positionen eintragen
          </li>
        </ul>
        <div class="card-body">
          <form @submit.prevent="createCostEstimation">
            <div class="form-control w-xl">
              <label class="label" for="title">
                <span class="label-text">Titel</span>
              </label>
              <input ref="titleEl" v-model="title" @keydown="validate" type="text" id="title" placeholder="Projekt X" class="input input-bordered input-primary w-xl">
              <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div class="form-control w-full">
              <label class="label" for="description">
                <span class="label-text">Beschreibung</span>
              </label>
              <textarea v-model="description" id="description" placeholder="Beschreibung" class="textarea textarea-bordered textarea-primary w-full "></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-control w-xl">
                <label class="label" for="unit">
                  <span class="label-text">Einheit</span>
                </label>
                <input v-model="unit" type="text" id="unit" placeholder="Stunden oder Tage" class="input input-bordered input-primary w-xl">
              </div>
              <div class="form-control w-xl">
                <label class="label" for="unit_rate">
                  <span class="label-text">Preis pro Einheit</span>
                </label>
                <input v-model="unit_rate" @keydown="validate" type="text" id="unit_rate" placeholder="XX,XX" class="input input-bordered input-primary w-xl">
                <div class="input-errors" v-for="error of v$.unit_rate.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
          <div class="card-actions justify-center mt-8">
            <button  class="btn btn-primary" type="submit">Weiter</button>
          </div>
          </form>
        </div>
        </div>
      </div>
</template>

<script>
import {mapState} from "vuex";
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
import {nextTick, onMounted, ref} from "vue";

export default {
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
      step: 0,
      title: '',
      description: '',
      unit_rate: '',
      unit: '',
      emptyTitle: false,
      id:''
    };
  },
  computed: mapState({
    defaultInvoiceInformation: (state) => state.settings.defaultInvoiceInformation,
    costEstimation: (state) => state.costEstimations.costEstimation
  }),
  created() {
  },
  methods: {
    async createCostEstimation() {
      if(await this.v$.$validate()) {
        if (this.title === '') {
          this.step = 0;
          this.emptyTitle = true;
        } else {
          this.emptyTitle = false;
          this.$store.dispatch("costEstimations/createCostEstimation", {
            title: this.title,
            description: this.description,
            unit: this.unit,
            unit_rate: this.unit_rate
          }).then(response => {
            console.log(this.costEstimation.id)
            this.$router.push({
              name: "EditCostEstimation",
              params: {id: this.costEstimation.id}
            });
          }).catch(error => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
        }
      }
    },
    validate() {
      this.v$.$validate();
    },
  },
  validations() {
    const dec = helpers.regex(/^-?\d+(\.\d{3})*(\,\d{1,2})?$/)
    //
    return {
      title: {
        required: helpers.withMessage('Dieses Feld darf nicht leer sein.', required)
      },
      unit_rate: {
        dec: helpers.withMessage('Hier muss eine kommagetrennte Dezimalzahl stehen (xx,xx).', dec)
      }
    }
  }
};
</script>