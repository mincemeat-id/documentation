<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  caption?: string
  label?: string
}>()
</script>

<template>
  <figure class="mc-screenshot">
    <div class="mc-screenshot__frame">
      <img :src="src" :alt="alt" loading="lazy" decoding="async" />
    </div>
    <figcaption v-if="caption || label" class="mc-screenshot__caption">
      <strong v-if="label">{{ label }}.</strong>
      <template v-if="label && caption">&nbsp;</template>
      <span v-if="caption">{{ caption }}</span>
    </figcaption>
  </figure>
</template>
