<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out"
    >
      <div class="bg-white rounded-2xl p-6 max-w-xs w-full shadow-lg relative">
        <div class="flex flex-col items-center">
          <!-- Poké Ball Animasi -->
          <img
            src="../assets/icon/pokecatch.png"
            alt="pokecatch"
            class="w-16 h-16"
            :class="{
              'animate-spin': isCatching,
              'animate-bounce': !isCatching && failed
            }"
          />
  
          <!-- Pesan selama proses menangkap -->
          <p v-if="isCatching" class="text-lg font-semibold text-gray-800 mt-4">
            Throwing Pokeball...
          </p>
  
          <!-- Pesan jika gagal -->
          <p v-else-if="failed" class="text-lg font-semibold text-gray-800 mt-4">
            Oops, {{ props.pokemonName }} ran away...
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const props = defineProps({
    pokemonName: String,
    show: Boolean,
  });
  
  const emit = defineEmits(["close", "catchSuccess"]);
  const pokemonImage = ref("");
  const caught = ref(false);
  const isCatching = ref(false);
  const failed = ref(false);
  
  // Set gambar Pokemon setelah modal terbuka
  onMounted(() => {
    pokemonImage.value = `../assets/images/${props.pokemonName.toLowerCase()}.png`;
    startCatch();
  });
  
  const startCatch = () => {
    isCatching.value = true; // Mulai animasi Poké Ball Spin
  
    setTimeout(() => {
      failed.value = Math.random() > 0.5; // Cek keberhasilan (50% peluang)
      isCatching.value = false; // Hentikan animasi spin
  
      if (failed.value) {
        // Jika gagal, tampilkan pesan "Oops, pokemon ran away..."
        setTimeout(() => {
          failed.value = false; // Reset state gagal setelah animasi bounce
          close(); // Modal akan otomatis menutup setelah 2 detik gagal
        }, 2000); // Durasi animasi gagal
      } else {
        caught.value = true;
        emit("catchSuccess");
        close(); // Jika berhasil, tutup modal
      }
    }, 2000); // Proses menangkap Pokémon (2 detik)
  };
  
  const close = () => {
    emit("close");
  };
  </script>
  