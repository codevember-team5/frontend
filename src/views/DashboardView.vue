<script setup lang="ts">
import AppsDonutChart from '@/components/molecules/AppsDonutChart.vue'
import AppsUsageChart from '@/components/molecules/AppsUsageChart.vue'
import AttentionAreaChart from '@/components/molecules/AttentionAreaChart.vue'
import ProductivityDonutChart from '@/components/molecules/ProductivityDonutChart.vue'
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-bold">{{ $t('dashboard.title') }}</h1>

    <!-- Prima riga: Focus time + Productivity sessions + KPI placeholder -->

    <!-- Focus time + istogramma orizzontale -->
    <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
      <div>
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.focusTime') }}</h2>
        <p class="text-xs text-slate-500">{{ $t('charts.appsUsage.title') }}</p>
      </div>
      <AppsUsageChart />
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Productivity sessions + torta ad anello + legenda -->
      <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">
            {{ $t('dashboard.productivitySessions') }}
          </h2>
          <p class="text-xs text-slate-500">{{ $t('charts.appsDonut.title') }}</p>
        </div>
        <AppsDonutChart />
      </div>

      <!-- Terzo riquadro: placeholder KPI aggiuntivo -->
      <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">
            {{ $t('dashboard.productivityScore') }}
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            {{ $t('charts.productivityScore.title') }}
          </p>
        </div>
        <ProductivityDonutChart />
      </div>
    </div>

    <!-- Seconda riga: grafico a tutta larghezza per il livello di concentrazione -->
    <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
      <div class="mb-12 md:mb-auto">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('charts.attentionArea.title') }}</h2>
        <p class="text-xs text-slate-500">
          {{ $t('charts.attentionArea.subtitle') }}
        </p>
      </div>
      <AttentionAreaChart />
    </div>
  </section>
</template>

<style scoped></style>
