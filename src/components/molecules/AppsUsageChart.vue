<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'

const chartData = [
  { name: 'Slack', hours: 4.2 },
  { name: 'VS Code', hours: 6.5 },
  { name: 'Chrome', hours: 3.1 },
  { name: 'Figma', hours: 2.4 },
  { name: 'Postman', hours: 1.8 },
]

type Data = (typeof chartData)[number]

const chartConfig = {
  hours: {
    label: 'Hours',
    color: '#2563eb',
  },
  name: {
    label: 'Applications',
    color: '#60a5fa',
  },
} satisfies ChartConfig

// crea la funzione template tipizzata
const tooltipTemplate = componentToString(chartConfig, ChartTooltipContent, {
  labelFormatter: (d: number) =>
    new Date(d).toLocaleDateString('it-IT', { month: 'long', day: 'numeric' }),
})
</script>

<template>
  <ChartContainer :config="chartConfig" class="min-h-[200px] w-full">
    <VisXYContainer :data="chartData">
      <VisGroupedBar
        :x="(d: Data) => d.hours"
        :y="[(d: Data) => d.name]"
        :color="[chartConfig.hours.color, chartConfig.name.color]"
        :rounded-corners="4"
        bar-padding="0.1"
        group-padding="0"
      />
      <VisAxis
        type="x"
        :x="(d: Data) => d.hours"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
        :tick-format="(d: Data) => d.name"
        :tick-values="chartData.map((d: Data) => d.hours)"
      />
      <VisAxis
        type="y"
        :tick-format="(d: number) => ''"
        :tick-line="false"
        :domain-line="false"
        :grid-line="true"
      />
      <ChartTooltip />
      <ChartCrosshair
        :template="tooltipTemplate"
        :color="[chartConfig.hours.color, chartConfig.name.color]"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
