<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logoUrl from '@/assets/logo.png'
</script>

<template>
    <div class="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
        <header class="border-b border-slate-800 bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div class="font-semibold text-lg flex items-center gap-3">
                <img :src="logoUrl" alt="Logo" class="h-8 w-auto" />
                Personal Productivity AI
            </div>

            <nav class="flex items-center space-x-4 text-sm">
                <RouterLink to="/dashboard" class="hover:underline"> Dashboard </RouterLink>
                <RouterLink to="/patterns" class="hover:underline"> My Patterns </RouterLink>
                <RouterLink to="/sources" class="hover:underline"> Data Sources </RouterLink>
                <RouterLink to="/users" class="hover:underline"> Users </RouterLink>

                <RouterLink to="/profile" class="ml-4">
                    <div
                        class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold hover:bg-indigo-600 transition-colors">
                        AM
                    </div>
                </RouterLink>
            </nav>
        </header>

        <main class="p-6 flex-1">
            <RouterView />
        </main>
        <footer class="bg-slate-900 text-white border-t border-slate-700 px-6 py-3 text-xs text-center">
            November Camp 2025 · Personal Productivity AI
        </footer>
    </div>
</template>
