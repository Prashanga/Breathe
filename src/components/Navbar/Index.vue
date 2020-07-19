<template>
  <v-app-bar absolute color="primary" dark elevate-on-scroll>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        text
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route"
        exact
      >
        {{ link.text }}
      </v-btn>
    </v-toolbar-items>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import './style.scss'

export default {
  name: 'Navbar',
  data: () => {
    return {
      links: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '#' }
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>
