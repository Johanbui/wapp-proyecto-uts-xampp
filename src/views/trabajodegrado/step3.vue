<template>
  <div class="app-step3">
    <el-form ref="form" :model="form" label-width="130px">
      <template v-for="formato in propuesta">
        <el-form-item
          :key="formato.codigo"
          :label="formato.nombre"
        >
          <el-upload
            class="upload-demo"
            drag
            action="http://apiproyectouts.local/api/files/push"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
            <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
          </el-upload>
        </el-form-item>
      </template>

      <el-button-group>
        <el-button type="primary" @click="atras">Atras</el-button>
        <el-button type="primary" @click="continuar">Continuar</el-button>
      </el-button-group>

    </el-form>
  </div>
</template>

<script>
import { getListaOne } from '@/api/lista'
import { createArchivoIdeas, createArchivoIdeasEvaluacion, getArchivoIdeas } from '@/api/idea'

export default {
  name: 'Step3',
  props: {
    ideaSelected: {
      type: Object,
      default: function() {
        return {}
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
      fileList: [],
      form: {},
      propuesta: '',
      id_file: 0
    }
  },
  async mounted() {
    await this.fetchDataPropuesta('FRTOPRO')
  },
  methods: {
    async carguePropuesta() {
      const id_idea = this.ideaSelected.id
      const id_archivo = this.id_file
      const id_codigo_archivo = this.propuesta[0].id

      if (id_archivo === 0) {
        this.$message.warning(`Se debe agregar archivo de pago`)
        return
      }

      if (!this.evaluacion) {
        const objCarguePropuesta = {
          id_idea: id_idea,
          id_archivo: id_archivo,
          id_codigo_archivo: id_codigo_archivo
        }

        const { type } = await createArchivoIdeas(objCarguePropuesta)

        if (type === 'success') {
          this.$emit('continuar', { idFilePropuesta: id_archivo })
        }
      } else {
        const objCargueEvaluacion = {
          id_idea: id_idea,
          id_archivo: id_archivo,
          id_codigo_archivo: id_codigo_archivo,
          id_file_propuesta: this.idFilePropuesta
        }

        const { type } = await createArchivoIdeasEvaluacion(objCargueEvaluacion)

        if (type === 'success') {
          this.$emit('continuar', {})
        }
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`El límite es 3, haz seleccionado ${files.length} archivos esta vez, añade hasta ${files.length + fileList.length}`)
    },
    handleSuccess(res, file) {
      console.log('handleSuccess')
      console.log(res.file)
      this.id_file = res.file.id
    },
    async fetchDataPropuesta(codigo) {
      const response = await getListaOne(codigo)

      response.data.enable = response.data.enable === 1
      this.propuesta = [...response.data]

      if (!this.evaluacion) {
        const response2 = await getArchivoIdeas(codigo, this.ideaSelected.id)

        const data = [...response2.data]
        if (data !== null && data.length > 0) {
          this.fileList = [data[0].file]
          this.id_file = data[0].file.id
        }
      } else {
        const response2 = await getArchivoIdeas(codigo, this.ideaSelected.id)

        const data = [...response2.data]
        if (data !== null && data.length > 0) {
          this.fileList = [data[0].fileConfirmation]
          this.id_file = data[0].fileConfirmation.id
        }
      }
    },
    continuar() {
      this.carguePropuesta()
    },
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

