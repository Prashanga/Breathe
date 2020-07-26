<script>
import './style.scss'
import { breathingTechniques } from '../../techniques'

export default {
  name: 'MainPage',
  data: () => {
    return {
      breathingTechniques: breathingTechniques,
      currentTechnique: 'Box Breathing',
      nowPlaying: '',
      timerPlaying: false,
      playing: false,
      count: null,
      timer: ''
    }
  },
  computed: {
    breathingTechnique() {
      return this.breathingTechniques.find(
        tech => tech.title === this.currentTechnique
      )
    },
    breathCycle() {
      return this.breathingTechnique.breathCycle
    },
    items() {
      return this.breathingTechniques.map(tech => tech.title)
    },
    totalPlayingTime() {
      return (
        this.breathingTechnique.breathCycle.reduce(
          (total, secs) => total + secs
        ) * 1000
      )
    },
    inhaleTime() {
      return this.breathCycle[0]
    },
    holdTime() {
      return this.breathCycle[0] + this.breathCycle[1]
    },
    exhaleTime() {
      return this.breathCycle[0] + this.breathCycle[1] + this.breathCycle[2]
    },
    sustainTime() {
      return (
        this.breathCycle[0] +
        this.breathCycle[1] +
        this.breathCycle[2] +
        this.breathCycle[3]
      )
    },

    numberOfRepetition() {
      return this.breathingTechnique.numberOfRepetition
    },
    playerCol() {
      return {
        mobileColumnPlayer: this.$vuetify.breakpoint.smAndDown,
        desktopColumnPlayer: this.$vuetify.breakpoint.mdAndUp
      }
    },
    controlsCol() {
      return {
        mobileColumnControls: this.$vuetify.breakpoint.smAndDown,
        desktopColumnControls: this.$vuetify.breakpoint.mdAndUp
      }
    },
    inhaleCircleCSS() {
      return {
        '--time': `${this.breathCycle[0]}s`
      }
    },
    exhaleCircleCSS() {
      return {
        '--time': `${this.breathCycle[2]}s`
      }
    },
    sustainCircleCSS() {
      return {
        '--time': `${this.breathCycle[3]}s`
      }
    }
  },
  methods: {
    selectBreathingTechnique(title) {
      this.clearAllTimers()
      this.currentTechnique = title
      this.$store.dispatch('setTitle', title)
    },
    clearAllTimers() {
      this.playing = false
      this.nowPlaying = ''
      this.timer = ''
      let id = window.setTimeout(function() {}, 0)
      while (id--) {
        window.clearTimeout(id) // will do nothing if no timeout with id is present
      }
    },
    breathingTimer() {
      let timeAtStart = new Date()
      let that = this
      let oneRoundTime = this.totalPlayingTime / 1000

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
        } else if (timeDifference <= that.inhaleTime) that.nowPlaying = 'Inhale'
        else if (
          that.breathCycle[1] !== 0 &&
          timeDifference > that.inhaleTime &&
          timeDifference <= that.holdTime
        )
          that.nowPlaying = 'Hold'
        else if (
          timeDifference > that.holdTime &&
          timeDifference <= that.exhaleTime
        )
          that.nowPlaying = 'Exhale'
        else if (
          that.breathCycle[3] !== 0 &&
          timeDifference > that.exhaleTime &&
          timeDifference <= that.sustainTime
        )
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
        that.breathingTimer()
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
                v-if="playing && nowPlaying === 'Inhale'"
                :style="inhaleCircleCSS"
                class="inhale-circle"
              ></div>
              <div
                v-if="playing && nowPlaying === 'Exhale'"
                :style="exhaleCircleCSS"
                class="exhale-circle"
              ></div>
              <div
                v-if="playing && nowPlaying === 'Hold'"
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
                x-large
                color="primaryBlack"
                class="play-button"
                :ripple="false"
              >
                <v-icon
                  @click="startPlaying"
                  class="fab-icons"
                  v-if="!playing"
                  :ripple="false"
                  x-large
                  >mdi-play</v-icon
                >
                <v-icon
                  @click="clearAllTimers"
                  v-if="playing"
                  class="fab-icons"
                  :ripple="false"
                  x-large
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
          <v-col cols="12">
            <v-select
              :items="items"
              :label="breathingTechnique.title"
              hint="Select "
              @change="selectBreathingTechnique"
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

<style>
.breathing-circle {
  height: 25vh;
  width: 25vh;
  background-color: white;
  border-radius: 50%;
}
.inhale-circle {
  height: 25vh;
  width: 25vh;
  background-color: white;
  border-radius: 50%;
  animation-name: inhaleCircle;
  animation-duration: var(--time);
}
.exhale-circle {
  height: 25vh;
  width: 25vh;
  background-color: white;
  border-radius: 50%;
  animation-name: exhaleCircle;
  animation-duration: var(--time);
}

@keyframes inhaleCircle {
  from {
    width: 0px;
    height: 0px;
  }
  to {
    width: 25vh;
    height: 25vh;
  }
}
@keyframes exhaleCircle {
  from {
    width: 25vh;
    height: 25vh;
  }
  to {
    width: 0px;
    height: 0px;
  }
}
</style>
