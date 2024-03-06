<template>
  <UContainer class="py-24">
    <h2
      class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
    >
      Discover the most suitable apartments
    </h2>
    <p class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
      Getting you an apartment that suits your lifestyle in the most
      <br />seamless way is our super power.
    </p>
    <div class="flex justify-between py-10">
      <div
        v-for="apartment in apartmentTypes"
        :key="apartment.name"
        class="relative col-span-1 bg-[url('~/assets/images/homes.png')] h-[480px] w-[367px] p-10 rounded-3xl"
      >
        <ULink :to="apartment.href" class="absolute bottom-10 mx-auto">
          <h3
            class="text-2xl font-semibold tracking-tight text-white dark:text-white sm:text-3xl"
          >
            {{ apartment.name }}
          </h3>
          <p class="mt-8 text-white dark:text-white">
            {{ apartment.description }}
          </p>
        </ULink>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const apartmentTypes = [
  {
    name: 'Residential',
    description: `Find your perfect fit for long stays! Settle into apartments
        perfect for families, professionals, or anyone looking to call a place home`,
    href: '#',
  },
  {
    name: 'Commercial',
    description: `Your business needs a space to thrive! Browse office spaces, shops,
            warehouses, and other commercial properties designed to help your business flourish. `,
    href: '#',
  },
  {
    name: 'Shortlet',
    description: `Your temporary haven awaits! Discover fully furnished apartments
      perfect for short stays, vacations, or business trips.`,
    href: '#',
  },
]
</script>
