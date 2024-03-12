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
            class="text-2xl ml-5 my-auto font-semibold text-gray-700 dark:text-white sm:text-3xl"
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
    name: 'Search & choose',
    description: `Search for your ideal apartment with ease. 
			We provide detailed apartment and neighbourhood descriptions that will
			guide you in making the perfect choice.`,
    image: '/search.svg',
  },
  {
    id: '02',
    name: 'Connect with property owner',
    description: `Once you have found your desired property, 
            you will fill out an application to the property owner. The owner will
			review your details and either accept or decline your request.`,
    image: '/connect.svg',
  },
  {
    id: '03',
    name: ' Inspect property',
    description: `If the owner accepts your application, 
            you can schedule a physical inspection to ensure that everything is in order.`,
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
