<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer, VisTooltip } from '@unovis/vue'
import { GroupedBar } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const { t } = useI18n()
const chartData = [
  { name: 'Slack', hours: 4.2 },
  { name: 'VS Code', hours: 6.5 },
  { name: 'Chrome', hours: 3.1 },
  { name: 'Figma', hours: 2.4 },
  { name: 'Postman', hours: 1.8 },
]

type Data = (typeof chartData)[number]
type Label = (typeof chartData)[number] & { name: string }

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

const tooltipTemplate = (d: Data) => {
  return `
    <div class="bg-white px-3 py-2 rounded-md shadow-md text-sm">
      <div class="font-semibold mb-1">${d.name}</div>
      <div style="color: ${chartConfig.hours.color};">
        ${chartConfig.hours.label}: <strong>${d.hours}h</strong>
      </div>
    </div>
  `
}
</script>

<template>
  <div class="w-full">
    <div class="mb-6">
      <h3 class="text-lg font-semibold">{{ $t('charts.appsUsage.title') }}</h3>
      <p class="text-sm text-muted-foreground">{{ $t('charts.appsUsage.subtitle') }}</p>
    </div>
    <ChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData" :height="300">
        <VisGroupedBar :x="(d: Data, i: number) => i" :y="[(d: Label) => d.hours]" orientation="horizontal"
          :color="chartConfig.hours.color" :rounded-corners="4" :bar-padding="0.1" />
        <VisAxis type="x" :tick-line="false" :domain-line="false" :grid-line="true"
          :tick-format="(d: number) => `${d}h`" :label="chartConfig.hours.label" />
        <VisAxis type="y" :tick-line="false" :domain-line="false" :grid-line="false"
          :tick-format="(value: number) => chartData[value]?.name || ''" :label="chartConfig.name.label" />
        <VisTooltip :triggers="{ [GroupedBar.selectors.bar]: tooltipTemplate }" />
      </VisXYContainer>
    </ChartContainer>
  </div>
</template>