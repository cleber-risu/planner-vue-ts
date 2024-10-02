<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

import { api } from '@/lib/axios'
import type { ITrip } from '@/types/itrip'

import SelectTripInformation from '@/components/SelectTripInformation.vue'
import LinksAndGuests from '@/components/trip-details/LinksAndGuests.vue'
import TripActivities from '@/components/trip-details/TripActivities.vue'

type ResponseTripData = {
  data: {
    trip: ITrip
  }
}

const local = ref<string>('')
const dates = ref<Date[]>([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7))
])

provide('dates', dates)

const route = useRoute()
const { id } = route.params as { id: string }

onMounted(async () => {
  await getTripDetails()
})

async function getTripDetails() {
  try {
    const response = (await api.get(`/trips/${id}`)) as ResponseTripData
    local.value = response.data.trip.destination
    dates.value = [
      new Date(response.data.trip.starts_at),
      new Date(response.data.trip.ends_at)
    ]
  } catch (e) {
    console.log(e)
  }
}

async function editTripData() {
  try {
    await api.put(`/trips/${id}`, {
      destination: local.value,
      starts_at: dates.value[0].toISOString(),
      ends_at: dates.value[1].toISOString()
    })
  } catch (e) {
    console.log(e)
  }
}

function editDates(range: Date[]) {
  dates.value = range
}
</script>

<template>
  <div class="content">
    <header class="container">
      <SelectTripInformation
        :edit="true"
        :dates="dates"
        v-model:local="local"
        @add-dates="editDates"
        @confirm-data="editTripData"
      />
    </header>
    <div class="container">
      <TripActivities :trip-id="id" />
      <LinksAndGuests :trip-id="id" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables' as *;

.content {
  .container {
    max-width: 110rem;
    margin: 3.2rem auto;

    display: flex;
    gap: 6.4rem;

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
  }
}
</style>
