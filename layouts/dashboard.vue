<template>
  <div class="font-['Inter']">
    <div class="lg:hidden">
      <header class="backdrop-blur py-2 -mb-px sticky top-0 z-50 shadow">
        <UContainer>
          <div class="mx-auto flex items-center justify-between gap-3">
            <div class="lg:flex-1 flex items-center gap-1.5">
              <UAvatar alt="Benjamin Canac" size="lg" class="border" />
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
              <UButton
                color="gray"
                type="button"
                aria-label="Open Menu"
                @click="isOpen = true"
              >
                <span
                  class="i-heroicons-bars-3-20-solid flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                ></span>
              </UButton>
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
                  <UAvatar alt="Benjamin Canac" size="lg" class="border" />
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

            <UVerticalNavigation
              :links="links"
              :ui="{
                size: 'text-base',
                active:
                  'text-primary-500 dark:text-primary-400 border-current font-semibold',

                icon: {
                  active: 'text-primary-500 dark:text-primary-400',
                  inactive:
                    'text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400',
                },
              }"
            >
              <template #default="{ link }">
                <span class="group-hover:text-primary relative">{{
                  link.label
                }}</span>
              </template>
            </UVerticalNavigation>
          </UCard>
        </USlideover>
      </header>
    </div>
    <UContainer :ui="{ padding: 'px-0 lg:px-3 lg:px-8' }">
      <div class="flex">
        <div
          class="hidden lg:flex flex-col h-screen justify-between w-2/12 border-r-2 pr-6 py-12"
        >
          <div class="flex flex-col gap-8">
            <UAvatar alt="Benjamin Canac" size="3xl" />
            <UVerticalNavigation
              :links="links"
              :ui="{
                size: 'text-base',
                active:
                  'text-primary-500 dark:text-primary-400 border-current font-semibold',

                icon: {
                  active: 'text-primary-500 dark:text-primary-400',
                  inactive:
                    'text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400',
                },
              }"
            >
              <template #default="{ link }">
                <span class="group-hover:text-primary relative">{{
                  link.label
                }}</span>
              </template>
            </UVerticalNavigation>
          </div>
          <NuxtLink to="/">
            <NuxtImg src="/logo.svg" class="w-1/2" alt="logo" />
          </NuxtLink>
        </div>
        <div class="lg:w-10/12 lg:pl-6 sm:pt-3 lg:pt-6 w-full">
          <slot />
        </div>
      </div>
    </UContainer>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const users = {
  renters: [
    [
      {
        label: 'Match List',
        icon: 'i-heroicons-home',
        to: '/renters/match-list',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Requests',
        icon: 'i-heroicons-arrow-path-rounded-square',
        to: '/renters/requests',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/renters/listings',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/renters/messages',
        click: () => {
          isOpen.value = false
        },
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-heroicons-user',
        to: '/renters/profile',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle-solid',
      },
    ],
  ],
  agents: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/agents/listings',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Requests',
        icon: 'i-heroicons-arrow-path-rounded-square',
        to: '/agents/requests',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/agents/messages',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Earnings',
        icon: 'i-tabler-currency-naira',
        to: '/agents/earnings',
        click: () => {
          isOpen.value = false
        },
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-heroicons-user',
        to: '/agents/profile',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle-solid',
      },
    ],
  ],
  owners: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/owners/listings',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/owners/messages',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Tenants',
        icon: 'i-heroicons-user-group',
        to: '/owners/tenants',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Tenancies',
        icon: 'i-heroicons-key',
        to: '/owners/tenancies',
        click: () => {
          isOpen.value = false
        },
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-heroicons-user',
        to: '/owners/profile',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle-solid',
      },
    ],
  ],
  managers: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/managers/listings',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/managers/messages',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Owners',
        icon: 'i-heroicons-user-group',
        to: '/managers/owners',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Tenants',
        icon: 'i-heroicons-user-group',
        to: '/managers/tenants',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Tenancies',
        icon: 'i-heroicons-key',
        to: '/managers/tenancies',
        click: () => {
          isOpen.value = false
        },
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-heroicons-user',
        to: '/managers/profile',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle-solid',
      },
    ],
  ],
  admins: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/admins/listings',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/admins/messages',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Renters',
        icon: 'i-heroicons-users',
        to: '/admins/renters',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Agents',
        icon: 'i-heroicons-users',
        to: '/admins/agents',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Managers',
        icon: 'i-heroicons-users',
        to: '/admins/managers',
        click: () => {
          isOpen.value = false
        },
      },
      {
        label: 'Owners',
        icon: 'i-heroicons-users',
        to: '/admins/owners',
        click: () => {
          isOpen.value = false
        },
      },
    ],
    [
      {
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle-solid',
      },
    ],
  ],
}

const userType = 'renters'

const links = computed(() => users[userType])

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
