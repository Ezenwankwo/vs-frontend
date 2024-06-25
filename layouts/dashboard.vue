<template>
  <div class="font-['Inter']">
    <UContainer>
      <div class="flex">
        <div
          class="flex flex-col h-screen justify-between w-1/5 border-r-2 pr-6 py-12"
        >
          <UVerticalNavigation
            :links="links"
            :ui="{
              active:
                'text-primary-500 dark:text-primary-400 border-current font-semibold',
            }"
          >
            <template #default="{ link }">
              <span class="group-hover:text-primary relative">{{
                link.label
              }}</span>
            </template>
          </UVerticalNavigation>
          <img src="~/assets/images/logo.svg" class="w-1/2" alt="logo" />
        </div>
        <div class="w-4/5 pl-6 pt-6">
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
      },
      {
        label: 'Requests',
        icon: 'i-heroicons-arrow-path-rounded-square',
        to: '/renters/requests',
      },
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/renters/listings',
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/renters/messages',
      },
    ],
    [
      {
        label: 'Profile',
        to: '/renters/profile',
        avatar: {
          src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
      },
    ],
  ],
  agents: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/agents/listings',
      },
      {
        label: 'Requests',
        icon: 'i-heroicons-arrow-path-rounded-square',
        to: '/agents/requests',
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/agents/messages',
      },
      {
        label: 'Earnings',
        icon: 'i-tabler-currency-naira',
        to: '/agents/earnings',
      },
    ],
    [
      {
        label: 'Profile',
        to: '/agents/profile',
        avatar: {
          src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
      },
    ],
  ],
  owners: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/owners/listings',
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/owners/messages',
      },
      {
        label: 'Tenants',
        icon: 'i-heroicons-user-group',
        to: '/owners/tenants',
      },
    ],
    [
      {
        label: 'Profile',
        to: '/owners/profile',
        avatar: {
          src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
      },
    ],
  ],
  managers: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/managers/listings',
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/managers/messages',
      },
      {
        label: 'Owners',
        icon: 'i-heroicons-user-group',
        to: '/managers/owners',
      },
      {
        label: 'Tenants',
        icon: 'i-heroicons-user-group',
        to: '/managers/tenants',
      },
    ],
    [
      {
        label: 'Profile',
        to: '/managers/profile',
        avatar: {
          src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        },
      },
      {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
      },
    ],
  ],
  admins: [
    [
      {
        label: 'Listings',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/admins/listings',
      },
      {
        label: 'Messages',
        icon: 'i-heroicons-chat-bubble-bottom-center-text',
        to: '/admins/messages',
      },
      {
        label: 'Renters',
        icon: 'i-heroicons-user-group',
        to: '/admins/renters',
      },
      {
        label: 'Agents',
        icon: 'i-heroicons-user-group',
        to: '/admins/agents',
      },
      {
        label: 'Owners',
        icon: 'i-heroicons-user-group',
        to: '/admins/owners',
      },
    ],
  ],
}

const userType = 'owners'

const links = computed(() => users[userType])
</script>
