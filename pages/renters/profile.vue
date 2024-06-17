<template>
  <div>
    <DashboardTitle text="Profile" />
    <p class="text-sm text-gray-500">
      We need this details to connect you with owners and agents
    </p>
    <DashboardProfileForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
</script>
