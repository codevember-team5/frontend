import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Hardcoded for now as per plan, in a real app this would come from login
  const userId = ref('691608fb570cba9d820e8165')

  return { userId }
})
