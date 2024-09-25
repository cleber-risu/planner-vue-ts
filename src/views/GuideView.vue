<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowRight, AtSign, Calendar } from 'lucide-vue-next'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseBox from '@/components/base/BaseBox.vue'
import BaseDialog from '@/components/base/BaseDialog.vue'

// temos que controlar o estado do modal de fora
const open = ref<boolean>(false)

// estado do input componente BaseInput
// o componente usa defineModel para usar v-model por fora
const user = ref<string>('')

function toggleModal() {
  open.value = !open.value
}

/* VueDatePicker */

const date = ref<Date[]>()

// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date()
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  date.value = [startDate, endDate]
})

const format = (date: Date[]) => {
  const day = date[0].getDate()
  const month = String(date[0].getMonth() + 1).padStart(2, '0')
  const year = date[0].getFullYear()

  return `Data Selecionada ${day}/${month}/${year}`
}
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
        text="Confirmar e fechar"
        @click="toggleModal"
      />
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
    <BaseButton
      type="button"
      type-button="primary-button"
      icon-position="left"
      text="Primary Btn"
    >
      <template #icon>
        <ArrowRight :size="20" />
      </template>
    </BaseButton>
    <BaseButton
      type="button"
      type-button="primary-button--disabled"
      text="Primary Btn Disabled"
    />
    <BaseButton
      type="button"
      type-button="primary-button--sm"
      text="Primary Btn SM"
    />
    <BaseButton
      type="button"
      type-button="primary-button--sm-disabled"
      text="Primary Btn SM Disabled"
    />
    <BaseButton
      type="button"
      type-button="secondary-button"
      text="Secondary Btn"
      icon-position="right"
    >
      <template #icon>
        <ArrowRight :size="20" />
      </template>
    </BaseButton>
    <BaseButton
      type="button"
      type-button="secondary-button--disabled"
      text="Secondary Btn Disabled"
    />
    <BaseButton
      type="button"
      type-button="secondary-button--sm"
      text="Secondary Btn SM"
    />
    <BaseButton
      type="button"
      type-button="secondary-button--sm-disabled"
      text="Secondary Btn SM Disabled"
    />
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
      <BaseButton
        type="button"
        type-button="primary-button--sm"
        text="Continuar"
      />
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

  <div class="container date-picker">
    <VueDatePicker
      v-model="date"
      range
      dark
      locale="pt-BR"
      :day-names="['D', 'S', 'T', 'Q', 'Q', 'S', 'S']"
      :min-date="new Date()"
      :format="format"
    >
      <template #input-icon>
        <div class="icon-calendar">
          <Calendar :size="20" />
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables.scss';

.content-dialog {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  p {
    color: variables.$gray-200;
  }
}

.container {
  margin: 0 auto;
  width: 792px;

  margin-bottom: 1.8rem;

  &.fonts {
    color: variables.$gray-100;
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
    color: variables.$gray-300;
  }

  &.date-picker {
    .icon-calendar {
      width: 2rem;
      height: 2rem;
      margin-left: 0.85rem;
    }
  }
}
</style>
