<template>
  <UContainer class="bg-primary-200 py-4 lg:py-2 lg:mt-6 md:rounded-full">
    <div class="hidden lg:flex space-x-2">
      <UInput
        v-model="q"
        trailing
        icon="i-heroicons-magnifying-glass-20-solid"
        name="q"
        placeholder="Where do you want to live?"
        size="xl"
        color="gray"
        class="w-4/12"
      />
      <USelectMenu
        v-model="propertyType"
        size="xl"
        :options="propertyTypeList"
        class="w-2/12"
      />
      <USelectMenu
        v-model="maxPrice"
        size="xl"
        :options="maxPriceList"
        class="w-2/12"
      />
      <USelectMenu
        v-model="numRooms"
        size="xl"
        :options="numRoomsList"
        :ui="{ rounded: 'rounded-full' }"
        class="w-2/12"
      />
      <UButton
        label="All Filters"
        trailing
        icon="i-heroicons-adjustments-horizontal"
        variant="soft"
        color="gray"
        class="rounded-full justify-center px-4 py-1 w-2/12"
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
      <div class="flex justify-between space-x-1">
        <USelectMenu
          v-model="propertyType"
          size="xl"
          class="w-2/5"
          :options="propertyTypeList"
        />
        <USelectMenu
          v-model="maxPrice"
          size="xl"
          class="w-2/5"
          :options="maxPriceList"
        />
        <!-- <USelectMenu
        v-model="numRooms"
        size="lg"
        :options="numRoomsList"
        :ui="{ rounded: 'rounded-full' }"
        class="w-1/3"
      /> -->
        <UButton
          icon="i-heroicons-adjustments-horizontal"
          variant="soft"
          class="justify-center w-1/5"
          @click="isOpen = true"
        />
      </div>
    </div>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <!-- <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template> -->
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const propertyTypeList = ['Residential', 'Commercial', 'Shortlet']
const maxPriceList = [
  '200,000',
  '500,000',
  '1,000,000',
  '2,000,000',
  '3,000,000',
  '5,000,000',
  '7,000,000',
  '10,000,000',
]
const numRoomsList = [
  'Self Contained',
  '1 Bedroom',
  '2 Bedrooms',
  '3 Bedrooms',
  '4 Bedrooms',
  '5+ Bedrooms',
]

const q = ref('')
const propertyType = ref('Property Type')
const maxPrice = ref('Max Price')
const numRooms = ref('No of Bedrooms')
</script>
