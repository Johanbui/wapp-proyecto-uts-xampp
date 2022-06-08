<template>
  <div>
    <div class="dashboard-container">
      <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    </div>
    <Footer :activar-bg="true" />
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import Footer from '@/components/footer'

export default {
  name: 'Dashboard',
  components: { Footer },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
