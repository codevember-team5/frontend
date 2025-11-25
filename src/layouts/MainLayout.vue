<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import logoUrl from '@/assets/logo.png'
import ToastContainer from '@/components/ui/ToastContainer.vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
}
</script>

<template>
    <div class="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
        <ToastContainer />

        <header class="border-b border-slate-800 bg-slate-900 text-white px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="font-semibold text-lg flex items-center gap-3">
                    <img :src="logoUrl" alt="Logo" class="h-8 w-auto" />
                    <span class="hidden sm:inline">{{ $t('app.title') }}</span>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-4 text-sm">
                    <RouterLink to="/dashboard" class="hover:underline"> {{ $t('nav.dashboard') }} </RouterLink>
                    <RouterLink to="/patterns" class="hover:underline"> {{ $t('nav.patterns') }} </RouterLink>
                    <RouterLink to="/sources" class="hover:underline"> {{ $t('nav.sources') }} </RouterLink>
                    <RouterLink to="/users" class="hover:underline"> {{ $t('nav.users') }} </RouterLink>

                    <RouterLink to="/profile" class="ml-4">
                        <div
                            class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold hover:bg-indigo-600 transition-colors">
                            AM
                        </div>
                    </RouterLink>
                </nav>

                <!-- Mobile Menu Button -->
                <div class="md:hidden flex items-center gap-3">
                    <RouterLink to="/profile" @click="closeMobileMenu">
                        <div
                            class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold hover:bg-indigo-600 transition-colors">
                            AM
                        </div>
                    </RouterLink>
                    <button @click="toggleMobileMenu" class="text-white focus:outline-none">
                        <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation Menu -->
            <transition enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2">
                <nav v-if="mobileMenuOpen" class="md:hidden mt-4 pb-2 flex flex-col space-y-2">
                    <RouterLink to="/dashboard" @click="closeMobileMenu"
                        class="px-3 py-2 rounded hover:bg-slate-800 transition-colors">
                        {{ $t('nav.dashboard') }}
                    </RouterLink>
                    <RouterLink to="/patterns" @click="closeMobileMenu"
                        class="px-3 py-2 rounded hover:bg-slate-800 transition-colors">
                        {{ $t('nav.patterns') }}
                    </RouterLink>
                    <RouterLink to="/sources" @click="closeMobileMenu"
                        class="px-3 py-2 rounded hover:bg-slate-800 transition-colors">
                        {{ $t('nav.sources') }}
                    </RouterLink>
                    <RouterLink to="/users" @click="closeMobileMenu"
                        class="px-3 py-2 rounded hover:bg-slate-800 transition-colors">
                        {{ $t('nav.users') }}
                    </RouterLink>
                </nav>
            </transition>
        </header>

        <main class="p-6 flex-1">
            <RouterView />
        </main>
        <footer class="bg-slate-900 text-white border-t border-slate-700 px-6 py-3 text-xs text-center">
            {{ $t('app.footer') }}
        </footer>
    </div>
</template>
