<template>
  <div class="mt-12" />
  <hr />
  <div class="my-3">
    <div class="flex flex-row space-x-4 py-2">
      <UFormGroup label="Full name" name="name" class="mb-3 w-1/3">
        <UInput v-model="profileForm.name" required />
      </UFormGroup>
      <UFormGroup label="Email" name="email" class="mb-3 w-1/3">
        <UInput v-model="profileForm.email" type="email" required />
      </UFormGroup>
      <UFormGroup label="Phone number" name="phone" class="mb-3 w-1/3">
        <UInput v-model="profileForm.phone" type="number" required />
      </UFormGroup>
    </div>
  </div>
  <hr />
  <div class="my-3">
    <div class="flex flex-row space-x-4 py-2">
      <UFormGroup label="Age range" name="age" class="mb-3 w-1/3">
        <USelectMenu v-model="profileForm.age" :options="ageRanges" required />
      </UFormGroup>
      <UFormGroup label="Gender" name="gender" class="mb-3 w-1/3">
        <USelectMenu
          v-model="profileForm.gender"
          :options="genderOptions"
          required
        />
      </UFormGroup>
      <div class="flex flex-row space-x-4 mb-3 w-1/3">
        <UFormGroup label="Photo" name="photo">
          <UInput type="file" required @change="onFileChange" />
        </UFormGroup>
        <UAvatar v-if="photo === ''" alt="Benjamin Canac" size="xl" />
        <UAvatar v-else :src="photo" alt="Avatar" size="xl" class="border-2" />
        <!-- change the alt to the name of the user" -->
      </div>
    </div>
  </div>
  <div v-if="user === 'renters'">
    <hr />
    <div class="my-3">
      <div class="flex flex-row space-x-4 py-2">
        <UFormGroup label="Location" name="location" class="mb-3 w-1/3">
          <UInput
            v-model="profileForm.location"
            required
            placeholder="town, State"
          />
        </UFormGroup>
        <UFormGroup label="Monthly income" name="income" class="mb-3 w-1/3">
          <UInput v-model="profileForm.income" type="number" required />
        </UFormGroup>
        <UFormGroup label="Place of work" name="work" class="mb-3 w-1/3">
          <UInput v-model="profileForm.workPlace" required />
        </UFormGroup>
      </div>
    </div>
  </div>
  <div
    v-else-if="user === 'agents' || user === 'managers' || user === 'owners'"
  >
    <hr />
    <div class="my-3">
      <div class="flex flex-row space-x-4 py-2">
        <UFormGroup label="Location" name="location" class="mb-3 w-1/3">
          <UInput
            v-model="profileForm.location"
            required
            placeholder="town, State"
          />
        </UFormGroup>
        <UFormGroup label="Company name" name="company" class="mb-3 w-1/3">
          <UInput v-model="profileForm.company" required />
        </UFormGroup>
        <UFormGroup label="Apertment type" name="type" class="mb-3 w-1/3">
          <USelectMenu
            v-model="profileForm.type"
            :options="apartmentTypes"
            required
          />
        </UFormGroup>
      </div>
    </div>
  </div>
  <hr />
  <div class="my-6">
    <UButton label="Save" color="primary" @click="updateProfile" />
  </div>
</template>

<script setup lang="ts">
const user: String = 'renters'

const profileForm = reactive({
  name: '',
  phone: '',
  email: '',
  age: '',
  gender: '',
  workPlace: '',
  location: '',
  income: '',
  company: '',
  type: '',
})

const photo = ref('')

const onFileChange = (event: any) => {
  const file = event.target.files[0]
  photo.value = URL.createObjectURL(file)
}

const apartmentTypes = ['All', 'Residential', 'Commercial']

const ageRanges = [
  '18 - 24',
  '25 - 34',
  '35 - 44',
  '45 - 54',
  '55 - 64',
  '65 and over',
]

const genderOptions = ['Male', 'Female']

const toast = useToast()

const updateProfile = () => {
  toast.add({
    title: 'Saved.',
    description: "We've saved your profile changes.",
  })
}
</script>
