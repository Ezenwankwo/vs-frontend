<template>
  <header class="backdrop-blur py-1 -mb-px sticky top-0 z-50 shadow">
    <UContainer>
      <div class="mx-auto flex items-center justify-between gap-3">
        <div class="lg:flex-1 flex items-center gap-1.5">
          <NuxtLink to="/">
            <NuxtImg src="/logo.svg" class="w-2/3" alt="logo" />
          </NuxtLink>
        </div>
        <div class="flex items-center justify-end lg:flex-1 gap-1.5">
          <ClientOnly>
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
          <div @click="isOpen = true">
            <UAvatar alt="Benjamin Canac" size="lg" class="border" />
          </div>
        </div>
      </div>
    </UContainer>

    <USlideover v-model="isOpen" prevent-close>
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Slideover
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <Placeholder class="h-full" />
      </UCard>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
const isOpen = ref(false)
// Color mode
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>
