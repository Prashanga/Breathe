import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primaryBlack: '#17252a',
        primaryBlue: '#3aafa9',
        primaryWhite: '#def2f1'
      },
      dark: {
        primaryBlack: '#17252a',
        primaryBlue: '#3aafa9',
        primaryWhite: '#def2f1'
      }
    }
  }
})
