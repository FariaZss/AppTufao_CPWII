<script setup>
import SearchInput from './components/SearchInput.vue';
</script>

<template>
  <main class="p-6 text-center">    
    <!-- Date -->
    <div class="mb-6 text-lg font-medium">
      {{
        new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }}
    </div>

    <!-- Search -->
    <div>
      <SearchInput />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>