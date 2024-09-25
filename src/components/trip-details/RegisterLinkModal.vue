<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue'
import BaseDialog from '../base/BaseDialog.vue'
import BaseInput from '../base/BaseInput.vue'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')
</script>

<template>
  <BaseDialog :open="open" @close="close" title="Cadastrar link">
    <div class="content">
      <p class="fs-body-sm">
        Todos convidados podem visualizar os links importantes.
      </p>
      <form>
        <BaseInput type="text" icon="tag" placeholder="Título do link" />
        <BaseInput type="url" icon="url" placeholder="URL" />
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
