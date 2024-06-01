<template>
  <div>
    <div class="flex justify-between">
      <DashboardTitle text="Match List" badge-label="10" show-badge />
      <USelect
        v-model="selected"
        icon="i-heroicons-funnel"
        :options="requests"
        placeholder="Filter by requests"
        class="w-1/3"
      />
    </div>
    <p class="text-sm text-gray-500">Apartments that match your requests</p>
    <div class="mt-12">
      <div v-if="requests.length < 5 || matches.length === 0">
        <ApartmentList />
      </div>
      <div
        v-if="requests.length > 5"
        class="flex flex-col items-center justify-center py-6 gap-3"
      >
        <span class="italic text-sm">You've no requests!</span>
        <UButton
          icon="i-heroicons-plus-16-solid"
          label="Create request"
          trailing
        />
      </div>
      <div
        v-if="requests.length > 5 && matches.length === 0"
        class="flex flex-col items-center justify-center py-6 gap-3"
      >
        <span class="italic text-sm text-center"
          >You've no matches yet! <br />We will notify when you do</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const matches: any = []

const requests = [
  '2 bedroom apartment in karu',
  '3 bedroom apartment in yaba',
  '4 bedroom apartment in ibadan',
  'Self Contained apartment in lagos',
]

const selected = ref('')
</script>
