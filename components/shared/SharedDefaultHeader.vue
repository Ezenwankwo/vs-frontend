<template>
  <div>
    <header class="backdrop-blur py-2 -mb-px sticky top-0 z-50">
      <UContainer>
        <div class="mx-auto flex items-center justify-between gap-3">
          <div class="lg:flex-1 flex items-center gap-1.5">
            <ULink
              to="/"
              class="router-link-active router-link-exact-active flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
              aria-label="Logo"
            >
              <NuxtImg src="/logo.svg" alt="logo" class="w-2/3" />
            </ULink>
          </div>
          <ul
            class="items-center ring-1 ring-gray-200 dark:ring-gray-800 px-3 gap-x-0 rounded-full hidden lg:flex"
          >
            <li
              v-for="desktopItem in navItems"
              :key="desktopItem.name"
              class="relative"
            >
              <ULink
                :to="desktopItem.href"
                active-class="after:inset-x-2 font-medium"
                class="text-sm/6 flex items-center gap-1 py-2 px-4 transition-colors relative after:absolute after:-bottom-px after:h-px after:rounded-full after:bg-gray-900 dark:after:bg-white after:transition-opacity text-gray-900 dark:text-white after:opacity-100"
              >
                {{ desktopItem.name }}
              </ULink>
            </li>
          </ul>
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
              label="Login"
              variant="outline"
              size="lg"
              :to="{ name: 'auth', query: { step: 'signin' } }"
              color="primary"
              class="lg:flex hidden md:block"
            >
            </UButton>
            <UButton
              v-if="showMobileMenu === false"
              color="gray"
              type="button"
              aria-label="Open Menu"
              @click="showMobileMenu = !showMobileMenu"
            >
              <span
                class="i-heroicons-bars-3-20-solid flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              ></span>
            </UButton>
            <UButton
              v-else
              color="gray"
              type="button"
              aria-label="Close Menu"
              @click="showMobileMenu = !showMobileMenu"
            >
              <span
                class="i-heroicons-x-mark-20-solid flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              ></span>
            </UButton>
          </div>
        </div>
      </UContainer>
    </header>
    <div v-show="showMobileMenu" class="px-4 sm:px-6 pt-3 pb-6">
      <div class="space-y-3 mb-3 lg:mb-6 lg:mx-0">
        <ULink
          v-for="mobileItem in navItems"
          :key="mobileItem.name"
          class="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium"
          :to="mobileItem.href"
          active-class="after:inset-x-2 font-medium"
          @click="showMobileMenu = false"
        >
          <span class="text-sm/6 relative">{{ mobileItem.name }} </span>
        </ULink>
      </div>

      <UButton
        v-if="!route.path.includes('auth')"
        label="Login"
        variant="outline"
        :to="{ name: 'auth', query: { step: 'signin' } }"
        color="primary"
        class="lg:flex"
        @click="showMobileMenu = !showMobileMenu"
      >
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/' },
  { name: 'Blog', href: '/blogs' },
]

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
const showMobileMenu = ref(false)
</script>
