<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CircleCheck, Plus } from 'lucide-vue-next'

import type { IActivity } from '@/types/iactivity'
import { api } from '@/lib/axios'

import BaseButton from '../base/BaseButton.vue'
import RegisterActivityModal from './RegisterActivityModal.vue'

const { tripId } = defineProps<{ tripId: string }>()

type ReponseActivitiesData = {
  data: {
    activities: {
      date: string
      activities: IActivity[]
    }[]
  }
}

const openRegisterActivity = ref<boolean>(false)
const activities = ref<ReponseActivitiesData>()

const toggleModalRegisterActivity = () =>
  (openRegisterActivity.value = !openRegisterActivity.value)

onMounted(async () => {
  await getActivities()
})

async function getActivities() {
  try {
    const response = (await api.get(
      `/trips/${tripId}/activities`
    )) as ReponseActivitiesData
    activities.value = response
    console.log(activities.value)
  } catch (e) {
    console.log(e)
  }
}

async function addActivity(activity: IActivity) {
  try {
    await api.post(`/trips/${tripId}/activities`, {
      title: activity.title,
      occurs_at: activity.occurs_at
    })
    await getActivities()
  } catch (e) {
    console.log(e)
  }
}

function formatDay(dateStr: string) {
  const date = new Date(dateStr)
  return `Dia ${date.getDate()}`
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  return `${date.getHours()}:${date.getMinutes()}h`
}
</script>

<template>
  <RegisterActivityModal
    :open="openRegisterActivity"
    @close="toggleModalRegisterActivity"
    @add-activity="addActivity"
  />
  <main>
    <header>
      <h1 class="fs-heading-lg">Atividades</h1>
      <BaseButton
        type="button"
        type-button="primary-button--sm"
        icon-position="left"
        text="Cadastrar atividade"
        @click="toggleModalRegisterActivity"
      >
        <template #icon>
          <Plus :size="20" />
        </template>
      </BaseButton>
    </header>

    <section
      v-for="activity in activities?.data.activities"
      :key="activity.date"
      class="activity"
    >
      <h2>
        <time class="fs-heading-md" datetime="2024-09-18">{{
          formatDay(activity.date)
        }}</time>
        <span class="fs-body-xs weekday">Sábado</span>
      </h2>
      <div class="activity-empty" v-if="activity.activities.length === 0">
        <p class="fs-body-sm">Nenhuma atividade cadastrada nessa data.</p>
      </div>
      <div v-else>
        <div
          v-for="act in activity.activities"
          :key="act.id"
          class="activity-hour not-checked"
        >
          <div class="status-icon">
            <CircleCheck :size="20" />
          </div>
          <p class="fs-body-md">{{ act.title }}</p>
          <time datetime="14:00" class="fs-body-sm">
            {{ formatTime(act.occurs_at) }}
          </time>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables' as *;

main {
  width: 66.8rem;
  padding-inline: 2.4rem;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      color: $gray-50;
    }
  }

  section.activity {
    opacity: 0.6;

    margin-top: 3.2rem;

    .activity-empty {
      p {
        padding-top: 1.2rem;
        color: $gray-500;
      }
    }

    h2 {
      color: $gray-300;

      span.weekday {
        margin-left: 0.8rem;
        color: $gray-500;
      }
    }

    .activity-hour {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;

      padding: 1.6rem 1.6rem;
      height: 4rem;
      margin-top: 1.2rem;

      background: $gray-900;
      box-shadow:
        0px 8px 8px rgba(0, 0, 0, 0.1),
        0px 4px 4px rgba(0, 0, 0, 0.1),
        0px 2px 2px rgba(0, 0, 0, 0.1),
        0px 0px 0px 1px rgba(0, 0, 0, 0.1),
        inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03),
        inset 0px 1px 0px rgba(255, 255, 255, 0.03);
      border-radius: 12px;

      .status-icon {
        width: 2rem;
        height: 2rem;

        color: $green-300;
      }

      p {
        flex: 1;
        color: $gray-100;
      }

      time {
        color: $gray-400;
      }

      p,
      time {
        padding-top: 0.4rem;
      }
    }

    &:has(.activity-hour.not-checked) {
      opacity: 1;

      .status-icon.dashed {
        svg {
          color: $gray-400;
        }
      }
    }
  }
}
</style>
