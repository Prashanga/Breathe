<script>
import { mapState } from 'vuex'
import './style.scss'

export default {
  name: 'Navbar',
  data: () => {
    return {
      drawer: false,

      links: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' }
      ]
    }
  },
  computed: {
    ...mapState(['title']),
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
    appBarColor() {
      return this.isMobile ? 'primaryBlue' : 'primaryBlack'
    },
    toolbarTitleColor() {
      return this.isMobile ? 'toolbar-title-mobile' : 'toolbar-title-desktop'
    }
  },
  methods: {}
}
</script>

<template>
  <nav>
    <v-app-bar app absolute :color="appBarColor" dark elevate-on-scroll>
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="isMobile"
        color="primaryBlack"
      ></v-app-bar-nav-icon>
      <v-spacer v-if="isMobile"></v-spacer>
      <v-toolbar-title v-bind:class="toolbarTitleColor" class="text-h5">{{
        title
      }}</v-toolbar-title>
      <v-spacer v-if="isMobile"></v-spacer>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!isMobile">
        <v-btn
          text
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          class="text-body-1 white--text"
          exact
        >
          {{ link.text }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      absolute
      app
      v-model="drawer"
      color="primaryBlack"
      dark
      temporary
      deep-purple
      accent-4
      dense
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center"
            >Breathe</v-list-item-title
          >
          <v-list-item-subtitle class="text-center"
            >-By Prashanga</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="(item, index) in links"
          :key="index"
          :to="item.route"
          exact
          link
        >
          <v-list-item-content>
            <v-list-item-title class="text-center subtitle-2">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
