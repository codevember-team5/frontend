<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer, VisTooltip } from '@unovis/vue'
import { GroupedBar } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const { t } = useI18n()

defineProps({
  chartData: Object,
})

interface ChartDataItem {
  name: string
  hours: number
  color?: string
}

type ChartData = ChartDataItem[]
type Data = ChartData[number]
type Label = ChartData[number] & { name: string }

const formatTime = (min: number) => {
  const h = Math.floor(min / 60)
  const m = Math.floor(min % 60)
  return `${h}h ${String(m).padStart(2, '0')}m`
}

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
        ${chartConfig.hours.label}: <strong>${formatTime(d.hours)}</strong>
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
          :tick-format="(d: number) => formatTime(d)"
          :label="chartConfig.hours.label"
        />
        <VisAxis
          type="y"
          :tick-line="false"
          :domain-line="false"
          :grid-line="false"
          :label="chartConfig.name.label"
          :tick-format="(value: number) => chartData?.[value]?.name || ''"
        />
        <VisTooltip :triggers="{ [GroupedBar.selectors.bar]: tooltipTemplate }" />
      </VisXYContainer>
    </ChartContainer>
  </div>
</template>
