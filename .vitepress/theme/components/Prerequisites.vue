<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    items?: string[]
  }>(),
  {
    title: 'Before you start',
    items: () => [],
  },
)
</script>

<template>
  <section class="mc-prereqs" aria-labelledby="mc-prereqs-title">
    <h3 id="mc-prereqs-title" class="mc-prereqs__title">{{ props.title }}</h3>
    <ul class="mc-prereqs__list">
      <li v-for="item in props.items" :key="item">{{ item }}</li>
      <slot />
    </ul>
  </section>
</template>
