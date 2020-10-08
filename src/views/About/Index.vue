<script>
import './style.scss'
export default {
  name: 'About',
  beforeMount: function() {
    this.$store.dispatch('setTitle', 'About')
  }
}
</script>

<template>
  <div class="px-1 about-page">
    <div style="height:50px;"></div>
    <div class="text-h6">
      <p>
        This application is developed as a part of the
        <a href="http://code.sydney/" target="_blank">Code.Sydney's</a>
        Vue Joint Learning Program
      </p>
      <p>
        The app is developed using Vue and Vuetify. The app looks better on
        Mobile devices, although the desktop version isn't too bad either
      </p>
      <p>Developed By:</p>
      <p class="mt-n3">
        <v-icon color="primaryBlack">mdi-linkedin</v-icon>
        <a
          href="https://www.linkedin.com/in/prashanga-dhakal-0a4677a6/"
          target="_blank"
        >
          Prashanga Dhakal</a
        >
      </p>
      <p class="mt-n3">
        <v-icon color="primaryBlack">mdi-github</v-icon>
        <a href="https://github.com/Prashanga" target="_blank"> Prashanga</a>
      </p>
    </div>
    <div class="text-body-1 mt-8">
      <p>
        Disclaimer: This app is only a personal project showcase.
      </p>
    </div>
  </div>
</template>
