<script setup lang="ts"></script>

<template>
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
    <button class="fs-button">Button font style</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 960px;

  &.fonts {
    color: $gray-100;
  }
}
</style>
