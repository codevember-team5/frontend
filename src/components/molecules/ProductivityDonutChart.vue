<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const { t } = useI18n()
const chartData = [
  { name: 'Produttività', value: 60, color: '#00cc00' },
  { name: 'Distrazione', value: 30, color: '#cc0000' },
  { name: 'Pausa', value: 10, color: '#64748b' },
] as const

type Data = (typeof chartData)[number]
interface Val {
  data: Data
}

const chartConfig = {
  usage: {
    label: t('charts.productivityScore.label'),
    color: '#00cc00',
  },
} satisfies ChartConfig

// Funzioni per Unovis
const valueFn = (d: Data) => d.value
const colorFn = (d: Data) => d.color

const tooltipTemplate = (d: Val) => {
  const data = d.data
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
</script>

<template>
  <div class="flex flex-col gap-3 min-h-[300px]">
    <ChartContainer :config="chartConfig" label-key="name">
      <VisSingleContainer :data="chartData" :height="200">
        <VisDonut :value="valueFn" :color="colorFn" :arc-width="40" />
        <VisTooltip :triggers="{ [Donut.selectors.segment]: tooltipTemplate }" />
      </VisSingleContainer>

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
    </ChartContainer>
  </div>
</template>
