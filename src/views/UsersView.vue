<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { userService } from '@/services/user.service'
import { Button } from '@/components/ui/button'
import UserModal from '@/components/molecules/UserModal.vue'

interface User {
    id: string
    fullname: string
    email: string
}

const { t } = useI18n()

const users = ref<User[]>([])
const isLoading = ref(false)
const skip = ref(0)
const limit = ref(10)
const total = ref(0)

const isModalOpen = ref(false)
const editingUser = ref<User | null>(null)

const fetchUsers = async () => {
    isLoading.value = true
    try {
        const data = await userService.getUsers(skip.value, limit.value)
        // Adjust based on actual API response structure. Assuming array for now or { users: [], total: number }
        if (Array.isArray(data)) {
            users.value = data
        } else if (data.users) {
            users.value = data.users
            total.value = data.total
        }
    } catch (error) {
        console.error('Failed to fetch users:', error)
    } finally {
        isLoading.value = false
    }
}

const handleNext = () => {
    skip.value += limit.value
    fetchUsers()
}

const handlePrev = () => {
    if (skip.value >= limit.value) {
        skip.value -= limit.value
        fetchUsers()
    }
}

const handleDelete = async (id: string) => {
    if (!confirm(t('users.deleteConfirm'))) return
    try {
        await userService.deleteUser(id)
        fetchUsers()
    } catch (error) {
        console.error('Failed to delete user:', error)
        alert(t('users.deleteError'))
    }
}

const handleEdit = (user: User) => {
    editingUser.value = user
    isModalOpen.value = true
}

const handleCreate = () => {
    editingUser.value = null
    isModalOpen.value = true
}

const handleSave = async (userData: any) => {
    try {
        if (editingUser.value?.id) {
            await userService.updateUser(editingUser.value.id, userData)
        } else {
            await userService.register(userData)
        }
        isModalOpen.value = false
        fetchUsers()
    } catch (error) {
        console.error('Failed to save user:', error)
        alert(t('users.saveError'))
    }
}

const handleCloseModal = () => {
    isModalOpen.value = false
    editingUser.value = null
}

onMounted(() => {
    fetchUsers()
})
</script>

<template>
    <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{{ $t('users.title') }}</h1>
            <Button @click="handleCreate" class="bg-indigo-600 hover:bg-indigo-700 text-white">
                {{ $t('users.addUser') }}
            </Button>
        </div>

        <div
            class="bg-white dark:bg-zinc-900 shadow rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                    <thead class="bg-zinc-50 dark:bg-zinc-800">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                {{ $t('users.fullName') }}
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                {{ $t('users.email') }}
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                {{ $t('users.actions') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
                        <tr v-if="isLoading">
                            <td colspan="3" class="px-6 py-4 text-center text-sm text-zinc-500">{{ $t('users.loading')
                                }}</td>
                        </tr>
                        <tr v-else-if="users.length === 0">
                            <td colspan="3" class="px-6 py-4 text-center text-sm text-zinc-500">{{ $t('users.noUsers')
                                }}</td>
                        </tr>
                        <tr v-for="user in users" :key="user.id">
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {{ user.fullname }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="handleEdit(user)"
                                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                    {{ $t('users.edit') }}
                                </button>
                                <button @click="handleDelete(user.id)"
                                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                    {{ $t('users.delete') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700">
                <div class="flex-1 flex justify-between sm:hidden">
                    <Button @click="handlePrev" :disabled="skip === 0" variant="outline" size="sm">{{
                        $t('users.previous') }}</Button>
                    <Button @click="handleNext" :disabled="users.length < limit" variant="outline" size="sm">{{
                        $t('users.next') }}</Button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-zinc-700 dark:text-zinc-300">
                            {{ $t('users.showing') }} <span class="font-medium">{{ skip + 1 }}</span> {{ $t('users.to')
                            }} <span class="font-medium">{{ skip
                                + users.length }}</span>
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button @click="handlePrev" :disabled="skip === 0"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50">
                                <span class="sr-only">{{ $t('users.previous') }}</span>
                                <!-- Heroicon name: solid/chevron-left -->
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button @click="handleNext" :disabled="users.length < limit"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50">
                                <span class="sr-only">{{ $t('users.next') }}</span>
                                <!-- Heroicon name: solid/chevron-right -->
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <UserModal :is-open="isModalOpen" :user="editingUser" @close="handleCloseModal" @save="handleSave" />
</template>
