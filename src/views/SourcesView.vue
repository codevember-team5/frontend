<script setup lang="ts"></script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">{{ $t('sources.title') }}</h1>
    <p class="text-sm text-slate-900">
      {{ $t('sources.subtitle') }}
    </p>

    <div class="rounded-lg border border-slate-800 p-4">
      <p class="text-sm text-slate-900">
        {{ $t('sources.tableInfo') }}<br />
        • {{ $t('sources.sourceName') }}<br />
        • {{ $t('sources.status') }}<br />
        • {{ $t('sources.other') }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
