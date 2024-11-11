<template>
    <Layout>
      <!-- Layout grid for the main display -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left side: Display Pokemon image and name -->
        <div>
          <p class="w-full text-center">#{{ ('000' + pokemon.id).slice(-4) }}</p>
          <div class="flex w-full items-center justify-center">
            <img src="../assets/icon/pokesmall.png" alt="" class="mr-2">
            <p class="text-center font-bold text-3xl tracking-widest capitalize">{{ pokemon.name }}</p>
          </div>
          <div class="flex justify-center mb-5 z-10">
            <img src="../assets/icon/poke-shadow.png" alt="poke-shadow" class="absolute z-index w-30 mt-9" />
            <img :src="pokemon.imgUrl" alt="pokemon" class="w-72 z-0" :class="{'animate-move': isActive.moves}" />
          </div>
          <div class="flex justify-center">
            <!-- Catch button will be hidden if the Pokemon is already caught -->
            <button
              v-if="!isCaught" 
              @click="showCatchModal = true"
              class="bg-slate-100 flex px-5 py-2 rounded-2xl items-center hover:bg-yellow-400"
            >
              <img src="../assets/icon/pokecatch.png" alt="" class="w-8 mr-2 animate-bounce"/>
              <span class="text-sm font-semibold">Catch {{ pokemon.name }}</span>
            </button>
            <!-- Message if Pokemon is already caught -->
            <p v-else class="text-center font-medium text-yellow-400">You've already caught this Pokémon!</p>
          </div>
  
          <!-- Nickname input -->
          <div class="flex justify-center mt-4" v-if="isCaught && !pokemon.nickname">
            <input
              v-model="nickname"
              type="text"
              placeholder="Give a nickname"
              class="rounded-lg p-2 border border-gray-300"
            />
          </div>
          <div class="flex justify-center mt-4" v-if="nickname && isCaught">
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
          <div class="bg-white rounded-3xl shadow-2xl shadow-slate-300 px-1 lg:px-5 py-2 mb-8">
            <div class="grid grid-cols-3 gap-5 text-center">
              <div class="flex justify-center items-center">
                <div class="rounded-3xl px-5 py-1 text-sm w-fit cursor-pointer" 
                     :class="{'bg-yellow-400' : isActive.about}" 
                     @click="activate('about')">About</div>
              </div>
              <div class="flex justify-center items-center">
                <div class="rounded-3xl px-5 py-1 text-sm w-fit cursor-pointer" 
                     :class="{'bg-yellow-400' : isActive.stats}" 
                     @click="activate('stats')">Stats</div>
              </div>
              <div class="flex justify-center items-center">
                <div class="rounded-3xl px-5 py-1 text-sm w-fit cursor-pointer" 
                     :class="{'bg-yellow-400' : isActive.moves}" 
                     @click="activate('moves')">Moves</div>
              </div>
            </div>
          </div>
  
          <!-- Tab content for "About" to show basic info of the Pokemon -->
          <div v-if="isActive.about">
            <div class="lg:px-7">
              <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm">
                <p class="font-medium">Types</p>
                <div class="flex col-span-2 items-center">
                  <div v-for="type in pokemon.types" :key="type.type.name" 
                       class="rounded-md px-3 mr-2 w-fit text-base capitalize" 
                       :class="type.type.name">
                       {{ type.type.name }}
                  </div>
                </div>
              </div>
              <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm">
                <p class="font-medium">Height</p>
                <p class="col-span-2">{{ pokemon.height }} m</p>
              </div>
              <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm">
                <p class="font-medium">Weight</p>
                <p class="col-span-2">{{ pokemon.weight }} kg</p>
              </div>
              <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-1 text-sm">
                <p class="font-medium">Abilities</p>
                <div class="col-span-2">
                  <div v-for="ability in pokemon.abilities" :key="ability" 
                       class="flex items-center mb-3">
                       <img src="../assets/icon/pikachu.png" alt="" class="w-4 mr-2"/>
                       <p class="rounded-md bg-yellow-200 px-3 text-base capitalize">{{ ability }}</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm">
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
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Layout from '@/views/Layout.vue';
  import CatchModal from '@/components/CatchModal.vue';
  import CatchNicknameModal from '@/components/CatchNicknameModal.vue';
  import CatchSuccessModal from '@/components/CatchSuccessModal.vue';
  import { usePokemonStore } from '@/stores/pokemonStore';
  import PokemonAPI from '../api/ApiPokemon.js'
  
  const route = useRoute();
  const showCatchModal = ref(false);
  const showCatchNicknameModal = ref(false);
  const showCatchSuccessModal = ref(false);
  const store = usePokemonStore();
  
  const isActive = reactive({
    about: true,
    stats: false,
    moves: false,
  });
  
  const pokemon = ref({});
  const isCaught = ref(false); 
  const nickname = ref(''); 
  
  function activate(tab) {
    isActive.about = tab === 'about';
    isActive.stats = tab === 'stats';
    isActive.moves = tab === 'moves';
  }
  
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
        imgUrl: data.sprites.other['official-artwork'].front_default,
      };
  
      // Check if Pokemon is already caught
      isCaught.value = store.pokemonKeep.some(p => p.id === pokemon.value.id);
    } catch (error) {
      console.error('Failed to fetch Pokémon details:', error);
    }
  }
  
  const saveNickname = () => {
    const pokemonData = {
      ...pokemon.value,
      nickname: nickname.value,
    };
  
    store.catchPokemon(pokemonData);
    showCatchSuccessModal.value = true;  // Open catch success modal
  };
  
  onMounted(() => {
    pokemonDetails(route.params.pokeId);
  });
  </script>
  
  <style scoped>
  /* Add any additional scoped styles here */
  </style>
  