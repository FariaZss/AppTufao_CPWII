<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import CityInfo from './components/CityInfo.vue'

const selectedCity = ref(null)

// Recebe a cidade emitida pelo SearchInput
const handleCitySelected = (cityData) => {
  selectedCity.value = cityData
}
</script>

<template>
  <main>
    <div>

      <!-- Campo de Busca-->
      <SearchInput @city-selected="handleCitySelected" />
      
      <!-- Informações da cidade + WeatherCard -->
      <CityInfo v-if="selectedCity" :city="selectedCity" />
      
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vh;
  min-height: 100vh;
  background-color: #94bedd;
}
</style>