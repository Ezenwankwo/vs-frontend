<template>
  <UContainer class="bg-gray-400/50 py-6 lg:py-4 lg:mt-6 shadow">
    <div class="hidden lg:flex space-x-2">
      <UInput
        v-model="q"
        trailing
        icon="i-heroicons-magnifying-glass-20-solid"
        name="q"
        placeholder="Where do you want to live?"
        size="xl"
        class="w-4/12"
      />
      <USelectMenu
        v-model="filter.propertyType"
        size="xl"
        placeholder="Property Type"
        :options="propertyTypeList"
        class="w-2/12"
      />
      <USelectMenu
        v-model="filter.maxPrice"
        size="xl"
        placeholder="Max Price"
        :options="priceList"
        class="w-2/12"
      />
      <USelectMenu
        v-model="filter.numRooms"
        size="xl"
        placeholder="No of Rooms"
        :options="numRoomsList"
        class="w-2/12"
      />
      <UButton
        label="All Filters"
        trailing
        icon="i-heroicons-adjustments-horizontal"
        variant="soft"
        class="justify-center px-4 py-1 w-2/12"
        @click="isOpen = true"
      />
    </div>
    <div class="lg:hidden flex flex-col space-y-2">
      <UInput
        v-model="q"
        trailing
        icon="i-heroicons-magnifying-glass-20-solid"
        name="q"
        placeholder="Where do you want to live?"
        size="xl"
        color="gray"
        class="w-full"
      />
      <div class="flex space-x-1">
        <USelectMenu
          v-model="filter.propertyType"
          size="xl"
          placeholder="Property Type"
          class="w-2/5"
          :options="propertyTypeList"
        />
        <USelectMenu
          v-model="filter.maxPrice"
          size="xl"
          placeholder="Max Price"
          class="w-2/5"
          :options="priceList"
        />
        <UButton
          icon="i-heroicons-adjustments-horizontal"
          variant="soft"
          class="justify-center grow"
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
          <div class="flex justify-between">
            <h3 class="font-['Lato']">All Filters</h3>
            <span class="cursor-pointer text-primary" @click="isOpen = false"
              >close</span
            >
          </div>
        </template>
        <div class="flex flex-col space-y-8">
          <div class="flex space-x-4">
            <USelectMenu
              v-model="filter.propertyType"
              size="xl"
              placeholder="Property Type"
              :options="propertyTypeList"
              class="flex-initial w-1/2"
            />
            <USelectMenu
              v-model="filter.availability"
              size="xl"
              placeholder="Availability"
              :options="avalabilityList"
              class="flex-initial w-1/2"
            />
          </div>
          <div class="flex space-x-4">
            <USelectMenu
              v-model="filter.minPrice"
              size="xl"
              placeholder="Min Price"
              :options="priceList"
              class="w-1/2"
            />
            <USelectMenu
              v-model="filter.maxPrice"
              size="xl"
              placeholder="Max Price"
              :options="priceList"
              class="w-1/2"
            />
          </div>
          <div class="flex space-x-4">
            <USelectMenu
              v-model="filter.numRooms"
              size="xl"
              placeholder="No Rooms"
              :options="numRoomsList"
              class="w-1/2"
            />
            <USelectMenu
              v-model="filter.numBathrooms"
              size="xl"
              placeholder="No Bathrooms"
              :options="numBathroomsList"
              class="w-1/2"
            />
          </div>
          <div class="flex space-x-4">
            <USelectMenu
              v-model="filter.rentPayment"
              size="xl"
              placeholder="Rent Payment"
              :options="rentPaymentList"
              class="w-1/2"
            />
            <USelectMenu
              v-model="filter.petPolicy"
              size="xl"
              placeholder="Pet Policy"
              :options="petPolicyList"
              class="w-1/2"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-gray-500" @click="clearFilters">Clear</span>
            <div class="space-x-2">
              <UButton label="Save" variant="outline" class="px-6 py-3" />
              <UButton label="Apply" class="px-6 py-3" @click="applyFilters" />
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const propertyTypeList = ['Residential', 'Commercial', 'Shortlet']
const priceList = [
  '200,000',
  '500,000',
  '1,000,000',
  '2,000,000',
  '3,000,000',
  '5,000,000',
]
const numRoomsList = [
  'Self Contained',
  '1 Bedroom',
  '2 Bedrooms',
  '3 Bedrooms',
  '4 Bedrooms',
  '5+ Bedrooms',
]

const avalabilityList = ['Available', 'Vacant Soon']

const numBathroomsList = [
  'Shared Bathroom',
  '1 Bathroom',
  '2 Bathrooms',
  '3 Bathrooms',
  '4 Bathrooms',
  '5+ Bathrooms',
]

const rentPaymentList = ['Monthly', 'Quarterly', 'Yearly']
const petPolicyList = ['Yes', 'No']

const isOpen = ref(false)
const q = ref('')

const filter = reactive({
  propertyType: '',
  availability: '',
  maxPrice: '',
  minPrice: '',
  numRooms: '',
  numBathrooms: '',
  rentPayment: '',
  petPolicy: '',
})

const applyFilters = () => {
  isOpen.value = false
}

const clearFilters = () => {
  // set all filter values to empty
  filter.propertyType = ''
  filter.availability = ''
  filter.maxPrice = ''
  filter.minPrice = ''
  filter.numRooms = ''
  filter.numBathrooms = ''
  filter.rentPayment = ''
  filter.petPolicy = ''
}
</script>
