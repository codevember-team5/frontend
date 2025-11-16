<script setup lang="ts"></script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <p class="text-sm text-slate-900">
      Spazio per mostrare KPI, grafici e un riassunto della produttività.
    </p>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">Focus time</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">Productivity Sessions</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">Productivity score</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">Distraction time</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">Distraction rate</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">Distraction Peak Hours</h2>
        <p class="mt-2 text-2xl font-bold">–</p>
      </div>
    </div>

    <div class="rounded-lg border border-slate-800 p-4">
      <h2 class="text-sm font-semibold text-slate-900 mb-2">Insight AI</h2>
      <p class="text-slate-900 text-sm">
        Spazio per mostrare un testo generato dall'AI sui pattern.
      </p>
    </div>
  </section>
</template>

<style scoped></style>
