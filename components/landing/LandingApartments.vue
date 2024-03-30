<template>
  <UContainer class="py-24">
    <SharedSectionTitle text="Explore our properties" />
    <div class="flex flex-col md:flex-row mt-20 gap-8">
      <ULink
        v-for="listing in sampleListings"
        :key="listing.name"
        :to="listing.href"
        class="border rounded-xl md:w-1/3 shadow"
      >
        <div class="flex">
          <NuxtImg
            :src="listing.image"
            class="object-cover rounded-t-xl h-72 w-full"
            alt="apartment listing"
          />
          <span
            class="absolute p-4 m-2 font-semibold bg-gray-500/70 text-white rounded"
            ><span>&#8358;</span> {{ listing.price }}</span
          >
        </div>
        <div class="flex flex-col p-5">
          <h4 class="font-['Lato'] font-semibold text-lg text-primary-700">
            {{ listing.name }}
          </h4>
          <span class="font-light">{{ listing.location }}</span>
        </div>
      </ULink>
    </div>
    <UButton
      label="Explore more properties"
      to="/apartments"
      variant="outline"
      color="primary"
      class="mt-10 px-6 py-3"
    >
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" />
      </template>
    </UButton>
  </UContainer>
</template>

<script setup lang="ts">
const sampleListings = [
  {
    name: 'Studio Apartment in Karu',
    image: '/shortlet.png',
    price: '2,000,000',
    location: '10 Mayne Avenue, Calabar',
    href: '#',
  },
  {
    name: '2 Bedroom Block of Flats',
    image: '/office.png',
    price: '800,000',
    location: '13 Liberty Street, Benin City',
    href: '#',
  },
  {
    name: 'Studio Apartment in Karu',
    image: '/shortlet.png',
    price: '1,200,000',
    location: '17 Nsikak-Edet Crescent, Sunshine Homes, Lokogoma',
    href: '#',
  },
]
</script>
