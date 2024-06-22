<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <template #header>
      <div class="flex flex-col">
        <h3
          class="text-base font-['Lato'] font-semibold leading-6 text-gray-700 dark:text-white"
        >
          Update Profile
        </h3>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete profile ensures safety for everyone
        </p>
      </div>
    </template>
    <div class="flex flex-col space-y-4">
      <UFormGroup label="Full name" name="name">
        <UInput v-model="profileForm.name" required />
      </UFormGroup>
      <div class="flex space-x-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="profileForm.email" type="email" required />
        </UFormGroup>
        <UFormGroup label="Phone number" name="phone">
          <UInput v-model="profileForm.phone" type="number" required />
        </UFormGroup>
      </div>
      <div class="flex space-x-4">
        <UFormGroup label="Age range" name="age" class="w-1/2">
          <USelectMenu
            v-model="profileForm.age"
            :options="ageRanges"
            required
          />
        </UFormGroup>
        <UFormGroup label="Gender" name="gender" class="w-1/2">
          <USelectMenu
            v-model="profileForm.gender"
            :options="genderOptions"
            required
          />
        </UFormGroup>
      </div>
      <div class="flex flex-row space-x-4">
        <UFormGroup label="Photo" name="photo">
          <UInput type="file" required @change="onFileChange" />
        </UFormGroup>
        <UAvatar v-if="photo === ''" alt="Benjamin Canac" size="xl" />
        <UAvatar v-else :src="photo" alt="Avatar" size="xl" class="border-2" />
        <!-- change the alt to the name of the user" -->
      </div>
      <UFormGroup label="Location" name="location">
        <UInput
          v-model="profileForm.location"
          required
          placeholder="town, State"
        />
      </UFormGroup>
    </div>
    <div v-if="user === 'renters'">
      <div class="flex flex-row space-x-4 mt-4">
        <UFormGroup label="Monthly income" name="income" class="w-1/2">
          <UInput v-model="profileForm.income" type="number" required />
        </UFormGroup>
        <UFormGroup label="Place of work" name="work" class="w-1/2">
          <UInput v-model="profileForm.workPlace" required />
        </UFormGroup>
      </div>
    </div>
    <div
      v-else-if="user === 'agents' || user === 'managers' || user === 'owners'"
    >
      <div class="flex flex-row space-x-4 mt-4">
        <UFormGroup label="Company name" name="company" class="w-1/2">
          <UInput v-model="profileForm.company" required />
        </UFormGroup>
        <UFormGroup label="Apertment type" name="type" class="w-1/2">
          <USelectMenu
            v-model="profileForm.type"
            :options="apartmentTypes"
            required
          />
        </UFormGroup>
      </div>
    </div>
    <template #footer>
      <UButton
        label="Save"
        :loading="loading"
        color="primary"
        @click="updateProfile"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const user: String = 'agents'

const loading = ref(false)

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
  loading.value = true
  toast.add({
    title: 'Saved.',
    description: "We've saved your profile changes.",
  })
}
</script>
