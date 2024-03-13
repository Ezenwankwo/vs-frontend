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
            class="hidden md:block rounded-full px-6 py-3"
          >
          </UButton>
          <UButton
            label="Find"
            variant="solid"
            size="xl"
            color="primary"
            class="md:hidden rounded-full px-6 py-3"
          >
          </UButton>
        </template>
      </UInput>
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
