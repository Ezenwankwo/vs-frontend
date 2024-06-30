<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      header: { background: 'bg-primary-100/50' },
      footer: { base: '' },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Icon
            name="i-heroicons-home-modern"
            class="text-primary-700 text-xl"
          />
          <h3
            v-if="request.id"
            class="text-base font-medium leading-6 text-gray-700 dark:text-white"
          >
            Edit Request
          </h3>
          <h3
            v-else
            class="text-base font-medium leading-6 text-gray-700 dark:text-white"
          >
            Create Request
          </h3>
        </div>

        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="
            () => {
              resetForm()
            }
          "
        />
      </div>
    </template>

    <div class="flex flex-col space-y-4 min-h-[calc(100vh-170px)]">
      <UFormGroup label="Preferred location" name="location">
        <UInputMenu
          v-model="location"
          :loading="loading"
          :search="search"
          trailing
          @change="onSelect(location)"
        />
      </UFormGroup>
      <UFormGroup label="Apartment size" name="size">
        <USelectMenu v-model="size" :options="propertySize" />
      </UFormGroup>
      <div class="flex justify-between space-x-4">
        <UFormGroup label="Min rent price" name="min-price" class="w-1/2">
          <USelectMenu
            v-model="minPrice"
            icon="i-tabler-currency-naira"
            :options="minPriceRange"
          />
        </UFormGroup>
        <UFormGroup label="Max rent price" name="max-price" class="w-1/2">
          <USelectMenu
            v-model="maxPrice"
            icon="i-tabler-currency-naira"
            :options="maxPriceRange"
          />
        </UFormGroup>
      </div>
      <UFormGroup label="Move-in date" name="move-in">
        <UInput v-model="moveIn" placeholder="dd/mm/yyyy" />
      </UFormGroup>
      <UFormGroup label="Amenities" name="amenities">
        <div class="flex space-x-4 mb-1">
          <UCheckbox
            v-model="fencing"
            color="primary"
            label="Fenced & gated"
            class="w-1/2"
          />
          <UCheckbox
            v-model="parking"
            color="primary"
            label="Parking spaces"
            class="w-1/2"
          />
        </div>
        <div class="flex space-x-4 mb-1">
          <UCheckbox
            v-model="borehole"
            color="primary"
            label="Water supply"
            class="w-1/2"
          />
          <UCheckbox
            v-model="furnishing"
            color="primary"
            label="Furnished"
            class="w-1/2"
          />
        </div>
        <div class="flex space-x-4 mt-1">
          <UCheckbox
            v-model="balcony"
            color="primary"
            label="Balcony"
            class="w-1/2"
          />
          <UCheckbox
            v-model="pets"
            color="primary"
            label="Pets allowed"
            class="w-1/2"
          />
        </div>
      </UFormGroup>
      <UFormGroup label="Additional note" name="note">
        <UTextarea v-model="note" />
      </UFormGroup>
    </div>
    <template #footer>
      <UButton
        v-if="props.request.id"
        :loading="loading"
        label="Edit"
        @click="editRequest"
      />
      <UButton
        v-else
        :loading="loading"
        label="Create"
        @click="createRequest"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  request: {
    type: Object,
    default: () => ({
      location: '',
      minPrice: '',
      maxPrice: '',
      moveIn: '',
      size: '',
      note: '',
      parking: false,
      pets: false,
      furnishing: false,
      borehole: false,
      balcony: false,
      fencing: false,
    }),
  },
})

const loading = ref(false)

const location = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const moveIn = ref('')
const size = ref('')
const note = ref('')
const parking = ref(false)
const pets = ref(false)
const furnishing = ref(false)
const borehole = ref(false)
const balcony = ref(false)
const fencing = ref(false)

const currentLocation = computed(() => props.request.location || '')
location.value = currentLocation.value

const currentMinPrice = computed(() => props.request.minPrice || '')
minPrice.value = currentMinPrice.value

const currentMaxPrice = computed(() => props.request.maxPrice || '')
maxPrice.value = currentMaxPrice.value

const currentMoveInDate = computed(() => props.request.move_in_date || '')
moveIn.value = currentMoveInDate.value

const currentSize = computed(() => props.request.size || '')
size.value = currentSize.value

const currentParking = computed(
  () => props.request.amenities?.includes('parking') ?? false,
)
parking.value = currentParking.value

const currentPets = computed(
  () => props.request.amenities?.includes('pets') ?? false,
)
pets.value = currentPets.value

const currentFurnishing = computed(
  () => props.request.amenities?.includes('furnishing') ?? false,
)
furnishing.value = currentFurnishing.value

const currentBorehole = computed(
  () => props.request.amenities?.includes('borehole') ?? false,
)
borehole.value = currentBorehole.value

const currentBalcony = computed(
  () => props.request.amenities?.includes('balcony') ?? false,
)
balcony.value = currentBalcony.value

const currentFencing = computed(
  () => props.request.amenities?.includes('fencing') ?? false,
)
fencing.value = currentFencing.value

const currentNote = computed(() => props.request.note || '')
note.value = currentNote.value

const emit = defineEmits(['close'])

const propertySize = [
  'Self Contained',
  'Studio',
  '1 Bedroom',
  '2 Bedroom',
  '3 Bedroom',
  '4 Bedroom',
  '5 Bedroom',
]

const minPriceRange = [
  '100,000',
  '200,000',
  '500,000',
  '1,000,000',
  '2,000,000',
  '3,000,000',
  '5,000,000',
]

const maxPriceRange = [
  '200,000',
  '500,000',
  '1,000,000',
  '2,000,000',
  '3,000,000',
  '5,000,000',
  '10,000,000',
]

async function search(q: string) {
  loading.value = true
  const searchText = q || location.value || 'Abuja' // use Abuja for initial search query
  const result = await useLocation(searchText)
  loading.value = false
  return result
}

function onSelect(item: any) {
  console.log(item)
}

const resetForm = () => {
  location.value = ''
  minPrice.value = ''
  maxPrice.value = ''
  moveIn.value = ''
  size.value = ''
  parking.value = false
  pets.value = false
  furnishing.value = false
  borehole.value = false
  balcony.value = false
  fencing.value = false
  emit('close')
}

function editRequest() {
  loading.value = true
  // Edit request api
  const requestData = {
    location,
    minPrice,
    maxPrice,
    moveIn,
    size,
    parking,
    pets,
    furnishing,
    borehole,
    balcony,
    fencing,
  }
  // Update state
  emit('close')
  // Empty form
  resetForm()
  console.log(requestData)
}

function createRequest() {
  loading.value = true
  // Create request
  const requestData = {
    location,
    minPrice,
    maxPrice,
    moveIn,
    size,
    parking,
    pets,
    furnishing,
    borehole,
    balcony,
    fencing,
  }
  // Update state
  emit('close')
  // Empty form
  resetForm()
  // Create request
  console.log(requestData)
}
</script>
