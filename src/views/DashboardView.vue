<script setup lang="ts">
import AppsDonutChart from '@/components/molecules/AppsDonutChart.vue'
import AppsUsageChart from '@/components/molecules/AppsUsageChart.vue'
import AttentionAreaChart from '@/components/molecules/AttentionAreaChart.vue'
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-bold">{{ $t('dashboard.title') }}</h1>
    <p class="text-sm text-slate-900">
      {{ $t('dashboard.subtitle') }}
    </p>

    <div class="flex flex-col gap-6">
      <div class="flex gap-6">
        <AppsUsageChart />
        <AppsDonutChart />
      </div>
      <div class="flex gap-6">
        <AttentionAreaChart />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.focusTime') }}</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.productivitySessions') }}</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.productivityScore') }}</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.distractionTime') }}</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.distractionRate') }}</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.distractionPeakHours') }}</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
    </div>

    <div class="rounded-lg border border-slate-800 p-4">
      <h2 class="text-sm font-semibold text-slate-900 mb-2">{{ $t('dashboard.insightAI') }}</h2>
      <p class="text-slate-900 text-sm">
        {{ $t('dashboard.insightText') }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
