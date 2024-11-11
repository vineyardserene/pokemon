import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonKeep: JSON.parse(localStorage.getItem('pokemonKeep')) || [],
    pokemonHistory: JSON.parse(localStorage.getItem('pokemonHistory')) || [],
  }),
  getters: {
    catchCount(state) {
      return state.pokemonKeep.length;
    },
  },
  actions: {
    catchPokemon(pokemon) {
      console.log(pokemon);
      // Pastikan pokemon.image berasal dari URL API, jika tidak gunakan gambar lokal sebagai fallback
      const newPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        nickname: pokemon.nickname,
        image: pokemon.imgUrl || pokemon.image || '/assets/icon/poke-default.png', // Ambil dari API atau gunakan default
      };

      // Menambahkan Pokémon ke Keep dan History
      this.pokemonKeep.push(newPokemon);
      this.pokemonHistory.push(newPokemon);

      // Update LocalStorage
      this.updateLocalStorage();
    },

    updateLocalStorage() {
      localStorage.setItem('pokemonKeep', JSON.stringify(this.pokemonKeep));
      localStorage.setItem('pokemonHistory', JSON.stringify(this.pokemonHistory));
    },

    removePokemon(id) {
      this.pokemonKeep = this.pokemonKeep.filter(pokemon => pokemon.id !== id);
      this.updateLocalStorage();
    },
  },
});