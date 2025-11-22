<script setup>
import { ref, onMounted } from 'vue'
import SearchInput from './components/SearchInput.vue'
import CityInfo from './components/CityInfo.vue'

const selectedCity = ref(null)

// Recebe a cidade emitida pelo SearchInput
const handleCitySelected = (cityData) => {
  selectedCity.value = cityData
}

// Ao montar, tenta obter a localização do usuário e disparar busca automaticamente
onMounted(() => {
  if (!('geolocation' in navigator)) return

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      // Define um objeto compatível com o que CityInfo espera (lat/lon)
      selectedCity.value = {
        name: 'Sua localização',
        country: '',
        lat,
        lon,
      }
    },
    (error) => {
      // Não interrompe a aplicação; só loga para debug
      console.warn('Erro ao obter localização:', error)
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
})
</script>

<template>
  <main>
    <div>
      <div id="SearchInput">
        <!-- Campo de Busca--> 
        <SearchInput @city-selected="handleCitySelected" />
      </div>
      
      <!-- Informações da cidade + WeatherCard -->
      <CityInfo v-if="selectedCity" :city="selectedCity" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150vh;
  min-height: 100vh;
  background-color: #94bedd;
}
</style>