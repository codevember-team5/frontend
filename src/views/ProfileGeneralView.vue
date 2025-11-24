<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

const form = ref({
    fullName: 'Alessandro Micelli', // Mocked initial data
    email: 'alessandro@example.com',
    startTime: '09:00',
    endTime: '18:00',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
})

const days = [
    { id: 'Mon', label: 'Monday' },
    { id: 'Tue', label: 'Tuesday' },
    { id: 'Wed', label: 'Wednesday' },
    { id: 'Thu', label: 'Thursday' },
    { id: 'Fri', label: 'Friday' },
    { id: 'Sat', label: 'Saturday' },
    { id: 'Sun', label: 'Sunday' },
]

const isLoading = ref(false)

const handleSave = async () => {
    isLoading.value = true
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Saving profile:', form.value)
    alert('Profile saved successfully!')
    isLoading.value = false
}
</script>

<template>
    <div class="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
        <h2 class="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">Personal Information</h2>

        <form @submit.prevent="handleSave" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="fullName" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Full
                        Name</label>
                    <input id="fullName" v-model="form.fullName" type="text"
                        class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                    <input id="email" v-model="form.email" type="email"
                        class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                </div>
            </div>

            <div class="border-t border-zinc-200 dark:border-zinc-700 pt-6">
                <h2 class="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">Working Hours</h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                    <div>
                        <label for="startTime" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Start
                            Time</label>
                        <input id="startTime" v-model="form.startTime" type="time"
                            class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                    </div>

                    <div>
                        <label for="endTime" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">End
                            Time</label>
                        <input id="endTime" v-model="form.endTime" type="time"
                            class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Working Days</label>
                    <div class="flex flex-wrap gap-4">
                        <div v-for="day in days" :key="day.id" class="flex items-center">
                            <input :id="day.id" v-model="form.workingDays" :value="day.id" type="checkbox"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded" />
                            <label :for="day.id" class="ml-2 block text-sm text-zinc-900 dark:text-zinc-300">
                                {{ day.label }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <Button type="submit" :disabled="isLoading" class="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <span v-if="isLoading">Saving...</span>
                    <span v-else>Save Changes</span>
                </Button>
            </div>
        </form>
    </div>
</template>
