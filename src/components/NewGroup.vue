<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h2 class="text-xl pb-8 text-center">Neue Gruppe</h2>
      <form @submit.prevent="submit">
      <div class="form-control w-xl">
        <label class="label" for="title">
          <span class="label-text">Titel</span>
        </label>
        <input ref="titleEl" v-model="title" type="text" id="title" placeholder="Titel" class="input input-bordered input-primary w-xl">
        <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
          <div class="error-msg text-error">{{ error.$message }}</div>
        </div>
      </div>
        <div class="p-2"></div>
        <div class="modal-action">
          <div class="mx-auto">
            <button class="btn btn-primary mx-1" type="submit">
              Speichern
            </button>
            <button class="btn btn-outline mx-1"
                    v-on:click="this.$emit('close');">
              Abbrechen
            </button>
          </div>
    </div>
      </form>

    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {nextTick, onMounted, ref} from 'vue';
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  name: "NewGroup",
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
      title: '',
    }
  },
  methods: {
    validate() {
      this.v$.$validate();
    },
    async submit(){
      if(await this.v$.$validate()) {
        this.$emit('save', this.title)
      }
    }
  },
  validations() {
    return {
      title: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required)
      }
    }
  }
}
</script>
