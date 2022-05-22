<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <el-steps :active="active" finish-status="success">
          <el-step title="Banco de Ideas" icon="el-icon-tickets" />
          <el-step title="Aprobacion de Idea" icon="el-icon-wallet" />
          <el-step title="Propuesta Trabajo de Grado" icon="el-icon-document" />
          <el-step title="Evaluacion Propuesta" icon="el-icon-wallet" />
          <el-step title="Informe Final" icon="el-icon-folder-opened" />
          <el-step title="Evaluacion Informe Final" icon="el-icon-folder-opened" />
          <el-step title="Resultado" icon="el-icon-star-on" />
        </el-steps>
      </el-col>
    </el-row>

    <el-row v-if="active == 0">
      <el-col :span="24">
        <step-1 @continuar="continuar" @atras="atras" />
      </el-col>
    </el-row>

    <el-row v-if="active == 1">
      <el-col :span="24">
        <step-2 :idea-selected="ideaSelected" @continuar="continuar" @atras="atras" />
      </el-col>
    </el-row>

    <el-row v-if="active == 2">
      <el-col :span="24">
        <step-3 :idea-selected="ideaSelected" @continuar="continuar" @atras="atras" />
      </el-col>
    </el-row>

    <el-row>
      <el-col v-if="active == 3" :span="24">
        <step-3 :id-file-propuesta="idFilePropuesta" :idea-selected="ideaSelected" :evaluacion="true" @continuar="continuar" @atras="atras" />
        <!-- este step debe ser el del profesor con : Observaciones generales, Concepto Final, Y nuevo FDC-124-->
      </el-col>
    </el-row>

    <el-row>
      <el-col v-if="active == 4" :span="24">
        <step-4 :idea-selected="ideaSelected" @continuar="continuar" @atras="atras" />
      </el-col>
    </el-row>

    <el-row>
      <el-col v-if="active == 5" :span="24">
        <step-4 :id-file-propuesta="idFilePropuesta" :idea-selected="ideaSelected" :evaluacion="true" @continuar="continuar" @atras="atras" />
      </el-col>
    </el-row>

    <el-row>
      <el-col v-if="active == 6" :span="24">
        <step-5 @continuar="continuar" @atras="atras" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import step1 from './step1.vue'
import step2 from './step2.vue'
import step3 from './step3.vue'
import step4 from './step4.vue'
import step5 from './step5.vue'

export default {
  name: 'Index',
  components: {
    step1,
    step2,
    step3,
    step4,
    step5
  },
  data() {
    return {
      // activeName: '0',
      active: 0,
      ideaSelected: '',
      idFilePropuesta: 0
    }
  },
  methods: {
    continuar({ ideaSelected = 0, idFilePropuesta = 0 }) {
      if (ideaSelected) {
        this.ideaSelected = ideaSelected
      }

      if (idFilePropuesta) {
        this.idFilePropuesta = idFilePropuesta
      }
      const active = parseInt(this.active)
      // this.activeName = (active + 1).toString()
      this.active = active + 1
    },
    atras() {
      const active = parseInt(this.active)
      // this.activeName = (active - 1).toString()
      this.active = active - 1
    }

  }
}
</script>

<style lang="scss">
  .line{
    text-align: center;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-step__icon-inner{
    font-size: 35px !important;
  }

</style>

