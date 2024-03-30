<template>
  <div class="md:h-screen pt-28 pb-12 md:pb-0">
    <UContainer>
      <h1
        class="text-5xl font-['Lato'] font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
      >
        Easily find and rent <br class="hidden md:block" />apartments in
        Nigeria.
      </h1>
      <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
        We connect you directly to the property owners and managers, cutting out
        <br class="hidden md:block" />
        unnecessary middle men, cost and time wasting.
      </p>
      <UInput
        v-model="q"
        name="q"
        padded
        autofocus
        placeholder="Where would you like to live?"
        size="xl"
        color="gray"
        :ui="{
          padding: { xl: 'px-6 py-6' },
        }"
        class="max-w-xl mt-12 p-0 shadow-lg rounded-full"
        @change="onSearch"
      >
        <template #trailing>
          <UButton
            v-if="q !== ''"
            loading
            icon="i-heroicons-magnifying-glass-20-solid"
            color="primary"
            class="rounded-full"
          />
          <UButton
            v-else
            icon="i-heroicons-magnifying-glass-20-solid"
            color="primary"
            class="rounded-full"
          />
        </template>
      </UInput>
      <div class="static hidden md:block">
        <img
          src="~/assets/images/houses.svg"
          class="absolute bottom-0 right-0"
          alt=""
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const q = ref('')
function onSearch() {
  console.log(q.value)
  navigateTo('/apartments')
}
</script>
