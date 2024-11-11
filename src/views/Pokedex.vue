<template>
  <Layout>
    <!-- Switch for selecting tabs: Keep or History -->
    <div class="flex items-center justify-center lg:justify-end mb-4">
      <div class="home-switch w-fit px-4 py-2 flex justify-around items-center space-x-2">
        <button
          @click="setActiveTab('keep')"
          :class="tabClass('keep')"
          class="rounded-full px-5 py-2 flex items-center text-sm font-medium"
        >
          Keep
        </button>
        <button
          @click="setActiveTab('history')"
          :class="tabClass('history')"
          class="rounded-full px-5 py-2 flex items-center text-sm font-medium"
        >
          History
        </button>
      </div>
    </div>

    <!-- Content based on active tab -->
    <div class="flex items-center justify-center mt-10">
      <!-- Show 'Keep' content -->
      <div v-if="activeTab === 'keep'" class="text-center">
        <div v-if="pokemonKeep.length === 0">
          <div class="flex items-center justify-center">
            <img src="../assets/icon/poke-shadow.png" alt="pokeball" class="max-w-full h-auto">
          </div>
          <p class="font-semi text-lg text-center my-5">You don't have a Pokémon in Keep yet</p>
        </div>
        
        <!-- Show Pokémon if there is data -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-14 mb-8 mt-10">
          <PokemonCard 
            v-for="(pokemon, index) in pokemonKeep" 
            :key="pokemon.id || index" 
            :poke-id="pokemon.id || 'Unknown'" 
            :poke-name="pokemon.nickname || pokemon.name" 
            :nickname="pokemon.nickname" 
            :poke-img="pokemon.image || '/assets/icon/poke-default.png'"
            class="capitalize"
          />
        </div>
      </div>

      <!-- Show 'History' content -->
      <div v-if="activeTab === 'history'" class="text-center">
        <p class="font-semi text-lg text-center my-5">Pokémon Catch History</p>
        <div v-if="pokemonHistory.length === 0">
          <p class="font-semi text-lg text-center my-5">You haven't caught any Pokémon yet.</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="(pokemon, index) in pokemonHistory" :key="index">
              {{ pokemon.nickname || pokemon.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore.js';
import Layout from './Layout.vue';
import PokemonCard from '../components/PokemonCard.vue';

const pokemonStore = usePokemonStore();
const activeTab = ref('keep');

// Use computed properties for reactive store data
const pokemonKeep = computed(() => pokemonStore.pokemonKeep);
const pokemonHistory = computed(() => pokemonStore.pokemonHistory);

// Set active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// Tab styling based on active tab
const tabClass = (tab) => 
  `rounded-full px-5 py-2 flex items-center text-sm font-medium ${
    activeTab.value === tab ? 'bg-yellow-400' : 'bg-gray-100'
  }`;
</script>

<style scoped>
/* Add some spacing between the tabs and content */
.home-switch {
  margin-bottom: 2rem;
}
</style>
