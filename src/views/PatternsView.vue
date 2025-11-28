<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface Insight {
  id: string
  title: string
  description: string
  value: string
}

// Stato reattivo per gli insight, il loading e l'errore
const insights = ref<Insight[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

//  DATI MOCKATI (per lavorare finché il backend non è pronto)
/* const mockedInsights: Insight[] = [
  {
    id: 'produttivita',
    title: 'Insight sulla produttività',
    description: "Esempio di insight generato dall'AI sulla tua produttività.",
    value:
      'Alessandro Micio è stato produttivo per 5 ore, 11 minuti e 3 secondi, e ha perso più tempo su TikTok (11 minuti e 14 secondi) e YouTube (9 minuti e 51 secondi).',
  },
  {
    id: 'mattina',
    title: 'Fascia oraria più produttiva',
    description: 'La fascia oraria con il rendimento più alto.',
    value: 'Nelle ultime 2 settimane sei stato più produttivo tra le 9:00 e le 11:30.',
  },
] */

// Funzione mock: simula una chiamata API (con piccolo delay)
/* async function fetchInsightsMock(): Promise<Insight[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockedInsights), 300)
  })
} */

// 1) prendo lo store auth
const auth = useAuthStore()

// 2) prendo lo userId dallo store, se non c'è, metto quello di test
const userId = ref(auth.userId || '691608fb570cba9d820e8165')

// 3) endpoint base
const API_BASE_URL = 'https://backend-ua5h.onrender.com'

// FUNZIONE REALE (da usare quando il backend sarà pronto)
onMounted(async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    //  API reale
    const response = await fetch(`${API_BASE_URL}/api/insight/productivity/user/${userId.value}`)

    if (!response.ok) {
      // se il server risponde con 4xx o 5xx
      throw new Error(`Errore API: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data.insights)) {
      insights.value = data.insights
    } else {
      // struttura dati inattesa
      throw new Error('Struttura dati inattesa')
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Impossibile caricare i pattern! Visualizzo dati Mocked!'

    // Dati Mocked per non visualizzare l'errore
    insights.value = [
      {
        id: 'produttivita',
        title: 'Insight sulla produttività',
        description: 'Insight sulla produttività dell’utente',
        value:
          'Alessandro è stato produttivo per 5 ore, 11 minuti e 3 secondi, e ha perso più tempo su TikTok (11 minuti e 14 secondi) e YouTube (9 minuti e 51 secondi).',
      },
      {
        id: 'produttivita',
        title: 'Insight sulla produttività',
        description: "Insight sulla produttività dell'utente",
        value:
          'Alessandro Micelli è stato produttivo per 5 ore, 11 minuti e 3 secondi, e ha perso più tempo su TikTok (11 minuti e 14 secondi) e YouTube (9 minuti e 51 secondi).',
      },
      {
        id: 'produttivita',
        title: 'Insight sulla concentrazione',
        description: 'Fasce orarie più produttive',
        value: 'Il livello di concentrazione è massimo tra le 9:00 e le 11:30.',
      },
    ]
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">Pattern di produttività</h1>
    <p class="text-sm text-slate-700">
      Insight generati dall&apos;AI sul tuo modo di lavorare. Ogni card rappresenta un pattern
      rilevante emerso dall&apos;analisi dei tuoi dati.
    </p>

    <!-- Stato di caricamento -->
    <p v-if="isLoading" class="text-sm text-slate-500">Caricamento in corso...</p>

    <!-- Errore (mostriamo comunque i mocked) -->
    <p v-if="errorMessage" class="text-xs text-red-600">
      {{ errorMessage }}
    </p>

    <!-- Lista insights -->
    <div class="space-y-3" v-if="insights.length > 0">
      <div
        v-for="insight in insights"
        :key="insight.id"
        class="rounded-lg border border-slate-800 p-4"
      >
        <h2 class="text-sm font-semibold text-slate-900">
          {{ insight.title }}
        </h2>
        <h3 class="mt-1 text-xs text-slate-700">
          {{ insight.description }}
        </h3>
        <p class="mt-2 text-sm text-slate-900">
          {{ insight.value }}
        </p>
      </div>
    </div>

    <!-- Caso in cui non ci sono insight nemmeno mocked -->
    <p v-else class="text-sm text-slate-500">Nessun insight disponibile al momento.</p>
  </section>
</template>

<!-- <template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">{{ $t('patterns.title') }}</h1>
    <p class="text-sm text-slate-900">
      {{ $t('patterns.subtitle') }}
    </p>

    <div class="space-y-3">
      <div class="rounded-lg border border-slate-800 p-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('patterns.exampleTitle') }}</h2>
        <p class="mt-1 text-sm text-slate-900">{{ $t('patterns.exampleContent') }}</p>
      </div>
    </div>
  </section>
</template> -->

<style scoped></style>
