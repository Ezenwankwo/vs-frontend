<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h3
          class="text-base font-['Lato'] font-semibold leading-6 text-gray-700 dark:text-white"
        >
          Add apartment
        </h3>
      </div>
      <UBreadcrumb
        :links="links"
        :divider="null"
        :ui="{ ol: 'gap-x-3' }"
        class="mt-2"
      >
        <template #icon="{ link, index, isActive }">
          <UAvatar
            :alt="(index + 1).toString()"
            :ui="{
              background: isActive
                ? 'bg-primary-500 dark:bg-primary-400'
                : undefined,
              placeholder: isActive
                ? 'text-white dark:text-gray-900'
                : !!link.to
                ? 'group-hover:text-gray-700 dark:group-hover:text-gray-200'
                : '',
            }"
            size="xs"
          />
        </template>
      </UBreadcrumb>
    </template>

    <div v-if="addApartmentSteps === 1" class="flex flex-col space-y-4">
      <UFormGroup label="Apartment type" name="type">
        <USelectMenu v-model="type" :options="apartmentType" />
      </UFormGroup>
      <UFormGroup
        label="Location"
        name="location"
        help="Provide neighborhood and city"
      >
        <UInputMenu
          v-model="location"
          :loading="loading"
          :search="search"
          trailing
          @change="onSelect(location)"
        />
      </UFormGroup>
      <URadioGroup
        v-model="availability"
        legend="Availability"
        :options="availabilityOptions"
      />
      <UFormGroup
        v-if="availability === 'Soon to be vacant'"
        label="Move-out date"
        name="move-out"
      >
        <UInput v-model="moveOut" placeholder="dd/mm/yyyy" />
      </UFormGroup>
      <UFormGroup label="Amenities" name="amenities">
        <div class="flex space-x-4 my-1">
          <UCheckbox
            v-model="parking"
            color="primary"
            label="Parking spaces"
            class="w-1/3"
          />
          <UCheckbox
            v-model="pets"
            color="primary"
            label="Pets allowed"
            class="w-1/3"
          />
          <UCheckbox
            v-model="furnishing"
            color="primary"
            label="Furnished"
            class="w-1/3"
          />
        </div>
        <div class="flex space-x-4 my-1">
          <UCheckbox
            v-model="borehole"
            color="primary"
            label="Borehole"
            class="w-1/3"
          />
          <UCheckbox
            v-model="balcony"
            color="primary"
            label="Balcony"
            class="w-1/3"
          />
          <UCheckbox
            v-model="fencing"
            color="primary"
            label="Fenced & gated"
            class="w-1/3"
          />
        </div>
      </UFormGroup>
      <UFormGroup label="Additional info" name="description">
        <UTextarea v-model="description" />
      </UFormGroup>
    </div>
    <div v-if="addApartmentSteps === 2" class="flex flex-col space-y-4">
      <UFormGroup label="Rent price" name="rent" required>
        <UInput
          v-model="formattedRentPrice"
          icon="i-tabler-currency-naira"
          required
          @input="updateRentValue($event.target.value)"
        />
      </UFormGroup>
      <UFormGroup label="Service charge" name="service">
        <UInput
          v-model="formattedServiceCharge"
          icon="i-tabler-currency-naira"
          @input="updateServiceChargeValue($event.target.value)"
        />
      </UFormGroup>
      <UFormGroup label="Legal fee" name="legal">
        <UInput
          v-model="formattedLegalFee"
          icon="i-tabler-currency-naira"
          @input="updateLegalFeeValue($event.target.value)"
        />
      </UFormGroup>
      <UFormGroup label="Caution deposit" name="caution">
        <UInput
          v-model="formattedCautionDeposit"
          icon="i-tabler-currency-naira"
          @input="updateCautionDepositValue($event.target.value)"
        />
      </UFormGroup>
      <UFormGroup label="Agency fee" name="agency">
        <UInput v-model="agencyFee" icon="i-tabler-currency-naira" disabled />
      </UFormGroup>
    </div>
    <div v-if="addApartmentSteps === 3" class="flex flex-col space-y-4">
      <UFormGroup
        label="Upload image or video"
        name="upload"
        help="Max 10 photos or 1 video"
        required
      >
        <UInput
          type="file"
          accept="image/*,video/*"
          multiple
          required
          @change="onFileChange"
        />
      </UFormGroup>
      <div
        class="flex flex-wrap h-72"
        :class="{ 'overflow-y-auto overflow-x-clip': files.length > 2 }"
      >
        <div
          v-for="(file, index) in files"
          :key="index"
          class="relative inline-block w-1/2 p-3"
        >
          <NuxtImg
            :src="file"
            format="webp"
            densities="x1 x2"
            class="object-cover h-48 w-full"
          />
          <span
            class="absolute -top-2 -right-2 bg-white rounded-full p-1 cursor-pointer"
            @click="removeFile(index)"
          >
            <Icon
              name="i-heroicons-x-mark-16-solid"
              class="text-primary-500 text-xl"
            />
          </span>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          v-if="addApartmentSteps > 1"
          icon="i-heroicons-arrow-left-20-solid"
          label="Back"
          variant="outline"
          class="mr-auto"
          @click="prevStep"
        />
        <UButton
          v-if="addApartmentSteps < 3"
          icon="i-heroicons-arrow-right-20-solid"
          label="Next"
          variant="outline"
          trailing
          @click="nextStep"
        />
        <UButton
          v-if="addApartmentSteps === 3"
          label="Add"
          :loading="loading"
          @click="createApartment"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Description',
  },
  {
    label: 'Pricing',
  },
  {
    label: 'Media upload',
  },
]

