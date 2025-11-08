<template>
  <section v-if="cityName" class="weather-card">
    <h2 class="city-name">{{ cityName }}</h2>
    <p class="date">{{ dateTime }}</p>

    <div class="stats">
      <p>Temp: {{ weather.temp ?? '?' }} °C</p>
      <p>Máx/Min: {{ weather.temp_max ?? '?' }}/{{ weather.temp_min ?? '?' }}</p>
      <p>Sensação: {{ weather.feels_like ?? '?' }} °C</p>
      <p>Humidade: {{ weather.humidity ?? '?' }}%</p>
    </div>
  </section>

  <template v-else>
    <p class="no-data">Nenhum dado disponível</p>
  </template>
</template>

<script setup>
import { toRef } from 'vue'

const props = defineProps({
  cityName: { type: String, default: '' },
  dateTime: { type: String, default: '' },
  weather: { type: Object, default: () => ({}) }
})

// tornar uma prop específica reativa localmente (opcional)
const weatherRef = toRef(props, 'weather')
</script>

<style scoped>
.weather-card { /* estilos básicos, trocar por Tailwind se preferir */ }
.city-name { font-weight: 700; font-size: 1.25rem; }
.date { color: #6b7280; font-size: 0.9rem; }
.stats { margin-top: .5rem; }
</style>