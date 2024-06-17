<template>
  <div>
    <DashboardTitle text="Profile" />
    <p class="text-sm text-gray-500">Provide details about yourself</p>
    <DashboardProfileForm />
  </div>
</template>

<script setup lang="ts">
import DashboardProfileForm from '~/components/dashboard/DashboardProfileForm.vue'

definePageMeta({
  layout: 'dashboard',
})
</script>
