<template>
  <div>
    <div>
      <div class="flex">
        <!-- for images -->
        <UCarousel
          v-if="props.mediaType === 'image'"
          v-slot="{ item }"
          :items="props.image"
          :ui="{ item: 'basis-full' }"
          indicators
        >
          <NuxtImg
            :src="item"
            class="object-cover h-56 w-full rounded-t-md"
            draggable="false"
          />
        </UCarousel>
        <!-- for video -->
        <video
          v-else
          :src="props.video"
          controls
          controlslist="nodownload"
          preload="metadata"
          class="object-cover h-56 w-full rounded-t-md"
        />
        <span
          class="absolute p-2 m-2 font-semibold bg-gray-500/70 text-white text-sm rounded-md"
          ><span>&#8358;</span> {{ props.price }}</span
        >
      </div>
      <div class="flex flex-col p-3 space-y-2">
        <h4 class="font-['Lato'] text-gray-700 font-medium text-lg">
          {{ props.name }}
        </h4>
        <div class="flex space-x-2">
          <UButton
            icon="i-heroicons-eye"
            block
            label="View"
            variant="outline"
            class="w-[calc(50%-0.25rem)]"
            @click="isOpenDetail = true"
          />
          <UButton
            v-if="route.path.includes('listings')"
            icon="i-heroicons-pencil-square"
            block
            label="Edit"
            class="w-[calc(50%-0.25rem)]"
            @click="isOpenForm = true"
          />
          <UButton
            v-else
            :to="`/${userType}/messages`"
            icon="i-heroicons-chat-bubble-bottom-center-text"
            block
            label="Message"
            class="w-[calc(50%-0.25rem)]"
          />
        </div>
      </div>
    </div>
    <!-- <! Add apartment forml> -->
    <div>
      <UModal v-model="isOpenForm">
        <ApartmentForm />
      </UModal>
      <UModal v-model="isOpenDetail">
        <ApartmentDetail />
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpenForm = ref(false)
const isOpenDetail = ref(false)
const route = useRoute()
const userType = 'renters'

const props = defineProps({
  name: { type: String, default: '' },
  image: { type: Array, default: () => [] },
  video: { type: String, default: '' },
  mediaType: { type: String, default: '' },
  price: { type: String, default: '' },
  location: { type: String, default: '' },
  slug: { type: String, default: '' },
})
</script>
