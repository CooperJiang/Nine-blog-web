<template>
  <Card :padding="padding">
    <empty-data />
  </Card>
</template>

<script>
import Card from '@/components/base/Card'
import EmptyData from '@/components/kit/EmptyData'

export default {
  name: 'CardEmptyData',
  components: {
    Card,
    EmptyData
  },
  props: {
    padding: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>
