<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
    <div class="bg-white rounded-2xl p-6 max-w-xs w-full shadow-lg relative">
      <div class="flex flex-col items-center">
        <!-- Poké Ball Animation -->
        <img src="../assets/icon/pokecatch.png" alt="pokecatch" class="w-16 h-16" :class="{ 'animate-spin': isCatching }" />
        
        <!-- Message displayed after the Poké Ball animation finishes -->
        <p v-if="!isCatching" class="text-lg font-semibold text-gray-800 mt-4">
          You caught {{ pokemonName }}!
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

const isCatching = ref(false);

// Watch for changes in the `show` prop to trigger the animation
watch(() => props.show, (newVal) => {
  if (newVal) {
    isCatching.value = true;
    setTimeout(() => {
      isCatching.value = false; // Stop animation after 2 seconds
    }, 2000);
  }
});

// Function to close the modal and navigate to the Pokedex page
const finish = () => {
  emit('close');
  router.push('/pokedex');
};
</script>

<style scoped>
/* Scoped styles for modal */
</style>
