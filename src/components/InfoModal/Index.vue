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
    <v-dialog
      v-model="modal"
      fullscreen
      persistent
      content
      content-class="centered-dialog"
      color="primaryBlack"
    >
      <v-container fill-height>
        <v-btn icon dark v-on:click="$emit('toggleModal')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-layout column justify-center align-center>
          <p>
            This section is currently under construction. Will be updated
            soon.....
          </p>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
