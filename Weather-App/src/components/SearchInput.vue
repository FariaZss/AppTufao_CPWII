<template>
  <main>
    <div id="searchMain">
      <form @submit.prevent="search">
        <input
          type="text"
          placeholder="Buscar Cidade"
          v-model="cityZip"
          aria-label="Buscar cidade"
        />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Buscando...' : 'Clique aqui' }}
        </button>
      </form>

      <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>

      <section v-if="cities" class="mt-4">
        <h2 class="text-2xl font-bold">{{ cities }}</h2>
        <p class="text-sm text-gray-600">{{ dateTime }}</p>

        <div class="mt-4">
          <p>Temp: {{ weatherData.temp ?? '?' }} °C</p>
          <p>Máx/Min: {{ weatherData.temp_max ?? '?' }}/{{ weatherData.temp_min ?? '?' }}</p>
          <p>Sensação: {{ weatherData.feels_like ?? '?' }} °C</p>
          <p>Humidade: {{ weatherData.humidity ?? '?' }}%</p>
        </div>
      </section>
    </div>
  </main>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Use Vite env var (crie .env com VITE_OPENWEATHER_API_KEY=your_key)
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const cityZip = ref('')
const cities = ref('')
const weatherData = ref({})
const dateTime = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function search(e) {
  // prevenir submit (form already uses @submit.prevent, but keep safe)
  if (e && typeof e.preventDefault === 'function') e.preventDefault()

  if (!cityZip.value) {
    errorMsg.value = 'Digite uma cidade'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    // 1) Geocoding: obter lat/lon pela cidade
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityZip.value)}&limit=1&appid=${API_KEY}`
    )

    if (!geoRes.data || !geoRes.data.length) {
      errorMsg.value = 'Cidade não encontrada'
      loading.value = false
      return
    }

    const { lat, lon, name } = geoRes.data[0]

    // 2) Weather: obter clima por lat/lon
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )

    cities.value = name || weatherRes.data.name
    weatherData.value = weatherRes.data.main || {}
    dateTime.value = new Date((weatherRes.data.dt || 0) * 1000).toLocaleString('pt-BR')
    cityZip.value = ''
  } catch (err) {
    console.error(err)
    errorMsg.value = 'Erro ao buscar dados. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
/* estilos mínimos — você pode ajustar com Tailwind ou CSS */
#searchMain {
  max-width: 540px;
  margin: 0 auto;
}
input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-right: 0.5rem;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
