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
          Delete tenancy
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
      Delete tenancy for
      <b class="text-primary">{{ props.tenancy.apartment }}</b
      >?
    </p>

    <template #footer>
      <UButton
        label="Delete"
        :loading="loading"
        @click="deleteTenancy(tenancy)"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  tenancy: {
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

function deleteTenancy(tenancy: any) {
  loading.value = true
  // delete tenancy
  // update state, emit success to parent so it can update the table
  tenancy.value = {}
  console.log(tenancy.id)
  emit('close')
  toast.add({
    title: 'Owner deleted',
    description: 'The owner has been deleted',
  })
}
</script>
