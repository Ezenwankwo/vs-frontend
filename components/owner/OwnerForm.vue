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
          v-if="owner.id"
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Edit owner
        </h3>
        <h3
          v-else
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Add owner
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
        <UInput v-model="ownerForm.name" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="ownerForm.email" type="email" />
      </UFormGroup>
      <UFormGroup label="Phone number" name="phone">
        <UInput v-model="ownerForm.phone" type="tel" />
      </UFormGroup>
      <div class="flex space-x-4">
        <UFormGroup label="Number of listings" name="listings">
          <UInput v-model="ownerForm.listings" type="number" />
        </UFormGroup>
        <UFormGroup label="Management fee" name="fee">
          <UInput
            v-model="ownerForm.fee"
            type="number"
            placeholder="percentage of rent"
          />
        </UFormGroup>
      </div>
      <UFormGroup label="Date Joined" name="date">
        <UInput v-model="ownerForm.dateJoined" placeholder="dd/mm/yyyy" />
      </UFormGroup>
      <UFormGroup label="Additional note" name="note">
        <UTextarea v-model="ownerForm.note" />
      </UFormGroup>
    </div>
    <template #footer>
      <UButton v-if="props.owner.id" label="Edit" @click="editOwner" />
      <UButton v-else label="Add" @click="createOwner" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  owner: {
    type: Object,
    default: () => ({
      name: '',
      listings: '',
      phone: '',
      email: '',
      fee: '',
      dateJoined: '',
      note: '',
    }),
  },
})

const emit = defineEmits(['close'])

const ownerForm = reactive({
  name: '',
  listings: '',
  phone: '',
  email: '',
  fee: '',
  dateJoined: '',
  note: '',
})

const currentName = computed(() => props.owner.name || '')
ownerForm.name = currentName.value

const currentListings = computed(() => props.owner.listings || '')
ownerForm.listings = currentListings.value

const currentPhone = computed(() => props.owner.phone || '')
ownerForm.phone = currentPhone.value

const currentEmail = computed(() => props.owner.email || '')
ownerForm.email = currentEmail.value

const currentFee = computed(() => props.owner.fee || '')
ownerForm.fee = currentFee.value

const currentDateJoined = computed(() => props.owner.date || '')
ownerForm.dateJoined = currentDateJoined.value

const currentNote = computed(() => props.owner.note || '')
ownerForm.note = currentNote.value

function resetForm() {
  Object.assign(ownerForm, {
    name: '',
    listings: '',
    phone: '',
    email: '',
    fee: '',
    dateJoined: '',
    note: '',
  })
  emit('close')
}

function editOwner() {
  // call edit earning api
  resetForm()
  console.log('edit')
}
function createOwner() {
  // call create earning api
  resetForm()
  console.log('create')
}
</script>
