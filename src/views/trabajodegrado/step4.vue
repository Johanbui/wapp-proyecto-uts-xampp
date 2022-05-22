<template>
  <div class="app-step4">
    <el-form ref="form" :model="form" label-width="130px">
      <template v-for="(formato, index) in propuesta">
        <el-form-item :key="formato.id_codigo_archivo" :label="formato.listaNombre">
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

import { getArrArchivoIdeas } from '@/api/idea'
import { createArrArchivoIdeas, createArrArchivoIdeasEvaluacion } from '@/api/idea'
import { mapGetters } from 'vuex'

export default {
  name: 'Step4',
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
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles',
      'user'
    ])
  },
  data() {
    return {
      fileList: [],
      listFiles: {},
      propuesta: [],
      form: {}
    }
  },
  async mounted() {
    await this.fetchDataPropuesta('FRTOFIN')
  },
  methods: {
    async carguePropuesta() {
      if (!this.evaluacion) {
        const { type } = await createArrArchivoIdeas(
          this.fileList,
          this.ideaSelected.id
        )

        if (type === 'success') {
          this.$emit('continuar', {})
        }
      } else {
        const { type } = await createArrArchivoIdeasEvaluacion(
          this.fileList,
          this.ideaSelected.id
        )
        if (type === 'success') {
          this.$emit('continuar', {})
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

          fileList.push({
            id_file: element.id,
            id_codigo_archivo: element.id_codigo_archivo,
            id_file_propuesta: element.id_file_confirmation
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
</style>

