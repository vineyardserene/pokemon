<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-8 rounded-3xl shadow-lg w-96">
      <p class="font-semi text-lg text-center mt-4 font-semibold">
        Wow, you caught {{ pokemon.name }}!
      </p>
      
      <p class="font-semi text-lg text-center mt-4 font-semibold">
        Give a Wild {{ pokemon.name }} a Nickname
      </p>

      <div class="flex justify-center mt-4">
        <input
          v-model="nickname"
          type="text"
          placeholder="sweet nickname..."
          class="border border-gray-300 p-3 rounded-full w-64 mb-6 text-left focus:outline-yellow-400"
        />
      </div>

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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemonStore.js';
import PokemonAPI from '../api/ApiPokemon.js';

const props = defineProps({ pokemonName: String, show: Boolean });
const emit = defineEmits(['close', 'nicknameSubmitted']);

const nickname = ref('');
const caught = ref(false); // Add caught variable to track the catch status
const store = usePokemonStore();
const router = useRouter();

const pokemon = ref({}); // Declare pokemon data

// Fetch the details of the Pokémon based on the name (or any other property you prefer)
const fetchPokemonDetails = async (pokeName) => {
  const res = await PokemonAPI.getPokemonDetails(pokeName);
  const data = res.data;
  pokemon.value = {
    id : data.id,
    name: data.name,
    nickname: data.nickname,
    imgUrl: data.sprites.other['official-artwork'].front_default,
  };
};

onMounted(() => {
  fetchPokemonDetails(props.pokemonName); // Fetch details when the component is mounted
});

const catchPokemon = () => {
  const pokemonData = {
    id: pokemon.value.id, // Tambahkan id dari API
    name: pokemon.value.name, // Gunakan nama Pokémon dari API
    nickname: nickname.value, // Gunakan nickname yang diinput pengguna
    image: pokemon.value.imgUrl, // URL gambar dari API (gunakan imgUrl dari hasil fetch)
  };

  // Debugging untuk memastikan data lengkap
  console.log("Pokemon Data to be Saved:", pokemonData);


  store.catchPokemon(pokemonData); // Store the Pokémon data with nickname
  caught.value = true; // Mark the Pokémon as caught

  emit('nicknameSubmitted', nickname.value); // Emit nicknameSubmitted to parent
  emit('close'); // Close the nickname modal

  // Display success modal briefly, then navigate to the Pokedex
  setTimeout(() => {
    router.push('/pokedex'); // Navigate to Pokedex page
  }, 1000);
};

const close = () => {
  emit('close'); // Emit event close to close the modal
};
const saveNickname = () => {
    const pokemonData = {
      ...pokemon.value,
      nickname: nickname.value,
    };
  
    store.catchPokemon(pokemonData);
    router.push('/pokedex'); // Navigate to the Pokedex page
  };
</script>

<style scoped>
/* Scoped styles for modal */
</style>