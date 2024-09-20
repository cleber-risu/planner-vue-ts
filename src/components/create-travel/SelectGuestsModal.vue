<script setup lang="ts">
import { inject, ref } from 'vue'
import { AtSign, MailOpen, Plus, X } from 'lucide-vue-next'

import BaseDialog from '../base/BaseDialog.vue'
import BaseButton from '../base/BaseButton.vue'

interface ISelectGuestsModal {
  open: boolean
  guests: string[]
}

const { guests } = defineProps<ISelectGuestsModal>()

const removeGuest = inject('remove-guest') as (index: number) => void
const addGuest = inject('add-guest') as (email: string) => void

const email = ref<string>('')

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')

function handleAddGuest() {
  if (email.value.includes('@')) {
    const isDifferent = guests.indexOf(email.value)
    if (isDifferent) {
      addGuest(email.value)
    }
  }
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
        <li v-for="(guest, index) in guests" :key="guest">
          <span>{{ guest }}</span>
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
      <div class="default-input">
        <div class="left-icon">
          <AtSign :size="20" />
        </div>
        <input
          type="text"
          placeholder="Digite o e-mail do convidado"
          v-model.trim="email"
        />
        <BaseButton
          @click="handleAddGuest"
          type="button"
          type-button="primary-button--sm"
        >
          <span>Convidar</span>
          <div class="icon-input">
            <Plus :size="20" />
          </div>
        </BaseButton>
      </div>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
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
