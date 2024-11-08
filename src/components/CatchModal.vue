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

onMounted(() => {
  pokemonImage.value = `../assets/images/${props.pokemonName.toLowerCase()}.png`;
  startCatch();
});

const startCatch = () => {
  isCatching.value = true;

  setTimeout(() => {
    failed.value = Math.random() > 0.5;
    isCatching.value = false;

    if (failed.value) {
      setTimeout(() => {
        failed.value = false;
        close();
      }, 2000);
    } else {
      caught.value = true;
      emit("catchSuccess"); // Emit event success untuk membuka modal nickname
      close();
    }
  }, 2000);
};

const close = () => {
  emit("close");
};
</script>
