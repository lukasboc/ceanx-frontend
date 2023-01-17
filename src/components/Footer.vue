<template>
  <footer class="footer p-10">
    <div>
      <span class="footer-title">Rechtliches</span>
      <router-link class="link link-hover" :to="{ name: 'LegalNotice' }">Impressum</router-link>
      <router-link class="link link-hover" :to="{ name: 'PrivacyPolicy' }">Datenschutz</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
