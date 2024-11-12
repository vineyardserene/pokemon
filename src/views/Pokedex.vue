<template>
  <Layout>
    <div class="flex items-center justify-center lg:justify-end">
      <div class="home-switch w-fit flex justify-around items-center space-x-2">
        <button
          class="rounded-full bg-gray-100 px-4 py-2 flex items-center text-sm font-medium"
        >
          <div
            @click="activeTab = 'keep'"
            :class="{ 
              'home-switch-active cursor-pointer py-1 px-4 text-white bg-yellow-400 rounded-full': activeTab === 'keep',
              'cursor-pointer py-1 px-4 text-black': activeTab !== 'keep' 
            }"
          >
            Keep
          </div>
          <div
            @click="activeTab = 'history'"
            :class="{ 
              'home-switch-active cursor-pointer py-1 px-4 text-white bg-yellow-400 rounded-full': activeTab === 'history',
              'cursor-pointer py-1 px-4 text-black': activeTab !== 'history' 
            }"
          >
            History
          </div>
        </button>
      </div>
    </div>

    <!-- Konten berdasarkan tab aktif -->
    <div class="mt-44 lg:mt-14">
      <!-- Tampilkan konten 'Keep' -->
      <div v-if="activeTab === 'keep'" class="text-center">
        <template v-if="pokemonKeep.length === 0">
          <div class="flex items-center justify-center">
            <img
              src="../assets/icon/poke-shadow.png"
              alt="pokeball"
              class="max-w-full h-auto"
            />
          </div>
          <p class="font-semi text-lg text-center my-5">
            You don't have a Pokémon in Keep yet
          </p>
          <div class="flex items-center justify-center">
            <router-link
              to="/"
              class="card-catch w-fit px-5 py-2 hover:bg-yellow-400 flex items-center justify-between rounded-full"
            >
              <p class="font-semi">Go!! Catch a Pokémon</p>
              <img
                src="../assets/icon/pokecatch.png"
                alt="logo-pokemon"
                class="w-5 h-auto ml-3 cursor-pointer"
              />
            </router-link>
          </div>
        </template>

        <div
          v-else
          class=" text-left w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 mt-24"
        >
          <PokemonCard
            v-for="pokemon in pokemonKeep"
            :key="pokemon.id"
            :nick-name="pokemon.nickname"
            :poke-id="pokemon.id"
            :poke-name="pokemon.name"
            :poke-img="pokemon.image"
            :showRemove="true"
            :isOwned="false"
            @removePokemon="removePokemonFromKeep"
          />
        </div>
      </div>

      <!-- Tampilkan konten 'History' -->
      <div v-if="activeTab === 'history'" class="text-center">
        <template v-if="pokemonHistory.length === 0">
          <div class="flex items-center justify-center">
            <img
              src="../assets/icon/poke-shadow.png"
              alt="pokeball"
              class="max-w-full h-auto"
            />
          </div>
          <p class="font-semi text-lg text-center my-5">
            No Pokémon catch history available.
          </p>
          <div class="flex items-center justify-center">
            <router-link
              to="/"
              class="card-catch w-fit px-5 py-2 hover:bg-yellow-400 flex items-center justify-between rounded-full"
            >
              <p class="font-semi">Go!! Catch a Pokémon</p>
              <img
                src="../assets/icon/pokecatch.png"
                alt="logo-pokemon"
                class="w-5 h-auto ml-3 cursor-pointer"
              />
            </router-link>
          </div>
        </template>

        <div
          v-else
          class="text-left w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 font-sans mt-24"
        >
          <PokemonCard
            v-for="pokemon in pokemonHistory"
            :key="pokemon.id"
            :nick-name="pokemon.nickname"
            :poke-id="pokemon.id"
            :poke-name="pokemon.name"
            :poke-img="pokemon.image"
            :showRemove="false"
            :isOwned="false"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import Layout from "./Layout.vue";
import PokemonCard from "@/components/PokemonCard.vue";

const pokemonStore = usePokemonStore();
const activeTab = ref("keep");
const pokemonKeep = ref([]);
const pokemonHistory = ref([]);

// Fungsi untuk menghapus Pokémon dari keep dan memindahkannya ke history
function removePokemonFromKeep(pokeId) {
  pokemonStore.removePokemon(pokeId);
  var index = -1;

  for (var i = 0; i < pokemonKeep.value.length; i++) {
    if (pokemonKeep.value[i].id === pokeId) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    var removedPokemon = pokemonKeep.value.splice(index, 1)[0];
    pokemonHistory.value.push(removedPokemon);

    // Simpan perubahan ke localStorage
    localStorage.setItem("pokemonKeep", JSON.stringify(pokemonKeep.value));
    localStorage.setItem("pokemonHistory", JSON.stringify(pokemonHistory.value));
  }
}
;

// Ambil data dari localStorage saat komponen dimuat
onMounted(() => {
  const keepData = localStorage.getItem("pokemonKeep");
  const historyData = localStorage.getItem("pokemonHistory");

  if (keepData) {
    pokemonKeep.value = JSON.parse(keepData);
  }

  if (historyData) {
    pokemonHistory.value = JSON.parse(historyData);
  }
});
</script>
