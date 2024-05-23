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
    name: 'Tell us what you need',
    description: `We will show you options that match your request.
      As new options are added, we will keep you updated.`,
    image: '/payment.svg',
  },
  {
    id: '02',
    name: 'List your apartment',
    description: `Vacant Soon source apartments by allowing
      renters and property owners to list their vacant or soon to be vacant apartments.`,
    image: '/search.svg',
  },
  {
    id: '03',
    name: 'Make your choice',
    description: `Select the apartment that best fits your needs.
      We will provide more information & organize virtual or 
      physical inspection if you need it.`,
    image: '/connect.svg',
  },
  {
    id: '04',
    name: 'Connect with property owner/manager',
    description: `We connect you to the property owner/manager, so you can proceed to sign
      the renter agreement and pay. We charge a 1% agency fee.`,
    image: '/inspect.svg',
  },
]
</script>
