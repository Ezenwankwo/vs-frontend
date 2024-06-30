<template>
  <div
    class="flex flex-col items-center justify-center py-36 gap-3 text-gray-700"
  >
    <Icon name="i-heroicons-circle-stack-20-solid" />
    <span class="italic text-sm text-center"
      >{{ props.mainText }}! <br />{{ props.subText }}</span
    >
    <UButton
      v-if="props.showButton"
      icon="i-heroicons-plus-16-solid"
      label="Create"
      @click="openForm"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  mainText: {
    type: String,
    required: true,
  },
  subText: {
    type: String,
    required: false,
    default: '',
  },
  showButton: {
    type: Boolean,
    default: true,
  },
})
const isOpen = ref(false)
const emits = defineEmits(['open-form'])

function openForm() {
  isOpen.value = true
  emits('open-form')
}
</script>
