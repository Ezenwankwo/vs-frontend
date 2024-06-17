<template>
  <div>
    <div class="flex justify-between">
      <DashboardTitle text="Messages" badge-label="10" show-badge />
      <UTabs :items="items" :ui="{ wrapper: 'relative space-y-0' }" />
    </div>
    <p class="text-sm text-gray-500">View and respond to messages</p>
    <DashboardMessage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const items = [
  {
    label: 'All',
  },
  {
    label: 'Unread',
  },
]
</script>
