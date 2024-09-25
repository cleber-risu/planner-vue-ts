<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, UserRoundPlus } from 'lucide-vue-next'

import type { TypesButton } from '@/types/typesButton'

import BaseButton from '../base/BaseButton.vue'
import BaseBox from '../base/BaseBox.vue'
import SelectGuestsModal from './SelectGuestsModal.vue'
import type { IGuest } from '@/types/iguest'

const { guests } = defineProps<{ guests: IGuest[] }>()
const openModal = ref<boolean>(true) // mudar para false !!!!

const guestCount = computed<string>(() => {
  return guests.length > 0
    ? `${guests.length} pessoa(s) convidada(s)`
    : 'Quem estará na viagem?'
})

const enableButton = computed<TypesButton>(() => {
  return guests.length > 0
    ? 'primary-button--sm'
    : 'primary-button--sm-disabled'
})

const toggleModal = () => (openModal.value = !openModal.value)

const emit = defineEmits<{
  (e: 'confirm-guests'): void
}>()

function handleConfirmGuests() {
  if (guests.length > 0) {
    emit('confirm-guests')
  }
}
</script>

<template>
  <SelectGuestsModal :open="openModal" :guests="guests" @close="toggleModal" />
  <BaseBox class="content">
    <button @click="toggleModal" class="transparent envit-guests" type="button">
      <UserRoundPlus :size="20" />
      <span class="fs-body-lg">
        {{ guestCount }}
      </span>
    </button>
    <BaseButton
      @click="handleConfirmGuests"
      type="button"
      :type-button="enableButton"
      text="Confirmar viagem"
    >
      <template #icon>
        <ArrowRight :size="20" />
      </template>
    </BaseButton>
  </BaseBox>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss' as *;

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .envit-guests {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: $gray-400;

    svg {
      color: $gray-400;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
