<script setup>
import { ref, watch } from 'vue'
import WeatherCard from './WeatherCard.vue'
import { getWeather } from '../services/weatherService.js'

const props = defineProps({
  city: {
    type: Object,
    default: null,
  },
});

const weather = ref(null);

watch(
  () => props.city,
  async (newCity) => {
      if (!newCity) return

      try {
        const data = await getWeather(newCity.lat, newCity.lon)
        weather.value = data
      } catch (err) {
        console.error('Erro ao obter clima para a cidade:', err)
        weather.value = null
      }
  },
  {immediate: true}
);
</script>

<template>
    <div v-if="props.city" id="weatherInfo" >
      <!--passa a prop `weather` (nome que o componente espera) -->
      <WeatherCard v-if="weather" :weather="weather" />
    </div>
    <p v-else>
      Pesquise uma cidade para ver informações
    </p>
</template>

<style>

</style>
