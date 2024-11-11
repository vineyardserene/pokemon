<template>
    <Layout>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p class="text-center font-bold text-xl">{{ pokemon.name }}</p>
          <div class="flex justify-center items-center">
            <img :src="pokemon.imgUrl" alt="Pokemon" class="w-72" />
          </div>
          <div class="flex justify-center mt-4">
            <input
              v-model="nickname"
              type="text"
              placeholder="Give a nickname"
              class="rounded-lg p-2 border border-gray-300"
            />
          </div>
          <div class="flex justify-center mt-4">
            <button
              @click="saveNickname"
              class="bg-yellow-400 text-white p-2 rounded-full"
            >
              Save Nickname
            </button>
          </div>
        </div>
      </div>
    </Layout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePokemonStore } from '@/stores/pokemonStore.js';
  import PokemonAPI from '../api/ApiPokemon.js';
  
  const route = useRoute();
  const router = useRouter();
  const store = usePokemonStore();
  
  const nickname = ref('');
  const pokemon = ref({});
  
  // Fetch the details of the Pokémon
  const fetchPokemonDetails = async (pokeId) => {
    const res = await PokemonAPI.getPokemonDetails(pokeId);
    const data = res.data;
    pokemon.value = {
      id: data.id,
      name: data.name,
      imgUrl: data.sprites.other['official-artwork'].front_default,
    };
  };
  
  onMounted(() => {
    fetchPokemonDetails(route.params.pokeId);
  });
  
  const saveNickname = () => {
    const pokemonData = {
      ...pokemon.value,
      nickname: nickname.value,
    };
  
    store.catchPokemon(pokemonData);
    router.push('/pokedex'); // Navigate to the Pokedex page
  };
  </script>