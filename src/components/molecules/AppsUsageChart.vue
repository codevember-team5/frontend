<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer, VisTooltip } from '@unovis/vue'
// import { useAuthStore } from '@/stores/auth'
import { historyService } from '@/services/history.service'
import { GroupedBar } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const { t } = useI18n()
// const authStore = useAuthStore()
const deviceId = ref('963363238902')
const message = ref('')
const isError = ref(false)
const isLoading = ref(false)
const chartData = ref<ChartData>([])
const categories = ref<Category[]>([])

interface Category {
  category: string
  total_seconds: number
}

interface ChartDataItem {
  name: string
  hours: number
  color?: string
}

type ChartData = ChartDataItem[]
type Data = ChartData[number]
type Label = ChartData[number] & { name: string }

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

onMounted(async () => {
  await getData()

  chartData.value = categories.value.map<ChartDataItem>((category) => ({
    name: category.category,
    hours: Math.round(category.total_seconds / 3600),
    color: stringToHexColor(category.category),
  }))
})

const chartConfig = {
  name: {
    label: t('charts.appsUsage.applications'),
    color: '#60a5fa',
  },
  hours: {
    label: t('charts.appsUsage.hours'),
    color: '#2563eb',
  },
} satisfies ChartConfig

const barColor = (d: Data) => d.color

const tooltipTemplate = (d: Data) => {
  return `
    <div class="bg-white px-3 py-2 rounded-md shadow-md text-sm">
      <div class="font-semibold mb-1" style="color: ${d.color};">${d.name}</div>
      <div>
        ${chartConfig.hours.label}: <strong>${d.hours}h</strong>
      </div>
    </div>
  `
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <ChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData">
        <VisGroupedBar
          :x="(d: Data, i: number) => i"
          :y="[(d: Label) => d.hours]"
          orientation="horizontal"
          :color="barColor"
          :rounded-corners="4"
          :bar-padding="0.1"
        />
        <VisAxis
          type="x"
          :tick-line="false"
          :domain-line="false"
          :grid-line="true"
          :tick-format="(d: number) => `${d}h`"
          :label="chartConfig.hours.label"
        />
        <VisAxis
          type="y"
          :tick-line="false"
          :domain-line="false"
          :grid-line="false"
          :tick-format="(value: number) => chartData[value]?.name || ''"
          :label="chartConfig.name.label"
        />
        <VisTooltip :triggers="{ [GroupedBar.selectors.bar]: tooltipTemplate }" />
      </VisXYContainer>
    </ChartContainer>
  </div>
</template>
