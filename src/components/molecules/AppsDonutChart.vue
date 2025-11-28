<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

interface Comp {
  process: string
  window_bucket: string
  total_seconds: number
  percentage_of_category: number
  entries_count: number
}

interface ChartDataItem {
  name: string
  value: number
  color?: string
  percentage?: number
  components: Comp[]
}

interface ChartDataWrapper {
  data: ChartDataItem
}

const { t } = useI18n()

defineProps({
  chartData: Object,
  daysData: Object,
})

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
  const categoryComponents = (data.components ?? [])
    .map(
      (component) => `
        <li class="flex items-center gap-2 justify-between">
          <div class="flex items-center gap-2">
            <span class="inline-block h-2 w-2 rounded-full bg-slate-700"></span>
            <span class="text-slate-700">
              ${component.window_bucket}
            </span>
          </div>
          <span class="font-semibold text-slate-900">
            ${component.percentage_of_category}%
          </span>
        </li>
      `,
    )
    .join('')
  return `
    <div class="bg-white px-3 py-2 rounded-md shadow-md text-sm">
      <div class="font-semibold mb-1" style="color: ${data.color};">
        ${data.name}
      </div>
      <div>
        ${chartConfig.usage.label}: <strong>${data.value}%</strong>
      </div>
      <div>
        <ul class="px-8 mb-2">
          ${categoryComponents}
        </ul>
      </div>
    </div>
  `
}
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
      <li v-for="item in chartData" :key="item.name" class="">
        <div class="flex items-center justify-between gap-3">
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
        </div>
      </li>
    </ul>
  </div>
</template>
