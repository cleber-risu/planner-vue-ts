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
  opacity: 0;
  transform: translateY(-100px);
}

.move-enter-to,
.move-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.move-enter-active {
  transition: all 0.5s ease-in;
}
</style>
