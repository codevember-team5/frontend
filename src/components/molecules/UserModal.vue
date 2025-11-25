<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'

interface User {
    id?: string
    fullname: string
    email: string
    password?: string
}

const props = defineProps<{
    isOpen: boolean
    user?: User | null
}>()

const emit = defineEmits(['close', 'save'])

const form = ref<User>({
    fullname: '',
    email: '',
    password: '',
})

watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            form.value = { ...newUser, password: '' } // Don't show password on edit
        } else {
            form.value = { fullname: '', email: '', password: '' }
        }
    },
    { immediate: true }
)

const handleSubmit = () => {
    emit('save', form.value)
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
            class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 class="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
                {{ user ? $t('users.modal.editTitle') : $t('users.modal.createTitle') }}
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label for="fullname" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{{
                        $t('users.modal.fullName') }}</label>
                    <input id="fullname" v-model="form.fullname" type="text" required
                        class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{{
                        $t('users.modal.email') }}</label>
                    <input id="email" v-model="form.email" type="email" required
                        class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                </div>

                <div v-if="!user">
                    <label for="password" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{{
                        $t('users.modal.password') }}</label>
                    <input id="password" v-model="form.password" type="password" :required="!user"
                        class="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3" />
                </div>

                <div class="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="outline" @click="$emit('close')">{{ $t('users.modal.cancel')
                        }}</Button>
                    <Button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white">{{ $t('users.modal.save')
                        }}</Button>
                </div>
            </form>
        </div>
    </div>
</template>
