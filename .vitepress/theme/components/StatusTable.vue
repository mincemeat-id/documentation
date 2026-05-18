<script setup lang="ts">
type StatusVariant =
  | 'running'
  | 'stopped'
  | 'pending'
  | 'error'
  | 'warning'
  | 'info'

interface StatusRow {
  status: string
  variant: StatusVariant
  meaning: string
  next?: string
}

const props = withDefaults(
  defineProps<{
    rows: StatusRow[]
    statusLabel?: string
    meaningLabel?: string
    nextLabel?: string
  }>(),
  {
    statusLabel: 'Status',
    meaningLabel: 'What it means',
    nextLabel: 'What to do next',
  },
)

const hasNext = props.rows.some((row) => Boolean(row.next))
</script>

<template>
  <table class="mc-status-table">
    <thead>
      <tr>
        <th scope="col">{{ props.statusLabel }}</th>
        <th scope="col">{{ props.meaningLabel }}</th>
        <th v-if="hasNext" scope="col">{{ props.nextLabel }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.rows" :key="row.status">
        <td>
          <span
            class="mc-status-badge"
            :class="`mc-status-badge--${row.variant}`"
          >
            {{ row.status }}
          </span>
        </td>
        <td>{{ row.meaning }}</td>
        <td v-if="hasNext">{{ row.next || '—' }}</td>
      </tr>
    </tbody>
  </table>
</template>
