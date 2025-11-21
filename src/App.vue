<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
/* import { Button } from '@/components/ui/button' */
import ExampleChart from '@/components/molecules/ExampleChart.vue'
import AppsUsageChart from './components/molecules/AppsUsageChart.vue'

/* function handleClick() {
  alert('cliccato!')
} */
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
    <header
      class="border-b border-slate-800 bg-slate-900 text-white px-6 py-4 flex items-center justify-between"
    >
      <div class="font-semibold text-lg">Personal Productivity AI</div>

      <nav class="space-x-4 text-sm">
        <RouterLink to="/dashboard" class="hover:underline"> Dashboard </RouterLink>
        <RouterLink to="/patterns" class="hover:underline"> My Patterns </RouterLink>
        <RouterLink to="/sources" class="hover:underline"> Data Sources </RouterLink>
      </nav>
    </header>

    <main class="p-6 flex-1">
      <!--  <Button @click="handleClick"> Cliccami 👋 - Prova bottone </Button> -->
      <AppsUsageChart> </AppsUsageChart>
      <ExampleChart />
      <RouterView />
    </main>
    <footer class="bg-slate-900 text-white border-t border-slate-700 px-6 py-3 text-xs text-center">
      November Camp 2025 · Personal Productivity AI
    </footer>
  </div>
</template>

<style scoped></style>
