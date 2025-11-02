<script setup>
import { reactive } from 'vue';

//AJUDA DE I.A (LIMITE MARCADO COM //** */ NOS CÓDIGOS)
//** */
const emit = defineEmits(['place-data']);

const searchTerm = reactive({
    query: '',
    timeout: null,
    results: null,
})

const handleSearch = () => {
    clearTimeout(searchTerm.timeout)
    searchTerm.timeout = setTimeout( async()=> {
        if (searchTerm.query !== ''){

            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm.query}&limit=5&appid={27b80e44f6ba9d3490277118d88a23e8}`)
            const data = await response.json()
            searchTerm.result = data
        }
        else {
            searchTerm.results = null
        }

    }, 500)
}
</script>

<template>
  <div>
    <!-- search field -->
    <form>
      <div class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center">
        <i class="fa-solid fa-magnifying-glass p-2 text-indigo-600"></i>
        <input
          type="text"
          placeholder="Search for a place"
          class="rounded-r-lg p-2 border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
          v-model="searchTerm.query"
          @input="handleSearch"
          />
      </div>
    </form>
    <!-- search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
      <div>
        <button class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"></button>
      </div>
    </div>
  </div>
</template>