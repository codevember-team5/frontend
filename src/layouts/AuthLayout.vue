<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastContainer from '@/components/ui/ToastContainer.vue'
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <ToastContainer />
        <RouterView />
    </div>
</template>
