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
  { date: new Date('2024-01-01'), desktop: 186, mobile: 80 },
  { date: new Date('2024-02-01'), desktop: 305, mobile: 200 },
  { date: new Date('2024-03-01'), desktop: 237, mobile: 120 },
  { date: new Date('2024-04-01'), desktop: 73, mobile: 190 },
  { date: new Date('2024-05-01'), desktop: 209, mobile: 130 },
  { date: new Date('2024-06-01'), desktop: 214, mobile: 140 },
]

type Data = (typeof chartData)[number]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
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
        :x="(d: Data) => d.date"
        :y="[(d: Data) => d.desktop, (d: Data) => d.mobile]"
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
        :rounded-corners="4"
        bar-padding="0.1"
        group-padding="0"
      />
      <VisAxis
        type="x"
        :x="(d: Data) => d.date"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
        :tick-format="(d: number) => new Date(d).toLocaleDateString('it-IT', { month: 'short' })"
        :tick-values="chartData.map((d: Data) => d.date)"
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
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
