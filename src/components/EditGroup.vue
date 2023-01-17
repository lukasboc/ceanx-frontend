<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h2 class="text-xl pb-8 text-center">Gruppe umbenennen</h2>
      <div class="form-control w-xl">
        <label class="label" for="title">
          <span class="label-text">Titel</span>
        </label>
        <input ref="titleEl" @keypress.enter="editGroupNames" v-model="newName" type="text" id="title" required placeholder="Titel" class="input input-bordered input-primary w-xl">
        <div class="input-errors" v-for="error of v$.newName.$errors" :key="error.$uid">
          <div class="error-msg text-error">{{ error.$message }}</div>
        </div>
      </div>

        <div class="p-2"/>
        <div class="modal-action">
          <div class="mx-auto">
            <button class="btn btn-primary mx-1"
                    v-on:click="editGroupNames">
              Speichern
            </button>
            <button class="btn btn-outline mx-1"
                    v-on:click="this.$emit('close');">
              Abbrechen
            </button>
          </div>
          <div class="alert alert-error shadow-lg" v-if="this.error !== ''">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Achtung: Ein Fehler ist aufgetreten. Umbenennung nicht erfolgreich.</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {nextTick, onMounted, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  name: "EditGroup",
  props: {
    costEstimationId: Number,
    oldGroupName: String,
  },
  components: {Datepicker},
  data() {
    return {
      id: this.costEstimationId,
      oldName: this.oldGroupName,
      newName: this.oldGroupName,
      error: '',
    }
  },
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
  created() {

  },
  methods: {
    async editGroupNames(){
      if(await this.v$.$validate()){
        this.$store.dispatch("costEstimationPositions/editGroupNames", {
          cost_estimation_id: this.costEstimationId,
          old_name: this.oldName,
          new_name: this.newName,
        }).then(() => {

          this.$emit('refresh')
          this.$emit('close')
        }).catch(error => {
          console.log('Ein Fehler ist aufgetreten.')
        });
      } else {
        console.log('fehlerhafte eingabe.')
      }
    },
    validate() {
      this.v$.$validate();
    },
  },
  validations() {
    return {
      newName: {
        required: helpers.withMessage('Dieses Feld muss ausgefüllt werden.', required),
      },
    }
  }
}
</script>
