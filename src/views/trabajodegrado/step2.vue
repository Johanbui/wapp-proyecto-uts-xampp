<template>
  <div class="app-step2">
    <el-form ref="form" :model="form" label-width="250px">

      <el-form-item label="Trabajo de Grado">
        <el-col :span="11">
          <span>{{ ideaSelected.titulo }}</span>
        </el-col>
      </el-form-item>

      <el-form-item
        v-for="i in ideaSelected.max_estudiantes"
        :key="i"
        :label="'Estudiante ' + i"
      >
        <template v-if="usuarios[i-1]">
          <el-select
            v-model="usuarios[i-1].id"
            filterable
            :placeholder="'Estudiante ' + i"
            :disabled="i == 1 || bloqueo"
          >
            <template v-for="item in estudiantes">
              <el-option
                v-if="(
                  ( item.id != user_id && item.cant ==0) ||
                  i == 1 ||
                  bloqueo ||
                  ( !bloqueo && item.cant ==0)

                )"
                :key="item.id"
                :label="item.name + ' ' + item.last_name + ' ' +item.id"
                :value="item.id"
              />
            </template>

          </el-select>

        </template>

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
          :disabled="user.rol_id !=4"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item
        v-if="user.rol_id!=4"
        label="Director de Trabajo de Grado"
      >

        <el-select
          v-model="form.director"
          filterable
          placeholder="Director de Trabajo de Grado"
          :disabled="bloqueoDir"
        >
          <el-option
            v-for="item in directores"
            :key="item.id"
            :label="item.name + ' ' + item.last_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="user.rol_id!=4"
        label="Co-Director de Trabajo de Grado"
      >

        <el-select
          v-model="form.codirector"
          filterable
          placeholder="Co-Director de Trabajo de Grado"
          :disabled="bloqueoCoDir"
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
import { createArchivoIdeas, getArchivoIdeas, getUsuariosIdeas } from '@/api/idea'
import { getEstudiantes, createEstudiantesIdeas } from '@/api/idea'
import { mapGetters } from 'vuex'

export default {
  name: 'Step2',
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
      id_file: 0,
      estudiantes: [],
      usuarios: [

      ],
      bloqueo: false,
      bloqueoDir: false,
      bloqueoCoDir: false

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
    await this.fecthGetDirectores()
    await this.fetchDataPago('APRIDEA')
    await this.fetchDataUsuarios('TIPIDU')
    await this.fecthGetEstudiantes()

    if (this.user.rol_id === 4 && typeof this.usuarios[0] === 'undefined') {
      const usuario = {
        id: this.user.user_id,
        name: this.user.name,
        last_name: this.user.last_name,
        tipoUsuario: 10

      }

      const usuarios = []
      usuarios.push(usuario)
      console.log(usuario)

      for (
        let index = 1;
        index < this.ideaSelected.max_estudiantes;
        index++
      ) {
        usuarios.push(
          {
            id: '',
            name: '',
            last_name: '',
            tipoUsuario: 10
          }
        )
      }
      this.usuarios = [...usuarios]
    }
  },
  methods: {
    async carguePago() {
      const id_idea = this.ideaSelected.id
      const id_archivo = this.id_file
      const id_codigo_archivo = this.pago.id

      // const id_usuario = this.user_id
      // const tipoUsuario = 10

      if (id_archivo === 0) {
        this.$message.warning(`Se debe agregar archivo de pago`)
        return
      }

      const objCarguePago = {
        id_idea: id_idea,
        id_archivo: id_archivo,
        id_codigo_archivo: id_codigo_archivo
      }

      if (this.user.rol_id === 4) {
        await createArchivoIdeas(objCarguePago).then(({ type, data }) => {
          if (type === 'success') {
          // this.directores = data
          // this.codirectores = data
          }
        })
        const estudiantes = this.usuarios
        await createEstudiantesIdeas(estudiantes, id_idea).then(({ type, data }) => {
          if (type === 'success') {
          // this.usuario = data
          }
        })
      }
      if (this.user.rol_id !== 4) {
        const directivos = []

        if (this.form.director !== '') {
          directivos.push(
            {
              id: this.form.director,
              tipoUsuario: 11
            }
          )
        }

        if (this.form.codirector !== '') {
          directivos.push(
            {
              id: this.form.codirector,
              tipoUsuario: 12
            }
          )
        }

        if (directivos.length > 0) {
          await createEstudiantesIdeas(directivos, id_idea).then(({ type, data }) => {
            if (type === 'success') {
              // this.usuario = data
            }
          })
        }
      }

      const obj = {}
      if (this.user.rol_id !== 4) {
        obj.estado = 'PROIDEA'
      } else {
        obj.estado = 'APRIDEA'
      }
      this.$emit('continuar', obj)
    },
    async fecthGetDirectores() {
      await getDirectores().then(({ type, data }) => {
        if (type === 'success') {
          this.directores = data
          this.codirectores = data
        }
      })
    },
    async fecthGetEstudiantes() {
      await getEstudiantes().then(({ type, data }) => {
        if (type === 'success') {
          for (let index = 0; index < data.length; index++) {
            const element = data[index]
            element.tipoUsuario = 10
          }
          this.estudiantes = data
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
        const data = [...response.data]
        if (data !== null && data.length > 0) {
          this.fileList = [data[0].file]
          this.id_file = data[0].file.id
        }
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
            this.form.director = element.id_usuarioObj.id
            this.bloqueoDir = true
          }
          if (element.tipoUsuarioObj.codigo === 'CODIR') {
            this.form.codirector = element.id_usuarioObj.id
            this.bloqueoCoDir = true
          }

          if (element.tipoUsuarioObj.codigo === 'EST') {
            this.usuarios.push(
              {
                id: element.id_usuarioObj.id,
                name: element.id_usuarioObj.name,
                last_name: element.id_usuarioObj.last_name,
                tipoUsuario: 10
              }
            )
            this.bloqueo = true
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
      if (typeof file.url !== 'undefined') {
        window.open(file.url)
      } else {
        window.open('http://apiproyectouts.local/api/files/' + file.response.file.id)
      }
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

