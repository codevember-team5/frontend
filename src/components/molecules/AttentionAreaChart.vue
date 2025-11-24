<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisXYContainer, VisArea, VisAxis } from '@unovis/vue'
import { ChartContainer } from '@/components/ui/chart'

const { t, locale } = useI18n()
// Generate hourly data for the last 7 days (9:00 - 17:00)
const generateHourlyData = () => {
  const data = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Start from 6 days ago
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 6)

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)

    for (let hour = 9; hour <= 17; hour++) {
      const timestamp = new Date(currentDate).setHours(hour, 0, 0, 0)
      // Random value between 3 and 9 for realistic attention levels
      const value = Math.floor(Math.random() * 7) + 3
      data.push({ date: timestamp, value })
    }
  }
  return data
}

const chartData = generateHourlyData()

console.log(JSON.stringify(chartData), 'AttentionAreaChart')

type Data = (typeof chartData)[number]

const chartConfig = {
  attention: {
    label: t('charts.attentionArea.label'),
    color: '#8b5cf6',
  },
} satisfies ChartConfig

const x = (d: Data) => d.date
const y = (d: Data) => d.value

// Date formatter for X axis - always shows day and month
const dateFormatter = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'short'
  })
}

// Tooltip data
const tooltipData = ref<Data | null>(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const showTooltip = ref(false)

// Tooltip handlers
const handleMouseMove = (event: MouseEvent) => {
  const container = event.currentTarget as HTMLElement
  const rect = container.getBoundingClientRect()
  const x = event.clientX - rect.left

  // Calculate which data point we're hovering over
  const dataIndex = Math.floor((x / rect.width) * chartData.length)

  if (dataIndex >= 0 && dataIndex < chartData.length) {
    tooltipData.value = chartData[dataIndex] ?? null
    tooltipPosition.value = { x: event.clientX, y: event.clientY }
    showTooltip.value = true
  }
}

const handleMouseLeave = () => {
  showTooltip.value = false
}

const formatTooltipDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="w-full">
    <div>
      <h3 class="text-lg font-semibold">{{ $t('charts.attentionArea.title') }}</h3>
      <p class="text-sm text-muted-foreground">{{ $t('charts.attentionArea.subtitle') }}</p>
    </div>
    <div>
      <ChartContainer :config="chartConfig">
        <div class="relative" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
          <VisXYContainer :data="chartData" :height="300">
            <VisArea :x="x" :y="y" :color="chartConfig.attention.color" :opacity="0.6" />
            <VisAxis type="x" :tick-format="dateFormatter" :num-ticks="7" />
            <VisAxis type="y" :domain="[0, 10]" :grid-line="true" :tick-line="false" :tick-format="(d: number) => d" />
          </VisXYContainer>

          <!-- Custom Tooltip -->
          <div v-if="showTooltip && tooltipData" class="fixed pointer-events-none z-50" :style="{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y - 10}px`,
          }">
            <div class="bg-white px-3 py-2 rounded-md shadow-lg text-sm border border-gray-200">
              <div class="font-semibold mb-1" :style="{ color: chartConfig.attention.color }">
                {{ formatTooltipDate(tooltipData.date) }}
              </div>
              <div class="text-gray-700">
                {{ $t('charts.attentionArea.level') }}: <strong>{{ tooltipData.value }}/10</strong>
              </div>
            </div>
          </div>
        </div>
      </ChartContainer>
    </div>
  </div>
</template>