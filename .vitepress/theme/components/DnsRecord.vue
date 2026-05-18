<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    type: string
    name: string
    value: string
    ttl?: string | number
    proxied?: boolean
    label?: string
  }>(),
  {
    ttl: 'Auto',
    proxied: false,
    label: 'DNS record',
  },
)

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

async function copyValue() {
  try {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    /* Clipboard write may be blocked; leave button state unchanged. */
  }
}
</script>

<template>
  <section class="mc-dns" :aria-label="label">
    <header class="mc-dns__header">
      <span class="mc-dns__label">{{ label }}</span>
      <button
        type="button"
        class="mc-dns__copy"
        :data-copied="copied"
        :aria-live="'polite'"
        @click="copyValue"
      >
        {{ copied ? 'Copied' : 'Copy value' }}
      </button>
    </header>
    <dl class="mc-dns__grid">
      <dt class="mc-dns__field-label">Type</dt>
      <dd class="mc-dns__field-value">{{ type }}</dd>

      <dt class="mc-dns__field-label">Name</dt>
      <dd class="mc-dns__field-value">{{ name }}</dd>

      <dt class="mc-dns__field-label">Value</dt>
      <dd class="mc-dns__field-value">{{ value }}</dd>

      <dt class="mc-dns__field-label">TTL</dt>
      <dd class="mc-dns__field-value">{{ ttl }}</dd>

      <template v-if="proxied !== undefined">
        <dt class="mc-dns__field-label">Proxy</dt>
        <dd class="mc-dns__field-value">{{ proxied ? 'On' : 'Off' }}</dd>
      </template>
    </dl>
  </section>
</template>
