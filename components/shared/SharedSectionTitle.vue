<template>
  <h2
    class="text-3xl font-['Lato'] font-bold text-center tracking-tight text-gray-700 dark:text-white sm:text-5xl"
  >
    {{ props.text }}
  </h2>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>
