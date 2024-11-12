// pokemonStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePokemonStore = defineStore('pokemon', () => {
  // State
  const pokemonKeep = ref(JSON.parse(localStorage.getItem('pokemonKeep')) || []);
  const pokemonHistory = ref(JSON.parse(localStorage.getItem('pokemonHistory')) || []);

  // Getters
  const catchCount = computed(() => pokemonKeep.value.length);

  // Actions
  function catchPokemon(pokemon) {
    console.log("Caught Pokemon:", pokemon);
    const newPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      nickname: pokemon.nickname || '', // Pastikan nickname diinisialisasi
      image: pokemon.imgUrl || pokemon.image || '../assets/icon/poke-default.png',
      captureTime: Date.now() // Tambahkan captureTime untuk unik setiap kali menangkap
    };

    // Tambahkan langsung ke Keep tanpa pengecekan ID
    pokemonKeep.value.push(newPokemon);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem('pokemonKeep', JSON.stringify(pokemonKeep.value));
    localStorage.setItem('pokemonHistory', JSON.stringify(pokemonHistory.value));
  }

  function removePokemon(id) {
    const index = pokemonKeep.value.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
      const removedPokemon = pokemonKeep.value.splice(index, 1)[0];
      pokemonHistory.value.push(removedPokemon);
      updateLocalStorage();
    }
  }

  return {
    pokemonKeep,
    pokemonHistory,
    catchCount,
    catchPokemon,
    updateLocalStorage,
    removePokemon
  };
});
