<template>
  <div class="app-step4">
    <div class="button-prorrogra">
      <el-button
        v-if="(!evaluacion && user.rol_id ==4)"
        type="primary"
        @click="centerDialogVisible = true"
      >Solicitar Prorroga</el-button>
    </div>
    <el-dialog
      title="Solicitar Prorroga"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-upload
        v-if="!evaluacion"
        class="upload-demo"
        drag
        :action="
          'http://apiproyectouts.local/api/files/pushLista?lista=' +
            propuesta[propuesta.length-1].id +
            '&index=' +
            (propuesta.length-1)
        "
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccessProrroga"
        :file-list="[...propuesta[propuesta.length-1].file]"
        :disabled="(!evaluacion && user.rol_id ==4) "
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          Suelta tu archivo aquí o <em>haz clic para cargar</em>
        </div>
        <div slot="tip" class="el-upload__tip">
          Solo archivos jpg/png con un tamaño menor de 500kb
        </div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmarProrroga">Confirm</el-button>
      </span>
    </el-dialog>

    <el-form ref="form" :model="form" label-width="130px">
      <template v-for="(formato, index) in propuesta">
        <el-form-item
          v-if="(formato.listaCodigo !=='PRORROGA' && !evaluacion) || evaluacion "
          :key="formato.id_codigo_archivo"
          :label="formato.listaNombre"
        >
          <el-upload
            v-if="!evaluacion"
            class="upload-demo"
            drag
            :action="
              'http://apiproyectouts.local/api/files/pushLista?lista=' +
                formato.id +
                '&index=' +
                index
            "
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="[...formato.file]"
            :disabled="(!evaluacion && user.rol_id !=4) || (evaluacion && user.rol_id ==4)"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Suelta tu archivo aquí o <em>haz clic para cargar</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              Solo archivos jpg/png con un tamaño menor de 500kb
            </div>
          </el-upload>

          <el-upload
            v-if="evaluacion"
            class="upload-demo"
            drag
            :action="
              'http://apiproyectouts.local/api/files/pushLista?lista=' +
                formato.id +
                '&index=' +
                index
            "
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="[...formato.fileConfirmation]"
            :disabled="(!evaluacion && user.rol_id !=4) || (evaluacion && user.rol_id ==4) || (evaluacion && formato.listaCodigo ==='PRORROGA')"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Suelta tu archivo aquí o <em>haz clic para cargar</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              Solo archivos jpg/png con un tamaño menor de 500kb
            </div>
          </el-upload>
        </el-form-item>
      </template>

      <el-form-item
        v-if="user.rol_id!=4 && evaluacion"
        label="Resultado Trabajo de Grado"
      >

        <el-select
          v-if="user.rol_id!=4 && evaluacion"
          v-model="resultado"
          filterable
          placeholder="Asigne resultado del trabajo de grado"
          :disabled=" estadoFinal ==='APREIDEA' || estadoFinal ==='CANEIDEA' || estadoFinal ==='EXPIDEA'"
        >
          <template>
            <el-option
              v-for="item in optionsResultado"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </template>
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="evaluacion && user.rol_id != 4"
        label="Comentario"
      >
        <el-input
          ref="comentario"
          v-model="comentario"
          placeholder="Comentario"
          name="comentario"
          type="textarea"
          :rows="2"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button-group>
        <el-button type="primary" @click="atras">Atras</el-button>
        <el-button type="primary" @click="continuar">Continuar</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>

import { getArrArchivoIdeas, getIdeaEstado, getResultadoProyecto } from '@/api/idea'
import { createArrArchivoIdeas, createArrArchivoIdeasEvaluacion } from '@/api/idea'
import { mapGetters } from 'vuex'

