<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import logoUrl from '@/assets/logo.png'

const form = ref({
    identity: '',
    password: '',
})

const isLoading = ref(false)

const handleSubmit = async () => {
    isLoading.value = true
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Logging in with:', form.value)
    isLoading.value = false
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <img :src="logoUrl" alt="Logo" class="mx-auto h-16 w-auto mb-4" />
                <h2 class="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Welcome back
                </h2>
                <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Please sign in to your account
                </p>
            </div>

            <div
                class="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <label for="identity" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Email or Full Name
                        </label>
                        <div class="mt-1">
                            <input id="identity" v-model="form.identity" name="identity" type="text" required
                                class="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 transition-colors duration-200"
                                placeholder="john@example.com or John Doe" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Password
                        </label>
                        <div class="mt-1">
                            <input id="password" v-model="form.password" name="password" type="password"
                                autocomplete="current-password" required
                                class="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 transition-colors duration-200"
                                placeholder="••••••••" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-zinc-900 dark:text-zinc-300">
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#"
                                class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                            :disabled="isLoading">
                            <span v-if="isLoading">Signing in...</span>
                            <span v-else>Sign in</span>
                        </Button>
                    </div>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-zinc-300 dark:border-zinc-700"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white dark:bg-zinc-900 text-zinc-500">
                                Don't have an account?
                            </span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-1 gap-3">
                        <router-link to="/register"
                            class="w-full inline-flex justify-center py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200">
                            Create an account
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
