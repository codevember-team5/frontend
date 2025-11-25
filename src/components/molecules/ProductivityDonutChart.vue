<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'
import { ChartContainer } from '@/components/ui/chart'

const chartData = [
  { name: 'Produttività', value: 60, color: '#00cc00' },
  { name: 'Distrazione', value: 30, color: '#cc0000' },
  { name: 'Pausa', value: 10, color: '#64748b' },
] as const

type Data = (typeof chartData)[number]

// Config minimale per ChartContainer (serve solo per coerenza con gli altri grafici)
const chartConfig = {
  usage: {
    label: 'Percentuale',
    // Colore di default, i singoli spicchi usano comunque color dal dato
    color: '#00cc00',
  },
} satisfies ChartConfig

// Funzioni per Unovis
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
  <div class="flex flex-col gap-4 md:flex-row md:items-center">
    <!-- Donut -->
    <ChartContainer :config="chartConfig" class="w-full md:w-2/3">
      <VisSingleContainer :data="chartData" :height="220">
        <VisDonut :value="valueFn" :color="colorFn" :arc-width="32" />
        <VisTooltip :triggers="{ [Donut.selectors.segment]: tooltipTemplate }" />
      </VisSingleContainer>
    </ChartContainer>

    <!-- Legenda laterale -->
    <div class="flex flex-col gap-2 text-xs md:w-1/3">
      <div v-for="item in chartData" :key="item.name" class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: item.color }"></span>
          <span class="text-slate-700">
            {{ item.name }}
          </span>
        </div>
        <span class="font-semibold text-slate-900"> {{ item.value }}% </span>
      </div>
    </div>
  </div>
</template>
