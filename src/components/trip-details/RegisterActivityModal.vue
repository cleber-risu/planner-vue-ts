<script setup lang="ts">
import { inject, ref } from 'vue'
import { Calendar } from 'lucide-vue-next'

import type { IActivity } from '@/types/iactivity'

import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseButton from '../base/BaseButton.vue'

defineProps<{ open: boolean }>()

const dates = inject('dates') as Date[]

const title = ref<string>('')
const date = ref<Date>(new Date())
const time = ref<string>('')

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-activity', activity: IActivity): void
}>()

const close = () => emit('close')

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const format = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${day} de ${months[month]} de ${year}`
}

function addActivity() {
  if (title.value !== '' && time.value !== '') {
    const day = Number(date.value.getDate())
    const month = Number(date.value.getMonth())
    const year = Number(date.value.getFullYear())
    const hm = time.value.split(':')
    const hour = Number(hm[0])
    const min = Number(hm[1])

    const newDate = new Date(year, month, day, hour, min)

    const act = {
      title: title.value,
      occurs_at: newDate.toISOString()
    }

    emit('add-activity', act)
  }
}
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Cadastrar atividade">
    <div class="content">
      <p class="fs-body-sm">Todos convidados podem visualizar as atividades.</p>
      <form @submit.prevent="addActivity">
        <BaseInput
          v-model:value="title"
          type="text"
          icon="tag"
          placeholder="Qual a atividade?"
        />
        <div class="group">
          <VueDatePicker
            v-model="date"
            dark
            locale="pt-BR"
            :day-names="['D', 'S', 'T', 'Q', 'Q', 'S', 'S']"
            :min-date="dates[0]"
            :max-date="dates[1]"
            :enable-time-picker="false"
            :format="format"
          >
            <template #input-icon>
              <div class="icon-calendar">
                <Calendar :size="20" />
              </div>
            </template>
          </VueDatePicker>
          <BaseInput v-model:value="time" type="time" icon="clock" />
        </div>
        <BaseButton
          type="submit"
          type-button="primary-button"
          text="Salvar atividade"
        />
      </form>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables' as *;

.content {
  margin-top: -0.4rem;

  p {
    color: $gray-400;
  }

  form {
    margin-top: 1.8rem;

    .icon-calendar {
      width: 2rem;
      height: 2rem;
      margin-left: 1.4rem;
    }

    .group {
      margin-top: 0.8rem;

      display: flex;
      gap: 0.8rem;
    }

    button {
      width: 100%;
      margin-top: 1.2rem;
    }
  }
}
</style>
