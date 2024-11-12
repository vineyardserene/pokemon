<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-8 rounded-3xl shadow-lg w-96">
      <p class="font-semi text-lg text-center mt-4 font-semibold">
        Wow, you catch {{ pokemon.name }}!
      </p>
      
      <p class="font-semi text-lg text-center mt-4 font-semibold">
        Give a Wild {{ pokemon.name }} a Nickname
      </p>

      <div class="flex flex-col items-center mt-4">
        <input
          v-model="nickname"
          type="text"
          maxlength="16"
          placeholder="sweet nickname..."
          class="border border-gray-300 p-3 rounded-full w-64 text-left focus:outline-yellow-400"
        />
        <p v-if="nicknameError" class="text-red-500 mt-2">Hey, your Pokémon needs a nickname!</p>
      </div>

      <div class="flex justify-center space-x-6 mt-6">
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
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemonStore.js';
import PokemonAPI from '../api/ApiPokemon.js';

const props = defineProps({ pokemonName: String, show: Boolean });
const emit = defineEmits(['close', 'nicknameSubmitted']);

const nickname = ref('');
const caught = ref(false);
const nicknameError = ref(false); // State untuk menampilkan error
const pokemon = ref({});
const store = usePokemonStore();
const router = useRouter();

const fetchPokemonDetails = async (pokeName) => {
  try {
    const res = await PokemonAPI.getPokemonDetails(pokeName);
    const data = res.data;
    pokemon.value = {
      id: data.id,
      name: data.name,
      imgUrl: data.sprites.other['official-artwork'].front_default,
    };
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
};

onMounted(() => {
  fetchPokemonDetails(props.pokemonName);
});

const catchPokemon = () => {
  if (!nickname.value.trim()) {
    nicknameError.value = true; // Tampilkan error jika nickname kosong
    return;
  }

  const pokemonData = {
    id: pokemon.value.id,
    name: pokemon.value.name,
    nickname: nickname.value,
    image: pokemon.value.imgUrl,
  };

  store.catchPokemon(pokemonData);
  caught.value = true;
  nicknameError.value = false; // Reset error setelah berhasil catch

  emit('nicknameSubmitted', nickname.value);
  emit('close');

  setTimeout(() => {
    router.push('/pokedex');
  }, 1000);
};

const close = () => {
  emit('close');
};
</script>
