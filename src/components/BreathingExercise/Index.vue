<script>
import InfoModal from '../InfoModal/Index'
import './style.scss'
import { breathingTechniques } from '../../techniques'
import inhaleMp3 from '../../assets/inhale.mp3'
import holdMp3 from '../../assets/hold.mp3'
import exhaleMp3 from '../../assets/exhale.mp3'
import sustainMp3 from '../../assets/sustain.mp3'
import endMusic from '../../assets/endMusic.mp3'

export default {
  name: 'MainPage',
  components: {
    InfoModal
  },
  data: () => {
    return {
      breathingTechniques: breathingTechniques,
      currentTechnique: 'Box Breathing',
      infoModal: false,
      nowPlaying: '',
      timerPlaying: false,
      playing: false,
      count: null,
      timer: '',
      ratioOfSeconds: 1,
      numberOfRepetition: 10,
      music: true,
      musicItems: [
        {
          text: 'on',
          value: true
        },
        {
          text: 'off',
          value: false
        }
      ],
      inhaleMusic: null,
      holdMusic: null,
      exhaleMusic: null,
      sustainMusic: null,
      endMusic: null,
      audioCount: 0,
      isMusicPlayed: {
        inhale: false,
        hold: false,
        exhale: false,
        sustain: false,
        end: false
      }
    }
  },
  mounted: function() {
    this.inhaleMusic = new Audio(inhaleMp3)
    this.holdMusic = new Audio(holdMp3)
    this.exhaleMusic = new Audio(exhaleMp3)
    this.sustainMusic = new Audio(sustainMp3)
    this.endMusic = new Audio(endMusic)
  },
  computed: {
    breathingTechnique() {
      return this.breathingTechniques.find(
        tech => tech.title === this.currentTechnique
      )
    },
    breathCycle() {
      return this.breathingTechnique.breathCycle.map(
        tech => tech * this.ratioOfSeconds
      )
    },
    items() {
      return this.breathingTechniques.map(tech => tech.title)
    },
    totalPlayingTime() {
      return this.breathCycle.reduce((total, secs) => total + secs) * 1000
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

    // numberOfRepetition() {
    //   return 5
    //   // return this.breathingTechnique.numberOfRepetition
    // },
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
    changeMusicPref(pref) {
      this.music = pref
    },
    selectBreathingTechnique(title) {
      this.clearAllTimers()
      this.currentTechnique = title
      this.$store.dispatch('setTitle', title)
    },
    selectBreathingRatio(ratio) {
      this.clearAllTimers()
      this.ratioOfSeconds = ratio
    },
    toggleInfoModal() {
      this.infoModal = !this.infoModal
    },
    clearAllTimers() {
      this.playing = false
      this.nowPlaying = ''
      this.timer = ''
      this.timerPlaying = false
      this.stopAllAudio()
      this.createFreshIsplayed()
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

        if (timeDifference >= oneRoundTime) {
          that.count = that.count - 1

          if (that.count <= 0) {
            that.stopAllAudio()
            that.nowPlaying = ''
            that.clearAllTimers()
            that.playAudio(that.endMusic, 'end')
          } else {
            that.stopAllAudio()
            clearInterval(player)
            that.breathingTimer(that)
            that.createFreshIsplayed()
          }
        } else if (timeDifference <= that.inhaleTime) {
          that.nowPlaying = 'Inhale'
          that.playAudio(that.inhaleMusic, 'inhale')
        } else if (
          that.breathCycle[1] !== 0 &&
          timeDifference > that.inhaleTime &&
          timeDifference <= that.holdTime
        ) {
          that.nowPlaying = 'Hold'
          that.inhaleMusic.pause()
          that.playAudio(that.holdMusic, 'hold')
        } else if (
          timeDifference > that.holdTime &&
          timeDifference <= that.exhaleTime
        ) {
          that.nowPlaying = 'Exhale'
          !that.holdMusic.paused && that.holdMusic.pause()
          that.audioCount = 0
          that.playAudio(that.exhaleMusic, 'exhale')
        } else if (
          that.breathCycle[3] !== 0 &&
          timeDifference > that.exhaleTime &&
          timeDifference <= that.sustainTime
        ) {
          that.nowPlaying = 'Sustain'
          that.exhaleMusic.pause()
          that.audioCount = 0
          that.playAudio(that.sustainMusic, 'sustain')
        }
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
    },
    playAudio(audio, current) {
      if (audio.paused) audio.currentTime = 0
      if (!this.isMusicPlayed[current]) audio.play()
      this.isMusicPlayed[current] = true
    },
    stopAllAudio() {
      let audios = [
        this.exhaleMusic,
        this.inhaleMusic,
        this.holdMusic,
        this.sustainMusic,
        this.endMusic
      ]
      audios.forEach(audio => !audio.paused && audio.pause())
    },
    createFreshIsplayed() {
      this.isMusicPlayed = {
        inhale: false,
        hold: false,
        exhale: false,
        sustain: false,
        end: false
      }
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
    <InfoModal :value="infoModal" v-on:toggleModal="toggleInfoModal" />
    <v-row style="height:100%;">
      <!----------- Player  ----------->
      <v-col pa-0 ma-0 cols="12" md="8" :class="playerCol">
        <v-row justify="center" align="center">
          <v-col cols="12" class="my-o py-0">
            <v-row class="circle-container-row" justify="center" align="center">
              <div v-if="!timerPlaying && !playing">
                <p class="text-h5 mt-4 white--text mx-4">
                  Relax, and press the start button
                </p>
              </div>

              <div v-if="timerPlaying">
                <p class="text-h2 mt-4 white--text">{{ timer }}</p>
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
              @click="toggleInfoModal"
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
        <v-row class="pt-8" align="center" justify="start">
          <!--           Left Column            -->
          <v-col cols="6">
            <v-chip
              v-for="usage in breathingTechnique.usage"
              :key="usage"
              class="ma-2"
              small
              dark
              color="primaryBlack "
            >
              {{ usage }}
            </v-chip>
          </v-col>

          <!--       Right Column               -->
          <v-col cols="5" class="pl-8">
            <v-row justify="start" align="center" class="mb-2">
              <v-select
                :items="[0.5, 1, 2, 4, 5]"
                v-model="ratioOfSeconds"
                prepend-icon="mdi-cog"
                hint="Timer duration"
                class="ratio-setting"
                persistent-hint
                @change="clearAllTimers"
                dense
                x-small
              >
                <template v-slot:append-item>
                  <v-divider color="white "></v-divider>
                  <v-list-item disabled>
                    <v-list-item-content>
                      <v-list-item-title class="white--text"
                        ><p>Duration of unit time</p>
                        <p>in seconds</p></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>

              <v-select
                :items="[5, 10, 15, 20, 25, 50, 100]"
                v-model="numberOfRepetition"
                @change="clearAllTimers"
                prepend-icon="mdi-cog"
                hint="Total rounds"
                class="ratio-setting"
                color="primaryBlack"
                persistent-hint
                dense
              >
              </v-select>
              <v-switch
                v-model="music"
                :label="music ? 'on' : 'off'"
                hint="Music"
                class="ratio-setting"
                color="primaryBlack"
                persistent-hint
              ></v-switch>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <v-select
              :items="items"
              :label="breathingTechnique.title"
              hint="Select Breathing Technique"
              persistent-hint
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
