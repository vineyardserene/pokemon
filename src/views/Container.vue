<template>
    <!-- Kontainer utama dengan latar belakang abu-abu dan padding untuk layout -->
    <div class="w-full bg-slate-200 px-5 lg:px-24 py-3 min-h-screen">
        
        <!-- Navigasi utama -->
        <nav class="flex items-center justify-between">
            <!-- Link ke halaman utama dengan logo Pokemon -->
            <router-link to="/">
                <img src="@/assets/icon/pokemon-logo.png" alt="Pokemon Logo" class="w-36">
            </router-link>
            <!-- Tombol "Catch" dengan jumlah Pokemon yang ditangkap -->
            <button class="rounded-2xl bg-gray-100 px-5 py-2 flex items-center hover:bg-yellow-400 text-sm font-medium">
                0 Catch
                <img src="@/assets/icon/pokecatch.png" alt="Pokecatch Icon" class="w-7 pl-2">
            </button>
        </nav>
        
        <!-- Tampilan Loading saat data masih dimuat -->
        <div class="flex justify-center items-center h-96" v-if="loading">
            <div class="rounded-3xl bg-white px-5 py-2.5 flex justify-center items-center">
                <img src="@/assets/icon/pokesmall.png" alt="Loading Icon" class="animate-spin mr-2">
                <span class="font-semibold text-md">Loading...</span>
            </div>
        </div>

        <!-- Menampilkan konten utama jika loading selesai -->
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // Properti untuk menentukan apakah tampilan sedang dalam keadaan loading
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
