<template>
  <div>
    <div class="app-container">
      <el-form
        ref="blogCreateForm"
        :model="blogCreateForm"
        :rules="blogRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">Crear Noticia</h3>
        </div>

        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item prop="codigo" label="Título">
              <el-input
                ref="codigo"
                v-model="blogCreateForm.codigo"
                placeholder="Titulo"
                name="codigo"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item prop="noticia" label="Noticia">
              <el-input
                ref="noticia"
                v-model="blogCreateForm.noticia"
                placeholder="Noticia"
                name="noticia"
                type="textarea"
                tabindex="1"
                auto-complete="on"
                :rows="5"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item prop="fecha" label="Fecha">
              <el-date-picker
                v-model="blogCreateForm.fecha"
                type="date"
                placeholder="Fecha"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item prop="url_archivo" label="Cargar imagen">
              <el-upload
                class="upload-demo"
                drag
                action="http://192.168.10.242/apiproyectouts/public/api/files/push"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :limit="1"
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

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { create } from '@/api/blog'
import Footer from '@/components/footer/index.vue'

export default {
  components: { Footer },
  data() {
    return {
      // id: 0,
      pageLoading: true,
      blogCreateForm: {
        codigo: '',
        noticia: '',
        file_id: 0,
        fecha: ''
      },
      fileList: [],
      blogRules: {
        codigo: [{ required: true }],
        noticia: [{ required: true }],
        file_id: [{ required: true }],
        fecha: [{ required: true }]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // this.id = route.params.id && route.params.id
      },
      immediate: true
    }
  },
  created() { },
  methods: {
    onSubmit() {
      const params = { ...this.blogCreateForm }
      create(params).then((response) => {
        this.$message({
          showClose: true,
          message: response.message,
          type: response.type
        })
        if (response.type === 'success') {
          this.$router.push({ path: '/blog' })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/blog' })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      console.log('handleRemove')
      console.log(file)
      console.log(fileList)
    },
    handlePreview(file) {
      console.log('handlePreview')
      console.log(file)
    },
    handleExceed(files, fileList) {
      console.log('handleExceed')
      console.log(files)
      console.log(fileList)
      this.$message.warning(`El límite es 3, haz seleccionado ${files.length} archivos esta vez, añade hasta ${files.length + fileList.length}`)
    },
    beforeUpload(file) {
      console.log('beforeUpload')
      console.log(file)
    },
    handleSuccess(res, file) {
      console.log('handleSuccess')
      console.log(res.file)
      this.blogCreateForm.file_id = res.file.id
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
