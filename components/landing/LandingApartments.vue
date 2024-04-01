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
          <!-- for images -->
          <UCarousel
            v-if="listing.media_type === 'image'"
            v-slot="{ item }"
            :items="listing.media"
            :ui="{ item: 'basis-full' }"
            indicators
          >
            <NuxtImg
              :src="item"
              class="object-cover h-72 w-full rounded-t-md"
              draggable="false"
            />
          </UCarousel>
          <!-- for video -->
          <video
            v-else
            :src="listing.media"
            controls
            controlslist="nodownload"
            preload="metadata"
            class="object-cover h-72 w-full rounded-t-md"
          />
          <span
            class="absolute p-4 m-2 font-semibold bg-gray-500/70 text-white rounded-md"
            ><span>&#8358;</span> {{ listing.price }}</span
          >
        </div>
        <div class="flex flex-col p-5">
          <h4 class="font-['Lato'] font-semibold text-lg text-primary">
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
    media: ['/shortlet.png', '/office.png', '/shortlet.png'],
    media_type: 'image',
    price: '2,000,000',
    location: '10 Mayne Avenue, Calabar',
    href: '#',
  },
  {
    name: '2 Bedroom Block of Flats',
    media: '/video.mp4',
    media_type: 'video',
    price: '800,000',
    location: '13 Liberty Street, Benin City',
    href: '#',
  },
  {
    name: 'Studio Apartment in Karu',
    media: ['/office.png', '/shortlet.png'],
    media_type: 'image',
    price: '1,200,000',
    location: '17 Nsikak-Edet Crescent, Sunshine Homes, Lokogoma',
    href: '#',
  },
]
</script>