const location = ref('')
const type = ref('')
const availability = ref('')
const moveOut = ref('')
const parking = ref(false)
const pets = ref(false)
const furnishing = ref(false)
const borehole = ref(false)
const balcony = ref(false)
const fencing = ref(false)

const rent = ref('')
const serviceCharge = ref('')
const legalFee = ref('')
const cautionDeposit = ref('')

const description = ref('')

const apartmentType = [
  'Self Contained',
  'Studio',
  '1 Bedroom',
  '2 Bedroom',
  '3 Bedroom',
  '4 Bedroom',
  '5 Bedroom',
]

const availabilityOptions = ['Vacant', 'Soon to be vacant']

// Function to format the number with thousand and million separators
const formatNumber = (value: string | number): string => {
  const numberValue = Number(value)
  if (isNaN(numberValue)) return ''
  return new Intl.NumberFormat('en-US').format(numberValue)
}

const formattedRentPrice = computed(() =>
  rent.value ? formatNumber(rent.value) : '',
)

const formattedServiceCharge = computed(() =>
  serviceCharge.value ? formatNumber(serviceCharge.value) : '',
)

const formattedLegalFee = computed(() =>
  legalFee.value ? formatNumber(legalFee.value) : '',
)

const formattedCautionDeposit = computed(() =>
  cautionDeposit.value ? formatNumber(cautionDeposit.value) : '',
)

const agencyFee = computed(() =>
  // 5% of the rent
  formattedRentPrice.value ? (5 / 100) * Number(formattedRentPrice.value) : 0,
)

const updateRentValue = (value: string) =>
  (rent.value = value.replace(/[^\d.]/g, ''))

const updateServiceChargeValue = (value: string) =>
  (serviceCharge.value = value.replace(/[^\d.]/g, ''))

const updateLegalFeeValue = (value: string) =>
  (legalFee.value = value.replace(/[^\d.]/g, ''))

const updateCautionDepositValue = (value: string) =>
  (cautionDeposit.value = value.replace(/[^\d.]/g, ''))

const loading = ref(false)
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

const addApartmentSteps = ref(1)
function nextStep() {
  if (addApartmentSteps.value < 3) {
    addApartmentSteps.value++
  }
}
function prevStep() {
  if (addApartmentSteps.value > 1) {
    addApartmentSteps.value--
  }
}

const files = ref<string[]>([])

function removeFile(fileIndex: number) {
  files.value.splice(fileIndex, 1)
}

function onFileChange(event: any) {
  const uploadedFiles = event.target.files
  // for each file, create a URL and push it to the files array
  for (let i = 0; i < uploadedFiles.length; i++) {
    files.value.push(URL.createObjectURL(uploadedFiles[i]))
  }
}

function createApartment() {
  loading.value = true
  console.log('Apartment created')
  // send data to backend
  // reset form
  // loading.value = false
  // addApartmentSteps.value = 1
  // files.value = []
}
</script>
