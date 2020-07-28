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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
