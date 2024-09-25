<script setup lang="ts">
import { inject, ref } from 'vue'
import { MailOpen, X, ContactRound, UserRoundPlus } from 'lucide-vue-next'

import type { IGuest } from '@/types/iguest'

import BaseDialog from '../base/BaseDialog.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'

interface ISelectGuestsModal {
  open: boolean
  guests: IGuest[]
}

const { guests } = defineProps<ISelectGuestsModal>()

const removeGuest = inject('remove-guest') as (index: number) => void
const addGuest = inject('add-guest') as (guest: IGuest) => void

const name = ref<string>('')
const email = ref<string>('')

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')

function handleAddGuest() {
  if (name.value !== '' && email.value.includes('@')) {
    const isEqual = guests.find((guest) => guest.email === email.value)
    if (isEqual === undefined) {
      addGuest({
        name: name.value,
        email: email.value
      })
    }
  }
  name.value = ''
  email.value = ''
}
</script>

<template>
  <BaseDialog
    :open="open"
    @close="close"
    title="Selecionar convidados"
    width="lg"
  >
    <div class="content">
      <p class="fs-body-sm">
        Os convidados irão receber e-mails para confirmar a participação na
        viagem.
      </p>
      <TransitionGroup v-if="guests.length > 0" name="list" tag="ul">
        <li v-for="(guest, index) in guests" :key="guest.email">
          <span>{{ guest.email }}</span>
          <button class="transparent" @click="removeGuest(index)">
            <X :size="16" />
          </button>
        </li>
      </TransitionGroup>
      <div v-else class="empty">
        <MailOpen :size="80" />
        <p class="fs-body-lg">
          Você ainda não tem nenhum convidado para sua viagem!
        </p>
      </div>
      <hr />

      <form @submit.prevent="handleAddGuest">
        <BaseInput
          v-model:value="name"
          type="text"
          placeholder="Digite o nome do convidado"
        >
          <template #icon>
            <ContactRound :size="20" />
          </template>
        </BaseInput>
        <BaseInput
          v-model:value="email"
          type="email"
          icon="email"
          placeholder="Digite o e-mail do convidado"
        />
        <BaseButton
          type="submit"
          type-button="primary-button"
          text="Adicionar convidado"
          icon-position="left"
        >
          <template #icon>
            <UserRoundPlus :size="20" />
          </template>
        </BaseButton>
      </form>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss' as *;

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  p {
    color: $gray-400;
  }

  ul {
    list-style: none;

    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.6rem 1rem;

      background: $gray-800;
      border-radius: 6px;

      color: $gray-300;

      svg {
        color: $gray-400;
      }
    }
  }

  .empty {
    text-align: center;
    p {
      color: $gray-200;
    }
    svg {
      color: $gray-300;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  hr {
    border: 1px solid $gray-800;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
