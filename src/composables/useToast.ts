import { ref } from 'vue'

export interface Toast {
    id: string
    message: string
    type?: 'success' | 'error' | 'info'
    duration?: number
}

// Global state - shared across all component instances
const toasts = ref<Toast[]>([])
let toastId = 0

// Helper functions that work with global state
const showToast = (message: string, type: Toast['type'] = 'success', duration = 3000) => {
    const id = `toast-${toastId++}`
    toasts.value.push({ id, message, type, duration })
}

const success = (message: string, duration?: number) => {
    showToast(message, 'success', duration)
}

const error = (message: string, duration?: number) => {
    showToast(message, 'error', duration)
}

const info = (message: string, duration?: number) => {
    showToast(message, 'info', duration)
}

const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
        toasts.value.splice(index, 1)
    }
}

// Composable that returns references to global state
export function useToast() {
    return {
        toasts,
        showToast,
        success,
        error,
        info,
        removeToast
    }
}
