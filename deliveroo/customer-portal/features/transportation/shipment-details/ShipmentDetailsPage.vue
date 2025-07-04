<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <NuxtLink to="/dashboard/transportation" class="text-success-600 hover:text-success-500 dark:text-success-400 flex items-center">
          <ArrowLeftIcon class="w-5 h-5 mr-1" />
          Back to Shipments
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-4">Shipment {{ id }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Detailed view of shipment</p>
      </div>
    </div>

    <div v-if="isLoading" class="card p-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-500 dark:text-gray-400">Loading shipment details...</p>
    </div>

    <div v-else-if="isError" class="card p-8 text-center">
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
        <ExclamationTriangleIcon class="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Shipment</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">There was a problem loading the shipment details.</p>
      <button @click="refetch" class="btn-primary">Try Again</button>
    </div>

    <div v-else-if="shipment" class="space-y-8">
      <!-- Timeline Component -->
      <Timeline 
        v-if="shipment?.timelineStatuses" 
        ref="timelineRef" 
        :shipment="{ 
          id: shipment.id, 
          customerName: shipment.pickupLocation.contactPerson, 
          referenceNumber: shipment.shipmentNumber, 
          currentStep: shipment.currentTimelineStep || 0, 
          statuses: shipment.timelineStatuses 
        }" 
      />
      
      <!-- Overview -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Overview</h2>
          <span v-if="selectedTimelineStatus" :class="['inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', selectedTimelineStatus.completed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : selectedTimelineStatus.current ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200']">
            {{ selectedTimelineStatus.completed ? 'Completed' : selectedTimelineStatus.current ? 'In Progress' : 'Pending' }}
          </span>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Shipment #</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ shipment.shipmentNumber }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Service Type</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatServiceType(shipment.serviceType) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatStatus(shipment.priority) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedTimelineStatus?.name || 'N/A' }}</dd>
          </div>
        </div>
      </div>

      <!-- Route -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Route</h3>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Pickup
            </h4>
            <p class="text-sm text-gray-900 dark:text-white">{{ shipment.timelineStatuses?.[0]?.details?.shipmentDetails?.originAddress || shipment.pickupLocation.address.street }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ shipment.timelineStatuses?.[0]?.details?.shipmentDetails?.originAddress || `${shipment.pickupLocation.address.city}, ${shipment.pickupLocation.address.country}` }}</p>
          </div>
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Delivery
            </h4>
            <p class="text-sm text-gray-900 dark:text-white">{{ shipment.timelineStatuses?.[0]?.details?.shipmentDetails?.destinationAddress || shipment.deliveryLocation.address.street }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ shipment.timelineStatuses?.[0]?.details?.shipmentDetails?.destinationAddress || `${shipment.deliveryLocation.address.city}, ${shipment.deliveryLocation.address.country}` }}</p>
          </div>
        </div>
      </div>

      <!-- Timing -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Timing</h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Pickup</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ shipment.timelineStatuses?.[0]?.details?.shipmentDetails?.preferredPickupDate || formatDate(shipment.scheduledPickupDate) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Delivery</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ shipment.timelineStatuses?.[0]?.details?.shipmentDetails?.deliveryDeadline || formatDate(shipment.scheduledDeliveryDate) }}</dd>
          </div>
          <div v-if="shipment.timelineStatuses?.[2]?.details?.pickupExecution?.actualPickupTime">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Actual Pickup</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ shipment.timelineStatuses?.[2]?.details?.pickupExecution?.actualPickupTime }}</dd>
          </div>
          <div v-if="shipment.timelineStatuses?.[4]?.details?.deliveryExecution?.actualDeliveryTime && shipment.timelineStatuses?.[4]?.details?.deliveryExecution?.actualDeliveryTime !== 'Pending'">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Actual Delivery</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ shipment.timelineStatuses?.[4]?.details?.deliveryExecution?.actualDeliveryTime }}</dd>
          </div>
        </div>
      </div>

      <!-- Timeline Status Details -->
      <div v-if="selectedTimelineStatus" class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ selectedTimelineStatus.name }} Details</h3>
          <span v-if="selectedTimelineStatus.timestamp" class="text-sm text-gray-500 dark:text-gray-400">
            {{ selectedTimelineStatus.timestamp }}
          </span>
        </div>
        <div class="space-y-6">
          <div v-for="(sectionData, sectionKey) in selectedTimelineStatus.details" :key="String(sectionKey)" class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
              {{ formatSectionTitle(String(sectionKey)) }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(value, key) in sectionData" :key="String(key)" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <dt class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {{ formatFieldName(String(key)) }}
                </dt>
                <dd class="text-sm text-gray-900 dark:text-white font-medium">
                  {{ formatValue(value) }}
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!selectedTimelineStatus.completed && !selectedTimelineStatus.current" class="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-gray-300 dark:border-gray-500">
          <p class="text-sm text-gray-600 dark:text-gray-300 italic">
            This step is pending and will be updated once the previous steps are completed.
          </p>
        </div>
        
        <div v-if="selectedTimelineStatus.current" class="mt-6 bg-green-50 dark:bg-green-900 p-4 rounded-lg border-l-4 border-green-400 dark:border-green-500">
          <p class="text-sm text-green-800 dark:text-green-200 font-medium">
            🚀 This step is currently in progress. Updates will be available soon.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useRoute } from '#app'
import { useShipmentDetails } from './shipment-details-api'
import type { Shipment } from '~/features/transportation/shipment-listing/shipment.model'
import type { EnhancedShipment } from '~/features/transportation/shipment-listing/shipment.mocks'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import Timeline from './Timeline.vue'

const route = useRoute()
const id = route.params.id as string
const { data: shipment, isLoading, isError, refetch } = useShipmentDetails(id) as unknown as { data: Ref<EnhancedShipment>; isLoading: Ref<boolean>; isError: Ref<boolean>; refetch: () => void }

const timelineRef = ref<InstanceType<typeof Timeline>>()
const selectedTimelineStatus = computed(() => timelineRef.value?.selectedStatus)

function formatServiceType(type: string) {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}
function formatStatus(status: string) {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}
function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    SCHEDULED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    PICKUP_SCHEDULED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    IN_TRANSIT: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    OUT_FOR_DELIVERY: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    COMPLETED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    AWAITING_PAYMENT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    PAID: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

function formatSectionTitle(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function formatFieldName(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function formatValue(value: any) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  return value || 'N/A'
}

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
</script>
