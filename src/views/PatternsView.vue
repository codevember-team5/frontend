<script setup lang="ts"></script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">{{ $t('patterns.title') }}</h1>
    <p class="text-sm text-slate-900">
      {{ $t('patterns.subtitle') }}
    </p>

    <div class="space-y-3">
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('patterns.exampleTitle') }}</h2>
        <p class="mt-1 text-sm text-slate-900">{{ $t('patterns.exampleContent') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
