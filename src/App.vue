<template>
  <RouterView v-slot="{ Component }">
    <Transition name="move">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.move-enter-from,
.move-leave-to {
  transform: translateY(-100px);
}

.move-enter-to,
.move-leave-from {
  transform: translateY(0);
}

.move-enter-active,
.move-leave-active {
  transition: transform 0.3s ease-in;
}
</style>
