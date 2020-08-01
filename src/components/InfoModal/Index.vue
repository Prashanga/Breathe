<script>
import './style.scss'
export default {
  name: 'InfoModal',
  data: function() {
    return {}
  },
  props: {
    value: { type: Boolean, default: false }
  },
  computed: {
    modal() {
      return this.value
    }
  }
}
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="modal" fullscreen dark hide-overlay>
      <v-container fill-height fluid>
        <v-btn icon dark v-on:click="$emit('toggleModal')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-layout column class="pt-8">
          <p>
            You can select between three breathing techniques from the select
            button at the bottom of the app
          </p>
          <p>
            The timer duration setting lets you choose how long each cycle of
            the exercise lasts. The default being 1.
          </p>
          <p>
            Check the box for Background Play if you want the exercise to run in
            the background when you switch tabs or minimise the browser
          </p>
          <p>
            Total rounds setting lets you select the number of rounds the
            exercise will run for. Default is 10 rounds
          </p>
          <v-divider
            v-if="$vuetify.breakpoint.smAndDown"
            color="white"
          ></v-divider>
          <p></p>
          <p>
            You can read about the technniques here:
          </p>
          <p>
            Box Breathing:
            <a
              target="_blank"
              href="https://www.healthline.com/health/box-breathing"
              >https://www.healthline.com/health/box-breathing</a
            >
          </p>
          <p>
            4-5-7 Breathing:
            <a
              target="_blank"
              href="https://www.healthline.com/health/4-7-8-breathing"
              >https://www.healthline.com/health/4-7-8-breathing</a
            >
          </p>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
