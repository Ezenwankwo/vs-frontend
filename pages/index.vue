<template>
  <div>
    <LandingHero />
    <LandingHowItWorks />
    <div
      class="flex flex-col items-center py-40 px-10 bg-primary-50 text-gray-700 dark:text-white"
    >
      <h2 class="font-['Lato'] tracking-tight text-3xl font-bold text-center">
        Are you a landlord, property manager, or agent?
      </h2>
      <p class="text-center text-gray-600 text-xl mt-5 mb-10">
        We are the best platform to advertise and manage your renter apartments
      </p>
      <UButton to="/auth" size="xl" label="Get Started" />
    </div>
    <LandingFaq />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Vacant Soon',
  meta: [
    {
      name: 'description',
      content: 'Easily find and rent apartments in Nigeria',
    },
    {
      name: 'keywords',
      content: 'vacant soon, real estate, platform, nigeria, apartments, rent',
    },
  ],
})
</script>
