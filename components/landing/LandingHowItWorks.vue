<template>
  <UContainer class="py-24">
    <SharedSectionTitle text="You should know how it works" />
    <p class="mt-6 text-xl text-center text-gray-600 dark:text-gray-300">
      The process is seamless
    </p>
    <div
      v-for="step in rentSteps"
      :key="step.id"
      class="flex justify-between mt-20"
    >
      <div class="hidden md:block md:w-2/5">
        <img :src="step.image" class="mt-10" alt="search image" />
      </div>
      <div class="flex flex-col md:w-3/5 my-auto">
        <div class="flex">
          <span
            class="text-3xl font-bold p-5 rounded-full bg-primary-100 dark:text-gray-700"
            >{{ step.id }}</span
          >
          <h3
            class="text-2xl font-['Lato'] ml-5 my-auto font-semibold text-gray-700 dark:text-white sm:text-3xl"
          >
            {{ step.name }}
          </h3>
        </div>
        <img :src="step.image" class="md:hidden mt-10" alt="search image" />
        <p class="mt-10 text-lg items-center text-gray-600 dark:text-gray-300">
          {{ step.description }}
        </p>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const rentSteps = [
  {
    id: '01',
    name: 'List your apartment',
    description: `List your vacant or soon-to-be-vacant apartment.
            If you do not have an apartment to list, you can pay a fee to access the platform.`,
    image: '/payment.svg',
  },
  {
    id: '02',
    name: 'Search for apartment',
    description: `Search for your ideal apartment with ease. We provide 
            detailed apartment and neighbourhood descriptions that will 
            guide you in making the perfect choice.`,
    image: '/search.svg',
  },
  {
    id: '03',
    name: 'Connect with occupant or owner',
    description: `Connect with the current occupant or landlord to clear up any issues.
            This ensures you have correct knowledge of the property.`,
    image: '/connect.svg',
  },
  {
    id: '04',
    name: ' Inspect property and pay',
    description: `If you are satisfied with the terms, you can schedule a physical 
            inspection to ensure that everything is in order and then proceed to make payment.`,
    image: '/inspect.svg',
  },
]
</script>
