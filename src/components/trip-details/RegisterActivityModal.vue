<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from 'lucide-vue-next'

import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseButton from '../base/BaseButton.vue'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')

const date = ref<Date>(new Date())

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
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Cadastrar atividade">
    <div class="content">
      <p class="fs-body-sm">Todos convidados podem visualizar as atividades.</p>
      <form>
        <BaseInput type="text" icon="tag" placeholder="Qual a atividade?" />
        <div class="group">
          <VueDatePicker
            v-model="date"
            dark
            locale="pt-BR"
            :day-names="['D', 'S', 'T', 'Q', 'Q', 'S', 'S']"
            :min-date="new Date()"
            :enable-time-picker="false"
            :format="format"
          >
            <template #input-icon>
              <div class="icon-calendar">
                <Calendar :size="20" />
              </div>
            </template>
          </VueDatePicker>
          <BaseInput type="time" icon="clock" />
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
