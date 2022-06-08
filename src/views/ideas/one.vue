<template>
  <div>
    <div class="app-container">
      <el-form
        ref="actaForm"
        :model="actaForm"
        :rules="actaRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">User</h3>
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
            <el-form-item prop="Archivo" label="Archivo">
              <el-input
                ref="codigo"
                v-model="actaForm.file.name"
                placeholder="Archivo"
                name="archivo"
                type="text"
                tabindex="1"
                auto-complete="on"
                disabled
                class="input-with-select"
                @click="hrefFile(actaForm)"
              />
              <el-button
                type="primary"
                @click="hrefFile(actaForm)"
              >Descargar</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </div>
    <Footer :activar-bg="true" />
  </div>

</template>

<script>
import { getOne } from '@/api/acta'
import Footer from '@/components/footer'

export default {
  components: { Footer },

  data() {
    return {
      id: 0,
      pageLoading: true,
      actaForm: {
        nombre: '',
        codigo: '',
        file: {
          url: '',
          name: ''
        }
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
      getOne(this.id).then((response) => {
        response.data.enable = response.data.enable === 1
        // this.user = response.data
        this.pageLoading = false
        this.actaForm = { ...response.data }
      })
    },
    hrefFile(obj) {
      window.open(obj.file.url)
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
