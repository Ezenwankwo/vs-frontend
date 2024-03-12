<template>
  <div>
    <LandingHeader />
    <LandingHero />
    <LandingApartmentTypes />
    <LandingHowItWorks />
    <LandingFaq />
    <LandingProperties />
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
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
