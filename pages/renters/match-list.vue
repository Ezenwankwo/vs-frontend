<template>
  <div>
    <div class="flex justify-between">
      <DashboardTitle text="Match List" badge-label="10" show-badge />
      <USelect
        v-model="selected"
        icon="i-heroicons-funnel"
        :options="requests"
        placeholder="Filter by requests"
        class="w-1/3"
      />
    </div>
    <p class="text-sm text-gray-500">Apartments that match your requests</p>
    <div class="mt-12">
      <div
        v-if="requests.length < 5 || matches.length === 0"
        class="flex flex-col md:flex-row mt-10 gap-4 rounded-md"
      >
        <div
          v-for="listing in listings"
          :key="listing.slug"
          class="border md:w-1/3 shadow rounded-md"
        >
          <ApartmentList
            :name="listing.name"
            :image="listing.image"
            :video="listing.video"
            :media-type="listing.media_type"
            :price="listing.price"
            :location="listing.location"
            :slug="listing.slug"
          />
        </div>
      </div>
      <UPagination
        :max="5"
        :page-count="5"
        :total="100"
        :model-value="1"
        class="justify-center my-10"
      />
      <div
        v-if="requests.length > 5"
        class="flex flex-col items-center justify-center py-6 gap-3"
      >
        <span class="italic text-sm">You've no requests!</span>
        <UButton
          icon="i-heroicons-plus-16-solid"
          label="Create request"
          trailing
        />
      </div>
      <div
        v-if="requests.length > 5 && matches.length === 0"
        class="flex flex-col items-center justify-center py-6 gap-3"
      >
        <span class="italic text-sm text-center"
          >You've no matches yet! <br />We will notify when you do</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const matches: any = []

const requests = [
  '2 bedroom apartment in karu',
  '3 bedroom apartment in yaba',
  '4 bedroom apartment in ibadan',
  'Self Contained apartment in lagos',
]

const listings = [
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
const selected = ref('')
</script>
