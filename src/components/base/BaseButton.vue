<script setup lang="ts">
import { computed } from 'vue'
import type { TypesButton } from '@/types/typesButton'

interface IBaseButton {
  type: 'button' | 'submit'
  typeButton: TypesButton
  text: string
  iconPosition?: 'left' | 'right'
}

const props = defineProps<IBaseButton>()

const disabled = computed<boolean>(() => {
  return props.typeButton.includes('disabled')
})
</script>

<template>
  <button :type="type" :class="[typeButton, iconPosition]" :disabled="disabled">
    <div class="icon-btn" v-if="iconPosition">
      <slot name="icon"></slot>
    </div>
    <span>{{ text }}</span>
  </button>
</template>
