<template>
  <div class="app-step5">

    <el-button-group>
      <el-button type="primary" @click="atras">Atras</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    atras() {
      this.$emit('atras')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

