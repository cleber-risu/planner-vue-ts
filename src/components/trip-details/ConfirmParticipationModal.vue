<script setup lang="ts">
import { ref } from 'vue'

import type { IGuest } from '@/types/iguest'

import BaseButton from '../base/BaseButton.vue'
import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'

defineProps<{ open: boolean }>()

const user = ref<string>('')
const email = ref<string>('')

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'invite', guest: IGuest): void
}>()

const close = () => emit('close')

function inviteToTheTrip() {
  if (user.value !== '' && email.value.includes('@')) {
    emit('invite', {
      name: user.value,
      email: email.value
    })
    close()
  }
}
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Confirmar participação">
    <div class="content">
      <p class="fs-body-sm">
        Você foi convidado(a) para participar de uma viagem para
        <strong>Florianópolis, Brasil</strong> nas datas de
        <strong>16 a 27 de Agosto de 2024</strong>.
      </p>
      <br />
      <p class="fs-body-sm">
        Para confirmar sua presença na viagem, preencha os dados abaixo:
      </p>
      <form @submit.prevent="inviteToTheTrip">
        <BaseInput
          type="text"
          icon="user"
          placeholder="Seu nome completo"
          v-model:value="user"
        />
        <BaseInput
          type="email"
          icon="email"
          placeholder="Seu e-mail"
          v-model:value="email"
        />
        <BaseButton
          type="submit"
          type-button="primary-button"
          text="Confirmar minha presença"
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

    strong {
      color: $gray-100;
    }
  }

  form {
    margin-top: 2rem;

    div + div {
      margin-top: 0.8rem;
    }

    button {
      margin-top: 1.2rem;
      width: 100%;
    }
  }
}
</style>
