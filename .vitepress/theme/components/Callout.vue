<script setup lang="ts">
type CalloutType = 'note' | 'tip' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    type?: CalloutType
    title?: string
  }>(),
  {
    type: 'note',
    title: '',
  },
)

const defaultTitles: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Important',
}

const iconGlyph: Record<CalloutType, string> = {
  note: 'i',
  tip: '✓',
  warning: '!',
  danger: '!',
}

const ariaRole = (type: CalloutType) =>
  type === 'warning' || type === 'danger' ? 'note' : 'note'
</script>

<template>
  <aside
    class="mc-callout"
    :class="`mc-callout--${props.type}`"
    :role="ariaRole(props.type)"
    :aria-label="props.title || defaultTitles[props.type]"
  >
    <span class="mc-callout__icon" aria-hidden="true">
      {{ iconGlyph[props.type] }}
    </span>
    <div class="mc-callout__body">
      <p class="mc-callout__title">
        {{ props.title || defaultTitles[props.type] }}
      </p>
      <slot />
    </div>
  </aside>
</template>
