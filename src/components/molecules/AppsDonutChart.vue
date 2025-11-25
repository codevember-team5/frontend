<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
// import { useAuthStore } from '@/stores/auth'
import { historyService } from '@/services/history.service'
import { Donut } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const { t } = useI18n()
// const authStore = useAuthStore()
const deviceId = ref('963363238902')
const message = ref('')
const isError = ref(false)
const isLoading = ref(false)
const chartData = ref<ChartData>([])
const categories = ref<Category[]>([])

interface ChartDataWrapper {
  data: ChartDataItem
}
interface Category {
  category: string
  percentage: number
}

interface ChartDataItem {
  name: string
  value: number
  color?: string
  percentage?: number
}

type ChartData = ChartDataItem[]

const stringToHexColor = (str: string) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, '0')
  }

  return color
}

const getData = async () => {
  if (!deviceId.value) return
  isLoading.value = true
  message.value = ''
  isError.value = false
  try {
    const today = new Date().toISOString().split('T')[0] ?? ''
    const result = await historyService.getActivitySummary(deviceId.value, today, today)
    categories.value = result.categories
    return categories.value
  } catch (error) {
    console.error(error)
    isError.value = true
    message.value = t('devices.assignError')
  } finally {
    isLoading.value = false
  }
}

const chartConfig = {
  usage: {
    label: t('charts.appsDonut.label'),
    color: '#2563eb',
  },
} satisfies ChartConfig

const valueFn = (d: ChartDataItem) => d.value
const colorFn = (d: ChartDataItem) => d.color

const tooltipTemplate = (d: ChartDataWrapper) => {
  const data = d.data as ChartDataItem
  return `
    <div class="bg-white px-3 py-2 rounded-md shadow-md text-sm">
      <div class="font-semibold mb-1" style="color: ${data.color};">
        ${data.name}
      </div>
      <div>
        ${chartConfig.usage.label}: <strong>${data.value}%</strong>
      </div>
    </div>
  `
}

onMounted(async () => {
  await getData()

  chartData.value = categories.value.map<ChartDataItem>((category) => ({
    name: category.category,
    value: category.percentage,
    color: stringToHexColor(category.category),
  }))
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-[300px]">
    <ChartContainer :config="chartConfig" label-key="name">
      <VisSingleContainer :data="chartData" :height="200">
        <VisDonut :value="valueFn" :color="colorFn" :arc-width="40" />
        <VisTooltip :triggers="{ [Donut.selectors.segment]: tooltipTemplate }" />
      </VisSingleContainer>
    </ChartContainer>

    <!-- Legenda affiancata -->
    <ul class="space-y-2 text-xs">
      <li
        v-for="item in chartData"
        :key="item.name"
        class="flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-2">
          <span
            class="inline-block h-3 w-3 rounded-full"
            :style="{ backgroundColor: item.color }"
          />
          <span class="text-slate-700">
            {{ item.name }}
          </span>
        </div>
        <span class="font-semibold text-slate-900"> {{ item.value }}% </span>
      </li>
    </ul>
  </div>
</template>
