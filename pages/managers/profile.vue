<template>
  <div>
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: {
          padding: '',
          base: 'divide-y divide-gray-200 dark:divide-gray-700',
        },
      }"
    >
      <template #header>
        <div class="flex justify-between">
          <DashboardTitle text="Profile" />
        </div>
        <p class="text-sm text-gray-500">
          We need this details to connect you with owners and agents
        </p>
      </template>
      <DashboardProfile />
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
</script>
