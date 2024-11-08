<template>
  <Layout>
    <div class="flex items-center justify-center lg:justify-end">
      <div class="home-switch w-fit px-4 py-2 flex justify-around items-center space-x-2">
        <button class="rounded-full bg-gray-100 px-5 py-2 flex items-center text-sm font-medium">
          <div
            @click="activeTab = 'keep'"
            :class="activeTab === 'keep' ? 'home-switch-active cursor-pointer py-1 px-5 text-white bg-yellow-400 rounded-full' : 'cursor-pointer py-1 px-5 text-black'"
          >
            Keep
          </div>
          <div
            @click="activeTab = 'history'"
            :class="activeTab === 'history' ? 'home-switch-active cursor-pointer py-1 px-5 text-white bg-yellow-400 rounded-full' : 'cursor-pointer py-1 px-5 text-black'"
          >
            History
          </div>
        </button>
      </div>
    </div>

    <!-- Konten berdasarkan tab aktif -->
    <div class="flex items-center justify-center h-screen-m">
      <div class="mt-44 lg:mt-14">
        <!-- Tampilkan konten 'Keep' -->
        <div v-if="activeTab === 'keep'" class="text-center">
          <div v-if="pokemonKeep.length === 0">
            <div class="flex items-center justify-center">
              <img src="../assets/icon/poke-shadow.png" alt="pokeball" class="max-w-full h-auto">
            </div>
            <p class="font-semi text-lg text-center my-5">You don't have a Pokémon in Keep yet</p>
            <div class="flex items-center justify-center">
              <router-link to="/" class="card-catch w-fit px-5 py-2 hover:bg-yellow-400 flex items-center justify-between rounded-full">
                <p class="font-semi">Go!! Catch a Pokémon</p>
                <img src="../assets/icon/pokecatch.png" alt="logo-pokemon" class="w-5 h-auto ml-3 cursor-pointer">
              </router-link>
            </div>
          </div>
          <div v-else>
            <ul>
              <li v-for="(pokemon, index) in pokemonKeep" :key="index">
                {{ pokemon.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Tampilkan konten 'History' -->
        <div v-if="activeTab === 'history'" class="text-center">
          <p class="font-semi text-lg text-center my-5">Pokémon Catch History</p>
          <div v-if="pokemonHistory.length === 0">
            <p class="text-gray-500">No Pokémon catch history available.</p>
          </div>
          <ul v-else>
            <li v-for="(pokemon, index) in pokemonHistory" :key="index">
              {{ pokemon.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Layout from './Layout.vue';

const activeTab = ref('keep');
const pokemonKeep = ref([]);
const pokemonHistory = ref([]);

// Ambil data dari localStorage saat komponen dimuat
onMounted(() => {
  const keepData = localStorage.getItem('pokemonKeep');
  const historyData = localStorage.getItem('pokemonHistory');

  if (keepData) {
    pokemonKeep.value = JSON.parse(keepData);
  }

  if (historyData) {
    pokemonHistory.value = JSON.parse(historyData);
  }
});
</script>

<style scoped>
.home-switch-active {
  background-color: #facc15;
  border-radius: 9999px;
}
</style>
