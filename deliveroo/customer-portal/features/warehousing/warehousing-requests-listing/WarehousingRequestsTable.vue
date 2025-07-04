<template>
  <DataTable
    title="Warehousing Requests"
    description="Warehousing requests for storage and handling services"
    :data="warehousingQuery.data.value?.data || []"
    :columns="columns"
    :loading="warehousingQuery.isLoading.value"
    :error="warehousingQuery.isError.value"
    :header-actions="headerActions"
    :row-actions="rowActions"
    :pagination="paginationData"
    loading-text="Loading warehousing requests..."
    error-title="Error Loading Warehousing Requests"
    error-message="There was a problem loading your warehousing requests."
    empty-title="No Warehousing Requests"
    empty-message="No warehousing requests found matching your criteria."
    :empty-icon="BuildingStorefrontIcon"
    @retry="warehousingQuery.refetch"
    @previous-page="previousPage"
    @next-page="nextPage"
    @go-to-page="goToPage"
  >
    <!-- Request ID -->
    <template #cell-id="{ value }">
      <div class="text-sm font-medium text-gray-900 dark:text-white">
        {{ value }}
      </div>
    </template>
    
    <!-- Details with sub-details -->
    <template #cell-details="{ item, value }">
      <div>
        <div class="text-sm text-gray-900 dark:text-white">
          {{ value }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ item.subDetails }}
        </div>
      </div>
    </template>
    
    <!-- Status badge -->
    <template #cell-status="{ value }">
      <StorageStatusBadge :status="value" />
    </template>

    <!-- Priority badge -->
    <template #cell-priority="{ value }">
      <PriorityBadge :priority="value" />
    </template>

    <!-- Storage Type badge -->
    <template #cell-storageType="{ value }">
      <StorageTypeBadge :storageType="value" />
    </template>

    <!-- Volume -->
    <template #cell-volume="{ value }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ value }} m³
      </span>
    </template>
    
    <!-- Formatted date -->
    <template #cell-date="{ value }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ formatDate(value) }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { BuildingStorefrontIcon, EyeIcon, CubeIcon } from '@heroicons/vue/24/outline'
import DataTable from '~/components/ui-library/datatable/DataTable.vue'
import { useWarehousingRequestsPaginated } from './warehousing-requests-api'
import type { WarehousingRequestsFilters } from './warehousing-requests.model'
import StorageStatusBadge from '~/components/badges/StorageStatusBadge.vue'
import PriorityBadge from '~/components/badges/PriorityBadge.vue'
import StorageTypeBadge from '~/components/badges/StorageTypeBadge.vue'

interface Props {
  filters: WarehousingRequestsFilters
}

const props = defineProps<Props>()

const currentPage = ref(1)
const itemsPerPage = 10

// Use the API composable
const warehousingQuery = useWarehousingRequestsPaginated(
  computed(() => props.filters),
  currentPage,
  itemsPerPage
)

// Column definitions
const columns = [
  {
    key: 'id',
    label: 'Request ID'
  },
  {
    key: 'details',
    label: 'Storage Type & Cargo'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'priority',
    label: 'Priority'
  },
  {
    key: 'storageType',
    label: 'Storage Type'
  },
  {
    key: 'volume',
    label: 'Volume'
  },
  {
    key: 'date',
    label: 'Date Created'
  }
]

// Header actions
const headerActions = [
  {
    label: 'New Warehousing Request',
    handler: () => navigateTo('/dashboard/warehousing/new'),
    variant: 'primary' as const
  }
]

// Row actions
const rowActions = [
  {
    label: 'View Details',
    handler: (item: any) => navigateTo(`/dashboard/requests/warehousing/${item.id}`),
    icon: EyeIcon
  },
  {
    label: 'View Inventory',
    handler: (item: any) => {
      // Navigate to inventory view when available
      console.log('View inventory for:', item.id)
    },
    icon: CubeIcon,
    condition: (item: any) => ['STORED', 'RECEIVED'].includes(item.status)
  }
]

// Utility functions
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

// Computed values for pagination
const totalPages = computed(() => {
  const data = warehousingQuery.data.value
  return data ? Math.ceil(data.total / itemsPerPage) : 0
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const paginationData = computed(() => ({
  currentPage: currentPage.value,
  totalPages: totalPages.value,
  total: warehousingQuery.data.value?.total || 0,
  startIndex: startIndex.value,
  endIndex: endIndex.value,
  visiblePages: visiblePages.value
}))

// Actions
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Watch for filter changes to reset pagination
watch(() => props.filters, () => {
  currentPage.value = 1
}, { deep: true })
</script> 