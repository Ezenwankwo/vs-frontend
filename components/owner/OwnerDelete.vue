<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3
          class="text-base font-semibold leading-6 text-gray-700 dark:text-white"
        >
          Delete earning
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="handleClose"
        />
      </div>
    </template>

    <p class="text-gray-700 text-sm">
      Are you sure you want to delete this owner
      {{ props.owner.name }}?
    </p>

    <template #footer>
      <UButton label="Delete" :loading="loading" @click="deleteOwner(owner)" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  owner: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const loading = ref(false)

const toast = useToast()

function deleteOwner(owner: any) {
  loading.value = true
  // delete owner
  // update state, emit success to parent so it can update the table
  owner.value = {}
  console.log(owner.id)
  emit('close')
  toast.add({
    title: 'Owner deleted',
    description: 'The owner has been deleted',
  })
}
</script>
