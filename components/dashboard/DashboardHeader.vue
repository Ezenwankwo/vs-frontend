<template>
  <header class="backdrop-blur py-1 -mb-px sticky top-0 z-50 shadow">
    <UContainer>
      <div class="mx-auto flex items-center justify-between gap-3">
        <div class="lg:flex-1 flex items-center gap-1.5">
          <a
            aria-current="page"
            href="/"
            class="router-link-active router-link-exact-active flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
            aria-label="Logo"
          >
            <img src="~/assets/images/logo.svg" alt="logo" />
          </a>
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
          <UAvatar alt="Benjamin Canac" size="xl" />
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
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
