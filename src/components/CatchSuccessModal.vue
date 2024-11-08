<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
    <div class="bg-white rounded-2xl p-6 max-w-xs w-full shadow-lg relative">
      <div class="flex flex-col items-center">
        <!-- Poké Ball Animasi -->
        <img src="../assets/icon/pokecatch.png" alt="pokecatch" class="w-16 h-16" :class="{ 'animate-spin': isCatching }" />
        
        <!-- Pesan selama proses menangkap, akan muncul setelah 2 detik -->
        <p v-if="isCatching === false" class="text-lg font-semibold text-gray-800 mt-4">
          isooo welll
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({ pokemonName: String, show: Boolean });
const emit = defineEmits(['close']);
const router = useRouter();

// Menambahkan ref untuk menangani status animasi
const isCatching = ref(false);

// Fungsi untuk menangani perubahan tampilan ketika modal ditampilkan
watch(() => props.show, (newVal) => {
  if (newVal) {
    // Mulai animasi Poké Ball
    isCatching.value = true;
    setTimeout(() => {
      isCatching.value = false; // Menghentikan animasi dan menampilkan pesan setelah 2 detik
    }, 2000); // Durasi animasi Poké Ball (2 detik)
  }
});

// Fungsi untuk menutup modal dan kembali ke halaman Pokedex
const finish = () => {
  emit('close');
  router.push('/pokedex');
};
</script>
