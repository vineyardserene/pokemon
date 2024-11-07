<template>
    <Layout>
        <!-- Layout grid untuk tampilan utama -->
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Bagian kiri untuk menampilkan gambar dan nama Pokemon -->
            <div>
                <p class="w-full text-center">#{{ ('000' + pokemon.id).slice(-4) }}</p>
                <div class="flex w-full items-center justify-center">
                    <img src="../assets/icon/pokesmall.png" alt="" class="mr-2">
                    <p class="text-center font-bold text-3xl tracking-widest capitalize">{{ pokemon.name }}</p>
                </div>
                <div class="flex justify-center mb-5 z-10">
                    <img :src="pokemon.imgUrl" alt="pokemon" class="w-72" :class="{'animate-move': isActive.moves}"/>
                </div>
                <div class="flex justify-center">
                    <button
                        @click="showCatchModal = true"
                        class="bg-slate-100 flex px-5 py-2 rounded-2xl items-center hover:bg-yellow-400"
                    >
                        <img src="../assets/icon/pokecatch.png" alt="" class="w-8 mr-2 animate-bounce"/>
                        <span class="text-sm font-semibold">Catch {{ pokemon.name }}</span>
                    </button>
                </div>
            </div>

            <!-- Bagian kanan untuk menampilkan informasi detail Pokemon -->
            <div class="rounded-3xl bg-white px-6 py-3 w-full lg:w-9/12">
                <!-- Tab navigasi untuk mengubah tampilan informasi -->
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

                <!-- Konten tab "About" untuk menampilkan info dasar Pokemon -->
                <div v-if="isActive.about">
                    <!-- Content for About tab -->
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

                <!-- Konten tab "Stats" -->
                <div v-if="isActive.stats">
                    <!-- Content for Stats tab -->
                </div>

                <!-- Konten tab "Moves" -->
                <div v-if="isActive.moves">
                    <!-- Content for Moves tab -->
                </div>
            </div>
        </div>

        <!-- Modal Catch -->
        <CatchModal 
            v-if="showCatchModal" 
            @close="showCatchModal = false" 
            @catchSuccess="showCatchSuccessModal = true" 
            :pokemonName="pokemon.name"
            :show="showCatchModal" 
        />

        <!-- Modal Catch Success -->
        <CatchModalSuccess 
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
import CatchModalSuccess from '@/components/CatchSuccessModal.vue';
import PokemonAPI from '../api/ApiPokemon.js';

const route = useRoute();
const showCatchModal = ref(false);
const showCatchSuccessModal = ref(false);

const isActive = reactive({
  about: true,
  stats: false,
  moves: false,
});
const pokemon = ref({});

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
  } catch (error) {
    console.error('Failed to fetch Pokémon details:', error);
  }
}

onMounted(() => {
  pokemonDetails(route.params.pokeId);
});
</script>
