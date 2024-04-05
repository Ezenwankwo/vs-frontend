<template>
  <div class="md:h-screen pt-28 pb-12 md:pb-0">
    <UContainer>
      <h1
        class="text-5xl font-['Lato'] font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
      >
        Easily find and rent <br class="hidden md:block" />apartments in
        Nigeria.
      </h1>
      <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
        We connect you directly to the property owners and managers, cutting out
        <br class="hidden md:block" />
        unnecessary middle men, cost and time wasting.
      </p>
      <UInputMenu
        v-model="selected"
        :loading="loading"
        :search="search"
        option-attribute="shortFormattedAddress"
        autofocus
        trailing
        placeholder="Search by location..."
        size="xl"
        color="gray"
        :ui="{
          padding: { xl: 'px-6 py-6' },
        }"
        class="max-w-xl mt-12 p-0 shadow-lg rounded-full"
      />
      <div class="static hidden md:block">
        <img
          src="~/assets/images/houses.svg"
          class="absolute bottom-0 right-0"
          alt=""
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
type Place = {
  formattedAddress: string
}
type Places = {
  [key: string]: Place[]
}
const selected = ref()
const loading = ref(false)
const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_API_KEY

async function search(q: string) {
  loading.value = true

  const searchText = q || 'Abuja' // use Abuja for initial search query
  const result: Places = await $fetch(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.shortFormattedAddress',
      },
      body: {
        textQuery: searchText,
        maxResultCount: 5,
      },
    },
  )
  loading.value = false
  console.log(result.places)
  return result.places
  // navigateTo('/apartments')
}
</script>
