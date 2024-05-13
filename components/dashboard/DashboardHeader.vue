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
        <!-- <ul
            class="items-center ring-1 ring-gray-200 dark:ring-gray-800 px-3 gap-x-0 rounded-full hidden lg:flex"
          >
            <li v-for="item in navItems" :key="item.name" class="relative">
              <ULink
                :to="item.href"
                active-class="after:inset-x-2 font-medium"
                class="text-sm/6 flex items-center gap-1 py-2 px-4 transition-colors relative after:absolute after:-bottom-px after:h-px after:rounded-full after:bg-gray-900 dark:after:bg-white after:transition-opacity text-gray-900 dark:text-white after:opacity-100"
              >
                {{ item.name }}
              </ULink>
            </li>
          </ul> -->
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
          <UButton
            v-if="!route.path.includes('auth')"
            label="List properties"
            variant="outline"
            to="/auth"
            color="primary"
            class="lg:flex px-6 py-3"
          >
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" />
            </template>
          </UButton>
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

const route = useRoute()
</script>
