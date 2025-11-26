<template>
  <ButtonGroup>
    <Button
      v-for="option in dateOptions"
      :key="option.value"
      :variant="selected === option.value ? 'default' : 'outline'"
      @click="selectRange(option.value)"
    >
      {{ option.label }}
    </Button>
  </ButtonGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

interface DateRange {
  start_time: string
  end_time: string
}

type DateRangeType = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month'

interface DateOption {
  value: DateRangeType
  label: string
}

const emit = defineEmits<{
  rangeSelected: [range: DateRange]
}>()

const selected = ref<DateRangeType | null>(null)

const dateOptions: DateOption[] = [
  { value: 'today', label: 'Oggi' },
  { value: 'yesterday', label: 'Ieri' },
  { value: 'this_week', label: 'Questa settimana' },
  { value: 'this_month', label: 'Questo mese' },
]

const getDateRange = (type: DateRangeType): DateRange => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  let start: Date, end: Date

  switch (type) {
    case 'today':
      start = new Date(today)
      end = new Date(today)
      end.setHours(23, 59, 59, 999)
      break

    case 'yesterday':
      start = new Date(today)
      start.setDate(start.getDate() - 1)
      end = new Date(start)
      end.setHours(23, 59, 59, 999)
      break

    case 'this_week':
      start = new Date(today)
      const dayOfWeek = start.getDay()
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
      start.setDate(start.getDate() + diff)
      end = new Date(start)
      end.setDate(end.getDate() + 6)
      end.setHours(23, 59, 59, 999)
      break

    case 'last_week':
      start = new Date(today)
      const lastWeekDay = start.getDay()
      const lastWeekDiff = lastWeekDay === 0 ? -6 : 1 - lastWeekDay
      start.setDate(start.getDate() + lastWeekDiff - 7)
      end = new Date(start)
      end.setDate(end.getDate() + 6)
      end.setHours(23, 59, 59, 999)
      break

    case 'this_month':
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      end.setHours(23, 59, 59, 999)
      break

    case 'last_month':
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      end = new Date(now.getFullYear(), now.getMonth(), 0)
      end.setHours(23, 59, 59, 999)
      break
  }

  return {
    start_time: start.toISOString(),
    end_time: end.toISOString(),
  }
}

const selectRange = (type: DateRangeType): void => {
  selected.value = type
  const dateRange = getDateRange(type)
  emit('rangeSelected', dateRange)
}

selectRange('today')
</script>
