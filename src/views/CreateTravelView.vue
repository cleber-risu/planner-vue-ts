<script setup lang="ts">
import { computed, provide, ref } from 'vue'

import type { IGuest } from '@/types/iguest'

import SelectTripInformation from '@/components/SelectTripInformation.vue'
import SelectTripGuests from '@/components/create-travel/SelectTripGuests.vue'
import ConfirmTripCreationModal from '@/components/create-travel/ConfirmTripCreationModal.vue'

const local = ref<string>('')
const dates = ref<Date[]>([])
const guests = ref<IGuest[]>([])
const confirmedData = ref<boolean>(false)
const openModal = ref<boolean>(false)

provide('remove-guest', removeGuest)
provide('add-guest', addGuest)

const isDataConfirmed = computed<boolean>(() => {
  return local.value !== '' && dates.value.length > 0 && confirmedData.value
})

const addDates = (range: Date[]) => (dates.value = range)

function removeGuest(index: number) {
  guests.value.splice(index, 1)
}

function addGuest(guest: IGuest) {
  guests.value.push(guest)
}

const toggleConfirmData = () => (confirmedData.value = !confirmedData.value)

const toggleModal = () => (openModal.value = !openModal.value)
</script>

<template>
  <ConfirmTripCreationModal
    :open="openModal"
    :local="local"
    :dates="dates"
    :guests="guests"
    @close="toggleModal"
  />
  <div class="grid-center page">
    <div class="flex-center main">
      <div class="flex-center header">
        <img src="/logo.svg" alt="Logomarca planner" />
        <p class="fs-body-lg">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </div>
      <div class="content">
        <SelectTripInformation
          v-model:local="local"
          :dates="dates"
          @add-dates="addDates"
          @confirm-data="toggleConfirmData"
        />
        <SelectTripGuests
          v-if="isDataConfirmed"
          :guests="guests"
          @confirm-guests="toggleModal"
        />
      </div>
      <div class="footer">
        <p class="fs-body-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a href="#">termos de uso</a> e
          <a href="#">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss' as *;

.page {
  width: 100%;
  height: 100vh;

  .main {
    flex-direction: column;

    width: 103.385rem;
    height: 64rem;

    background: url('/bg.png') no-repeat;

    .header {
      display: flex;
      flex-direction: column;

      p {
        color: $gray-300;
        margin-top: 0.8rem;
      }
    }

    .content {
      margin-block: 4rem;
      width: 86rem;

      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    }

    .footer {
      text-align: center;
      color: $gray-500;

      a {
        color: $gray-300;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
