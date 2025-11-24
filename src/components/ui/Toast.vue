<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface ToastProps {
    id: string
    message: string
    type?: 'success' | 'error' | 'info'
    duration?: number
}

const props = withDefaults(defineProps<ToastProps>(), {
    type: 'success',
    duration: 3000
})

const emit = defineEmits<{
    close: [id: string]
}>()

const progress = ref(100)
const isVisible = ref(false)

onMounted(() => {
    // Trigger entrance animation
    setTimeout(() => {
        isVisible.value = true
    }, 10)

    // Start progress bar animation
    const startTime = Date.now()
    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        progress.value = Math.max(0, 100 - (elapsed / props.duration) * 100)

        if (elapsed >= props.duration) {
            clearInterval(interval)
            handleClose()
        }
    }, 16) // ~60fps
})

const handleClose = () => {
    isVisible.value = false
    setTimeout(() => {
        emit('close', props.id)
    }, 300) // Wait for exit animation
}

const getProgressColor = () => {
    switch (props.type) {
        case 'success':
            return '#10b981' // green-500
        case 'error':
            return '#ef4444' // red-500
        case 'info':
            return '#3b82f6' // blue-500
        default:
            return '#10b981'
    }
}
</script>

<template>
    <div :class="[
        'fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 min-w-[320px] max-w-md',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    ]">
        <div class="p-4 pr-10 relative">
            <button @click="handleClose"
                class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="flex items-start gap-3">
                <div v-if="type === 'success'" class="flex-shrink-0">
                    <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div v-else-if="type === 'error'" class="flex-shrink-0">
                    <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div v-else class="flex-shrink-0">
                    <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <p class="text-sm text-gray-800 flex-1">{{ message }}</p>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="h-1 bg-gray-100">
            <div class="h-full transition-all duration-75 ease-linear" :style="{
                width: `${progress}%`,
                backgroundColor: getProgressColor()
            }" />
        </div>
    </div>
</template>
