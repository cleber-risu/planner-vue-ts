<script setup lang="ts">
import { ref } from 'vue'

import type { ILink } from '@/types/ilink'

import BaseButton from '../base/BaseButton.vue'
import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'

defineProps<{ open: boolean }>()

const title = ref<string>('')
const url = ref<string>('')

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'register-new-link', link: ILink): void
}>()

const close = () => emit('close')

function registerNewLink() {
  if (title.value !== '' && url.value !== '') {
    emit('register-new-link', {
      title: title.value,
      url: url.value
    })
    close()
  }
}
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Cadastrar link">
    <div class="content">
      <p class="fs-body-sm">
        Todos convidados podem visualizar os links importantes.
      </p>
      <form @submit.prevent="registerNewLink">
        <BaseInput
          type="text"
          icon="tag"
          placeholder="Título do link"
          v-model:value="title"
        />
        <BaseInput
          type="url"
          icon="url"
          placeholder="URL"
          v-model:value="url"
        />
        <BaseButton
          type="submit"
          type-button="primary-button"
          text="Salvar link"
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
  }

  form {
    margin-top: 2rem;

    div + div {
      margin-top: 0.8rem;
    }

    button {
      width: 100%;
      margin-top: 1.2rem;
    }
  }
}
</style>
