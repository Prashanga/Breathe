<script>
import './style.scss'
import { breathingTechniques } from '../../techniques'

export default {
  name: 'BoxBreathing',
  data: () => {
    return {
      breathingTechnique: breathingTechniques.boxBreathing,
      nowPlaying: '',
      timerPlaying: false,
      playing: false,
      count: null,
      timer: '',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
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
      this.timerPlaying = true
      let that = this
      let startTimer = 4
      let timer = setInterval(function() {
        that.timer = startTimer - 1

        if (startTimer === 1) {
          clearInterval(timer)
          that.timer = ''
          that.timerPlaying = false
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
        <v-row justify="center" align="center">
          <v-col cols="12" class="my-o py-0">
            <v-row class="circle-container-row" justify="center" align="center">
              <div v-if="timerPlaying">
                <p class="text-h3 mt-4">{{ timer }}</p>
              </div>

              <div
                v-if="playing && nowPlaying.length"
                class="breathing-circle"
              ></div>
            </v-row>
          </v-col>

          <v-col cols="12" class="mt-6 py-0">
            <v-row justify="center" align="center" class="nowPlayingText">
              {{ nowPlaying }}
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row justify="center" align="center" class="my-o py-0">
              <v-btn
                fab
                depressed
                elevation="3"
                absolute
                bottom
                color="primaryBlack"
                class="play-button"
                :ripple="false"
              >
                <v-icon
                  @click="startPlaying"
                  class="fab-icons"
                  v-if="!playing"
                  :ripple="false"
                  >mdi-play</v-icon
                >
                <v-icon
                  @click="clearAllTimers"
                  v-if="playing"
                  class="fab-icons"
                  :ripple="false"
                  >mdi-pause</v-icon
                >
              </v-btn>
            </v-row>

            <v-btn
              small
              right
              absolute
              bottom
              fab
              :ripple="false"
              color="primaryBlack"
              ><v-icon class="info-icon" medium color="primaryWhite"
                >mdi-information-variant</v-icon
              ></v-btn
            >
          </v-col>
        </v-row>
      </v-col>

      <!----------- Controls  ----------->

      <v-col pa-0 ma-0 cols="12" md="4" :class="controlsCol">
        <v-row class="pt-12" align="center" justify="start">
          <!--           Left Column            -->
          <v-col cols="6">
            <p>Hello player controls here</p>
          </v-col>

          <!--       Right Column               -->
          <v-col cols="6" class="pl-8">
            <v-row justify="start" class="mb-2">
              <v-icon class="mr-2" color="primaryBlack">mdi-cog</v-icon>
              Ratio
            </v-row>
            <v-row justify="start">
              <v-icon class="mr-2" color="primaryBlack">mdi-cog</v-icon>
              Ratio
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-8">
          <v-col cols="11">
            <v-select
              :items="items"
              label="Choose One"
              background-color="primaryBlack"
              class="select-techniques"
              item-color="primaryBlack"
              dark
              dense
              solo
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
