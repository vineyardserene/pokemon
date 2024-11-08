<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-8 rounded-3xl shadow-lg w-96">
      
      <p class="font-semi text-lg text-center mt-4 font-semibold">
        Wow, you caught {{ pokemonName }}!
      </p>
      
      <p class="font-semi text-lg text-center mt-4 font-semibold">
        Give a Wild {{ pokemonName }} a Nickname
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemonStore';

const props = defineProps({ pokemonName: String, show: Boolean });
const emit = defineEmits(['close', 'nicknameSubmitted']);

const nickname = ref('');
const caught = ref(false); // Tambahkan variabel caught untuk melacak status tangkapan
const store = usePokemonStore();
const router = useRouter();

const catchPokemon = () => {
  const pokemonData = { name: props.pokemonName, nickname: nickname.value };

  // Gunakan metode yang benar dari store
  store.catchPokemon(pokemonData); // gunakan 'catchPokemon' sesuai dengan definisi di pokemonStore.js
  caught.value = true; // Tandai bahwa Pokémon sudah ditangkap

  emit('nicknameSubmitted', nickname.value); // Emit ke modal sukses
  emit('close'); // Tutup modal nickname

  // Tampilkan modal sukses sebentar, lalu pindah ke Pokedex
  setTimeout(() => {
    router.push('/pokedex'); // Navigasi ke halaman Pokedex
  }, 1000);
};

const close = () => {
  emit('close'); // Emit event close
};

</script>