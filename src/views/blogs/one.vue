<template>
  <div>
    <div class="app-container">
      <el-form
        ref="blogForm"
        :model="blogForm"
        :rules="blogRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">Noticia</h3>
        </div>

        <!-- Contenedor para título, imagen y noticia -->
        <div class="content-container">

          <!-- Centrar el título de la noticia en negrita y ajustar el tamaño -->
          <el-row :gutter="30">
            <el-col :span="24" class="text-center">
              <el-form-item prop="codigo" label="">
                <p class="news-title">{{ blogForm.codigo }}</p>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Centrar la imagen de la noticia y ajustar el tamaño -->
          <el-row :gutter="30">
            <el-col :span="24" class="text-center">
              <el-form-item prop="file" label="">
                <img :src="blogForm.file.url" alt="Imagen de la noticia" class="news-image" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Centrar la noticia y ajustar el estilo -->
          <el-row :gutter="30">
            <el-col :span="24" class="text-center">
              <el-form-item prop="noticia" label="">
                <p class="news-content">{{ blogForm.noticia }}</p>
              </el-form-item>
            </el-col>
          </el-row>

        </div> <!-- Fin del contenedor -->

        <el-form-item>
          <el-button @click="onCancel">Atras</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { getOne } from '@/api/blog'
import Footer from '@/components/footer'

export default {
  components: { Footer },

  data() {
    return {
      id: 0,
      pageLoading: true,
      blogForm: {
        nombre: '',
        codigo: '',
        file: {
          url: '',
          name: ''
        }
      },
      blogRules: {
        nombre: [{ required: true }],
        codigo: [{ required: true }]
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
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
        this.blogForm = { ...response.data }
      })
    },
    hrefFile(obj) {
      window.open(obj.file.url)
    },
    onCancel() {
      this.$router.push({ path: '/blog' })
    },
  }
}
</script>

<style scoped>
/* Ajusta el tamaño de la imagen y colócala arriba del título */
.news-image {
  width: 500px;
  height: 200px;
  display: block;
  margin: 20px auto 0; /* Ajusta el margen superior para centrar verticalmente */
}
/* Estilo para el título en negrita */
.news-title {
  font-weight: bold;
  max-width: 500px; /* Establece el ancho máximo */
  margin: 0 auto; /* Ajusta el margen lateral para centrar horizontalmente */
  word-wrap: break-word; /* Rompe palabras largas si superan el ancho máximo */
}
/* Oculta los subtítulos de código e imagen */
.el-form-item__label {
  display: none;
}

img.row_avatar {
  width: 35px;
  border-radius: 50%;
}

/* Estilo para la noticia */
.news-content {
  color: rgb(0, 0, 0); /* Color del texto blanco */
  max-width: 800px; /* Ajuste del ancho máximo */
  margin: 0 auto; /* Centra horizontalmente */
}

/* Ajustes de estilo para el contenedor */
.content-container {
  background-color: #f8f9fa; /* Color de fondo más oscuro */
  padding: 20px; /* Ajuste de relleno */
  border-radius: 10px; /* Bordes redondeados */
  margin-top: 20px; /* Margen superior */
}
</style>
