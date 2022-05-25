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
        <step-5 :idea-selected="ideaSelected" @continuar="continuar" @atras="atras" @inicio="inicio" />
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
import { mapGetters } from 'vuex'
import { createIdeaEstado, getIdeaEstado } from '@/api/idea'

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
      ideaSelected: { 'id': 1, 'titulo': 'Desarrollo Software Trabajos de Grado', 'max_estudiantes': 2, 'nombreModalidad': 'Desarrollo de Software', 'nombreLineaInvestigacion': 'Desarrollo de Software Orientado a la WEB', 'cantidadUsuarios': 4, 'enable': false },
      idFilePropuesta: 0,
      estadoFinal: ''
    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles',
      'user'
    ])
  },
  methods: {
    async continuar({ ideaSelected = 0, idFilePropuesta = 0, estado = '' }) {
      if (ideaSelected) {
        this.ideaSelected = ideaSelected
      }

      if (idFilePropuesta) {
        this.idFilePropuesta = idFilePropuesta
      }
      console.log(estado)
      if (estado !== '') {
        if (this.user.rol_id !== 4) {
          const responseObj = await this.fetchIdeaEstado(estado, this.ideaSelected.id)
          if (responseObj) {
            await this.pasarTab()
          } else {
            await this.openActa(estado)
          }
        } else {
          await this.insertEstado(estado, '')

          // await this.pasarTab()
        }
      } else {
        await this.insertEstado(estado, '')
      }
    },
    openActa(estado) {
      this.$prompt('Ingrese Codigo de Acta', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(({ value }) => {
        this.insertEstado(estado, value === null ? null : value.trim())
      }).catch((err) => {
        console.error(err)
      })
    },
    pasarTab() {
      const active = parseInt(this.active)
      this.active = active + 1
    },
    async fetchIdeaEstado(codigo_estado, id_idea) {
      const { exist } = await getIdeaEstado(
        codigo_estado, id_idea
      )
      return exist
    },

    insertEstado(estado, acta) {
      console.log('Acta:' + acta)
      if (estado === '' && acta === '') {
        return this.pasarTab()
      }

      if (acta === null) {
        return this.openActa(estado)
      }

      createIdeaEstado({
        id_idea: this.ideaSelected.id,
        codigo_estado: estado,
        acta
      }).then(({ exist, data, message }) => {
        if (exist && data) {
          this.estadoFinal = estado
          return this.pasarTab()
        } else {
          this.$message({
            type: 'info',
            message: message
          })
          return this.openActa(estado)
        }
      }).catch(() => {
        return this.openActa(estado)
      })

      // aqui va peticion a guardar/no insertarlo estado y numero de acta
      // y notificacion
      /*
        this.$message({
          type: 'success',
          message: 'Your email is:' + value
        })
        */
    },
    atras() {
      // this.activeName = (active - 1).toString()
      this.active = parseInt(this.active) - 1
    },
    inicio() {
      // this.activeName = (active - 1).toString()
      this.active = 0
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

