<template>
  <div class="app-container">
    <el-form
      ref="ideaEditForm"
      :model="ideaEditForm"
      :rules="actaRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Idea Editar</h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="titulo" label="Título">
            <el-input
              ref="titulo"
              v-model="ideaEditForm.titulo"
              placeholder="Título"
              name="titulo"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="modalidad" label="Modalidad">
            <el-select v-model="ideaEditForm.modalidad" placeholder="Modalidad">
              <el-option
                v-for="item in modalidades"
                :key="item.id"
                :label="item.nombre"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="linea_investigacion" label="Linea Investigación">
            <el-select v-model="ideaEditForm.linea_investigacion" placeholder="Linea Investigación">
              <el-option
                v-for="item in lineasInvestigacion"
                :key="item.id"
                :label="item.nombre"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="max_estudiantes" label="Max Estudiantes">
            <el-input
              ref="max_estudiantes"
              v-model="ideaEditForm.max_estudiantes"
              placeholder="Max Estudiantes"
              name="max_estudiantes"
              type="number"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Edit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOne, getModalidades, getLineasInvestigacion, update } from '@/api/idea'

export default {
  data() {
    return {
      id: 0,
      pageLoading: true,
      ideaEditForm: {
        titulo: '',
        modalidad: '',
        linea_investigacion: '',
        max_estudiantes: ''
      },
      modalidades: [],
      lineasInvestigacion: [],
      fileList: [],
      actaRules: {
        titulo: [{ required: true }],
        modalidad: [{ required: true }],
        linea_investigacion: [{ required: true }],
        max_estudiantes: [{ required: true }]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.id = route.params.id && route.params.id
      },
      immediate: true
    }
  },
  created() {
    this.fetchData()
  },
  beforeMount() {
    getModalidades().then(({ type, data }) => {
      if (type === 'success') {
        this.modalidades = data
      }
    })

    getLineasInvestigacion().then(({ type, data }) => {
      if (type === 'success') {
        this.lineasInvestigacion = data
      }
    })
  },
  methods: {
    fetchData() {
      this.pageLoading = true
      getOne(this.id).then((response) => {
        response.data.enable = response.data.enable === 1
        // this.user = response.data
        this.pageLoading = false
        this.ideaEditForm = { ...response.data }
        this.fileList.push(this.ideaEditForm.file)
      })
    },
    onSubmit() {
      const params = { ...this.ideaEditForm }
      params.enable = params.enable ? 1 : 0
      console.log(params)
      update(params).then((response) => {
        this.$message({
          showClose: true,
          message: 'Created Succefully!',
          type: 'success'
        })
        this.$router.push({ path: '/idea' })
      })
    },
    onCancel() {
      this.$router.push({ path: '/idea' })
    }
  }
}
</script>
<style scoped>
img.row_avatar {
  width: 35px;
  border-radius: 50%;
}
</style>
