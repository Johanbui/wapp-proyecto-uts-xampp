<template>
  <div class="app-container">
    <el-form ref="actaForm" :model="actaForm" :rules="actaRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">User </h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="codigo" label="Codigo">
            <el-input
              ref="codigo"
              v-model="actaForm.codigo"
              placeholder="Codigo"
              name="codigo"
              type="text"
              tabindex="1"
              auto-complete="on"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="url_archivo" label="url_archivo">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-exceed="handleExceed"
              disabled
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
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getOne } from '@/api/acta'

export default {
  data() {
    return {
      id: 0,
      pageLoading: true,
      actaForm: {
        nombre: '',
        codigo: ''
      },
      actaRules: {
        nombre: [{ required: true }],
        codigo: [{ required: true }]
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
  methods: {
    fetchData() {
      this.pageLoading = true
      getOne(this.id).then(response => {
        response.data.enable = (response.data.enable === 1)
        // this.user = response.data
        this.pageLoading = false
        this.actaForm = { ...response.data }
      })
    }
  }
}
</script>
<style scoped>
img.row_avatar{
  width: 35px;
  border-radius: 50%;
}
</style>
