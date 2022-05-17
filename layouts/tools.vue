<template>
  <div>
    <app-layout>
      <nuxt />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from '../components/layout/AppLayout/AppLayout.vue'
export default {
  name: 'AppLayoutDefault',
  components: { AppLayout },
  mounted() {
    window.onload = function () {
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault()
      })
    }
  }
}
</script>
