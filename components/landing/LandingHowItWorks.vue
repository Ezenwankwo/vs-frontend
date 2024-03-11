<template>
  <UContainer class="py-24">
    <h2
      class="text-3xl text-center font-bold tracking-tight text-gray-700 dark:text-white sm:text-5xl"
    >
      You should know how it works
    </h2>
    <p
      class="mt-6 text-xl text-center tracking-tight text-gray-600 dark:text-gray-300"
    >
      The process is seamless
    </p>
    <div
      v-for="step in rentSteps"
      :key="step.id"
      class="flex justify-between mt-20"
    >
      <div class="w-2/5">
        <img :src="step.image" class="mt-10" alt="search image" />
      </div>
      <div class="w-3/5 my-auto">
        <div class="flex">
          <span
            class="text-5xl font-bold p-5 rounded-full bg-primary-100 dark:text-gray-700"
            >{{ step.id }}</span
          >
          <h3
            class="text-2xl ml-5 my-auto font-semibold text-gray-700 dark:text-white sm:text-3xl"
          >
            {{ step.name }}
          </h3>
        </div>
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
    name: 'Search & choose',
    description: `Search for your ideal property with ease thorough our virtual 
            tour videos, detailed home and neighbourhood descriptions. Let our 
            comprehensive resources guide you in making the perfect decision for your next home.`,
    image: '/search.svg',
  },
  {
    id: '02',
    name: 'Connect with property owner',
    description: `Once you have found your desired property, 
            you will be directly linked with the property owner for more inquiries and negotiations.
            Note that we charge a fee to connect with the owner.`,
    image: '/connect.svg',
  },
  {
    id: '03',
    name: ' Inspect property',
    description: `Once you have connected with the property owner, 
            you will be able to visit the property and make an offer on your desired terms.`,
    image: '/inspect.svg',
  },
  {
    id: '04',
    name: 'Make payment, get your keys',
    description: `If you are satisfied with the property and the terms of rent
            agreement, you can make the payment and get your keys.`,
    image: '/payment.svg',
  },
]
</script>
