<template>
  <div class="w-1/2 inline-flex items-center space-x-2">
    <h2 class="font-['Lato'] font-semibold text-xl">{{ props.text }}</h2>
    <UBadge
      v-if="props.showBadge"
      :label="props.badgeLabel"
      color="primary"
      variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  badgeLabel: {
    type: String,
    required: false,
    default: '',
  },
  showBadge: {
    type: Boolean,
    default: false,
  },
})
</script>
