<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-8 rounded-3xl shadow-lg w-96">
        
        <p class="font-semi text-lg text-center mt-4 font-semibold">
          Wow, you caught {{ pokemonName }}!
        </p>
        
        <!-- Teks Give a Wild Pokémon Nickname -->
        <p class="font-semi text-lg text-center mt-4 font-semibold">
          Give a Wild {{ pokemonName }} a Nickname
        </p>
  
        <!-- Input Nickname -->
        <div class="flex justify-center mt-4">
          <input
            v-model="nickname"
            type="text"
            placeholder="sweet nickname..."
            class="border border-gray-300 p-3 rounded-full w-64 mb-6 text-left focus:outline-yellow-400"
          />
        </div>
  
        <!-- Tombol Release dan Catch -->
        <div class="flex justify-center space-x-6">
          <button
            @click="close"
            class="outline outline-yellow-400 text-black px-6 py-3 rounded-full font-semibold"
          >
            Release
          </button>
          <button
            @click="catchPokemon"
            :disabled="caught" 
            class="outline outline-yellow-400 bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-white active:outline-yellow-400 font-semibold"
          >
            Catch
          </button>
        </div>
  
        <!-- Pesan jika gagal menangkap Pokémon -->
        <div v-if="failed" class="text-center mt-4 text-red-500">
          <p class="text-lg font-semibold">Oops, {{ pokemonName }} ran away...</p>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    pokemonName: String,
    show: Boolean,
  });
  
  const emit = defineEmits(['close', 'catchSuccess']);
  const pokemonImage = ref('');
  const caught = ref(false);
  const isCatching = ref(false);
  const failed = ref(false);
  const nickname = ref('');
  
  // Hanya jalankan startCatch sekali, jika belum menangkap
  watch(() => props.show, (newVal) => {
    if (newVal && !caught.value) {
      startCatch();
    }
  });
  
  const startCatch = () => {
    isCatching.value = true;
  
    setTimeout(() => {
      failed.value = Math.random() > 0.5;
      isCatching.value = false;
  
      if (failed.value) {
        setTimeout(() => {
          failed.value = false;
        }, 2000); // Delay before resetting the failed state
      } else {
        caught.value = true;
        emit('catchSuccess');
        close();
      }
    }, 2000); // Simulated catch time
  };
  
  const close = () => {
    emit('close');
  };
  
  const catchPokemon = () => {
    if (!caught.value) {
      startCatch();
    }
  };
  </script>
  