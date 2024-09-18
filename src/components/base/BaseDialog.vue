<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface IBaseDialog {
  open: boolean
  title: string
}

const { open } = defineProps<IBaseDialog>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')

function EscapeDialog(e: KeyboardEvent) {
  if (!open) {
    return
  }
  if (e.key === 'Escape') {
    close()
  }
}

document.addEventListener('keyup', EscapeDialog)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="backdrop"></div>
    </Transition>
    <Transition name="pop">
      <div v-if="open" class="modal flex-center">
        <div class="box modal-box">
          <div class="header">
            <h2 class="fs-heading-sm">{{ title }}</h2>
            <button
              class="transparent"
              @click="close"
              aria-label="fechar modal"
            >
              <X :size="20" />
            </button>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
%full-position {
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
}

.backdrop {
  @extend %full-position;
  z-index: 99;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.8;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.modal {
  @extend %full-position;
  z-index: 100;

  .modal-box {
    width: 54rem;
    height: fit-content;

    gap: 0.8rem;

    .header {
      width: 100%;
      display: flex;
      align-items: start;
      justify-content: space-between;

      h2 {
        color: $white;
      }

      button {
        svg {
          color: $gray-400;
          transition: color 0.3s ease;
        }

        &:hover {
          svg {
            color: $gray-200;
          }
        }
      }
    }
  }
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.pop.enter-to,
.pop-leave-from {
  opacity: 1;
  transform: scale(1);
}

.pop-enter-active {
  transition: all 0.3s ease-out;
}

.pop-leave-active {
  transition: all 0.3s ease-in;
}
</style>
