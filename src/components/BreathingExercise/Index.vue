<script>
import './style.scss'
import { breathingTechniques } from '../../techniques'

export default {
  name: 'BoxBreathing',
  data: () => {
    return {
      breathingTechnique: breathingTechniques.boxBreathing,
      nowPlaying: '',
      timer: '',
      playing: false,
      count: null
    }
  },
  computed: {
    totalPlayingTime() {
      return (
        this.breathingTechnique.breathCycle.reduce(
          (total, secs) => total + secs
        ) * 1000
      )
    },
    numberOfRepetition() {
      return this.breathingTechnique.numberOfRepetition
    },
    playerCol: function() {
      return {
        mobileColumnPlayer: this.$vuetify.breakpoint.smAndDown,
        desktopColumnPlayer: this.$vuetify.breakpoint.mdAndUp
      }
    },
    controlsCol: function() {
      return {
        mobileColumnControls: this.$vuetify.breakpoint.smAndDown,
        desktopColumnControls: this.$vuetify.breakpoint.mdAndUp
      }
    }
  },
  methods: {
    clearAllTimers() {
      this.playing = false
      this.nowPlaying = ''
      this.timer = ''
      let id = window.setTimeout(function() {}, 0)
      while (id--) {
        window.clearTimeout(id) // will do nothing if no timeout with id is present
      }
    },
    breathingTimer(that) {
      let timeAtStart = new Date()
      console.log(timeAtStart)
      let oneRoundTime = 8 // this.totalPlayingTime

      let player = setInterval(function() {
        let timeNow = new Date()
        const timeDifference = (timeNow - timeAtStart) / 1000
        console.log(timeDifference)

        if (timeDifference >= oneRoundTime) {
          that.count = that.count - 1

          if (that.count <= 0) {
            that.nowPlaying = ''
            that.clearAllTimers()
          } else {
            clearInterval(player)
            that.breathingTimer(that)
          }
        } else if (timeDifference <= 2) that.nowPlaying = 'Inhale'
        else if (timeDifference > 2 && timeDifference <= 4)
          that.nowPlaying = 'Hold'
        else if (timeDifference > 4 && timeDifference <= 6)
          that.nowPlaying = 'Exhale'
        else if (timeDifference > 6 && timeDifference <= 8)
          that.nowPlaying = 'Sustain'
      }, 10)
    },
    countdownTimer() {
      let that = this
      let startTimer = 4
      let timer = setInterval(function() {
        that.timer = startTimer - 1

        if (startTimer === 1) {
          clearInterval(timer)
          that.timer = ''
        }
        startTimer--
      }, 1000)
    },

    startPlaying() {
      let that = this
      this.clearAllTimers()
      this.playing = true
      this.count = this.numberOfRepetition

      this.countdownTimer()
      setTimeout(function() {
        that.breathingTimer(that)
      }, 4000)
    }
  }
}
</script>

<template>
  <v-container
    py-0
    fluid
    style="height:100%; width:100%; background-color:blue;"
  >
    <v-row style="height:100%;">
      <!----------- Player  ----------->
      <v-col pa-0 ma-0 cols="12" md="8" :class="playerCol">
        <h1>Hello, Breathing Exercise Here</h1>
        <p v-if="!timer.length">{{ timer }}</p>
        <p>{{ nowPlaying }}</p>
        <button
          v-if="!playing"
          type="button"
          color="blue"
          @click="startPlaying"
        >
          Start
        </button>
        <button
          v-if="playing"
          type="button"
          color="blue"
          @click="clearAllTimers"
        >
          Stop
        </button>
      </v-col>

      <!----------- Controls  ----------->

      <v-col pa-0 ma-0 cols="12" md="4" :class="controlsCol">
        <p>Hello player controls here</p>
      </v-col>
    </v-row>
  </v-container>
</template>
