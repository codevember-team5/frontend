<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userService } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'

const { t } = useI18n()
const authStore = useAuthStore()
const deviceId = ref('963363238902')
const message = ref('')
const isError = ref(false)
const isLoading = ref(false)

const handleAssign = async () => {
    if (!deviceId.value) return
    isLoading.value = true
    message.value = ''
    isError.value = false
    try {
        await userService.assignDevice(authStore.userId, deviceId.value)
        message.value = t('devices.assignSuccess', { deviceId: deviceId.value })
        deviceId.value = ''
    } catch (error) {
        console.error(error)
        isError.value = true
        message.value = t('devices.assignError')
    } finally {
        isLoading.value = false
    }
}

const handleUnassign = async () => {
    if (!deviceId.value) return
    isLoading.value = true
    message.value = ''
    isError.value = false
    try {
        await userService.unassignDevice(authStore.userId, deviceId.value)
        message.value = t('devices.unassignSuccess', { deviceId: deviceId.value })
        deviceId.value = ''
    } catch (error) {
        console.error(error)
        isError.value = true
        message.value = t('devices.unassignError')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">{{ $t('devices.title') }}</h1>

        <div class="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
            <div class="mb-4">
                <label for="deviceId" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{{
                    $t('devices.deviceId') }}</label>
                <input id="deviceId" v-model="deviceId" type="text"
                    class="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3"
                    :placeholder="$t('devices.deviceIdPlaceholder')" />
            </div>

            <div class="flex gap-4">
                <Button @click="handleAssign" :disabled="isLoading || !deviceId"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white">
                    {{ $t('devices.assignButton') }}
                </Button>
                <Button @click="handleUnassign" :disabled="isLoading || !deviceId" variant="destructive"
                    class="bg-red-600 hover:bg-red-700 text-white">
                    {{ $t('devices.unassignButton') }}
                </Button>
            </div>

            <div v-if="message"
                :class="['mt-4 p-3 rounded text-sm', isError ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400']">
                {{ message }}
            </div>
        </div>
    </div>
</template>
