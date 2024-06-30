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
          <DashboardTitle text="Match List" badge-label="10" show-badge />
        </div>
        <p class="text-sm text-gray-500">Apartments that match your requests</p>
      </template>

      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <USelectMenu
          v-model="selectedRequest"
          searchable
          :options="requests"
          icon="i-heroicons-funnel"
          placeholder="Filter by requests"
          value-attribute="id"
          option-attribute="size"
          class="w-60"
        />

        <USelectMenu
          v-model="selectedStatus"
          :options="availabilityStatus"
          placeholder="Availability"
          class="w-40"
        />
      </div>
      <div class="min-h-[440px]">
        <div
          v-if="listings.length > 0"
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

        <div v-if="listings.length === 0 && requests.length > 0">
          <DashboardEmptyState
            main-text="No apartments yet"
            sub-text="We will notify you when we find matches"
            :show-button="false"
          />
        </div>

        <div v-if="requests.length === 0">
          <DashboardEmptyState
            main-text="No apartments yet"
            sub-text="You need to create a request"
            @open-form="isOpen = true"
          />
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

    <!-- <! Add request modal> -->
    <div>
      <USlideover v-model="isOpen" prevent-close>
        <ApartmentRequestForm @close="isOpen = false" />
      </USlideover>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const isOpen = ref(false)

const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value),
)

const listings: Apartment[] = [
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

const selectedStatus = ref('')

const availabilityStatus = [
  {
    id: 'vacant',
    label: 'Vacant',
  },

  {
    id: 'vacant-soon',
    label: 'Vacant Soon',
  },
]

const requests: ApartmentRequest[] = [
  {
    id: 1,
    size: '2 bedroom flat',
    location: 'Karu, Abuja',
    minPrice: '1,000,000',
    maxPrice: '2,000,000',
    move_in_date: '10/10/2022',
    amenities: ['parking', 'furnishing', 'balcony'],
    note: 'Please check the property for any suspicious activity',
    matches: 3,
    status: 'Open',
    date: '10 Oct, 22',
    slug: '2-bedroom-in-karu-abuja',
  },
  {
    id: 2,
    size: '3 bedroom flat',
    location: 'Oshodin, Yaba',
    minPrice: '500,000',
    maxPrice: '1,000,000',
    move_in_date: '10/10/2024',
    amenities: ['furnishing', 'balcony'],
    note: 'Ensure the landlord does not reside in the house',
    matches: 0,
    status: 'Closed',
    date: '1 May, 24',
    slug: '3-bedroom-in-oshodin-yaba',
  },
]

const selectedRequest = ref('')
</script>
