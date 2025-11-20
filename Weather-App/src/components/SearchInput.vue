<script setup>
import { reactive } from 'vue'

// Usa a mesma variável de ambiente definida em .env
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const emit = defineEmits(['city-selected'])

const state = reactive({
  query: "",
  timeout: null,
  results: null,
  error: null,
  loading: false,
});

const handleSearch = () => {
  clearTimeout(state.timeout);

  // Aguarda o usuário parar de digitar por 500ms antes de buscar
  state.timeout = setTimeout(async () => {
    state.error = null;
    state.results = null;

    //Valida se o campo está vazio
    if (state.query.trim() === "") {
      state.loading = false;
      return;
    }

    state.loading = true;

    try {
      // Corrige URL (openweathermap) e faz a chamada à API de geocoding
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        state.query
      )}&limit=5&appid=${API_KEY}`

      const response = await fetch(url)

      //Trata resposta HTTP com erro
      if (!response.ok) {
        throw new Error(`API retornou status ${response.status}`)
      }

      const data = await response.json()

      //API retorna vazio
      if (!Array.isArray(data) || data.length === 0) {
        state.error = 'Cidade não encontrada.'
        state.loading = false
        return
      }

      //API retorna sucesso
      state.results = data
    } catch (err) {
      //Trata erros
      console.error("Erro ao buscar cidade: ", err);
      state.error =
        "Erro ao buscar a cidade. Verifique sua conexão ou tente novamente.";
      state.results = null;
    } finally {
      //Garante que o Loading será desligado sempre
      state.loading = false;
    }
  }, 500);
};

const selectCity = (item) => {
  // Emite o evento que o App.vue espera (`city-selected`)
  emit('city-selected', {
    name: item.name,
    country: item.country || item.state || '',
    lat: item.lat,
    lon: item.lon,
  })

  state.query = `${item.name}, ${item.country || ''}`
  state.results = null
  state.error = null
}
</script>

<template>
    <input
      type="text"
      v-model="state.query"
      @input="handleSearch"
      placeholder="Digite uma cidade..."
    />

    <!-- ERRO -->
    <p v-if="state.error">
      {{ state.error }}
    </p>

    <!-- RESULTADO -->
    <ul v-if="state.results">
      <li
        v-for="item in state.results"
        :key="item.lat + item.lon"
        @click="selectCity(item)"
      >
        {{ item.name }} - {{ item.country }}
      </li>
    </ul>
</template>

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
/*
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
*/
</style>
