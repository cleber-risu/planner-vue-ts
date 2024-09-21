<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface IBaseDialog {
  open: boolean
  title: string
  width?: 'lg' | 'md'
}

const { open, width = 'md' } = defineProps<IBaseDialog>()

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
        <div :class="['box', 'modal-box', width]">
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
@use '/src/sass/variables.scss';

%full-position {
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
}

.md {
  width: 54rem;
}

.lg {
  width: 64rem;
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
    height: fit-content;

    gap: 0.8rem;

    .header {
      width: 100%;
      display: flex;
      align-items: start;
      justify-content: space-between;

      h2 {
        color: variables.$white;
      }

      button {
        svg {
          color: variables.$gray-400;
          transition: color 0.3s ease;
        }

        &:hover {
          svg {
            color: variables.$gray-200;
          }
        }
      }
    }

    .content {
      width: 100%;
      margin-top: 0.4rem;
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
