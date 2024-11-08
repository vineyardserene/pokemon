import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonKeep: JSON.parse(localStorage.getItem('pokemonKeep')) || [],
    pokemonHistory: JSON.parse(localStorage.getItem('pokemonHistory')) || []
  }),
  getters: {
    catchCount(state) {
      return state.pokemonKeep.length;
    }
  },
  actions: {
    catchPokemon(pokemon) {
      this.pokemonKeep.push(pokemon);
      this.pokemonHistory.push(pokemon);
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('pokemonKeep', JSON.stringify(this.pokemonKeep));
      localStorage.setItem('pokemonHistory', JSON.stringify(this.pokemonHistory));
    }
  },
  persist: true // Jika Anda menggunakan pinia-plugin-persistedstate
});
