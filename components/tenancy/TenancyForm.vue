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
          v-if="tenancy.id"
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Edit tenancy
        </h3>
        <h3
          v-else
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Add tenancy
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
      <UFormGroup label="Apartment" name="apartment">
        <USelectMenu
          v-model="tenancyForm.apartment"
          searchable
          :options="apartments"
        />
      </UFormGroup>
      <UFormGroup label="Tenant" name="tenant">
        <USelectMenu
          v-model="tenancyForm.tenant"
          searchable
          :options="tenants"
        />
      </UFormGroup>
      <div class="flex space-x-4">
        <UFormGroup label="Start date" name="start">
          <UInput v-model="tenancyForm.startDate" placeholder="dd/mm/yyyy" />
        </UFormGroup>
        <UFormGroup label="End date" name="end">
          <UInput v-model="tenancyForm.endDate" placeholder="dd/mm/yyyy" />
        </UFormGroup>
      </div>
      <UFormGroup label="Status" name="status">
        <USelect v-model="tenancyForm.status" :options="tenancyStatus" />
      </UFormGroup>
      <UFormGroup label="Additional note" name="note">
        <UTextarea v-model="tenancyForm.note" />
      </UFormGroup>
    </div>
    <template #footer>
      <UButton v-if="props.tenancy.id" label="Edit" @click="editTenancy" />
      <UButton v-else label="Add" @click="createTenancy" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  tenancy: {
    type: Object,
    default: () => ({
      apartment: '',
      tenant: '',
      startDate: '',
      endDate: '',
      status: '',
      note: '',
    }),
  },
})

const emit = defineEmits(['close'])

const tenancyForm = reactive({
  apartment: '',
  tenant: '',
  startDate: '',
  endDate: '',
  status: '',
  note: '',
})

const currentApartment = computed(() => props.tenancy.apartment || '')
tenancyForm.apartment = currentApartment.value

const currentTenant = computed(() => props.tenancy.tenant || '')
tenancyForm.tenant = currentTenant.value

const currentStartDate = computed(() => props.tenancy.startDate || '')
tenancyForm.startDate = currentStartDate.value

const currentEndDate = computed(() => props.tenancy.endDate || '')
tenancyForm.endDate = currentEndDate.value

const currentStatus = computed(() => props.tenancy.status || '')
tenancyForm.status = currentStatus.value

const currentNote = computed(() => props.tenancy.note || '')
tenancyForm.note = currentNote.value

const tenancyStatus = [
  {
    label: 'Active',
  },
  {
    label: 'Inactive',
  },
]

const apartments = ['Yari Flat A1', 'Egbema Studio B1']

const tenants = ['Felix Agyemang', 'Kennedy Ekhator']

function resetForm() {
  Object.assign(tenancyForm, {
    name: '',
    apartment: '',
    phone: '',
    email: '',
    status: '',
    dateJoined: '',
    note: '',
  })
  emit('close')
}

function editTenancy() {
  // call edit earning api
  resetForm()
  console.log('edit')
}
function createTenancy() {
  // call create earning api
  resetForm()
  console.log('create')
}
</script>
