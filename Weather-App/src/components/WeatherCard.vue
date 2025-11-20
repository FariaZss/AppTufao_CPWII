<script setup>
import { computed } from 'vue'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

// adapta para a resposta do OpenWeatherMap
const name = computed(() => props.weather?.name)
const state = computed(() => props.weather?.state)
const country = computed(() => props.weather?.sys?.country)
const temp = computed(() => props.weather?.main?.temp)
const feelsLike = computed(() => props.weather?.main?.feels_like)
const humidity = computed(() => props.weather?.main?.humidity)
const windKph = computed(() => {
  const speedMs = props.weather?.wind?.speed ?? 0
  return (speedMs * 3.6).toFixed(1) // m/s -> km/h
})
const visibilityKm = computed(() => {
  const visM = props.weather?.visibility ?? 0
  return (visM / 1000).toFixed(1)
})
const description = computed(() => props.weather?.weather?.[0]?.description)
const icon = computed(() => props.weather?.weather?.[0]?.icon)
</script>

<template>
  <div>
    <h2>{{ name }}, {{ state }}, {{ country }}</h2>

    <div>
      <div>
        <p class="text-3xl font-bold">{{ temp }}°C</p>
        <p class="capitalize">{{ description }}</p>
      </div>

      <div>
        <p>Sensação: <strong>{{ feelsLike }}°C</strong></p>
        <p>Umidade: <strong>{{ humidity }}%</strong></p>
        <p>Vento: <strong>{{ windKph }} km/h</strong></p>
        <p>Visibilidade: <strong>{{ visibilityKm }} km</strong></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-3xl {
  font-size: 1.75rem;
}

</style>