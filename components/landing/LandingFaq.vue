<template>
  <UContainer class="py-24">
    <SharedSectionTitle text="We know you’ve got questions for us!" />
    <p class="mt-6 text-xl text-center text-gray-600 dark:text-gray-300">
      Here are some frequently asked questions
    </p>
    <UAccordion
      multiple
      :items="items"
      class="mt-20 md:px-20"
      :ui="{ wrapper: 'flex flex-col w-full' }"
    >
      <template #item="{ item }">
        <p class="text-gray-700 py-4 px-8 dark:text-white">
          {{ item.content }}
        </p>
      </template>
      <template #default="{ item, open }">
        <UButton
          color="gray"
          variant="ghost"
          class="border-b border-gray-200 dark:border-gray-700"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-6' } }"
        >
          <span class="truncate font-semibold">{{ item.label }}</span>

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
          </template>
        </UButton>
      </template>
    </UAccordion>
  </UContainer>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'How does Vacant Soon work?',
    size: 'xl',
    variant: 'outline',
    content: `Vacant Soon is an innovative apartment rental platform that gives 
            every individual the opportunity to list their vacant or soon to be 
            vacant space while they also find their dream space.`,
  },
  {
    label: 'How safe is Vacant Soon?',
    size: 'xl',
    variant: 'outline',
    content: `Vacant Soon is an innovative apartment rental platform that gives 
            every individual the opportunity to list their vacant or soon to be 
            vacant space while they also find their dream space.`,
  },
  {
    label: 'Does Vacant Soon have an app?',
    size: 'xl',
    variant: 'outline',
    content: `Vacant Soon is an innovative apartment rental platform that gives 
            every individual the opportunity to list their vacant or soon to be 
            vacant space while they also find their dream space.`,
  },
  {
    label: 'Does Vacant Soon manage the properties listed here? ',
    size: 'xl',
    variant: 'outline',
    content: `Vacant Soon is an innovative apartment rental platform that gives 
            every individual the opportunity to list their vacant or soon to be 
            vacant space while they also find their dream space.`,
  },
]
</script>
