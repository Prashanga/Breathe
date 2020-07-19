<template>
  <div>
    <v-app-bar absolute color="primary" dark elevate-on-scroll>
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="$vuetify.breakpoint.xsOnly"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!$vuetify.breakpoint.xsOnly">
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

      <v-btn v-if="!$vuetify.breakpoint.xsOnly" icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      absolute
      app
      v-model="drawer"
      color="primary"
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
  </div>
</template>

<script>
import './style.scss'

export default {
  name: 'Navbar',
  data: () => {
    return {
      drawer: false,
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
