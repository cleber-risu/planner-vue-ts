<script setup lang="ts">
import { Mail, User, Tag, Link2, Clock } from 'lucide-vue-next'

interface IBaseInput {
  type: 'text' | 'email' | 'time' | 'url'
  icon?: 'user' | 'email' | 'tag' | 'url' | 'clock'
  placeholder?: string
}

defineProps<IBaseInput>()

const value = defineModel<string | Date>('value')
</script>

<template>
  <div class="default-input">
    <div class="left-icon" v-if="icon">
      <User :size="20" v-if="icon === 'user'" />
      <Mail :size="20" v-else-if="icon === 'email'" />
      <Tag :size="20" v-else-if="icon === 'tag'" />
      <Link2 :size="20" v-else-if="icon === 'url'" />
      <Clock :size="20" v-else />
    </div>
    <div class="left-icon" v-else>
      <slot name="icon"></slot>
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      autocomplete="off"
      v-model="value"
    />
  </div>
</template>
