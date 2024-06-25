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
          v-if="tenant.id"
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Edit tenant
        </h3>
        <h3
          v-else
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Add tenant
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
      <UFormGroup label="Full name" name="name">
        <UInput v-model="tenantForm.name" />
      </UFormGroup>
      <div class="flex space-x-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="tenantForm.email" type="email" />
        </UFormGroup>
        <UFormGroup label="Phone number" name="phone">
          <UInput v-model="tenantForm.phone" type="tel" />
        </UFormGroup>
      </div>
      <UFormGroup label="Apartment" name="apartment">
        <USelectMenu
          v-model="tenantForm.apartment"
          searchable
          :options="apartments"
        />
      </UFormGroup>
      <UFormGroup label="Date Joined" name="date">
        <UInput v-model="tenantForm.dateJoined" placeholder="dd/mm/yyyy" />
      </UFormGroup>
      <UFormGroup label="Status" name="status">
        <USelect v-model="tenantForm.status" :options="tenantStatus" />
      </UFormGroup>
      <UFormGroup label="Additional note" name="note">
        <UTextarea v-model="tenantForm.note" />
      </UFormGroup>
    </div>
    <template #footer>
      <UButton v-if="props.tenant.id" label="Edit" @click="editTenant" />
      <UButton v-else label="Add" @click="createTenant" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  tenant: {
    type: Object,
    default: () => ({
      name: '',
      apartment: '',
      phone: '',
      email: '',
      status: '',
      dateJoined: '',
      note: '',
    }),
  },
})

const emit = defineEmits(['close'])

const tenantForm = reactive({
  name: '',
  apartment: '',
  phone: '',
  email: '',
  status: '',
  dateJoined: '',
  note: '',
})

const currentName = computed(() => props.tenant.name || '')
tenantForm.name = currentName.value

const currentApartment = computed(() => props.tenant.apartment || '')
tenantForm.apartment = currentApartment.value

const currentPhone = computed(() => props.tenant.phone || '')
tenantForm.phone = currentPhone.value

const currentEmail = computed(() => props.tenant.email || '')
tenantForm.email = currentEmail.value

const currentStatus = computed(() => props.tenant.status || '')
tenantForm.status = currentStatus.value

const currentDateJoined = computed(() => props.tenant.date || '')
tenantForm.dateJoined = currentDateJoined.value

const currentNote = computed(() => props.tenant.note || '')
tenantForm.note = currentNote.value

const tenantStatus = [
  {
    label: 'Active',
  },
  {
    label: 'Inactive',
  },
]

const apartments = ['1 bedroom apartment, Lugbe', '2 bedroom apartment, Karu']

function resetForm() {
  Object.assign(tenantForm, {
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

function editTenant() {
  // call edit earning api
  resetForm()
  console.log('edit')
}
function createTenant() {
  // call create earning api
  resetForm()
  console.log('create')
}
</script>
