<template>
  <UContainer class="py-24">
    <SharedSectionTitle text="Apartments for every need" />
    <p class="mt-6 text-xl text-center text-gray-600 dark:text-gray-300">
      Explore our options
    </p>
    <div class="flex flex-col md:flex-row justify-between mt-20 gap-8">
      <ULink
        v-for="apartment in apartmentTypes"
        :key="apartment.name"
        :to="apartment.href"
        :class="apartment.image"
        class="relative md:w-1/3 bg-cover h-96 rounded-xl shadow"
      >
        <div class="absolute bottom-5 bg-gray-500/80 mx-5 p-5 rounded">
          <h3
            class="text-2xl font-['Lato'] font-semibold text-white dark:text-white sm:text-3xl"
          >
            {{ apartment.name }}
          </h3>
          <p class="mt-5 text-white dark:text-white">
            {{ apartment.description }}
          </p>
        </div>
      </ULink>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const apartmentTypes = [
  {
    name: 'Residential',
    image: "bg-[url('~/assets/images/residential.png')]",
    description: `Find apartments perfect for families, professionals, 
      or anyone looking to call a place home`,
    href: '#',
  },
  {
    name: 'Commercial',
    image: "bg-[url('~/assets/images/office.png')]",
    description: `Browse office spaces, shops, warehouses, and other commercial 
      properties designed to help your business flourish. `,
    href: '#',
  },
  {
    name: 'Shortlet',
    image: "bg-[url('~/assets/images/shortlet.png')]",
    description: `Your temporary haven awaits! Discover fully furnished apartments
      perfect for short stays, vacations, or business trips.`,
    href: '#',
  },
]
</script>
