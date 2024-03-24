<template>
  <UContainer class="py-24 bg-primary-50 rounded">
    <SharedSectionTitle text="We know you’ve got questions for us!" />
    <p class="mt-6 text-xl text-center text-gray-600 dark:text-gray-300">
      Here are some frequently asked questions
    </p>
    <UAccordion
      :items="[
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
      ]"
      class="mt-20 md:px-20"
    />
  </UContainer>
</template>

<script setup lang="ts"></script>
