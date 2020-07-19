<script>
import './style.scss'
import Navbar from '@/components/Navbar/Index.vue'

export default {
  components: { Navbar }
}
</script>

<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>
