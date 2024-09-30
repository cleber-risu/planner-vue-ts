<script setup lang="ts">
import { computed, ref } from 'vue'
import { Loader } from 'lucide-vue-next'

import { useFormatDate } from '@/hooks/useFormatDate'

import BaseButton from '../base/BaseButton.vue'
import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'
import type { IOwner } from '@/types/iowner'

interface IConfirmTriCreationModal {
  open: boolean
  local: string
  dates: Date[]
}

const { local, dates } = defineProps<IConfirmTriCreationModal>()

const name = ref<string>('')
const email = ref<string>('')
const loading = ref<boolean>(false)

const formatedDates = computed<string>(() => {
  if (dates.length && dates.length > 0) {
    const { format } = useFormatDate(dates)
    return format
  }
  return ''
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create-trip', owner: IOwner): void
}>()

const close = () => emit('close')

function handleCrateTrip() {
  if (
    local !== '' &&
    dates.length > 0 &&
    name.value !== '' &&
    email.value.includes('@')
  ) {
    emit('create-trip', {
      name: name.value,
      email: email.value
    })
    loading.value = true
  }
}
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Confirmar criação da viagem">
    <form @submit.prevent="handleCrateTrip" v-if="!loading">
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
      <BaseButton
        type="submit"
        type-button="primary-button"
        text="Confirmar criação da viagem"
      />
    </form>
    <div class="loading" v-else>
      <Loader :size="40" />
      <p class="fs-body-lg">
        Seu evento está sendo criado, aguarde um instante...
      </p>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss' as *;

form {
  p {
    margin-bottom: 2rem;

    color: $gray-400;

    strong {
      color: $gray-100;
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

.loading {
  padding-block: 5rem;

  text-align: center;
  color: $gray-400;

  p {
    margin-top: 1.2rem;
    color: $gray-200;
  }
}
</style>
