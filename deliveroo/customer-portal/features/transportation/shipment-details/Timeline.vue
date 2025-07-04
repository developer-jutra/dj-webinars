<template>
  <div class="w-full">
    <!-- Timeline Component -->
    <div class="relative overflow-hidden border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div class="p-8">
        <!-- Progress Line - Centered and properly positioned -->
        <div class="absolute left-8 right-8 top-20 flex items-center">
          <div class="flex-1 relative h-1 mx-6">
            <!-- Background line -->
            <div 
              class="absolute top-0 bg-green-200 dark:bg-green-800 rounded-full h-1"
              :style="{ left: '0%', right: '0%' }"
            />
            <!-- Progress line -->
            <div 
              class="absolute top-0 bg-green-500 dark:bg-green-400 rounded-full h-1 transition-all duration-700 ease-in-out"
              :style="{ width: `${calculateProgressWidth()}%` }"
            />
          </div>
        </div>

        <!-- Timeline Steps -->
        <div class="flex justify-between items-start relative z-10">
          <div 
            v-for="(status, index) in shipment.statuses" 
            :key="status.id" 
            class="flex flex-col items-center relative"
          >
            <!-- Step Circle -->
            <button
              :disabled="isStepDisabled(status)"
              @click="!isStepDisabled(status) ? handleStepClick(index) : null"
              :class="getStepCircleClasses(status, index)"
            >
              <component :is="getIconComponent(status.icon)" class="w-5 h-5" />
            </button>

            <!-- Step Label -->
            <div class="mt-3 text-center">
              <div :class="getStepLabelClasses(status, index)">
                {{ status.name }}
              </div>
              
              <div 
                v-if="status.timestamp && (status.completed || status.current)" 
                :class="getStepTimestampClasses(index)"
              >
                {{ status.timestamp }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  CubeIcon, 
  CheckIcon, 
  TruckIcon, 
  ClockIcon, 
  CreditCardIcon 
} from '@heroicons/vue/24/outline'
import type { ShipmentStatusDetail } from '~/features/transportation/shipment-listing/shipment.mocks'

interface TimelineShipment {
  id: string;
  customerName: string;
  referenceNumber: string;
  currentStep: number;
  statuses: ShipmentStatusDetail[];
}

interface TimelineProps {
  shipment: TimelineShipment
}

const props = defineProps<TimelineProps>()

const selectedStepIndex = ref(props.shipment.currentStep)

const selectedStatus = computed(() => props.shipment.statuses[selectedStepIndex.value])

const iconMap = {
  package: CubeIcon,
  check: CheckIcon,
  truck: TruckIcon,
  clock: ClockIcon,
  payment: CreditCardIcon,
}

const handleStepClick = (index: number) => {
  const step = props.shipment.statuses[index]
  if (step.completed || step.current) {
    selectedStepIndex.value = index
  }
}

const isStepDisabled = (status: ShipmentStatusDetail) => {
  return !status.completed && !status.current
}

const calculateProgressWidth = () => {
  const maxSteps = props.shipment.statuses.length - 1
  return (selectedStepIndex.value / maxSteps) * 100
}

const getIconComponent = (icon: string) => {
  return iconMap[icon as keyof typeof iconMap] || CubeIcon
}

const getStepCircleClasses = (status: ShipmentStatusDetail, index: number) => {
  const isDisabled = isStepDisabled(status)
  const isSelected = index === selectedStepIndex.value
  const isCurrent = status.current

  const baseClasses = "relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
  
  if (isSelected) {
    return `${baseClasses} bg-green-700 dark:bg-green-600 border-green-700 dark:border-green-600 text-white shadow-xl ring-4 ring-green-200 dark:ring-green-800 ${!isDisabled ? 'hover:bg-green-800 dark:hover:bg-green-700 hover:border-green-800 dark:hover:border-green-700' : ''}`
  }
  
  if (status.completed && !isSelected) {
    return `${baseClasses} bg-green-500 dark:bg-green-500 border-green-500 dark:border-green-500 text-white shadow-md ${!isDisabled ? 'hover:bg-green-600 dark:hover:bg-green-600 hover:border-green-600 dark:hover:border-green-600' : ''}`
  }
  
  if (isCurrent && !isSelected) {
    return `${baseClasses} bg-green-600 dark:bg-green-500 border-green-600 dark:border-green-500 text-white shadow-lg ${!isDisabled ? 'hover:bg-green-700 dark:hover:bg-green-600 hover:border-green-700 dark:hover:border-green-600' : ''}`
  }
  
  if (isDisabled) {
    return `${baseClasses} bg-green-200 dark:bg-green-900 border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 cursor-not-allowed`
  }
  
  return `${baseClasses} cursor-pointer hover:scale-105`
}

const getStepLabelClasses = (status: ShipmentStatusDetail, index: number) => {
  const isSelected = index === selectedStepIndex.value
  const isCurrent = status.current
  const isDisabled = isStepDisabled(status)

  const baseClasses = "text-sm font-medium transition-colors duration-200"
  
  if (isSelected) {
    return `${baseClasses} text-green-800 dark:text-green-300 font-semibold`
  }
  
  if (status.completed && !isSelected) {
    return `${baseClasses} text-green-600 dark:text-green-400`
  }
  
  if (isCurrent && !isSelected) {
    return `${baseClasses} text-green-600 dark:text-green-400`
  }
  
  if (isDisabled) {
    return `${baseClasses} text-green-400 dark:text-green-600`
  }
  
  return baseClasses
}

const getStepTimestampClasses = (index: number) => {
  const isSelected = index === selectedStepIndex.value
  const baseClasses = "text-xs mt-1 transition-colors duration-200"
  
  if (isSelected) {
    return `${baseClasses} text-green-700 dark:text-green-400`
  }
  
  return `${baseClasses} text-green-500 dark:text-green-500`
}

// Expose selected status for parent component
defineExpose({
  selectedStatus
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
