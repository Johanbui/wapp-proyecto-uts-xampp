<template>
  <div class="app-container">
    <el-form
      ref="actaEditForm"
      :model="actaEditForm"
      :rules="actaRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">User Edit</h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="codigo" label="Codigo">
            <el-input
              ref="codigo"
              v-model="actaEditForm.codigo"
              placeholder="Codigo"
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
          <el-form-item prop="fecha" label="Fecha">
            <el-date-picker
              v-model="actaEditForm.fecha"
              type="date"
              placeholder="Fecha"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="url_archivo" label="url_archivo">
            <el-upload
              class="upload-demo"
              drag
              action="http://apiproyectouts.local/api/files/push"
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
        <el-button type="primary" @click="onSubmit">Edit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOne, update } from '@/api/acta'

export default {
  data() {
    return {
      id: 0,
      pageLoading: true,
      actaEditForm: {
        codigo: '',
        file_id: 0,
        fecha: ''
      },
      fileList: [],
      actaRules: {
        codigo: [{ required: true }],
        fileList: [{ required: true }],
        fecha: [{ required: true }]
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
      getOne(this.id).then((response) => {
        response.data.enable = response.data.enable === 1
        // this.user = response.data
        this.pageLoading = false
        this.actaEditForm = { ...response.data }
        this.fileList.push(this.actaEditForm.file)
      })
    },
    onSubmit() {
      const params = { ...this.actaEditForm }
      params.enable = params.enable ? 1 : 0
      console.log(params)
      update(params).then((response) => {
        this.$message({
          showClose: true,
          message: 'Created Succefully!',
          type: 'success'
        })
        this.$router.push({ path: '/acta' })
      })
    },
    onCancel() {
      this.$router.push({ path: '/acta' })
    },
   handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log("handleRemove");
      console.log(file);
      console.log(fileList);
    },
    handlePreview(file) {
      console.log("handlePreview");
      console.log(file);
    },
    handleExceed(files, fileList) {
      console.log("handleExceed");
      console.log(file);
      console.log(fileList);
      this.$message.warning(
        `El límite es 3, haz seleccionado ${
          files.length
        } archivos esta vez, añade hasta ${files.length + fileList.length}`
      );
    },
    beforeUpload(file) {
      console.log("beforeUpload");
      console.log(file);
    },
    handleSuccess(res, file) {
      console.log("handleSuccess");
      console.log(res.file);
      this.actaEditForm.file_id = res.file.id
    },
  }
}
</script>
<style scoped>
img.row_avatar {
  width: 35px;
  border-radius: 50%;
}
</style>
