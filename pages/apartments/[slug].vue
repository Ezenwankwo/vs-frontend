<template>
  <UContainer class="mb-24">
    <UBreadcrumb divider="/" :links="breadCrumbLinks" class="my-4 lg:my-6" />
    <div class="flex space-x-4">
      <NuxtImg src="/shortlet.png" class="object-cover h-96 rounded-md w-3/5" />
      <div class="w-2/5"></div>
    </div>
    <iframe
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyADo33Dod-kr1-zUHXiPGUEnkmCPT7LWwE
    &q=Space+Needle,Seattle+WA"
    >
    </iframe>
  </UContainer>
</template>

<script setup lang="ts">
// const { slug } = useRoute().params

const breadCrumbLinks = [
  { label: 'Apartments', to: '/' },
  { label: 'Breadcrumb' },
]
</script>
