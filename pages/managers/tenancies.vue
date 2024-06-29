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
            <DashboardTitle text="Tenancies" badge-label="10" show-badge />
            <UButton
              icon="i-heroicons-plus-16-solid"
              label="Add"
              @click="isOpen = true"
            />
          </div>
          <p class="text-sm text-gray-500">View and manage your tenancies</p>
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
            :options="tenancyStatus"
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
          :rows="yourTenancies"
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
              <span class="italic text-sm">No tenants yet!</span>
              <UButton
                icon="i-heroicons-plus-16-solid"
                label="Add"
                @click="isOpen = true"
              />
            </div>
          </template>

          <template #status-data="{ row }">
            <UBadge
              :label="row.status"
              :color="statusColor(row.status)"
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
      <TenancyForm :tenancy="tenancy" @close="handleFormClose" />
    </UModal>

    <UModal v-model="isDeleteOpen" prevent-close>
      <TenancyDelete :tenancy="tenancy" @close="isDeleteOpen = false" />
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

const tenancy = ref({})

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
const tenancyStatus = [
  {
    key: 'active',
    label: 'Active',
    value: false,
  },
  {
    key: 'past-due',
    label: 'Past Due',
    value: true,
  },
  {
    key: 'inactive',
    label: 'Inactive',
    value: true,
  },
]

function statusColor(status: string) {
  if (status === 'Active') {
    return 'primary'
  } else if (status === 'Past Due') {
    return 'red'
  } else {
    return 'gray'
  }
}

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = []
}

const handleFormClose = () => {
  isOpen.value = false
  tenancy.value = {}
}

const columns = [
  {
    key: 'apartment',
    label: 'Apartment',
    sortable: true,
  },
  {
    key: 'tenant',
    label: 'Tenant',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
  },
  {
    key: 'duration',
    label: 'Duration',
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

const yourTenancies = [
  {
    id: 1,
    apartment: 'Yauri Flat A1',
    tenant: 'Kennedy Ekhator',
    status: 'Active',
    duration: '4 Jan, 17 - 15 Jan, 18',
    startDate: '10/01/2021',
    endDate: '11/01/2021',
  },
  {
    id: 2,
    apartment: 'Egbema Studio B1',
    tenant: 'Felix Agyemang',
    status: 'Inactive',
    duration: '13 Aug, 20 - 13 Aug, 21',
    startDate: '10/01/2022',
    endDate: '11/01/2022',
  },
]

const items = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        tenancy.value = row
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
        tenancy.value = row
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
const { data: tenancies, pending } = await useLazyAsyncData<
  {
    id: number
    title: string
    completed: string
  }[]
>(
  'tenancy',
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

console.log(tenancies.value[0].completed)
</script>
