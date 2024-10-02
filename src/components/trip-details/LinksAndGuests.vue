<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  CircleCheck,
  CircleDashed,
  Link2,
  Plus,
  UserCog
} from 'lucide-vue-next'

import type { IGuest } from '@/types/iguest'
import type { ILink } from '@/types/ilink'
import { api } from '@/lib/axios'

import BaseButton from '../base/BaseButton.vue'
import RegisterLinkModal from './RegisterLinkModal.vue'
import ConfirmParticipationModal from './ConfirmParticipationModal.vue'

interface ILinksAndGuests {
  tripId: string
}

type ResponseLinksData = {
  data: {
    links: ILink[]
  }
}

type ResponseGuestsData = {
  data: {
    participants: IGuest[]
  }
}

type ResponseIdLinkData = {
  data: {
    linkId: string
  }
}

const { tripId } = defineProps<ILinksAndGuests>()

const guests = ref<IGuest[]>([])
const links = ref<ILink[]>([])
const openRegisterLink = ref<boolean>(false)
const openConfirmParticipation = ref<boolean>(false)

const toggleModalRegisterLink = () =>
  (openRegisterLink.value = !openRegisterLink.value)

const toggleModalConfirmParticipation = () =>
  (openConfirmParticipation.value = !openConfirmParticipation.value)

onMounted(async () => {
  await getLInks()
  await getGuests()
})

async function getLInks() {
  try {
    const response = (await api.get(
      `/trips/${tripId}/links`
    )) as ResponseLinksData
    links.value = response.data.links
  } catch (e) {
    console.log(e)
  }
}

async function getGuests() {
  try {
    const response = (await api.get(
      `/trips/${tripId}/participants`
    )) as ResponseGuestsData
    guests.value = response.data.participants
  } catch (e) {
    console.log(e)
  }
}

async function confirmsAParticipant(participantId?: string) {
  if (!participantId) {
    return
  }
  try {
    await api.patch(`/participants/${participantId}/confirm`)
  } catch (e) {
    console.log(e)
  }
}

async function createATripLInk(link: ILink) {
  try {
    const response = (await api.post(
      `/trips/${tripId}/links`,
      link
    )) as ResponseIdLinkData
    if (response) {
      links.value.push(link)
    }
  } catch (e) {
    console.log(e)
  }
}

async function inviteToTheTrip(guest: IGuest) {
  const result = guests.value.filter((item) => item.email === guest.email)
  if (!result.length) {
    try {
      await api.post(`/trips/${tripId}/invites`, {
        email: guest.email
      })
      await getGuests()
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<template>
  <RegisterLinkModal
    :open="openRegisterLink"
    @close="toggleModalRegisterLink"
    @register-new-link="createATripLInk"
  />
  <ConfirmParticipationModal
    :open="openConfirmParticipation"
    @close="toggleModalConfirmParticipation"
    @invite="inviteToTheTrip"
  />
  <aside>
    <section class="links">
      <h2 class="fs-heading-md">Links importantes</h2>
      <div class="group-links">
        <div class="link" v-for="link in links" :key="link.id">
          <div class="desc-link">
            <h3 class="fs-heading-xs">{{ link.title }}</h3>
            <a :href="link.url" target="_blank" class="fs-body-xs">
              {{ link.url }}
            </a>
          </div>
          <a :href="link.url" target="_blank" class="icon-link">
            <Link2 :size="20" />
          </a>
        </div>
      </div>
      <BaseButton
        type="button"
        type-button="secondary-button"
        icon-position="left"
        text="Cadastrar novo link"
        @click="toggleModalRegisterLink"
      >
        <template #icon>
          <Plus :size="20" />
        </template>
      </BaseButton>
    </section>

    <div class="hr" />

    <section class="guests">
      <h2 class="fs-heading-md">Convidados</h2>
      <div class="group-links">
        <div class="link" v-for="guest in guests" :key="guest.id">
          <div class="desc-link">
            <h3 class="fs-heading-xs">{{ guest.name }}</h3>
            <a
              :href="`mailto:${guest.email}`"
              target="_blank"
              class="fs-body-sm"
            >
              {{ guest.email }}
            </a>
          </div>
          <button v-if="guest.is_confirmed" class="transparent check">
            <CircleCheck :size="20" />
          </button>
          <button
            v-else
            class="transparent"
            @click="confirmsAParticipant(guest.id)"
          >
            <CircleDashed :size="20" />
          </button>
        </div>
      </div>
      <BaseButton
        type="button"
        type-button="secondary-button"
        icon-position="left"
        text="Gerenciar convidados"
        @click="toggleModalConfirmParticipation"
      >
        <template #icon>
          <UserCog :size="20" />
        </template>
      </BaseButton>
    </section>
  </aside>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables' as *;

aside {
  width: 34rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  section {
    h2 {
      color: $gray-50;
    }

    &.links,
    &.guests {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      .link + .link {
        margin-top: 2rem;
      }

      .link {
        display: flex;
        justify-content: space-between;

        a,
        svg {
          color: $gray-400;
        }

        .desc-link {
          width: 32rem;

          h3 {
            color: $gray-100;
          }

          a {
            width: 90%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          h3 + a {
            margin-top: 0.8rem;
          }
        }

        .icon-link {
          align-self: center;
        }
      }
    }

    &.guests {
      .check {
        svg {
          color: $green-300;
        }
      }
    }
  }

  .hr {
    border-top: 0.1px solid $gray-800;
  }
}
</style>
