<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">{{ $t('profile.title') }}</h1>

        <div class="flex flex-col md:flex-row gap-8">
            <aside class="w-full md:w-64 shrink-0">
                <nav class="space-y-1">
                    <RouterLink to="/profile" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                        :class="[
                            isActive('/profile')
                                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white',
                        ]">
                        {{ $t('profile.nav.personalInfo') }}
                    </RouterLink>
                    <RouterLink to="/profile/devices"
                        class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[
                            isActive('/profile/devices')
                                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white',
                        ]">
                        {{ $t('profile.nav.devices') }}
                    </RouterLink>
                </nav>
            </aside>

            <main class="flex-1">
                <RouterView />
            </main>
        </div>
    </div>
</template>
