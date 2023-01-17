<template>
  <div class="modal modal-open">
    <div class="modal-box  max-h-screen overflow-visible overflow-x-auto">
      <h2 class="text-xl pb-8 text-center">Neue Komponente</h2>

      <form @submit.prevent="createComponent">
      <div>
        <div class="form-control w-xl">
          <label class="label" for="title">
            <span class="label-text">Titel</span>
          </label>
          <input ref="titleEl" v-model="title" type="text" id="title" placeholder="Titel" class="input input-bordered input-primary w-xl">
          <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
            <div class="error-msg text-error">{{ error.$message }}</div>
          </div>
        </div>
        <div class="p-2"/>

      <div class="modal-action">
          <div class="mx-auto">
            <button class="btn btn-primary mx-2" type="submit">Speichern</button>
            <button class="btn btn-secondary btn-outline mx-2" type="button" @click="this.$emit('close')">Abbrechen</button>
          </div>
        </div>
    </div>
      </form>
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

export default {
  name: "NewComponent",
  components: {Datepicker},
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
      title:'',
    }
  },
  created() {

  },
  computed: mapState({

  }),

  methods: {
    async createComponent(){
      if(await this.v$.$validate()){
        this.$store.dispatch("components/createComponent", {
          title: this.title,
        }).then(() => {
          this.$emit('refreshComponents')
          this.$emit('close')
        });
      } else {
        console.log('fehlerhafte eingabe.')
      }
    },

    validate() {
      this.v$.$validate();
    }
  },
  validations() {
    return {
      title: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      }
    }
  }
}
</script>
