<template>
  <Layout>
    <!-- Loading spinner untuk pemuatan awal data -->
    <div v-if="loading && !state.pokemons.length" class="flex justify-center items-center mt-24">
      <div class="rounded-3xl bg-white px-5 py-2.5 flex justify-center items-center">
        <img src="@/assets/icon/pokesmall.png" alt="Loading Icon" class="animate-spin mr-2">
        <span class="font-semibold text-md">Loading...</span>
      </div>
    </div>

    <!-- Grid untuk menampilkan kartu Pokemon -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 font-sans mt-24">
      <PokemonCard 
        v-for="pokemon in state.pokemons" 
        :isOwned="true"
        :key="pokemon.id" 
        :poke-id="pokemon.id" 
        :poke-name="pokemon.name" 
        :poke-img="pokemon.imageUrl"
        :is-loading="loading"  
        class="capitalize"
        :showRemove="false"
      />
    </div>
    
    <!-- Tombol Load More dengan ikon loading -->
    <div class="flex items-center justify-center my-10">
      <button 
        @click="loadMore" 
        :disabled="loading"  
        class="rounded-2xl bg-gray-100 px-5 py-2 flex items-center h-100 hover:bg-yellow-400 text-sm font-medium"
      >
        <img 
          v-if="loading" 
          src="@/assets/icon/pokesmall.png" 
          alt="Loading Icon" 
          class="animate-spin w-5 h-5 mr-2"
        />
        {{ loading ? "Loading..." : "Load More" }}
      </button>
    </div>
  </Layout>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';
import Layout from '@/views/Layout.vue';
import PokemonAPI from '../api/ApiPokemon.js';

const state = reactive({
    pokemons: [],
    offset: 0,
    limit: 21
});

const loading = ref(false);

const getPokemon = async () => {
    loading.value = true;
    try {
        const params = `?limit=${state.limit}&offset=${state.offset}`;
        const res = await PokemonAPI.getPokemon(params);

        const newPokemons = res.data.results.map((poke, index) => ({
            id: state.offset + index + 1,
            name: poke.name,
            url: poke.url
        }));

        await Promise.all(newPokemons.map(async (poke) => {
            const imageRes = await PokemonAPI.getPokemonUrl(poke.url);
            poke.imageUrl = imageRes.data.sprites.other['official-artwork']['front_default'];
        }));

        state.pokemons.push(...newPokemons);
        state.offset += state.limit;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    } finally {
        loading.value = false;
    }
};

const loadMore = () => {
    getPokemon();
};

onMounted(() => {
    getPokemon();
});
</script>
