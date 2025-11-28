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
  { value: 'last_week', label: 'Settimana scorsa' },
]


const getDateRange = (type: DateRangeType): DateRange => {
  const now = new Date()

  const today = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ))

  let start = new Date(today)
  let end = new Date(today)

  switch (type) {
    case 'yesterday': {
      start.setUTCDate(start.getUTCDate() - 1)
      end = new Date(start)
      end.setUTCHours(23, 59, 59, 999)
      break
    }

    case 'this_week': {
      const dayOfWeek = start.getUTCDay() || 7
      const diffToMonday = dayOfWeek - 1
      start.setUTCDate(start.getUTCDate() - diffToMonday)

      end = new Date(start)
      end.setUTCDate(end.getUTCDate() + 6)
      end.setUTCHours(23, 59, 59, 999)
      break
    }

    case 'last_week': {
      const dayOfWeek = start.getUTCDay() || 7
      const diffToMonday = dayOfWeek - 1
      start.setUTCDate(start.getUTCDate() - diffToMonday - 7)

      end = new Date(start)
      end.setUTCDate(end.getUTCDate() + 6)
      end.setUTCHours(23, 59, 59, 999)
      break
    }

    case 'today':
    default: {
      end.setUTCHours(23, 59, 59, 999)
      break
    }
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
