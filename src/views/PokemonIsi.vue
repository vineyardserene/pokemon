<script setup>
	import Container from '@/views/Container.vue'
</script>
<template>
    <Container>
        <!-- Layout grid untuk tampilan utama -->
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

            <!-- Bagian kiri untuk menampilkan gambar dan nama Pokemon -->
            <div>
                <p class="w-full text-center">#{{ ('000' + pokemon.id).slice(-4) }}</p>
                <div class="flex w-full items-center justify-center">
                    <img src="../assets/icon/pokesmall.png" alt="" class="mr-2">
                    <p class="text-center font-bold text-3xl tracking-widest">{{ pokemon.name }}</p>
                </div>
                <!-- Gambar Pokemon dengan animasi bergerak jika tab "moves" aktif -->
                <div class="flex justify-center mb-5 z-10">
                    <img :src="pokemon.imgUrl" alt="pokemon" class="w-72" :class="{'animate-move': isActive.moves}">
                </div>
                <!-- Tombol untuk menangkap Pokemon -->
                <div class="flex justify-center">
                    <div class="bg-slate-100 flex px-5 py-2 rounded-2xl items-center hover:bg-yellow-400">
                        <img src="../assets/icon/pokecatch.png" alt="" class="w-8 mr-2 animate-bounce">
                        <span class="text-sm font-semibold">Catch {{ pokemon.name }}</span>
                    </div>
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
                    <div class="lg:px-7">
                        <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm">
                            <p class="font-medium">Types</p>
                            <div class="flex col-span-2 items-center">
                                <div v-for="type in pokemon.types" :key="type.type.name" 
                                     class="rounded-md px-3 mr-2 w-fit text-base" 
                                     :class="type.type.name">
                                     {{ capitalizeTheFirstLetterOfEachWord(type.type.name) }}
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
                                     <img src="../assets/icon/pikachu.png" alt="" class="w-4 mr-2">
                                     <p class="rounded-md bg-yellow-200 px-3 text-base">{{ ability }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-rows-1 grid-cols-3 gap-3 mb-5 lg:mb-3 text-sm">
                            <p class="font-medium">Experience</p>
                            <p class="col-span-2">{{ pokemon.experience }} Exp</p>
                        </div>
                    </div>
                </div>

                <!-- Konten tab "Stats" untuk menampilkan statistik Pokemon -->
                <div v-if="isActive.stats">
                    <div class="w-full lg:px-10">
                        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="mb-3.5">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center mb-1">
                                    <img :src="'/src/assets/icon/stats/' + stat.stat.name + '.png'" 
                                         alt="Stat Icon" class="mr-2">
                                    <span class="text-sm font-semibold">{{ capitalizeTheFirstLetterOfEachWord(stat.stat.name) }}</span>
                                </div>
                                <span class="mb-1 text-sm font-semibold">{{ stat.base_stat }}</span>
                            </div>
                            <div class="w-full bg-red-100 rounded-full h-2">
                                <div class="bg-yellow-400 h-2 rounded-full" 
                                     :style="{ width: (stat.base_stat / 200 * 100) + '%' }">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Konten tab "Moves" untuk menampilkan daftar gerakan Pokemon -->
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
    </Container>
</template>

<script>
import PokemonAPI from '../api/ApiPokemon.js';

export default {
    data() {
        return {
            isActive: {
                about: true,  // Mengatur tab "about" sebagai default aktif
                stats: false,
                moves: false,
            },
            pokemon: {}  // Menyimpan data Pokemon
        };
    },
    methods: {
        // Mengubah huruf pertama tiap kata menjadi kapital
        capitalizeTheFirstLetterOfEachWord(words) {
            return words.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
        },
        // Fungsi untuk mengaktifkan tab sesuai yang diklik
        activate(tab) {
            this.isActive.about = tab === 'about';
            this.isActive.stats = tab === 'stats';
            this.isActive.moves = tab === 'moves';
        },
        // Mengambil detail Pokemon dari API berdasarkan ID
        pokemonDetails(pokeId) {
            PokemonAPI.getPokemonDetails(pokeId).then(res => {
                const data = res.data;
                this.pokemon = {
                    id: data.id,
                    name: this.capitalizeTheFirstLetterOfEachWord(data.name),
                    types: data.types,
                    height: data.height / 10,  // Konversi ke meter
                    weight: data.weight / 10,  // Konversi ke kilogram
                    abilities: data.abilities.map(({ ability }) => ability.name),
                    experience: data.base_experience,
                    stats: data.stats,
                    moves: data.moves.map(({ move }) => move.name),
                    imgUrl: data.sprites.other['official-artwork'].front_default
                };
            }).catch(e => console.log(e));  // Menangani error jika ada
        }
    },
    mounted() {
        // Mengambil ID dari route untuk menampilkan detail Pokemon saat komponen dipasang
        this.pokemonDetails(this.$route.params.pokeId);
    }
}
</script>
