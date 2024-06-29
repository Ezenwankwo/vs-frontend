<template>
  <h2
    class="text-4xl lg:text-5xl font-['Lato'] font-bold text-center tracking-tight text-gray-700 dark:text-white"
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
