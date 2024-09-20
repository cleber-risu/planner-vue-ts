<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Calendar } from 'lucide-vue-next'

import BaseDialog from './base/BaseDialog.vue'
import BaseButton from './base/BaseButton.vue'

interface IDatePickerModal {
  open: boolean
  dates: Date[]
}

const { dates } = defineProps<IDatePickerModal>()

const range = ref<Date[]>(dates)

onMounted(() => {
  const startDate = new Date()
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  range.value = [startDate, endDate]
})

const format = (date: Date[]) => {
  let start = ''
  let end = ''

  if (date[0]) {
    const startDay = String(date[0].getDate()).padStart(2, '0')
    const startMonth = String(date[0].getMonth() + 1).padStart(2, '0')
    const startYear = date[0].getFullYear()
    const startHour = String(date[0].getHours()).padStart(2, '0')
    const startMin = String(date[0].getMinutes()).padStart(2, '0')
    start = `${startDay}/${startMonth}/${startYear} ${startHour}:${startMin}`
  }

  if (date[1]) {
    const endDay = String(date[1].getDate()).padStart(2, '0')
    const endMonth = String(date[1].getMonth() + 1).padStart(2, '0')
    const endYear = date[1].getFullYear()
    const endHour = String(date[1].getHours()).padStart(2, '0')
    const endMin = String(date[1].getMinutes()).padStart(2, '0')
    end = `${endDay}/${endMonth}/${endYear} ${endHour}:${endMin}`
  }

  return `${start} - ${end}`
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit-dates', rangeDates: Date[]): void
}>()

const close = () => emit('close')

function handleSelectDates() {
  if (range.value.length > 0) {
    emit('submit-dates', range.value)
    emit('close')
  }
}
</script>

<template>
  <BaseDialog
    :open="open"
    @close="close"
    title="Selecione uma data inicial e final para sua viagem"
  >
    <div class="content">
      <VueDatePicker
        v-model="range"
        range
        dark
        locale="pt-BR"
        :day-names="['D', 'S', 'T', 'Q', 'Q', 'S', 'S']"
        :min-date="new Date()"
        :format="format"
      >
        <template #input-icon>
          <div class="icon-calendar">
            <Calendar :size="20" />
          </div>
        </template>
      </VueDatePicker>
      <BaseButton
        @click="handleSelectDates"
        type="button"
        type-button="primary-button--sm"
      >
        <span>Selecionar datas</span>
      </BaseButton>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .icon-calendar {
    width: 2rem;
    height: 2rem;
    margin-left: 0.8rem;
  }
}
</style>
