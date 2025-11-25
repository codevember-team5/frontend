<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer, VisTooltip } from '@unovis/vue'
import { GroupedBar } from '@unovis/ts' // Imported core class
import { ChartContainer } from '@/components/ui/chart'

const chartData = [
  { name: 'Slack', hours: 4.2, color: '#E01E5A' },
  { name: 'VS Code', hours: 6.5, color: '#007ACC' },
  { name: 'Chrome', hours: 3.1, color: '#4285F4' },
  { name: 'Figma', hours: 2.4, color: '#F24E1E' },
  { name: 'Pause', hours: 1.8, color: '#64748b' },
]

type Data = (typeof chartData)[number]
type Label = (typeof chartData)[number] & { name: string }

const chartConfig = {
  name: {
    label: 'Applications',
    color: '#60a5fa',
  },
  hours: {
    label: 'Hours',
    color: '#2563eb',
  },
} satisfies ChartConfig

const barColor = (d: Data) => d.color

const tooltipTemplate = (d: Data) => {
  return `
    <div class="bg-white px-3 py-2 rounded-md shadow-md text-sm">
      <div class="font-semibold mb-1">${d.name}</div>
      <div style="color: ${d.color};">
        ${chartConfig.hours.label}: <strong>${d.hours}h</strong>
      </div>
    </div>
  `
}
</script>

<template>
  <div class="w-full">
    <ChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData" :height="260">
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
