<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3
          v-if="earning.id"
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Edit earning
        </h3>
        <h3
          v-else
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Add earning
        </h3>

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

    <div class="flex flex-col space-y-4">
      <UFormGroup
        label="Source"
        name="source"
        help="Select if the apartment is Vacant Soon or external"
      >
        <USelectMenu v-model="earningForm.source" :options="sources" />
      </UFormGroup>
      <UFormGroup
        v-if="earningForm.source === 'Vacant Soon'"
        label="Select listing"
        name="listing"
      >
        <USelectMenu
          v-model="earningForm.listing"
          searchable
          :options="listings"
        />
      </UFormGroup>
      <div
        v-if="earningForm.source === 'External'"
        class="flex flex-col space-y-4"
      >
        <UFormGroup label="Apartment type" name="type">
          <USelectMenu
            v-model="earningForm.apartmentType"
            :options="apartmentTypes"
          />
        </UFormGroup>
        <UFormGroup label="Location" name="location">
          <UInputMenu
            v-model="earningForm.location"
            :loading="loading"
            :search="search"
            trailing
            @change="onSelect(earningForm.location)"
          />
        </UFormGroup>
      </div>
      <div class="flex space-x-4">
        <UFormGroup label="Rent price" name="rent">
          <UInput
            v-model="earningForm.rentPrice"
            icon="i-tabler-currency-naira"
          />
        </UFormGroup>
        <UFormGroup label="Agency fee" name="fee">
          <UInput
            v-model="earningForm.agencyFee"
            icon="i-tabler-currency-naira"
          />
        </UFormGroup>
      </div>
      <UFormGroup label="Date" name="date">
        <UInput v-model="earningForm.date" placeholder="dd/mm/yyyy" />
      </UFormGroup>
      <UFormGroup label="Additional note" name="note">
        <UTextarea v-model="earningForm.note" />
      </UFormGroup>
    </div>
    <template #footer>
      <UButton v-if="props.earning.id" label="Edit" @click="editEarning" />
      <UButton v-else label="Add" @click="createEarning" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  earning: {
    type: Object,
    default: () => ({
      apartmentType: '',
      source: '',
      listing: '',
      location: '',
      rentPrice: '',
      agencyFee: '',
      date: '',
      note: '',
    }),
  },
})

const emit = defineEmits(['close'])

const earningForm = reactive({
  apartmentType: '',
  source: '',
  listing: '',
  location: '',
  rentPrice: '',
  agencyFee: '',
  date: '',
  note: '',
})

const currentApartmentType = computed(() => props.earning.apartmentType || '')
earningForm.apartmentType = currentApartmentType.value

const currentSource = computed(() => props.earning.source || '')
earningForm.source = currentSource.value

const currentListing = computed(() => props.earning.listing || '')
earningForm.listing = currentListing.value

const currentLocation = computed(() => props.earning.location || '')
earningForm.location = currentLocation.value

const currentRentPrice = computed(() => props.earning.rentPrice || '')
earningForm.rentPrice = currentRentPrice.value

const currentAgencyFee = computed(() => props.earning.agencyFee || '')
earningForm.agencyFee = currentAgencyFee.value

const currentDate = computed(() => props.earning.date || '')
earningForm.date = currentDate.value

const currentNote = computed(() => props.earning.note || '')
earningForm.note = currentNote.value

const loading = ref(false)

const apartmentTypes = [
  'Self Contained',
  'Studio',
  '1 Bedroom',
  '2 Bedroom',
  '3 Bedroom',
  '4 Bedroom',
  '5 Bedroom',
]
const sources = ['Vacant Soon', 'External']
const listings = [
  'Self-contained in Karu',
  '2 bedrooms at Ikpoba-hill',
  '1 bedroom at Oshodin',
]

function resetForm() {
  Object.assign(earningForm, {
    apartmentType: '',
    source: '',
    listing: '',
    location: '',
    rentPrice: '',
    agencyFee: '',
    date: '',
    note: '',
  })
  emit('close')
}
async function search(q: string) {
  loading.value = true
  const searchText = q || earningForm.location.value || 'Abuja' // use Abuja for initial search query
  const result = await useLocation(searchText)
  loading.value = false
  return result
}
function onSelect(item: any) {
  console.log(item)
}
function editEarning() {
  // call edit earning api
  resetForm()
  console.log('edit')
}
function createEarning() {
  // call create earning api
  resetForm()
  console.log('create')
}
</script>
