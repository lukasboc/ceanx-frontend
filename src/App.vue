<template>
  <div class="app flex flex-col min-h-screen">
    <Navigation/>
    <MobileNavigation/>
    <router-view class="flex-1"/>
    <Footer/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import MobileNavigation from './components/NavigationMobile.vue'
import Footer from './components/Footer.vue'
export default {
  name: "App",
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'CeanX - Kostenschätzung durch Analogie und Expertise';
      }
    },
  },
  components: {
    Navigation,
    MobileNavigation,
    Footer,
  },

  created() {
     //check if user is login on creation, so that previous session is restored
     //This works because authorization is stored in cookie
    this.$store.dispatch('users/getUser');
  },
};
</script>

<style>
@font-face {
  font-family: "Anek_Tamil";
  src: local("Anek_Tamil"),
  url(./assets/fonts/Anek_Tamil/static/AnekTamil/AnekTamil-Regular.ttf) format("truetype");
}
* {
  font-family: "Anek_Tamil", sans-serif;
  font-weight: 400;
}
</style>