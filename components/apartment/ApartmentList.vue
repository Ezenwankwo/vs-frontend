<template>
  <div class="flex flex-col md:flex-row mt-10 gap-6 rounded-md">
    <ULink
      v-for="listing in sampleListings"
      :key="listing.name"
      :to="`/apartments/${listing.slug}/`"
      class="border md:w-1/3 shadow rounded-md"
    >
      <div class="flex">
        <!-- for images -->
        <UCarousel
          v-if="listing.media_type === 'image'"
          v-slot="{ item }"
          :items="listing.image"
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
          :src="listing.video"
          controls
          controlslist="nodownload"
          preload="metadata"
          class="object-cover h-72 w-full rounded-t-md"
        />
        <span
          class="absolute p-3 m-2 font-semibold bg-gray-500/70 text-white rounded-md"
          ><span>&#8358;</span> {{ listing.price }}</span
        >
      </div>
      <div class="flex flex-col p-3">
        <h4 class="font-['Lato'] font-medium text-lg text-primary">
          {{ listing.name }}
        </h4>
        <span class="text-gray-700">{{ listing.location }}</span>
      </div>
    </ULink>
  </div>
</template>

<script setup lang="ts">
const sampleListings = [
  {
    name: 'Studio Apartment in Karu',
    image: ['/shortlet.png', '/office.png', '/shortlet.png'],
    video: '',
    media_type: 'image',
    price: '2,000,000',
    location: '10 Mayne Avenue, Calabar',
    slug: 'studio-apartment-in-karu',
  },
  {
    name: '2 Bedroom Block of Flats',
    image: [],
    video: '/video.mp4',
    media_type: 'video',
    price: '800,000',
    location: '13 Liberty Street, Benin City',
    slug: '2-bedroom-block-of-flats',
  },
  {
    name: 'Studio Apartment in Karu',
    image: ['/office.png', '/shortlet.png'],
    video: '',
    media_type: 'image',
    price: '1,200,000',
    location: '17 Nsikak-Edet Crescent, Sunshine Homes, Lokogoma',
    slug: 'studio-apartment-in-karu',
  },
]
</script>
