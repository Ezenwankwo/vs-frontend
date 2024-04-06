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
        autofocus
        trailing
        placeholder="Search by location..."
        size="xl"
        :ui="{
          padding: { xl: 'px-6 py-6' },
        }"
        class="max-w-xl mt-12 p-0 shadow-lg rounded-full"
        @change="onSelect(selected)"
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
interface PredictionResponse {
  suggestions: {
    placePrediction: {
      text: {
        text: string
      }
    }
  }[]
}

const selected = ref()
const loading = ref(false)
const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_API_KEY

async function search(q: string) {
  loading.value = true

  const searchText = q || 'Abuja' // use Abuja for initial search query
  const result: PredictionResponse = await $fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: {
        input: searchText,
        includedRegionCodes: ['NG'],
      },
    },
  )
  loading.value = false
  const textValues = result.suggestions
    .map((item) => item.placePrediction.text.text)
    .map((place) => place.replace(/, Nigeria$/, ''))
  return textValues
}

function onSelect(item: string) {
  navigateTo(`/apartments/?location=${item}`)
}
</script>
