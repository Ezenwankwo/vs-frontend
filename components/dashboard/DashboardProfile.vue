<template>
  <div class="mt-12 flex border rounded-md">
    <div class="w-1/3 p-6 flex flex-col items-center space-y-4">
      <UAvatar alt="Benjamin Canac" size="3xl" class="border" />
      <h3 class="justify-center">Benjamin Canac</h3>
      <UButton
        icon="i-heroicons-pencil-square"
        label="Edit profile"
        variant="outline"
        @click="isOpen = true"
      />
    </div>
    <div class="w-2/3 border-l p-6 flex flex-col text-sm">
      <h3 class="mb-6 text-lg font-medium font-['Lato']">Details</h3>
      <div>
        <div
          v-for="(key, value) in profileDetails"
          :key="key"
          class="flex py-3"
          :class="{
            'border-b':
              value !==
              Object.keys(profileDetails)[
                Object.keys(profileDetails).length - 1
              ],
          }"
        >
          <p class="text-gray-500 w-2/5 capitalize">{{ value }}</p>
          <p class="text-gray-800 w-3/5">
            <span v-if="value === 'income'">&#8358;</span> {{ key }}
          </p>
        </div>
      </div>
    </div>
    <UModal v-model="isOpen">
      <DashboardProfileForm />
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const profileDetails = {
  name: 'Benjamin Canac',
  email: 'bJyCm@example.com',
  phone: '08183096264',
  location: '13 Liberty Street, Benin City',
  age: '',
  gender: 'Male',
  workPlace: 'ZST Technologies',
  income: '50,000',
}
</script>
