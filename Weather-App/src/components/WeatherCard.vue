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
//const state = computed(() => props.weather?.state) //MOSTRA O ESTADO TAMBÉM 
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
const main = computed(() => props.weather?.weather?.[0]?.main)

// URL do ícone oficial do OpenWeatherMap
const iconUrl = computed(() => (icon.value ? `https://openweathermap.org/img/wn/${icon.value}@2x.png` : ''))

</script>

<template>
  <div id="w_card">
    <h1>{{ name }}, {{ country }}</h1>

    <div class="i_card">
      <h2 class="flex items-center gap-2"> 
        <span v-if="iconUrl">
          <img :src="iconUrl" :alt="description" width="100" height="48" />
        </span>
        <span v-else class="text-2xl">{{ emoji }}</span>
      </h2>
      
      <div class="desc_card">
        <p class="text-3xl font-bold">{{ temp }}°C</p>
        <p class="capitalize">{{ description }}</p>
      </div>
    </div>
      
      <div class="grid grid-cols-2 gap-4">
        <p class="bg-white rounded-lg p-4">Sensação: <strong>{{ feelsLike }}°C</strong></p>
        <p class="bg-white rounded-lg p-4">Umidade: <strong>{{ humidity }}%</strong></p>
        <p class="bg-white rounded-lg p-4">Vento: <strong>{{ windKph }} km/h</strong></p>
        <p class="bg-white rounded-lg p-4">Visibilidade: <strong>{{ visibilityKm }} km</strong></p>
      </div>
    </div>
</template>

<style scoped>
.w_icon{
  width: 100px;
}

h1{
  font-size: 50px;
}
.text-3xl{
  font-size: 2.0rem;
}

.desc_card{
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 1.2rem;
}

.i_card{
  margin: 10px;
  display: flex;
}

.capitalize{
  opacity: 0.8;
  font-style: italic;
}


#w_card{
  display: flexbox;
  margin: 10px auto;
  border-radius: 10px;
  justify-items: center;
  padding: 10px;
  background-color: #CFD5E1;
  width: 100%;
  box-shadow:
     0 2px 6px rgba(0, 0, 0, 0.20), 
      0 8px 20px rgba(0, 0, 0, 0.15);
  
}

.bg-white{
  box-shadow:
     0 2px 6px rgba(0, 0, 0, 0.20), 
      0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: #EDEDF2;
  padding: 5px;
  margin: 10px;
}



</style>