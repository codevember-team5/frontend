<script setup lang="ts">
import AppsDonutChart from '@/components/molecules/AppsDonutChart.vue'
import AppsUsageChart from '@/components/molecules/AppsUsageChart.vue'
import AttentionAreaChart from '@/components/molecules/AttentionAreaChart.vue'
import ProductivityDonutChart from '@/components/molecules/ProductivityDonutChart.vue'

const appsLegend = [
  { name: 'Slack', value: 15, color: '#E01E5A' },
  { name: 'VS Code', value: 40, color: '#007ACC' },
  { name: 'Chrome', value: 20, color: '#4285F4' },
  { name: 'Figma', value: 10, color: '#F24E1E' },
  { name: 'Pause', value: 15, color: '#64748b' },
]
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-bold">{{ $t('dashboard.title') }}</h1>
    <p class="text-sm text-slate-900">
      {{ $t('dashboard.subtitle') }}
    </p>

    <!-- Prima riga: Focus time + Productivity sessions + KPI placeholder -->
    <div class="grid gap-4 md:grid-cols-3">
      <!-- Focus time + istogramma orizzontale -->
      <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.focusTime') }}</h2>
          <p class="text-xs text-slate-500">Distribuzione del tempo per applicazione (ore)</p>
        </div>
        <AppsUsageChart />
      </div>

      <!-- Productivity sessions + torta ad anello + legenda -->
      <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.productivitySessions') }}</h2>
          <p class="text-xs text-slate-500">Percentuale di utilizzo per applicazione</p>
        </div>

        <div class="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] items-center">
          <AppsDonutChart />

          <!-- Legenda affiancata -->
          <ul class="space-y-2 text-xs">
            <li
              v-for="item in appsLegend"
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
        </div>
      </div>

      <!-- Terzo riquadro: placeholder KPI aggiuntivo -->
      <div class="rounded-lg bg-white p-4 flex flex-col gap-2 border border-slate-800 h-90">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.productivityScore') }}</h2>
        <p class="mt-1 text-xs text-slate-500">
          Distribuzione percentuale (0–100%) del tempo di lavoro e di pausa
        </p>
        <ProductivityDonutChart />
      </div>
    </div>

    <!-- Seconda riga: grafico a tutta larghezza per il livello di concentrazione -->
    <div class="rounded-lg bg-white p-4 border border-slate-800">
      <!--  space-y-3 -->
      <div class="mb-3">
        <h2 class="text-sm font-semibold text-slate-900">Livello di concentrazione</h2>
        <p class="text-xs text-slate-500">
          Valori da 0 a 10 negli ultimi 7 giorni, fascia oraria 9:00–17:00.
        </p>
      </div>
      <AttentionAreaChart />
    </div>
  </section>
</template>

<style scoped></style>
