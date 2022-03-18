<template>
  <div class="app-container">

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">

      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets" /> Banco de Ideas</span>
        <step-1 @continuar="continuar" @atras="atras" />
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-wallet" />Pago Modalidad</span>
        <step-2 @continuar="continuar" @atras="atras" />
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-document" /> Propuesta Trabajo de Grado</span>
        <step-3 @continuar="continuar" @atras="atras" />
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-folder-opened" />Informe Final</span>
        <step-4 @continuar="continuar" @atras="atras" />
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-star-on" /> Resultado</span>
        Resultado
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>

import step1 from './step1.vue'
import step2 from './step2.vue'
import step3 from './step3.vue'
import step4 from './step4.vue'

export default {
  components: {
    step1,
    step2,
    step3,
    step4
  },
  data() {
    return {
      activeName: '0'
    }
  },
  methods: {
    continuar() {
      const active = parseInt(this.activeName)
      this.activeName = (active + 1).toString()
    },
    atras() {
      const active = parseInt(this.activeName)
      this.activeName = (active - 1).toString()
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

