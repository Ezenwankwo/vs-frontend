<template>
  <div>
    <div>
      <UCard
        class="w-full"
        :ui="{
          base: '',
          ring: '',
          divide: 'divide-y divide-gray-200 dark:divide-gray-700',
          header: { padding: 'px-4 py-5' },
          body: {
            padding: '',
            base: 'divide-y divide-gray-200 dark:divide-gray-700',
          },
          footer: { padding: 'p-4' },
        }"
      >
        <template #header>
          <div class="flex justify-between">
            <DashboardTitle text="Requests" badge-label="10" show-badge />
            <UButton
              icon="i-heroicons-plus-16-solid"
              label="Create"
              @click="isOpen = true"
            />
          </div>
          <p class="text-sm text-gray-500">Here are your requests</p>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <UInput
            v-model="search"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search..."
            class="w-60"
          />

          <USelectMenu
            v-model="selectedStatus"
            :options="requestStatus"
            placeholder="Status"
            class="w-40"
          />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
          <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows:</span>

            <USelect
              v-model="pageCount"
              :options="[3, 5, 10, 20, 30, 40]"
              class="me-2 w-15"
              size="xs"
            />
          </div>

          <div class="flex gap-1.5 items-center">
            <UDropdown
              v-if="selectedRows.length > 0"
              :items="actions"
              :ui="{ width: 'w-36' }"
            >
              <UButton
                icon="i-heroicons-chevron-down"
                trailing
                color="gray"
                size="xs"
              >
                Mark as
              </UButton>
            </UDropdown>

            <USelectMenu
              v-if="selectedRows.length === 0"
              v-model="selectedColumns"
              :options="columns"
              multiple
            >
              <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                Columns
              </UButton>
            </USelectMenu>

            <UButton
              icon="i-heroicons-funnel"
              color="gray"
              size="xs"
              :disabled="search === '' && selectedStatus.length === 0"
              @click="resetFilters"
            >
              Reset
            </UButton>
          </div>
        </div>
        <UTable
          v-model="selectedRows"
          v-model:sort="sort"
          :columns="columnsTable"
          :loading="pending"
          sort-asc-icon="i-heroicons-arrow-up"
          sort-desc-icon="i-heroicons-arrow-down"
          sort-mode="manual"
          :rows="requests"
          class="border min-h-96 text-gray-700"
          :ui="{
            default: { checkbox: { color: 'gray' } },
          }"
          @select="select"
        >
          <template #empty-state>
            <DashboardEmptyState
              main-text="No requests yet"
              @open-form="isOpen = true"
            />
          </template>

          <template #status-data="{ row }">
            <UBadge
              :label="row.status"
              :color="row.status === 'Open' ? 'primary' : 'gray'"
              variant="subtle"
            />
          </template>

          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
        </UTable>
        <!-- Number of rows & Pagination -->
        <template #footer>
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <span class="text-sm leading-5">
                Showing
                <span class="font-medium">{{ pageFrom }}</span>
                to
                <span class="font-medium">{{ pageTo }}</span>
                of
                <span class="font-medium">{{ pageTotal }}</span>
                results
              </span>
            </div>

            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="pageTotal"
              :ui="{
                wrapper: 'flex items-center gap-1',
                default: {
                  activeButton: {
                    variant: 'outline',
                  },
                },
              }"
            />
          </div>
        </template>
      </UCard>
    </div>
    <USlideover v-model="isOpen" prevent-close>
      <ApartmentRequestForm :request="request" @close="handleFormClose" />
    </USlideover>

    <UModal v-model="isDeleteOpen" prevent-close>
      <ApartmentRequestDelete
        :request="request"
        @close="isDeleteOpen = false"
      />
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const search = ref('')
const sort = ref({ column: 'id', direction: 'asc' as const })
const selectedStatus = ref('')
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value),
)
const selectedRows = ref<{ id: number }[]>([])

const isOpen = ref(false)
const isDeleteOpen = ref(false)

const request = ref({})

// Actions
const actions = [
  [
    {
      key: 'open',
      label: 'Open',
      icon: 'i-heroicons-lock-open',
    },
  ],
  [
    {
      key: 'closed',
      label: 'Closed',
      icon: 'i-heroicons-lock-closed',
    },
  ],
]

// Filters
const requestStatus = [
  {
    id: 'open',
    label: 'Open',
  },
  {
    id: 'closed',
    label: 'Closed',
  },
]

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = ''
}

const handleFormClose = () => {
  isOpen.value = false
  request.value = {}
}

const columns = [
  {
    key: 'size',
    label: 'Apartment',
    sortable: true,
  },
  {
    key: 'location',
    label: 'Location',
    sortable: true,
  },
  {
    key: 'matches',
    label: 'Match',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
  },
  {
    key: 'date',
    label: 'Date',
    sortable: true,
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
  },
]
const selectedColumns = ref(columns)
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column)),
)

const requests: ApartmentRequest[] = [
  {
    id: 1,
    size: '2 bedroom flat',
    location: 'Karu, Abuja',
    minPrice: '1,000,000',
    maxPrice: '2,000,000',
    move_in_date: '10/10/2022',
    amenities: ['parking', 'furnishing', 'balcony'],
    note: 'Please check the property for any suspicious activity',
    matches: 3,
    status: 'Open',
    date: '10 Oct, 22',
    slug: '2-bedroom-in-karu-abuja',
  },
  {
    id: 2,
    size: '3 bedroom flat',
    location: 'Oshodin, Yaba',
    minPrice: '500,000',
    maxPrice: '1,000,000',
    move_in_date: '10/10/2024',
    amenities: ['furnishing', 'balcony'],
    note: 'Ensure the landlord does not reside in the house',
    matches: 0,
    status: 'Closed',
    date: '1 May, 24',
    slug: '3-bedroom-in-oshodin-yaba',
  },
]

const items = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        request.value = row
        isOpen.value = true
      },
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        isDeleteOpen.value = true
        request.value = row
      },
    },
  ],
]

function select(row: { id: number }) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return ''
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value}&completed=${selectedStatus.value}`
  }

  return `?completed=${selectedStatus.value}`
})

// Data
const { data: requestss, pending } = await useLazyAsyncData<
  {
    id: number
    title: string
    completed: string
  }[]
>(
  'requests',
  () =>
    ($fetch as any)(
      `https://jsonplaceholder.typicode.com/todos${searchStatus.value}`,
      {
        query: {
          q: search.value,
          _page: page.value,
          _limit: pageCount.value,
          _sort: sort.value.column,
          _order: sort.value.direction,
        },
      },
    ),
  {
    default: () => [],
    watch: [page, search, searchStatus, pageCount, sort],
  },
)

console.log(requestss)
</script>
