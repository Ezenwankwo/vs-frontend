<template>
  <div class="bg-gray-50 h-screen">
    <UContainer>
      <div class="py-24">
        <h1
          class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
        >
          Tired of apartment <br />hunting headaches?
        </h1>
        <p class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
          Easily find and rent from the largest database of verified apartments.
          <br />
          We connect you directly to the landlords and property managers,
          cutting out <br />
          unnecessary middle men, cost and time wasting.
        </p>
        <UInput
          padded
          autofocus
          placeholder="Lokogoma, Abuja"
          size="xl"
          color="gray"
          :ui="{
            rounded: 'rounded-full',
            padding: { xl: 'px-6 py-6' },
          }"
          class="max-w-2xl mt-12 p-0 shadow-lg rounded-full"
        >
          <template #trailing>
            <UButton
              label="Find a place"
              variant="solid"
              size="xl"
              color="primary"
              class="rounded-full px-6 py-3"
            >
            </UButton>
          </template>
        </UInput>
        <div class="static">
          <img
            src="~/assets/images/houses.svg"
            class="absolute bottom-0 right-0"
            alt=""
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
