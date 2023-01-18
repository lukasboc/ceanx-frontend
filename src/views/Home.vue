<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row">
      <img src="/public/data-share.svg" class="max-w-xs md:max-w-md bg-transparent drop-shadow-lg rounded-lg order-last" />
      <div class="prose max-w-none">
        <h1 class="text-5xl font-black text-primary mb-0">CeanX</h1>
        <small class="uppercase"><span class="text-primary">C</span>ost <span class="text-primary">E</span>stimation through <span class="text-primary">An</span>alogy and E<span class="text-primary">x</span>pertise</small>
        <p class="py-6">
          Mittels vereinfachten Zugriff auf Erfahrungsdaten zum vereinfachten Kostenschätzungsprozess.
          CeanX ermöglicht einen einfachen Zugriff auf existierende Kostenschätzungen, erfasste Arbeitszeiten für Arbeitspakete in Jira und Kalkulationspositionen in Troi.
          Verteile Unternehmenswissen und profitiere von kollektiver Erfahrung.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Home',
  data() {
    return {

    };
  },
  computed: {
    ...mapState({

    })
  },
  methods: {

  }
}
</script>
