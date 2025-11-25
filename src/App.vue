<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
    <RouterView />
    <footer class="bg-slate-900 text-white border-t border-slate-700 px-6 py-3 text-xs text-center">
      November Camp 2025 · Personal Productivity AI
    </footer>
  </div>
</template>

<style scoped></style>
