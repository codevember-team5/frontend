<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import AppsDonutChart from '@/components/molecules/AppsDonutChart.vue'
import AppsUsageChart from '@/components/molecules/AppsUsageChart.vue'
import AttentionAreaChart from '@/components/molecules/AttentionAreaChart.vue'
import ProductivityDonutChart from '@/components/molecules/ProductivityDonutChart.vue'
import DateRangeSelector from '@/components/atoms/DateRangeSelector.vue'
import { historyService } from '@/services/history.service'
import { useAuthStore } from '@/stores/auth'

interface CategoryComponent {
  entries_count: number
  percentage_of_category: number
  process: string
  total_seconds: number
  window_bucket: string
}

interface Category {
  category: string
  percentage: number
  total_seconds: number
  entries_count: number
  hour: string
  components: CategoryComponent[]
}

interface CategoryDay {
  categories: Category[]
  day: string
  total_seconds: number
}

interface ChartDataItem {
  name: string
  value?: number
  color?: string
  percentage?: number
}

type ChartData = ChartDataItem[]

interface DateRange {
  start_time: string
  end_time: string
}

const { t } = useI18n()

const deviceId = ref('963363238902')
const auth = useAuthStore()
const userId = ref(auth.userId)
const message = ref('')
const isError = ref(false)
const isLoading = ref(false)
const chartData = ref<ChartData>([])
const categories = ref<Category[]>([])
const attention = ref<ChartDataItem[]>([])
const hourlyAttention = ref<ChartDataItem[]>([])
const days = ref<CategoryDay[]>([])
const currentRange = ref<DateRange | null>(null)

const stringToHexColor = (str: string) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, '0')
  }

  return color
}

const getData = async () => {
  if (!deviceId.value || !currentRange.value) return

  isLoading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await historyService.getActivitySummary(
      deviceId.value,
      currentRange.value.start_time,
      currentRange.value.end_time,
    )
    categories.value = result.categories
    days.value = result.days

    chartData.value = categories.value.map<ChartDataItem>((category) => ({
      name: category.category,
      hours: category.total_seconds / 60,
      value: category.percentage,
      color: stringToHexColor(category.category),
      components: category.components,
    }))
  } catch (error) {
    console.error(error)
    isError.value = true
    message.value = t('devices.assignError')
  } finally {
    isLoading.value = false
  }
}

const getAttentionData = async (groupBy = 'day') => {
  if (!userId.value || !currentRange.value) return

  isLoading.value = true
  message.value = ''
  isError.value = false

  try {
    const result = await historyService.getAttentionLevelSummary(
      userId.value,
      currentRange.value.start_time,
      currentRange.value.end_time,
      groupBy,
    )

    if (groupBy == 'day') {
      const attentionPerc = Math.round(result.days[0]['percentage'])
      const distractionPerc = 100 - attentionPerc

      attention.value = [
        {
          name: 'Produttività',
          percentage: attentionPerc,
          value: attentionPerc,
          color: '#00cc00',
        },
        {
          name: 'Distrazione',
          percentage: distractionPerc,
          value: distractionPerc,
          color: '#cc0000',
        },
        {
          name: 'Pausa',
          percentage: 0,
          value: 0,
          color: '#64748b',
        },
      ]
    } else {
      hourlyAttention.value = result.hours.map((item: Category) => {
        return {
          date: new Date(item.hour).getTime(),
          value: item.percentage,
        }
      })
    }
  } catch (error) {
    console.error(error)
    isError.value = true
    message.value = t('devices.assignError')
  } finally {
    isLoading.value = false
  }
}

const handleRangeChange = (range: DateRange): void => {
  const startDate = new Date(range.start_time)
  const endDate = new Date(range.end_time)

  currentRange.value = {
    start_time: startDate.toISOString().split('T')[0],
    end_time: endDate.toISOString().split('T')[0],
  } as DateRange

  getData()
  getAttentionData()
  getAttentionData('hour')
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex justify-between items-center gap-3">
      <h1 class="text-2xl font-bold">{{ $t('dashboard.title') }}</h1>
      <DateRangeSelector @rangeSelected="handleRangeChange" />
    </div>

    <!-- Focus time + istogramma orizzontale -->
    <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
      <div>
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('dashboard.focusTime') }}</h2>
        <p class="text-xs text-slate-500">{{ $t('charts.appsUsage.title') }}</p>
      </div>
      <AppsUsageChart :chart-data="chartData" :days-data="days" />
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">
            {{ $t('dashboard.productivitySessions') }}
          </h2>
          <p class="text-xs text-slate-500">{{ $t('charts.appsDonut.title') }}</p>
        </div>
        <AppsDonutChart :chart-data="chartData" />
      </div>

      <!-- Terzo riquadro: placeholder KPI aggiuntivo -->
      <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">
            {{ $t('dashboard.productivityScore') }}
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            {{ $t('charts.productivityScore.title') }}
          </p>
        </div>
        <ProductivityDonutChart :chart-data="attention" />
      </div>
    </div>

    <!-- Seconda riga: grafico a tutta larghezza per il livello di concentrazione -->
    <div class="rounded-lg bg-white p-4 flex flex-col gap-3 border border-slate-800">
      <div class="mb-12 md:mb-auto">
        <h2 class="text-sm font-semibold text-slate-900">{{ $t('charts.attentionArea.title') }}</h2>
        <p class="text-xs text-slate-500">
          {{ $t('charts.attentionArea.subtitle') }}
        </p>
      </div>
      <AttentionAreaChart :chart-data="hourlyAttention" />
    </div>
  </section>
</template>

<style scoped></style>
