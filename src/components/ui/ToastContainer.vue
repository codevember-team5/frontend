<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import Toast from '@/components/ui/Toast.vue'

const { toasts, removeToast } = useToast()
</script>

<template>
    <div class="toast-container fixed top-0 right-0 p-4 z-50 pointer-events-none">
        <div class="flex flex-col gap-3 pointer-events-auto">
            <Toast v-for="toast in toasts" :key="toast.id" :id="toast.id" :message="toast.message" :type="toast.type"
                :duration="toast.duration" @close="removeToast" />
        </div>
    </div>
</template>
