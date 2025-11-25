<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 6)

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)

    for (let hour = 9; hour <= 17; hour++) {
      const timestamp = new Date(currentDate).setHours(hour, 0, 0, 0)
      const value = Math.floor(Math.random() * 7) + 3
      data.push({ date: timestamp, value })
    }
  }

  return data
}

const chartData = generateHourlyData()

const chartConfig = {
  attention: {
    label: t('charts.attentionArea.label'),
    color: '#8b5cf6',
  },
} satisfies ChartConfig

const x = (d: { date: number; value: number }) => d.date
const y = (d: { date: number; value: number }) => d.value

const dateFormatter = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'short',
  })
}

// Responsive chart height
const chartHeight = ref(550)
const containerRef = ref<HTMLElement | null>(null)

const updateChartHeight = () => {
  if (window.innerWidth < 640) {
    chartHeight.value = 300
  } else if (window.innerWidth < 1024) {
    chartHeight.value = 400
  } else {
    chartHeight.value = 550
  }
}

onMounted(() => {
  updateChartHeight()
  window.addEventListener('resize', updateChartHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateChartHeight)
})

// Tooltip state
const tooltipData = ref<{ date: number; value: number } | null>(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const showTooltip = ref(false)

const handleMouseMove = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const dataIndex = Math.floor((x / rect.width) * chartData.length)

  if (dataIndex >= 0 && dataIndex < chartData.length) {
    tooltipData.value = chartData[dataIndex] ?? null

    // Prevent tooltip from going off-screen
    let tooltipX = x + 10
    let tooltipY = y - 40

    // Check right boundary
    if (tooltipX + 200 > rect.width) {
      tooltipX = x - 210
    }

    // Check top boundary
    if (tooltipY < 0) {
      tooltipY = y + 20
    }

    tooltipPosition.value = { x: tooltipX, y: tooltipY }
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
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <ChartContainer :config="chartConfig">
      <div
        ref="containerRef"
        class="relative w-full overflow-hidden"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <div class="w-full">
          <VisXYContainer :data="chartData">
            <VisArea :x="x" :y="y" :color="chartConfig.attention.color" :opacity="0.6" />
            <VisAxis type="x" :tick-format="dateFormatter" :num-ticks="7" />
            <VisAxis
              type="y"
              :domain="[0, 10]"
              :grid-line="true"
              :tick-line="false"
              :tick-format="(d: number) => d"
            />
          </VisXYContainer>
        </div>

        <!-- Custom Tooltip -->
        <div
          v-if="showTooltip && tooltipData"
          class="pointer-events-none absolute z-50"
          :style="{
            left: tooltipPosition.x + 'px',
            top: tooltipPosition.y + 'px',
          }"
        >
          <div
            class="bg-white px-3 py-2 rounded-md shadow-lg text-sm border border-gray-200 whitespace-nowrap"
          >
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
</template>
