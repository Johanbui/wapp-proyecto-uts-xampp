<template>
  <div class="app-step2">
    <el-form ref="form" :model="form" label-width="250px">

      <el-form-item label="Trabajo de Grado">
        <el-col :span="11">
          <span>{{ ideaSelected.titulo }}</span>
        </el-col>
      </el-form-item>

      <el-form-item :label="pago.nombre">

        <el-upload
          class="upload-demo"
          drag
          action="http://apiproyectouts.local/api/files/push"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="handleSuccess"
          :limit="1"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item label="Director de Trabajo de Grado">

        <el-select
          v-model="form.director"
          filterable
          placeholder="Director de Trabajo de Grado"
        >
          <el-option
            v-for="item in directores"
            :key="item.id"
            :label="item.name + ' ' + item.last_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Co-Director de Trabajo de Grado">

        <el-select
          v-model="form.codirector"
          filterable
          placeholder="Co-Director de Trabajo de Grado"
        >
          <el-option
            v-for="item in codirectores"
            :key="item.id"
            :label="item.name + ' ' + item.last_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-button-group>
        <el-button type="primary" @click="atras">Atras</el-button>
        <el-button type="primary" @click="continuar">Continuar</el-button>
      </el-button-group>

    </el-form>
  </div>
</template>

<script>
import { getDirectores } from '@/api/idea'
import { getListaOne } from '@/api/lista'
import { createArchivoIdeas, getArchivoIdeas, getUsuariosIdeas, createUsuariosIdeas } from '@/api/idea'
import { mapGetters } from 'vuex'

export default {
  name: 'Step2',
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles'
    ])
  },
  props: {
    ideaSelected: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      input: '',
      fileList: [],
      form: {
        director: '',
        codirector: ''
      },
      directores: '',
      codirectores: '',
      pago: {},
      id_file: 0

    }
  },
  async mounted() {
    await this.fecthGetDirectores()
    await this.fetchDataPago('APRIDEA')
    await this.fetchDataUsuarios('TIPIDU')
  },
  methods: {
    async carguePago() {
      const id_idea = this.ideaSelected.id
      const id_archivo = this.id_file
      const id_codigo_archivo = this.pago.id

      const id_usuario = this.user_id
      const tipoUsuario = 10

      if (id_archivo === 0) {
        this.$message.warning(`Se debe agregar archivo de pago`)
        return
      }

      const objCarguePago = {
        id_idea: id_idea,
        id_archivo: id_archivo,
        id_codigo_archivo: id_codigo_archivo
      }
      await createArchivoIdeas(objCarguePago).then(({ type, data }) => {
        if (type === 'success') {
          this.directores = data
          this.codirectores = data
        }
      })

      const ideasUsuarios = {
        id_idea: id_idea,
        id_usuario: id_usuario,
        tipoUsuario: tipoUsuario
      }
      await createUsuariosIdeas(ideasUsuarios).then(({ type, data }) => {
        if (type === 'success') {
          this.directores = data
          this.codirectores = data
        }
      })

      this.$emit('continuar')
    },
    async fecthGetDirectores() {
      await getDirectores().then(({ type, data }) => {
        if (type === 'success') {
          this.directores = data
          this.codirectores = data
        }
      })
    },
    async fetchDataPago(codigo) {
      this.pageLoading = true
      await getListaOne(codigo).then((response) => {
        response.data.enable = response.data.enable === 1
        // this.pageLoading = false
        this.pago = [...response.data][0]
      })
      await getArchivoIdeas(codigo, this.ideaSelected.id).then((response) => {
        this.pageLoading = false
        this.fileList = [[...response.data][0].file]
        this.id_file = [...response.data][0].file.id
      })
    },
    async fetchDataUsuarios(codigo) {
      this.pageLoading = true

      await getUsuariosIdeas(codigo, this.ideaSelected.id).then((response) => {
        this.pageLoading = false
        const array = [...response.data]
        for (let index = 0; index < array.length; index++) {
          const element = array[index]
          if (element.tipoUsuarioObj.codigo === 'DIR') {
            this.director = element.id_usuarioObj
          }
        }
      })
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
    continuar() {
      this.carguePago()
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

