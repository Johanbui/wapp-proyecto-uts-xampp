<template>
  <div class="app-step2">
    <el-form ref="form" :model="form" label-width="250px">

      <el-form-item label="Trabajo de Grado">
        <el-col :span="11">
          <span>{{ ideaSelected.titulo }}</span>
        </el-col>
      </el-form-item>

      <el-form-item label="Pago Modalidad">

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

      <el-form-item label="Director de Trabajo de Grado">

        <el-select v-model="form.director" filterable placeholder="Director de Trabajo de Grado">
          <el-option
            v-for="item in directores"
            :key="item.id"
            :label="item.name + ' ' + item.last_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Co-Director de Trabajo de Grado">

        <el-select v-model="form.codirector" filterable placeholder="Co-Director de Trabajo de Grado">
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
      codirectores: ''
    }
  },
  mounted() {
    getDirectores().then(({ type, data }) => {
      if (type === 'success') {
        this.directores = data
        this.codirectores = data
      }
    })
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

