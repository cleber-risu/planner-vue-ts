<script setup lang="ts">
import { computed, ref } from 'vue'

import { useFormatDate } from '@/hooks/useFormatDate'

import BaseButton from '../base/BaseButton.vue'
import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'

interface IConfirmTriCreationModal {
  open: boolean
  local: string
  dates: Date[]
}

const { local, dates } = defineProps<IConfirmTriCreationModal>()

const name = ref<string>('')
const email = ref<string>('')

const formatedDates = computed<string>(() => {
  if (dates.length > 0) {
    const { format } = useFormatDate(dates)
    return format
  }
  return ''
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')

function handleCrateTrip() {
  if (
    local !== '' &&
    dates.length > 0 &&
    name.value !== '' &&
    email.value.includes('@')
  ) {
    console.log('evento criado')
    console.log('nome: ' + name.value)
    console.log('email: ' + email.value)
  }
}
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Confirmar criação da viagem">
    <form @submit.prevent="handleCrateTrip">
      <p class="fs-body-sm">
        Para concluir a criação da viagem para
        <strong>{{ local }}</strong> nas datas de
        <strong>{{ formatedDates }}</strong>
        preencha seus dados abaixo:
      </p>
      <BaseInput
        type="text"
        icon="user"
        placeholder="Seu nome completo"
        v-model:value="name"
      />
      <BaseInput
        type="email"
        icon="email"
        placeholder="Seu e-mail pessoal"
        v-model:value="email"
      />
      <BaseButton type="submit" type-button="primary-button">
        <span>Confirmar criação da viagem</span>
      </BaseButton>
    </form>
  </BaseDialog>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss';

form {
  p {
    margin-bottom: 2rem;

    color: variables.$gray-400;

    strong {
      color: variables.$gray-100;
    }
  }

  div + div {
    margin-top: 0.8rem;
  }

  button {
    width: 100%;
    margin-top: 1.2rem;
  }
}
</style>
