<script setup lang="ts">
import { onUpdated, ref } from 'vue'

import SelectTripInformation from '@/components/SelectTripInformation.vue'

const local = ref<string>('')
const dates = ref<Date[]>([])

const addDates = (range: Date[]) => (dates.value = range)

onUpdated(() => {
  console.log('local: ' + local.value)
  console.log('dates:' + dates.value)
})
</script>

<template>
  <div class="grid-center page">
    <div class="flex-center main">
      <div class="flex-center header">
        <img src="/logo.svg" alt="Logomarca planner" />
        <p class="fs-body-lg">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </div>
      <div class="content">
        <SelectTripInformation
          v-model:local="local"
          :dates="dates"
          @add-dates="addDates"
        />
      </div>
      <div class="footer">
        <p class="fs-body-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a href="#">termos de uso</a> e
          <a href="#">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;

  .main {
    flex-direction: column;

    width: 103.385rem;
    height: 64rem;

    background: url('/bg.png') no-repeat;

    .header {
      display: flex;
      flex-direction: column;

      p {
        color: $gray-300;
        margin-top: 0.8rem;
      }
    }

    .content {
      margin-block: 4rem;
      width: 86rem;
    }

    .footer {
      text-align: center;
      color: $gray-500;

      a {
        color: $gray-300;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
