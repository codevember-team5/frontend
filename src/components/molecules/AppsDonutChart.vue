<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const chartData = [
  { name: 'Slack', value: 15, color: '#E01E5A' },
  { name: 'VS Code', value: 40, color: '#007ACC' },
  { name: 'Chrome', value: 20, color: '#4285F4' },
  { name: 'Figma', value: 10, color: '#F24E1E' },
  { name: 'Pause', value: 15, color: '#64748b' },
]

type Data = (typeof chartData)[number]

const chartConfig = {
  usage: {
    label: 'Utilizzo applicazioni',
    color: '#2563eb',
  },
} satisfies ChartConfig

const valueFn = (d: Data) => d.value
const colorFn = (d: Data) => d.color

const tooltipTemplate = (d: Data) => {
  const data = (d as any).data ? (d as any).data : d
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
  <div class="w-full">
    <ChartContainer :config="chartConfig" class="min-h-[200px] w-full" :label-key="'name'">
      <VisSingleContainer :data="chartData" :height="260">
        <VisDonut :value="valueFn" :color="colorFn" :arc-width="40" />
        <VisTooltip :triggers="{ [Donut.selectors.segment]: tooltipTemplate }" />
      </VisSingleContainer>
    </ChartContainer>
  </div>
</template>
