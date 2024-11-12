<template>
  <Layout>
    <!-- Layout grid for the main display -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left side: Display Pokemon image and name -->
      <div>
        <p class="w-full text-center">#{{ ("000" + pokemon.id).slice(-4) }}</p>
        <div class="flex w-full items-center justify-center">
          <!-- Tooltip untuk "Owned" -->
          <div
            v-if="isCaught"
            class="tooltip tooltip-open tooltip-bottom"
            data-tip="Owned"
          >
            <img
              src="../assets/icon/pokeactive.png"
              alt="pokeactive"
              class="mr-2"
            />
          </div>
          <img
            v-else
            src="../assets/icon/pokesmall.png"
            alt="pokesmall"
            class="mr-2"
          />
          <p class="text-center font-bold text-3xl tracking-widest capitalize">
            {{ pokemon.name }}
          </p>
        </div>

        <div class="flex justify-center mb-5 z-10">
          <img
            src="../assets/icon/poke-shadow.png"
            alt="poke-shadow"
            class="absolute z-index w-30 mt-9"
          />
          <img
            :src="pokemon.imgUrl"
            alt="pokemon"
            class="w-72 z-0"
            :class="{ 'animate-move': isActive.moves }"
          />
        </div>

        <!-- Catch button always visible -->
        <div class="flex justify-center">
          <button
            @click="catchPokemon"
            class="bg-slate-100 flex px-5 py-2 rounded-2xl items-center hover:bg-yellow-400"
          >
            <img
              src="../assets/icon/pokecatch.png"
              alt=""
              class="w-8 mr-2 animate-bounce"
            />
            <span class="text-sm font-semibold">Catch {{ pokemon.name }}</span>
          </button>
        </div>

        <!-- Nickname input -->
        <div class="flex justify-center mt-4" v-if="nickname">
          <input
            v-model="nickname"
            type="text"
            placeholder="Give a nickname"
            class="rounded-lg p-2 border border-gray-300"
          />
        </div>
        <div class="flex justify-center mt-4" v-if="nickname">
          <button
            @click="saveNickname"
            class="bg-yellow-400 text-white p-2 rounded-full"
          >
            Save Nickname
          </button>
        </div>
      </div>

      <!-- Right side: Display Pokemon details -->
      <div class="rounded-3xl bg-white px-6 py-3 w-full lg:w-9/12">
        <!-- Navigation tabs for details -->
        <div
          class="bg-white rounded-3xl shadow-2xl shadow-slate-300 px-1 lg:px-5 py-2 mb-8"
        >
          <div class="grid grid-cols-3 gap-5 text-center">
            <div class="flex justify-center items-center">
              <div
                class="rounded-3xl px-5 py-1 text-sm w-fit cursor-pointer"
                :class="{ 'bg-yellow-400': isActive.about }"
                @click="activate('about')"
              >
                About
              </div>
            </div>
            <div class="flex justify-center items-center">
              <div
                class="rounded-3xl px-5 py-1 text-sm w-fit cursor-pointer"
                :class="{ 'bg-yellow-400': isActive.stats }"
                @click="activate('stats')"
              >
                Stats
              </div>
            </div>
            <div class="flex justify-center items-center">
              <div
                class="rounded-3xl px-5 py-1 text-sm w-fit cursor-pointer"
                :class="{ 'bg-yellow-400': isActive.moves }"
                @click="activate('moves')"
              >
                Moves
              </div>
            </div>
          </div>
        </div>

        <!-- Tab content for "About" to show basic info of the Pokemon -->
        <div v-if="isActive.about">
          <div class="lg:px-7">
            <div
              class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm"
            >
              <p class="font-medium">Types</p>
              <div class="flex col-span-2 items-center">
                <div
                  v-for="type in pokemon.types"
                  :key="type.type.name"
                  :class="[
                    'rounded-md px-3 mr-2 w-fit text-base capitalize',
                    getTypeClass(type.type.name),
                  ]"
                >
                  {{ type.type.name }}
                </div>
              </div>
            </div>
            <div
              class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm"
            >
              <p class="font-medium">Height</p>
              <p class="col-span-2">{{ pokemon.height }} m</p>
            </div>
            <div
              class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm"
            >
              <p class="font-medium">Weight</p>
              <p class="col-span-2">{{ pokemon.weight }} kg</p>
            </div>
            <div
              class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-1 text-sm"
            >
              <p class="font-medium">Abilities</p>
              <div class="col-span-2">
                <div
                  v-for="ability in pokemon.abilities"
                  :key="ability"
                  class="flex items-center mb-3"
                >
                  <img
                    src="../assets/icon/pikachu.png"
                    alt=""
                    class="w-4 mr-2"
                  />
                  <p class="rounded-md bg-yellow-200 px-3 text-base capitalize">
                    {{ ability }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm"
            >
              <p class="font-medium">Experience</p>
              <p class="col-span-2">{{ pokemon.experience }} Exp</p>
            </div>
          </div>
        </div>

              <!-- Tab content for "Stats" to show Pokemon's stats -->
              <div :class="{hidden: !isActive.stats}">
            <div class="w-full lg:px-10">
              <div class="mb-3.5" v-for="stat in pokemon.stats" :key="stat">
                <div class="flex items-center justify-between">
                  <div class="flex items-center mb-1">
                    <img :src="'/src/assets/icon/stats/' + stat.stat.name + '.png'" alt="hp-icon" class="mr-2">
                    <span class="text-sm font-semibold">{{ stat.stat.name }}</span>
                  </div>
                  <span class="mb-1 text-sm font-semibold">{{ stat.base_stat }}</span>
                </div>
                <div class="w-full bg-red-100 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" :style="{'width': (stat.base_stat/200*100) + '%'}"></div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Tab content for "Moves" to show Pokemon's moves -->
          <div v-if="isActive.moves">
            <div class="overflow-y-scroll h-80 moves-scroll">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                <div v-for="move in pokemon.moves" :key="move" 
                     class="border border-dashed py-3 hover:border-yellow-400 w-full">
                     <p class="text-center text-sm">{{ move }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- Catch Modal for catching the Pokémon -->
    <CatchModal
      v-if="showCatchModal"
      @close="showCatchModal = false"
      @catchSuccess="showCatchNicknameModal = true"
      :pokemonName="pokemon.name"
      :show="showCatchModal"
    />

    <!-- Nickname Modal for adding a nickname after catching -->
    <CatchNicknameModal
      v-if="showCatchNicknameModal"
      @close="showCatchNicknameModal = false"
      @nicknameSubmitted="showCatchSuccessModal = true"
      :pokemonName="pokemon.name"
      :show="showCatchNicknameModal"
    />

    <!-- Catch Success Modal -->
    <CatchSuccessModal
      v-if="showCatchSuccessModal"
      @close="showCatchSuccessModal = false"
      :pokemonName="pokemon.name"
      :show="showCatchSuccessModal"
    />
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue"; // Tambahkan `computed`
import { useRoute } from "vue-router";
import Layout from "@/views/Layout.vue";
import CatchModal from "@/components/CatchModal.vue";
import CatchNicknameModal from "@/components/CatchNicknameModal.vue";
import CatchSuccessModal from "@/components/CatchSuccessModal.vue";
import PokemonAPI from "../api/ApiPokemon.js";
import { usePokemonStore } from "../stores/pokemonStore"; // Import store Pinia

const route = useRoute();
const showCatchModal = ref(false);
const showCatchNicknameModal = ref(false);
const showCatchSuccessModal = ref(false);

const isActive = reactive({
  about: true,
  stats: false,
  moves: false,
});

const pokemon = ref({});
const nickname = ref("");

// Panggil store
const pokemonStore = usePokemonStore();

// Properti yang dihitung untuk memeriksa apakah Pokémon sudah ditangkap
const isCaught = computed(() =>
  pokemonStore.pokemonKeep.some((p) => p.id === pokemon.value.id)
);

// Fungsi untuk mendapatkan kelas warna berdasarkan tipe Pokémon
function getTypeClass(type) {
  const typeColors = {
    grass: "bg-green-200",
    fire: "bg-red-200",
    water: "bg-blue-200",
    electric: "bg-yellow-200",
    psychic: "bg-purple-200",
    ice: "bg-blue-100",
    dragon: "bg-indigo-200",
    dark: "bg-gray-300",
    fairy: "bg-pink-200",
    normal: "bg-gray-200",
    flying: "bg-blue-100",
    fighting: "bg-red-300",
    poison: "bg-purple-300",
    ground: "bg-yellow-300",
    rock: "bg-gray-400",
    bug: "bg-green-300",
    ghost: "bg-indigo-300",
    steel: "bg-gray-400",
  };
  return typeColors[type] || "bg-gray-200";
}

function activate(tab) {
  isActive.about = tab === "about";
  isActive.stats = tab === "stats";
  isActive.moves = tab === "moves";
}

// Fungsi untuk menangkap Pokémon dan membuka modal
function catchPokemon() {
  showCatchModal.value = true;
}

// Fungsi untuk menyimpan nickname dan menandai Pokémon sebagai sudah ditangkap
function saveNickname() {
  const pokemonData = {
    id: pokemon.value.id,
    name: pokemon.value.name,
    nickname: nickname.value,
    image: pokemon.value.imgUrl,
  };

  // Tambahkan Pokémon ke store untuk menandai sebagai sudah ditangkap
  pokemonStore.catchPokemon(pokemonData);
  showCatchSuccessModal.value = true;
}

// Fungsi untuk mengambil detail Pokémon
async function pokemonDetails(pokeId) {
  try {
    const res = await PokemonAPI.getPokemonDetails(pokeId);
    const data = res.data;
    pokemon.value = {
      id: data.id,
      name: data.name,
      types: data.types,
      height: data.height / 10,
      weight: data.weight / 10,
      abilities: data.abilities.map(({ ability }) => ability.name),
      experience: data.base_experience,
      stats: data.stats,
      moves: data.moves.map(({ move }) => move.name),
      imgUrl: data.sprites.other["official-artwork"].front_default,
    };
  } catch (error) {
    console.error("Gagal mengambil detail Pokémon:", error);
  }
}

// Ambil data saat komponen di-mount
onMounted(() => {
  pokemonDetails(route.params.pokeId);
});
</script>
