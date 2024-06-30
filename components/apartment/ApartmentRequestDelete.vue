<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      header: { background: 'bg-primary-100/50' },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Icon
            name="i-heroicons-home-modern"
            class="text-primary-700 text-xl"
          />
          <h3
            class="text-base font-medium leading-6 text-gray-700 dark:text-white"
          >
            Delete Request
          </h3>
        </div>
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
      Are you sure you want to delete this request for
      <b>{{ props.request.size }} in {{ props.request.location }}</b>
    </p>

    <template #footer>
      <UButton
        label="Delete"
        :loading="loading"
        @click="deleteRequest(request)"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  request: {
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

const deleteRequest = (request: any) => {
  loading.value = true
  // delete request
  // update state, emit success to parent so it can update the table
  request.value = {}
  console.log(request.id)
  emit('close')
  toast.add({
    title: 'Request deleted',
    description: 'The request has been deleted',
  })
}
</script>
