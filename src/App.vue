<script>
import './style.scss'
import Navbar from '@/components/Navbar/Index.vue'

export default {
  components: { Navbar }
}
</script>

<template>
  <v-theme-provider root>
    <v-app>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
