<template>
  <div>
    <div class="flex justify-between">
      <DashboardTitle text="Requests" badge-label="10" show-badge />
      <UButton
        v-if="apartments.length < 10"
        icon="i-heroicons-plus-16-solid"
        variant="outline"
        label="Add request"
        @click="isOpen = true"
      />
    </div>
    <p class="text-sm text-gray-500">Here are the requests you've made</p>
    <div class="mt-12">
      <UTable
        v-if="apartments.length < 10"
        :rows="apartments"
        :columns="columns"
      >
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">No one here!</span>
            <UButton label="Add people" />
          </div>
        </template>

        <template #matches-data="{ row }">
          <UBadge
            :label="row.matches"
            size="xs"
            color="primary"
            variant="outline"
          />
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
      <div v-else class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">You've no requests!</span>
        <UButton
          icon="i-heroicons-plus-16-solid"
          label="Create request"
          trailing
          @click="isOpen = true"
        />
      </div>
    </div>
    <UModal v-model="isOpen" prevent-close>
      <ApartmentRequestForm :request="request" @close="handleFormClose" />
    </UModal>

    <UModal v-model="isDeleteOpen" prevent-close>
      <ApartmentRequestDelete
        :request="request"
        @close="isDeleteOpen = false"
      />
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const isOpen = ref(false)
const isDeleteOpen = ref(false)

const request = ref({})

const handleFormClose = () => {
  isOpen.value = false
  request.value = {}
}

const columns = [
  {
    key: 'size',
    label: 'Size',
  },
  {
    key: 'location',
    label: 'Location',
  },
  {
    key: 'matches',
    label: 'Matches',
  },
  {
    key: 'actions',
  },
]

const apartments = [
  {
    id: 1,
    size: '2 bedroom apartment',
    location: 'Karu, Abuja',
    price: '5,000,000',
    move_in_date: '10/10/2022',
    amenities: ['parking', 'furnishing', 'balcony'],
    note: 'Please check the property for any suspicious activity',
    matches: '3',
  },
  {
    id: 2,
    size: '3 bedroom apartment',
    location: 'Oshodin, Yaba',
    price: '1,000,000',
    move_in_date: '10/10/2024',
    amenities: ['furnishing', 'balcony'],
    note: 'Ensure the landlord does not reside in the house',
    matches: '0',
  },
  {
    id: 3,
    size: 'Self Contained apartment',
    location: 'Ikpoba-hill, Benin City',
    price: '800,000',
    move_in_date: '10/10/2023',
    amenities: ['furnishing', 'balcony', 'borehole', 'fencing'],
    note: 'Please check the property for any suspicious activity',
    matches: '5',
  },
]

const items = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        request.value = row
        isOpen.value = true
      },
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        isDeleteOpen.value = true
        request.value = row
      },
    },
  ],
]
</script>
