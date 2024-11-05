<template>
    <!-- Link ke halaman detail Pokemon dengan mengirimkan ID Pokemon sebagai parameter -->
    <router-link :to="{ name: 'pokemon-detail', params: { pokeId } }">
        <!-- Kontainer utama kartu dengan efek hover -->
        <div class="group rounded-xl bg-white w-full p-10 py-16 relative flex items-center justify-between mb-4 transition-transform duration-300 ease-in-out hover:-translate-y-2.5">
            <!-- Bagian ID dan Nama Pokemon -->
            <div class="absolute">
                <!-- Menampilkan ID Pokemon dengan format angka nol di depan -->
                <p class="font-semi group-hover:text-yellow-500">{{ formattedId }}</p>
                <!-- Menampilkan Nama Pokemon -->
                <h4 class="font-bold text-2xl">{{ pokeName }}</h4>
            </div>

            <!-- Gambar bayangan di latar belakang -->
            <div class="absolute z-10 -top-12 -right-5">
                <img src="../assets/icon/poke-shadow.png" alt="Bayangan" class="w-24">
            </div>

            <!-- Gambar Pokemon di atas bayangan -->
            <div class="absolute z-10 -top-14 -right-5">
                <img :src="pokeImg" alt="Pokemon" class="w-40 xl:w-44 h-auto">
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    // Props yang diterima oleh komponen ini: ID, Nama, dan URL Gambar Pokemon
    props: {
        pokeId: String,
        pokeName: String,
        pokeImg: String
    },
    computed: {
        // Properti terhitung untuk memformat ID Pokemon dengan angka nol di depan (misalnya: '0001')
        formattedId() {
            return String(this.pokeId).padStart(4, '0');
        }
    }
}
</script>
