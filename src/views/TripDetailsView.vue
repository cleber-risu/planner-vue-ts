<script setup lang="ts">
import { ref } from 'vue'

import {
  CircleCheck,
  CircleDashed,
  Link2,
  Plus,
  UserCog
} from 'lucide-vue-next'

import BaseButton from '@/components/base/BaseButton.vue'
import SelectTripInformation from '@/components/SelectTripInformation.vue'
import RegisterActivityModal from '@/components/trip-details/RegisterActivityModal.vue'
import RegisterLinkModal from '@/components/trip-details/RegisterLinkModal.vue'
import ConfirmParticipationModal from '@/components/trip-details/ConfirmParticipationModal.vue'

const local = ref<string>('Singapura')
const dates = ref<Date[]>([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7))
])
const openRegisterActivity = ref<boolean>(false)
const openRegisterLink = ref<boolean>(false)
const openConfirmParticipation = ref<boolean>(false)

const toggleModalRegisterActivity = () =>
  (openRegisterActivity.value = !openRegisterActivity.value)

const toggleModalRegisterLink = () =>
  (openRegisterLink.value = !openRegisterLink.value)

const toggleModalConfirmParticipation = () =>
  (openConfirmParticipation.value = !openConfirmParticipation.value)
</script>

<template>
  <RegisterActivityModal
    :open="openRegisterActivity"
    @close="toggleModalRegisterActivity"
  />
  <RegisterLinkModal
    :open="openRegisterLink"
    @close="toggleModalRegisterLink"
  />
  <ConfirmParticipationModal
    :open="openConfirmParticipation"
    @close="toggleModalConfirmParticipation"
  />
  <header class="container">
    <SelectTripInformation :dates="dates" :edit="true" v-model:local="local" />
  </header>
  <div class="container">
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

      <section class="activity">
        <h2>
          <time class="fs-heading-md" datetime="2024-09-18">Dia 17</time>
          <span class="fs-body-xs weekday">Sexta</span>
        </h2>
        <div class="activity-empty">
          <p class="fs-body-sm">Nenhuma atividade cadastrada nessa data.</p>
        </div>
      </section>

      <section class="activity">
        <h2>
          <time class="fs-heading-md" datetime="2024-09-18">Dia 18</time>
          <span class="fs-body-xs weekday">Sábado</span>
        </h2>
        <div class="activity-hour checked">
          <div class="status-icon">
            <CircleCheck :size="20" />
          </div>
          <p class="fs-body-md">Corrida de Kart</p>
          <time datetime="14:00" class="fs-body-sm">14:00h</time>
        </div>
      </section>

      <section class="activity">
        <h2>
          <time class="fs-heading-md" datetime="2024-09-18">Dia 19</time>
          <span class="fs-body-xs weekday">Domingo</span>
        </h2>
        <div class="activity-hour checked">
          <div class="status-icon">
            <CircleCheck :size="20" />
          </div>
          <p class="fs-body-md">Academia em grupo</p>
          <time datetime="14:00" class="fs-body-sm">8:00h</time>
        </div>
        <div class="activity-hour checked">
          <div class="status-icon">
            <CircleCheck :size="20" />
          </div>
          <p class="fs-body-md">Almoço</p>
          <time datetime="14:00" class="fs-body-sm">12:00h</time>
        </div>
        <div class="activity-hour not-checked">
          <div class="status-icon dashed">
            <CircleDashed :size="20" />
          </div>
          <p class="fs-body-md">Gaming session</p>
          <time datetime="14:00" class="fs-body-sm">18:00h</time>
        </div>
      </section>
    </main>
    <aside>
      <section class="links">
        <h2 class="fs-heading-md">Links importantes</h2>
        <div class="group-links">
          <div class="link">
            <div class="desc-link">
              <h3 class="fs-heading-xs">Reserva do AirBnB</h3>
              <a
                href="https://www.airbnb.com.br/rooms/104700011"
                target="_blank"
                class="fs-body-xs"
              >
                https://www.airbnb.com.br/rooms/104700011
              </a>
            </div>
            <a
              href="https://www.airbnb.com.br/rooms/104700011"
              target="_blank"
              class="icon-link"
            >
              <Link2 :size="20" />
            </a>
          </div>
          <div class="link">
            <div class="desc-link">
              <h3 class="fs-heading-xs">Regras da casa</h3>
              <a href="#" target="_blank" class="fs-body-xs">
                https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
              </a>
            </div>
            <a href="#" target="_blank" class="icon-link">
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
          <div class="link">
            <div class="desc-link">
              <h3 class="fs-heading-xs">Jessica White</h3>
              <a
                href="mailto:jessica.white44@yahoo.com"
                target="_blank"
                class="fs-body-sm"
              >
                jessica.white44@yahoo.com
              </a>
            </div>
            <button class="transparent">
              <CircleDashed :size="20" />
            </button>
          </div>
          <div class="link">
            <div class="desc-link">
              <h3 class="fs-heading-xs">Dr. Rita Pacocha</h3>
              <a
                href="mailto:lacy.stiedemann@gmail.com"
                target="_blank"
                class="fs-body-sm"
              >
                lacy.stiedemann@gmail.com
              </a>
            </div>
            <button class="transparent check">
              <CircleCheck :size="20" />
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
  </div>
</template>

<style lang="scss" scoped>
@use '/src/sass/variables' as *;

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
}
</style>
