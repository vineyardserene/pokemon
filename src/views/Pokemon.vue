<template>
    <Container>
        <div v-if="loading" class="flex justify-center items-center mt-24">
            <!-- Loading Spinner -->
            <div class="loader">Loading...</div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 font-sans mt-24">
            <PokemonCard 
                v-for="pokemon in state.pokemons" 
                :key="pokemon.id" 
                :poke-id="pokemon.id" 
                :poke-name="pokemon.name" 
                :poke-img="pokemon.imageUrl"
            />
        </div>
        
        <!-- Load More Button -->
        <div class="flex items-center justify-center my-10">
            <button 
                @click="loadMore" 
                :disabled="!state.nextUrl || loading"  
                class="rounded-2xl bg-gray-100 px-5 py-2 flex items-center h-100 hover:bg-yellow-400 text-sm font-medium">
                Load More
            </button>
        </div>
    </Container>
</template>

<script>
    import PokemonCard from '@/components/PokemonCard.vue'
    import Container from '@/views/Container.vue'
    import PokemonAPI from '../api/ApiPokemon.js' 
    import { onMounted, reactive, ref } from "vue";

    export default {
        components: {
            Container,
            PokemonCard
        },
        setup() {
            const state = reactive({
                pokemons: [],
                total: 0,
                nextUrl: '',         // URL untuk halaman selanjutnya
                pageSize: 20         // Jumlah item per halaman
            });

            const loading = ref(true);

            // Capitalize function for pokemon names
            function capitalizeTheFirstLetterOfEachWord(words) {
                const separateWord = words.toLowerCase().split(' ');
                for (let i = 0; i < separateWord.length; i++) {
                    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
                }
                return separateWord.join(' ');
            }

            // Fungsi untuk mengambil data pokemon
            async function getPokemon() {
                loading.value = true;
                try {
                    // Set parameter URL untuk halaman berikutnya jika ada
                    const params = state.nextUrl ? state.nextUrl.substring(state.nextUrl.indexOf('?')) : `?limit=${state.pageSize}`;
                    const res = await PokemonAPI.getPokemon(params);

                    // Perbarui URL untuk halaman berikutnya
                    state.nextUrl = res.data.next;

                    // Map hasil baru ke format yang diinginkan
                    const newPokemons = res.data.results.map((poke, index) => ({
                        id: state.total + index + 1, // ID unik
                        name: capitalizeTheFirstLetterOfEachWord(poke.name),
                        url: poke.url // URL untuk gambar, akan digunakan nanti
                    }));

                    // Fetch gambar untuk setiap pokemon secara terpisah
                    for (const poke of newPokemons) {
                        const imageRes = await PokemonAPI.getPokemonUrl(poke.url);
                        poke.imageUrl = imageRes.data.sprites.other['official-artwork']['front_default'];
                    }

                    // Tambahkan pokemon baru ke list dan perbarui total
                    state.pokemons = [...state.pokemons, ...newPokemons];
                    state.total += newPokemons.length;

                } catch (error) {
                    console.error("Error fetching pokemon:", error);
                } finally {
                    loading.value = false;
                }
            }

            // Fungsi untuk memuat data lebih banyak saat tombol "Load More" diklik
            function loadMore() {
                getPokemon();
            }

            // Muat data awal saat komponen dipasang
            onMounted(() => {
                getPokemon();
            });

            return {
                state,
                loadMore,
                loading
            };
        }
    }
</script>