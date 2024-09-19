<script setup lang="ts">
import { ArrowRight, AtSign } from 'lucide-vue-next'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseBox from '@/components/base/BaseBox.vue'
import { onUpdated, ref } from 'vue'

// temos que controlar o estado do modal de fora
const open = ref<boolean>(false)

// estado do input componente BaseInput
// o componente usa defineModel para usar v-model por fora
const user = ref<string>('')

function toggleModal() {
  open.value = !open.value
}

onUpdated(() => {
  console.log(user.value)
})
</script>

<template>
  <!-- BaseDialog é um componente global importa direto em main.ts -->
  <BaseDialog :open="open" title="Titulo do modal" @close="toggleModal">
    <div class="content-dialog">
      <p class="body-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
        perspiciatis explicabo quaerat veniam accusamus aliquid! Assumenda
        quaerat quo sed impedit dicta, laudantium ea voluptas cum temporibus,
        voluptate eius quisquam exercitationem.
      </p>
      <BaseButton
        type="button"
        type-button="primary-button"
        @click="toggleModal"
      >
        <span>Confirmar e fechar</span>
      </BaseButton>
    </div>
  </BaseDialog>

  <div class="container fonts">
    <h1>Style Guide</h1>
    <br />
    <h2 class="fs-heading-lg">Heading LG</h2>
    <h2 class="fs-heading-md">Heading MD</h2>
    <h2 class="fs-heading-sm">Heading SM</h2>
    <h2 class="fs-heading-xs">Heading XS</h2>
    <br />
    <p class="fs-body-lg">Body LG</p>
    <p class="fs-body-md">Body MD</p>
    <p class="fs-body-sm">Body SM</p>
    <p class="fs-body-xs">Body XS</p>
    <br />
    <button class="fs-button" @click="toggleModal">
      Button font style | open modal
    </button>
  </div>

  <div class="container buttons">
    <BaseButton type="button" type-button="primary-button">
      <span>Primary Button</span>
      <div class="icon">
        <ArrowRight :size="20" />
      </div>
    </BaseButton>
    <BaseButton type="button" type-button="primary-button--disabled">
      <span>Primary Button Disabled</span>
    </BaseButton>
    <BaseButton type="button" type-button="primary-button--sm">
      <span>Primary Button SM</span>
      <div class="icon">
        <ArrowRight :size="20" />
      </div>
    </BaseButton>
    <BaseButton type="button" type-button="primary-button--sm-disabled">
      <span>Primary Button SM Disabled</span>
    </BaseButton>
    <BaseButton type="button" type-button="secondary-button">
      <span>Secondary Button</span>
      <div class="icon">
        <ArrowRight :size="20" />
      </div>
    </BaseButton>
    <BaseButton type="button" type-button="secondary-button--disabled">
      <span>Secondary Button Disabled</span>
    </BaseButton>
    <BaseButton type="button" type-button="secondary-button--sm">
      <span>Secondary Button SM</span>
      <div class="icon">
        <ArrowRight :size="20" />
      </div>
    </BaseButton>
    <BaseButton type="button" type-button="secondary-button--sm-disabled">
      <span>Secondary Button SM Disabled</span>
    </BaseButton>
  </div>

  <div class="container inputs">
    <BaseInput
      type="text"
      icon="user"
      placeholder="Nome de usuario"
      v-model:value="user"
    />
    <BaseInput type="email" icon="email" placeholder="Seu e-mail" />
    <BaseInput type="text" icon="tag" placeholder="Insira um tag para a url" />
    <BaseInput type="url" icon="url" placeholder="Insira seu link" />
    <BaseInput type="time" icon="clock" />
    <BaseInput type="email" placeholder="Insira o email">
      <template #icon>
        <AtSign :size="20" />
      </template>
    </BaseInput>
    <!-- Input personalizado apenas com as classes css -->
    <div class="default-input">
      <div class="left-icon">
        <AtSign :size="20" />
      </div>
      <input type="text" placeholder="teste ..." />
      <BaseButton type="button" type-button="primary-button--sm">
        <span>Continuar</span>
      </BaseButton>
    </div>
  </div>

  <div class="container base-box">
    <BaseBox>
      <h2 class="heading-sm">Teste de caixa</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
        voluptatibus error adipisci quibusdam veritatis incidunt consequatur
        maxime! Quibusdam dicta ipsa animi ab vero, at totam! Dicta consequatur
        voluptatem deleniti voluptates!
      </p>
    </BaseBox>
  </div>
</template>

<style lang="scss" scoped>
.content-dialog {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  p {
    color: $gray-200;
  }
}

.container {
  margin: 0 auto;
  width: 792px;

  margin-bottom: 1.8rem;

  &.fonts {
    color: $gray-100;
  }

  &.buttons {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
  }

  &.inputs {
    div + div {
      margin-top: 1rem;
    }
  }

  &.base-box {
    color: $gray-300;
  }
}
</style>
