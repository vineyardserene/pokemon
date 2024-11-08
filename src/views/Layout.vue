<template>
  <div class="w-full bg-slate-200 px-5 lg:px-24 py-3 min-h-screen">
    <nav class="flex items-center justify-between">
      <router-link to="/">
        <img src="@/assets/icon/pokemon-logo.png" alt="Pokemon Logo" class="w-36">
      </router-link>
      <router-link to="/pokedex">
        <button class="rounded-2xl bg-gray-100 px-5 py-2 flex items-center hover:bg-yellow-400 text-sm font-medium">
          {{ catchCount }} Catch
          <img src="@/assets/icon/pokecatch.png" alt="Pokecatch Icon" class="w-7 pl-2">
        </button>
      </router-link>
    </nav>

    <div class="flex justify-center items-center h-96" v-if="loading">
      <div class="rounded-3xl bg-white px-5 py-2.5 flex justify-center items-center">
        <img src="@/assets/icon/pokesmall.png" alt="Loading Icon" class="animate-spin mr-2">
        <span class="font-semibold text-md">Loading...</span>
      </div>
    </div>

    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore';

const store = usePokemonStore();
const loading = ref(true);
const catchCount = computed(() => store.catchCount);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
