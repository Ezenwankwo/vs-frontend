<template>
  <div>
    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search..."
      />

      <USelectMenu
        v-model="selectedStatus"
        :options="chatStatus"
        placeholder="Status"
        class="w-40"
      />
    </div>
    <div class="flex flex-1 h-screen">
      <div
        class="flex-col rounded-md rounded-r-none items-stretch relative border-b lg:border-b-0 lg:border-x border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0 flex"
        style="--width: 400px"
      >
        <div
          class="flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 gap-x-4 min-w-0"
        ></div>
        <div class="flex-1 flex flex-col overflow-y-auto p-0">
          <div v-for="chat in chats" :key="chat.id">
            <div
              :class="{
                'border-l-2 dark:text-white border-primary-500 dark:border-primary-400 bg-primary-100 dark:bg-primary-900/25':
                  chat.has_unread === true,
              }"
              class="p-4 text-sm cursor-pointer text-gray-900 hover:border-l-2 hover:bg-primary-100 hover:border-primary-200"
            >
              <div
                :class="{ 'font-semibold': chat.has_unread === true }"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  {{ chat.apartment }}
                  <div
                    v-if="chat.has_unread === true"
                    class="relative inline-flex items-center justify-center flex-shrink-0"
                  >
                    <span
                      class="absolute rounded-full ring-1 ring-white dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium whitespace-nowrap h-2 min-w-[0.5rem] text-[7px] p-0.5 top-0 right-0 -translate-y-1/2 translate-x-1/2 transform bg-primary-500 dark:bg-primary-400"
                    ></span>
                  </div>
                </div>
                <span class="text-xs italic">{{ chat.date }}</span>
              </div>
              <p :class="{ 'font-semibold': chat.has_unread === true }">
                {{ chat.name }}
              </p>
              <p class="text-gray-400 dark:text-gray-500 line-clamp-1">
                {{ chat.message }}
              </p>
            </div>
            <div
              class="flex items-center align-center text-center w-full flex-row"
            >
              <div
                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="hidden md:block bg-transparent select-none absolute z-50 group w-[9px] h-full inset-y-0 -right-[5px] cursor-col-resize"
        >
          <div
            class="group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition duration-200 absolute w-px h-full inset-x-0 mx-auto"
          ></div>
        </div>
      </div>
      <div
        class="flex-col rounded-md rounded-l-none items-stretch relative h-[calc(100vh-130px)] w-full flex-1 hidden lg:flex lg:border-r lg:border-t"
      >
        <div class="p-4 flex-1 flex flex-col overflow-y-auto">
          <div class="flex justify-between">
            <div class="flex items-center gap-4">
              <span
                class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-12 w-12 text-lg"
              >
                <UAvatar
                  alt="Taylor Green"
                  size="lg"
                  :ui="{ rounded: 'rounded' }"
                />
              </span>
              <div class="min-w-0">
                <p class="text-gray-900 dark:text-white font-semibold">
                  One Bedroom Apartment in Karu
                </p>
                <p class="text-gray-500 dark:text-gray-400 font-medium">
                  Alex Thompson
                </p>
              </div>
            </div>
            <p class="font-medium text-gray-700 dark:text-white italic text-xs">
              31 Dec
            </p>
          </div>
          <div
            class="flex items-center align-center text-center w-full flex-row mt-5"
          >
            <div
              class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
            ></div>
          </div>
          <div class="flex justify-between mt-5">
            <div class="flex gap-2">
              <span
                class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-12 w-12 text-lg"
              >
                <UAvatar alt="Alex Thompson" />
              </span>
              <div class="min-w-0">
                <p class="text-gray-700 dark:text-white text-sm">
                  I wanted to provide you with the latest update on the project.
                </p>
                <p
                  class="text-gray-500 dark:text-gray-400 font-medium text-xs italic"
                >
                  renter - Aug 12
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 sticky">
          <UTextarea
            color="white"
            variant="outline"
            placeholder="Send message"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const chats = [
  {
    id: 1,
    name: 'Taylor Green',
    apartment: 'Self Contained in Karu',
    message: `We're looking for volunteers for the upcoming community event.
                It's a great opportunity to give back and make a positive impact.`,
    has_unread: false,
    date: 'Dec 31',
  },
  {
    id: 2,
    name: 'Alex Thompson',
    apartment: 'One Bedroom Apartment in Lugbe',
    message: `I wanted to invite you to check out the new art exhibition
                  this weekend. It features some amazing contemporary artists
                  and their latest works.`,
    has_unread: true,
    date: 'Aug 13',
  },
  {
    id: 3,
    name: 'Lizzi Ifeoma',
    apartment: 'One Bedroom Flat Lokogoma',
    message: `It's been a journey writing this book and I'm eager to share
                  it with you.`,
    has_unread: false,
    date: 'Jun 9',
  },
]

const search = ref('')
const selectedStatus = ref<{ value: string }[]>([])

const chatStatus = [
  {
    key: 'all',
    label: 'All',
    value: false,
  },
  {
    key: 'unread',
    label: 'Unread',
    value: true,
  },
]
</script>
