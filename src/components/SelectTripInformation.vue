<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-vue-next'

import BaseButton from './base/BaseButton.vue'
import DatePickerModal from './DatePickerModal.vue'
import { useFormatDate } from '@/hooks/useFormatDate'

interface ISelectTripInfomation {
  dates: Date[]
  edit?: boolean
}

const { dates, edit = false } = defineProps<ISelectTripInfomation>()

const valueLocal = defineModel('local')
const openModal = ref<boolean>(false)
const editData = ref<boolean>(edit)

function toggleModal() {
  if (!editData.value) {
    openModal.value = !openModal.value
  }
}

const emit = defineEmits<{
  (e: 'add-dates', range: Date[]): void
  (e: 'confirm-data'): void
}>()

const handleAddDates = (range: Date[]) => emit('add-dates', range)

const formattedDate = computed<string>(() => {
  if (dates.length > 0) {
    const { format } = useFormatDate(dates)
    return format
  }
  return ''
})

function handleConfirmData() {
  if (valueLocal.value !== '' && dates.length > 0) {
    editData.value = true
    emit('confirm-data')
  }
}

function handleEditData() {
  editData.value = false
  emit('confirm-data')
}
</script>

<template>
  <DatePickerModal
    :open="openModal"
    :dates="dates"
    @close="toggleModal"
    @submit-dates="handleAddDates"
  />
  <div class="box select-information">
    <form>
      <div class="input-group input-local">
        <div class="icon-btn">
          <MapPin :size="20" />
        </div>
        <input
          class="transparent fs-body-lg"
          type="text"
          placeholder="Para onde você vai?"
          aria-label="Para onde você vai?"
          v-model.trim="valueLocal"
          :readonly="editData"
        />
      </div>
      <div
        :class="['input-group', 'input-date', { block: editData }]"
        @click="toggleModal"
      >
        <div class="icon-btn">
          <Calendar :size="20" />
        </div>
        <input
          class="transparent fs-body-lg"
          type="text"
          placeholder="Quando?"
          aria-label="selecione a data de sua viagem"
          readonly
          :value="formattedDate"
          :title="formattedDate"
        />
      </div>
      <BaseButton
        v-if="!editData"
        @click="handleConfirmData"
        type="button"
        type-button="primary-button--sm"
        text="Contiuar"
        icon-position="right"
      >
        <template #icon>
          <ArrowRight :size="20" />
        </template>
      </BaseButton>
      <BaseButton
        v-else
        @click="handleEditData"
        type="button"
        type-button="secondary-button--sm"
        text="Alterar local/data"
      >
        <template #icon>
          <Settings2 :size="20" />
        </template>
      </BaseButton>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss' as *;

.select-information {
  width: 100%;

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    .input-group {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      .icon-btn {
        width: 2rem;
        height: 2.2rem;

        svg {
          color: $gray-400;
        }
      }

      &.input-local {
        flex: 1;

        input {
          &:read-only {
            cursor: not-allowed;
          }
        }
      }

      &.input-date {
        flex-basis: 12rem;
        height: 2.4rem;
        border-right: 1px solid $gray-800;
        padding-right: 0.8rem;

        cursor: pointer;

        &.block {
          cursor: not-allowed;
        }

        input {
          cursor: inherit;
        }
      }

      &:has(input:not(:placeholder-shown)) {
        flex-basis: 28.6rem;

        input {
          text-overflow: ellipsis;
        }
      }

      input {
        width: 99%;
        color: $gray-100;

        &:not(:placeholder-shown) {
          color: $gray-100;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
