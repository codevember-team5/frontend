<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/composables/useToast'
import { Button } from '@/components/ui/button'
import logoUrl from '@/assets/logo.png'
import { userService } from '@/services/user.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const { t } = useI18n()
const toast = useToast()

const form = ref({
  fullName: '',
  email: '',
  password: '',
})

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await userService.register({
      fullname: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
    })
    toast.success(t('auth.register.successMessage'))
    form.value = { fullName: '', email: '', password: '' }
    router.push('/login')
  } catch (error) {
    console.error('Registration error:', error)
    toast.error(t('auth.register.errorMessage'))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md space-y-8">
    <div class="text-center">
      <img :src="logoUrl" alt="Logo" class="mx-auto h-16 w-auto mb-4" />
      <h2 class="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {{ $t('auth.register.title') }}
      </h2>
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {{ $t('auth.register.subtitle') }}
      </p>
    </div>

    <div class="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="fullName" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {{ $t('auth.register.fullName') }}
          </label>
          <div class="mt-1">
            <input id="fullName" v-model="form.fullName" name="fullName" type="text" required
              class="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 transition-colors duration-200"
              placeholder="John Doe" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {{ $t('auth.register.email') }}
          </label>
          <div class="mt-1">
            <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 transition-colors duration-200"
              :placeholder="$t('auth.register.emailPlaceholder')" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {{ $t('auth.register.password') }}
          </label>
          <div class="mt-1">
            <input id="password" v-model="form.password" name="password" type="password" autocomplete="new-password"
              required
              class="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 transition-colors duration-200"
              placeholder="••••••••" />
          </div>
        </div>

        <div>
          <Button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            :disabled="isLoading">
            <span v-if="isLoading">{{ $t('auth.register.creatingAccount') }}</span>
            <span v-else>{{ $t('auth.register.signUp') }}</span>
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
              {{ $t('auth.register.alreadyHaveAccount') }}
            </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-3">
          <router-link to="/login"
            class="w-full inline-flex justify-center py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200">
            {{ $t('auth.register.signIn') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
