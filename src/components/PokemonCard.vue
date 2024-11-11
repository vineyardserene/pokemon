<template>
  <!-- Link ke halaman detail Pokemon dengan mengirimkan ID Pokemon sebagai parameter -->
  <router-link :to="{ name: 'pokemon-detail', params: { pokeId: props.pokeId } }">
    <!-- Kontainer utama kartu dengan efek hover -->
    <div class="group rounded-xl bg-white w-full p-10 py-16 relative flex items-center justify-between mb-4 transition-transform duration-300 ease-in-out hover:-translate-y-2.5">

       <div v-if="showRemove" class="absolute z-10 top-3 left-3">
        <img src="@/assets/icon/remove.png" alt="remove" class="mr-2 w-5 lg:w-auto cursor-pointer" @click="handleRemove">
      </div> 
      <!-- Bagian ID dan Nama Pokemon -->
      <div class="absolute">
        <p class="font-semi group-hover:text-yellow-500">{{ formattedId }}</p>
        <h4 class="font-bold text-2xl">{{ pokeName }}</h4>
        <p class="text-gray-500 italic">{{ nickName }}</p>
      </div>

      <!-- Gambar bayangan di latar belakang -->
      <div class="absolute z-10 -top-12 -right-5">
        <img src="../assets/icon/poke-shadow.png" alt="Bayangan" class="w-24" />
      </div>

      <!-- Pembungkus untuk Loading Icon -->
      <div v-if="isLoading" class="absolute z-10 right-12 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
        <img src="@/assets/icon/pokesmall.png" alt="Loading Icon" class="w-10 h-10 animate-spin opacity-50" />
      </div>

      <!-- Pembungkus untuk Gambar Pokémon -->
      <div v-else class="absolute z-10 -top-14 -right-5 flex items-center justify-center">
        <img :src="pokeImg" alt="Pokemon" class="w-40 xl:w-44 h-auto" />
      </div>

       <!-- Status for 'Owned' -->
       <div v-if="isOwned" class="absolute top-2 left-2 text-white text-xs p-1 rounded-full">
        <img src="@/assets/icon/pokeactive.png" alt="Loading Icon" class="mr-2 w-5 lg:w-auto"/>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pokeId: {
    type: [String, Number],
    required: true
  },
  pokeName: String,
  pokeImg: String,
  nickName: String,
  isLoading: Boolean,
  showRemove: Boolean,
  isOwned: Boolean
});
const isOwned = computed(() => {
  const pokemonKeep = JSON.parse(localStorage.getItem('pokemonKeep')) || [];
  return pokemonKeep.some(pokemon => pokemon.id === props.pokeId);
});

const formattedId = computed(() => {
  return String(props.pokeId).padStart(4, '0');
});
</script>