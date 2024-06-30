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
              v-if="apartments.length < 10"
              icon="i-heroicons-plus-16-solid"
              label="Add"
              @click="isOpen = true"
            />
          </div>
          <p class="text-sm text-gray-500">Here are your apartment requests</p>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <UInput
            v-model="search"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search..."
          />

          <USelectMenu
            v-model="selectedStatus"
            :options="requestStatus"
            multiple
            placeholder="Status"
            class="w-40"
          />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
          <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows per page:</span>

            <USelect
              v-model="pageCount"
              :options="[3, 5, 10, 20, 30, 40]"
              class="me-2 w-15"
              size="xs"
            />
          </div>

          <div class="flex gap-1.5 items-center">
            <UDropdown
              v-if="selectedRows.length > 1"
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

            <USelectMenu v-model="selectedColumns" :options="columns" multiple>
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
          :rows="apartments"
          class="border min-h-96 text-gray-700"
          :ui="{
            td: { base: 'max-w-[0] truncate' },
            default: { checkbox: { color: 'gray' } },
          }"
          @select="select"
        >
          <template #empty-state>
            <div class="flex flex-col items-center justify-center py-48 gap-3">
              <Icon name="i-heroicons-circle-stack-20-solid" />
              <span class="italic text-sm">No requests yet!</span>
              <UButton
                icon="i-heroicons-plus-16-solid"
                label="Add"
                @click="isOpen = true"
              />
            </div>
          </template>

          <template #matches-data="{ row }">
            <UBadge :label="row.matches" color="primary" variant="subtle" />
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
    <UModal v-model="isOpen" prevent-close>
      <ApartmentRequestForm :request="request" @close="handleFormClose" />
    </UModal>

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
const selectedStatus = ref<{ value: string }[]>([])
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
      key: 'completed',
      label: 'Completed',
      icon: 'i-heroicons-check',
    },
  ],
  [
    {
      key: 'uncompleted',
      label: 'In Progress',
      icon: 'i-heroicons-arrow-path',
    },
  ],
]

// Filters
const requestStatus = [
  {
    key: 'open',
    label: 'Open',
    value: false,
  },
  {
    key: 'closed',
    label: 'Closed',
    value: true,
  },
]

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = []
}

const handleFormClose = () => {
  isOpen.value = false
  request.value = {}
}

const columns = [
  {
    key: 'size',
    label: 'Apartments',
    sortable: true,
  },
  {
    key: 'matches',
    label: 'Matches',
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

const apartments = [
  {
    id: 1,
    size: '2 bedroom apartment in Karu, Abuja',
    location: 'Karu, Abuja',
    price: '5,000,000',
    move_in_date: '10/10/2022',
    amenities: ['parking', 'furnishing', 'balcony'],
    note: 'Please check the property for any suspicious activity',
    matches: '3',
    status: 'Open',
    date: '10/10/2022',
  },
  {
    id: 2,
    size: '3 bedroom apartment in Oshodin, Yaba',
    location: 'Oshodin, Yaba',
    price: '1,000,000',
    move_in_date: '10/10/2024',
    amenities: ['furnishing', 'balcony'],
    note: 'Ensure the landlord does not reside in the house',
    matches: '0',
    status: 'Closed',
    date: '10/10/2024',
  },
  {
    id: 3,
    size: 'Self Contained apartment in Ikpoba-hill, Benin City',
    location: 'Ikpoba-hill, Benin City',
    price: '800,000',
    move_in_date: '10/10/2023',
    amenities: ['furnishing', 'balcony', 'borehole', 'fencing'],
    note: 'Please check the property for any suspicious activity',
    matches: '5',
    status: 'Open',
    date: '10/10/2023',
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
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
  }

  return `?completed=${selectedStatus.value[0].value}`
})

// Data
const { data: requests, pending } = await useLazyAsyncData<
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

console.log(requests)
</script>
