<template>
  <div class="app-step4">
    <el-form ref="form" :model="form" label-width="130px">

      <el-form-item label="Informe Final Trabajo de Grado F-DC-125">

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item label="Rejilla de Evaluación F-DC-129">

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item label="Licencia de Autorizacion Interna F-GC-01">

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item label="Ficha de Metadatos F-GC-02">

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item label="Exposicion Trabajos de Grado">

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item label="Sustentacion Trabajos de Grado">

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
        </el-upload>

      </el-form-item>

      <el-button-group>
        <el-button type="primary" @click="atras">Atras</el-button>
        <el-button type="primary" @click="continuar">Continuar</el-button>
      </el-button-group>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: {}
    }
  },
  methods: {
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
    continuar() {
      this.$emit('continuar')
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

