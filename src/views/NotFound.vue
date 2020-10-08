<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-2 mt-10">
              Page not found! <br />
              404
            </div>
            <br />
            <div class="paragraph-text mt-2">
              <br />
              You look lost. Please find your way back
              <router-link to="/">Home </router-link>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.paragraph-text {
  font-size: 1.2rem;
}
a {
  text-decoration: none;
}
</style>
