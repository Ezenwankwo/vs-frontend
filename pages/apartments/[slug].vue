<template>
  <UContainer class="mb-24">
    <UBreadcrumb divider="/" :links="breadCrumbLinks" class="my-4 lg:my-6" />
    <div class="flex">
      <NuxtImg src="/shortlet.png" class="object-cover h-96 rounded-md w-2/3" />
      <div class="w-1/3">Map</div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// const { slug } = useRoute().params

const breadCrumbLinks = [
  { label: 'Apartments', to: '/' },
  { label: 'Breadcrumb' },
]
</script>
