<script>
import './style.scss'
import { breathingTechniques } from '../../techniques'

export default {
  name: 'BoxBreathing',
  data: () => {
    return {
      breathingTechniques,
      inhale: '',
      hold: '',
      exhale: '',
      sustain: ''
    }
  }
}
</script>

<template>
  <div class="hello">
    <h1>Hello, Breathing Exercise Here</h1>
  </div>
</template>
