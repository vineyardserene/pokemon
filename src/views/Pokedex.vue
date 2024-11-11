<template>
  <Layout>
    <div class="flex items-center justify-center lg:justify-end">
      <div class="home-switch w-fit flex justify-around items-center space-x-2">
        <button
          class="rounded-full bg-gray-100 px-4 py-2 flex items-center text-sm font-medium"
        >
          <div
            @click="activeTab = 'keep'"
            :class="
              activeTab === 'keep'
                ? 'home-switch-active cursor-pointer py-1 px-4 text-white bg-yellow-400 rounded-full'
                : 'cursor-pointer py-1 px-4 text-black'
            "
          >
            Keep
          </div>
          <div
            @click="activeTab = 'history'"
            :class="
              activeTab === 'history'
                ? 'home-switch-active cursor-pointer py-1 px-4 text-white bg-yellow-400 rounded-full'
                : 'cursor-pointer py-1 px-4 text-black'
            "
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
        <div v-if="pokemonKeep.length === 0">
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
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 font-sans mt-24"
        >
          <PokemonCard
            v-for="pokemon in pokemonKeep"
            :showRemove="true"
            :isOwned="false"
            :nick-name="pokemon.nickname"
            :key="pokemon.id"
            :poke-id="pokemon.id"
            :poke-name="pokemon.name"
            :poke-img="pokemon.image"
            @removePokemon="removePokemonFromKeep"
          />
        </div>
      </div>
      <!-- Tampilkan konten 'History' -->
      <div v-if="activeTab === 'history'" class="text-center">
        <div v-if="pokemonHistory.length === 0">
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
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 font-sans mt-24"
        >
          <PokemonCard
            v-for="pokemon in pokemonHistory"
            :showRemove="false"
            :isOwned="false"
            :nick-name="pokemon.nickname"
            :key="pokemon.id"
            :poke-id="pokemon.id"
            :poke-name="pokemon.name"
            :poke-img="pokemon.image"
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
const removePokemonFromKeep = (pokeId) => {
  pokemonStore.removePokemon(pokeId);
  const index = pokemonKeep.value.findIndex((pokemon) => pokemon.id === pokeId);
  if (index !== -1) {
    const removedPokemon = pokemonKeep.value.splice(index, 1)[0];
    pokemonHistory.value.push(removedPokemon);

    // Simpan perubahan ke localStorage
    localStorage.setItem("pokemonKeep", JSON.stringify(pokemonKeep.value));
    localStorage.setItem(
      "pokemonHistory",
      JSON.stringify(pokemonHistory.value)
    );
  }
};


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
