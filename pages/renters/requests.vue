<template>
  <div>
    <div class="flex justify-between">
      <DashboardTitle text="Requests" badge-label="10" show-badge />
      <UButton
        v-if="apartments.length < 10"
        icon="i-heroicons-plus-16-solid"
        size="sm"
        color="primary"
        variant="outline"
        label="New request"
        trailing
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
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              v-if="request.id"
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Edit request
            </h3>
            <h3
              v-else
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Create request
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="
                () => {
                  isOpen = false
                  resetForm()
                }
              "
            />
          </div>
        </template>

        <div class="flex flex-col space-y-4">
          <UFormGroup label="Preferred location" name="location">
            <UInputMenu
              v-model="location"
              :loading="loading"
              :search="search"
              trailing
              @change="onSelect(location)"
            />
          </UFormGroup>
          <UFormGroup label="Apartment size" name="size">
            <USelectMenu v-model="size" :options="propertySize" />
          </UFormGroup>
          <UFormGroup label="Price range" name="price">
            <USelectMenu v-model="price" :options="priceRange" />
          </UFormGroup>
          <UFormGroup label="Move-in date" name="move-in">
            <UInput v-model="moveIn" placeholder="dd/mm/yyyy" />
          </UFormGroup>
          <UFormGroup label="Amenities" name="amenities">
            <div class="flex space-x-4 my-1">
              <UCheckbox
                v-model="parking"
                color="primary"
                label="Parking spaces"
                class="w-1/3"
              />
              <UCheckbox
                v-model="pets"
                color="primary"
                label="Pets allowed"
                class="w-1/3"
              />
              <UCheckbox
                v-model="furnishing"
                color="primary"
                label="Furnished"
                class="w-1/3"
              />
            </div>
            <div class="flex space-x-4 my-1">
              <UCheckbox
                v-model="borehole"
                color="primary"
                label="Borehole"
                class="w-1/3"
              />
              <UCheckbox
                v-model="balcony"
                color="primary"
                label="Balcony"
                class="w-1/3"
              />
              <UCheckbox
                v-model="fencing"
                color="primary"
                label="Fenced & gated"
                class="w-1/3"
              />
            </div>
          </UFormGroup>
        </div>
        <template #footer>
          <UButton v-if="request.id" label="Edit" @click="editRequest" />
          <UButton v-else label="Create" @click="createRequest" />
        </template>
      </UCard>
    </UModal>

    <UModal v-model="isDeleteOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Delete request
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isDeleteOpen = false"
            />
          </div>
        </template>

        <p>
          Are you sure you want to delete this request for {{ request.size }} in
          {{ request.location }}?
        </p>

        <template #footer>
          <UButton label="Delete" @click="deleteRequest(request)" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
type PredictionResponse = {
  suggestions: {
    placePrediction: {
      text: {
        text: string
      }
    }
  }[]
}

type Request = {
  id: string
  location: string
  price: string
  moveIn: string
  size: string
  parking: boolean
  pets: boolean
  furnishing: boolean
  borehole: boolean
  balcony: boolean
  fencing: boolean
}

definePageMeta({
  layout: 'dashboard',
})

const location = ref('')
const price = ref('')
const moveIn = ref('')
const size = ref('')
const parking = ref(false)
const pets = ref(false)
const furnishing = ref(false)
const borehole = ref(false)
const balcony = ref(false)
const fencing = ref(false)

const propertySize = [
  'Self Contained',
  'Studio',
  '1 Bedroom',
  '2 Bedroom',
  '3 Bedroom',
  '4 Bedroom',
  '5 Bedroom',
]

const priceRange = [
  '200,000',
  '500,000',
  '1,000,000',
  '2,000,000',
  '3,000,000',
  '5,000,000',
]

const loading = ref(false)
const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_API_KEY

async function search(q: string) {
  loading.value = true

  const searchText = q || location.value || 'Abuja' // use Abuja for initial search query
  const result: PredictionResponse = await $fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: {
        input: searchText,
        includedRegionCodes: ['NG'],
      },
    },
  )
  loading.value = false
  const textValues = result.suggestions
    .map((item) => item.placePrediction.text.text)
    .map((place) => place.replace(/, Nigeria$/, ''))
  return textValues
}

function onSelect(item: any) {
  console.log(item)
}

const isOpen = ref(false)
const isDeleteOpen = ref(false)

const request = ref({}) as Ref<Request>

const updateRequest = (row: any) => {
  const selectedApartment = apartments.find(
    (apartment) => apartment.id === row.id,
  )

  if (selectedApartment) {
    location.value = selectedApartment.location
    price.value = selectedApartment.price
    size.value = selectedApartment.size
    moveIn.value = selectedApartment.move_in_date
    parking.value = selectedApartment.amenities.includes('parking')
    pets.value = selectedApartment.amenities.includes('pets')
    furnishing.value = selectedApartment.amenities.includes('furnishing')
    borehole.value = selectedApartment.amenities.includes('borehole')
    balcony.value = selectedApartment.amenities.includes('balcony')
    fencing.value = selectedApartment.amenities.includes('fencing')
  }
}

const createRequest = () => {
  // Create request
  const requestData = {
    location,
    price,
    moveIn,
    size,
    parking,
    pets,
    furnishing,
    borehole,
    balcony,
    fencing,
  }
  // Update state
  isOpen.value = false
  // Empty form
  resetForm()
  // Create request
  console.log(requestData)
}

const editRequest = () => {
  // Edit request api
  const requestData = {
    location,
    price,
    moveIn,
    size,
    parking,
    pets,
    furnishing,
    borehole,
    balcony,
    fencing,
  }
  // Update state
  isOpen.value = false
  // Empty form
  resetForm()
  console.log(requestData)
}

const resetForm = () => {
  location.value = ''
  price.value = ''
  moveIn.value = ''
  size.value = ''
  parking.value = false
  pets.value = false
  furnishing.value = false
  borehole.value = false
  balcony.value = false
  fencing.value = false
}

const deleteRequest = (request: any) => {
  // delete request
  // update state
  isDeleteOpen.value = false
  request.value = {}
  console.log(request.id)
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
    matches: '3',
  },
  {
    id: 2,
    size: '3 bedroom apartment',
    location: 'Oshodin, Yaba',
    price: '1,000,000',
    move_in_date: '10/10/2024',
    amenities: ['furnishing', 'balcony'],
    matches: '0',
  },
  {
    id: 3,
    size: 'Self Contained apartment',
    location: 'Ikpoba-hill, Benin City',
    price: '800,000',
    move_in_date: '10/10/2023',
    amenities: ['furnishing', 'balcony', 'borehole', 'fencing'],
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
        updateRequest(row)
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
