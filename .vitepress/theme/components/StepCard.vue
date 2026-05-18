<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <li class="mc-step">
    <div class="mc-step__body">
      <h3 class="mc-step__title">{{ title }}</h3>
      <slot />
    </div>
  </li>
</template>
