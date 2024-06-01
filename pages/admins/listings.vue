<template>
  <div>
    <div class="flex justify-between">
      <DashboardTitle text="Listings" badge-label="10" show-badge />
      <USelect
        v-model="selected"
        icon="i-heroicons-funnel"
        :options="status"
        placeholder="Filter by status"
        class="w-1/3"
      />
    </div>
    <p class="text-sm text-gray-500">Apartments that you've listed</p>
    <div class="mt-12">
      <div v-if="numListings === 5">
        <ApartmentList />
      </div>
      <div
        v-if="numListings < 5"
        class="flex flex-col items-center justify-center py-6 gap-3"
      >
        <span class="italic text-sm text-center"
          >You've not listed any vacant or soon to be vacant apartments!
          <br />List apartments here.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

//   const listings: any = []

const status = ['Vacant', 'Soon to be vacant', 'Occupied']

const numListings = ref(5)

const selected = ref('')
</script>
