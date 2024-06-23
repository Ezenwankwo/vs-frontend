<template>
  <div>
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: {
          padding: '',
          base: 'divide-y divide-gray-200 dark:divide-gray-700',
        },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <div class="flex justify-between">
          <DashboardTitle text="Listings" badge-label="10" show-badge />
        </div>
        <p class="text-sm text-gray-500">Apartments you have listed</p>
      </template>
      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..."
        />

        <USelectMenu
          v-model="selectedStatus"
          :options="listingStatus"
          multiple
          placeholder="Status"
          class="w-40"
        />
      </div>
      <div>
        <div
          v-if="numListings === 5"
          class="flex flex-col md:flex-row gap-4 rounded-md p-4"
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

        <div
          v-if="numListings < 5"
          class="flex flex-col items-center justify-center py-6 gap-3"
        >
          <span class="italic text-sm text-center"
            >You've not listed any vacant or soon to be vacant apartments!
            <br />List apartments here.</span
          >
        </div>
      </div>
      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <div>
            <span class="text-sm leading-5">
              Showing
              <span class="font-medium">{{ pageFrom }}</span>
              to
              <span class="font-medium">{{ pageTo }}</span>
              of
              <span class="font-medium">{{ pageTotal }}</span>
              results
            </span>
          </div>

          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="pageTotal"
            :ui="{
              wrapper: 'flex items-center gap-1',
              default: {
                activeButton: {
                  variant: 'outline',
                },
              },
            }"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value),
)

//   const listings: any = []

// const status = ['Vacant', 'Soon to be vacant', 'Occupied']

const numListings = ref(5)

// const selected = ref('')

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

const search = ref('')
const selectedStatus = ref<{ value: string }[]>([])

const listingStatus = [
  {
    key: 'vacant',
    label: 'Vacant',
    value: false,
  },
  {
    key: 'soon-to-be-vacant',
    label: 'Soon to be vacant',
    value: true,
  },

  {
    key: 'occupied',
    label: 'Occupied',
    value: true,
  },
]
</script>
