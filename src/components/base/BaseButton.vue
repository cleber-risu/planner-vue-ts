<script setup lang="ts">
import { computed } from 'vue'
import type { TypesButton } from '@/types/typesButton'

interface IBaseButton {
  type: 'button' | 'submit'
  typeButton: TypesButton
}

const props = defineProps<IBaseButton>()

const disabled = computed<boolean>(() => {
  return props.typeButton.includes('disabled')
})
</script>

<template>
  <button :type="type" :class="typeButton" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>