export default {
  name: 'Step4',
  props: {
    ideaSelected: {
      type: Object,
      default: function() {
        return {

        }
      }
    },
    evaluacion: {
      type: Boolean,
      default: false
    },
    idFilePropuesta: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      fileList: [],
      listFiles: {},
      propuesta: [],
      resultado: null,
      comentario: '',
      bloqueoResultado: false,
      optionsResultado: [

      ],
      estadoFinal: '',
      fileProrroga: null
    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles',
      'user'
    ])
  },
  async mounted() {
    debugger
    const { data } = await getResultadoProyecto(
      this.ideaSelected.id
    )
    debugger
    if (data !== null) {
      this.estadoFinal = data.codigoEstado
    }

    await this.fetchDataPropuesta('FRTOFIN')
    if (this.evaluacion) {
      await this.fetchIdeaEstado('RESULTADO', this.ideaSelected.id)
    }

    const arr = []
    arr.push({ label: 'No Aprobado', value: 'CANEIDEA' })
    arr.push({ label: 'Aprobado', value: 'APREIDEA' })
    arr.push({ label: 'Prorroga', value: 'PROEIDEA' })
    arr.push({ label: 'Expirado', value: 'EXPIDEA' })
    this.optionsResultado = arr
  },

  methods: {
    async fetchIdeaEstado(codigo_estado, id_idea) {
      const { data } = await getIdeaEstado(
        codigo_estado, id_idea
      )
      this.resultado = (typeof data.codigoEstado !== 'undefined' ? data.codigoEstado : '')
      if (this.resultado !== '') {
        this.bloqueoResultado = true
      }
      return data
    },
    async carguePropuesta() {
      if (!this.evaluacion) {
        const { type } = await createArrArchivoIdeas(
          this.fileList,
          this.ideaSelected.id
        )

        if (type === 'success') {
          const obj = {}
          if (this.user.rol_id !== 4) {
            const obj = {}
            obj.estado = ''
          } else {
            obj.estado = 'EVINFFIN'
          }

          this.$emit('continuar', {})
        }
      } else {
        const { type } = await createArrArchivoIdeasEvaluacion(
          this.fileList,
          this.ideaSelected.id
        )
        if (type === 'success') {
          const obj = {}
          if (this.user.rol_id !== 4) {
            obj.estado = this.resultado
            obj.comentario = this.comentario
          } else {
            obj.estado = ''
          }
          this.$emit('continuar', obj)
        }
      }
    },
    async fetchDataPropuesta(codigo) {
      /* const response = await getListaOne(codigo)

      response.data.enable = response.data.enable === 1
      this.propuesta = [...response.data]

      */

      const response2 = await getArrArchivoIdeas(codigo, this.ideaSelected.id)

      const data = [...response2.data]
      if (data !== null && data.length > 0) {
        this.propuesta = [...data]
        const fileList = []

        for (let index = 0; index < this.propuesta.length; index++) {
          const element = this.propuesta[index]
          let id_file_confirmation = ''

          if (element.listaCodigo === 'PRORROGA') {
            id_file_confirmation = element.id
            this.propuesta[index].fileConfirmation = this.propuesta[index].file
          } else {
            id_file_confirmation = element.id_file_confirmation
          }

          fileList.push({
            id_file: element.id,
            id_codigo_archivo: element.id_codigo_archivo,
            id_file_propuesta: id_file_confirmation
          })
        }

        this.fileList = [...fileList]
        // this.id_file = data[0].fileConfirmation.id
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      if (typeof file.url !== 'undefined') {
        window.open(file.url)
      } else {
        window.open('http://apiproyectouts.local/api/files/' + file.response.file.id)
      }
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `El límite es 3, haz seleccionado ${
          files.length
        } archivos esta vez, añade hasta ${files.length + fileList.length}`
      )
    },
    continuar() {
      this.carguePropuesta()
    },
    handleSuccess(res, file) {
      console.log('handleSuccess')
      console.log(res.file)
      if (!this.evaluacion) {
        this.fileList[res.file.index].id_file = res.file.id
      } else {
        this.fileList[res.file.index].id_file_propuesta = res.file.id
      }
    },
    handleSuccessProrroga(res, file) {
      this.fileProrroga = res.file.id
    },
    confirmarProrroga() {
      this.fileList[this.fileList.length - 1].id_file = this.fileProrroga
      this.centerDialogVisible = false
    },
    atras() {
      this.$emit('atras')
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.button-prorrogra{
    display: grid;
    align-content: center;
    justify-content: end;
    align-items: center;
    justify-items: center;
}
</style>

