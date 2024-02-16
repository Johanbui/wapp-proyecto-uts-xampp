<template>
  <div>
    <div class="app-container">

      <el-row :gutter="30">
        <el-col :md="22" :sm="24"> <!-- Ajusta el tamaño en dispositivos medianos y pequeños -->
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </el-col>
        <el-col :md="2" :sm="24"> <!-- Ajusta el tamaño en dispositivos medianos -->
          <el-button v-if="findPermission('BLOG-CREATE')" type="primary" @click="handleCreate()">Create</el-button>
        </el-col>
      </el-row>

      <div class="slider-container center">
        <div class="slider-images">
          <div class="slider-item" v-for="(item, index) in lastThreeImages" :key="index">
            <img :src="item.src" :alt="item.alt" :class="{ active: index === activeIndex }" />
            <div class="slider-text" v-show="index === activeIndex">
              <div class="slider-text-content">{{ item.codigo }}</div>
            </div>
          </div>
          <div class="slider-prev" @click="prevImage">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div class="slider-next" @click="nextImage">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        <div class="slider-controls">
          <span class="slider-control" v-for="(image, index) in images" :key="index"
            :class="{ active: index === activeIndex }" @click="goToSlide(index)"></span>
        </div>
        <div class="slider-dots-container">
          <div class="slider-dots">
            <span v-for="(image, index) in images" :key="index"
              :class="[{ active: index === activeIndex }, 'slider-dot']"></span>
          </div>
        </div>
      </div>




      <el-row :gutter="20">
        <el-col :xl="5" :lg="8" :md="24" v-for="(item, index) in list" :key="index"> <!-- Ajusta el tamaño en dispositivos grandes, medianos y pequeños -->
          <el-card shadow="hover" class="card-item">
            <img :src="item.file.url" alt="Imagen" class="card-image" />
            <div class="card-content">
              <h3>{{ item.codigo }}</h3>
            </div>
            <div class="card-actions">
              <el-button v-if="findPermission('BLOG-ONE')" size="mini" @click="handleConsult(index, item)">
                <i class="el-icon-view" />
              </el-button>
              <el-button v-if="findPermission('BLOG-EDIT')" size="mini" @click="handleEdit(index, item)">
                <i class="el-icon-edit" />
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- Agrega margen superior a la paginación para evitar superposición -->
      <div class="block">
        <el-pagination :current-page.sync="currentPage" :page-sizes="[6, 12, 18, 24, 30]" :page-size="numberItems"
          layout="total, sizes, prev, pager, next, jumper" :total="countItems" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { getAll } from '@/api/blog'
import { mapGetters } from 'vuex'
import Footer from '@/components/footer'

export default {
  components: { Footer },
  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      currentPage: 1,
      numberItems: 6,
      countItems: 0,
      activeIndex: 0,
      lastThreeImages: [], // Nueva propiedad para las últimas 3 imágenes
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles'

    ])
  },
  watch: {
    search() {
      this.fetchData()
    },
    $route: {
      handler: function (route) {
        // this.userId = route.params.user_id && route.params.user_id
      },
      immediate: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {


    fetchData() {
  this.listLoading = true;
  const params = {
    limit: this.numberItems,
    page: this.currentPage,
    search: this.search
  };

  getAll(params)
    .then(response => {
      this.list = response.data.map(function (x) {
        x.enable = (x.enable === 1);
        x.createdAt = new Date(x.created_at); // Agrega la propiedad createdAt con la fecha de creación como objeto Date
        x.file = {
          url: x.file.url // Asegúrate de que la propiedad "file" contenga la URL de la imagen
        };
        return x;
      });

      // Ordena la lista en orden descendente por la propiedad createdAt
      this.list.sort((a, b) => b.createdAt - a.createdAt);

      this.countItems = response.count;
      this.listLoading = false;

      // Carga las últimas tres imágenes después de cargar la lista
      this.loadLastThreeImages();
    });
}
,
loadLastThreeImages() {
      // Filtra y toma las últimas tres imágenes de tu lista
      this.lastThreeImages = this.list.slice(0, 3).map(item => ({
        src: item.file.url,
        alt: 'Texto alternativo', // Asegúrate de que esta propiedad exista en tus datos.
        codigo: item.codigo // Agregar el código de la noticia al objeto lastThreeImages
      }));
    },
    nextImage() {
      if (this.activeIndex === this.lastThreeImages.length - 1) {
        this.activeIndex = 0;
      } else {
        this.activeIndex++;
      }


    },
    prevImage() {
      if (this.activeIndex === 0) {
        this.activeIndex = this.lastThreeImages.length - 1;
      } else {
        this.activeIndex--;
      }

    },
    handleSizeChange(val) {
      this.numberItems = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },

    findPermission(permission) {
      const user_rols = this.users_roles
      const found = user_rols.find(element => element.code === permission)
      if (typeof found === 'object' || permission === '') {
        return true
      }
      return false
    },
    handleCreate() {
      this.$router.push({ path: '/blog/create' })
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/blog/edit/' + row.id })
    },
    handleConsult(index, row) {
      this.$router.push({ path: '/blog/' + row.id })
    },
    handlePermissions(index, row) {
      this.$router.push({ path: '/blog/' + row.id + '/permissions' })
    },
    hrefFile(obj) {
      window.open(obj.file.url)
    }
  }
}
</script>
<style scoped lang="scss">
img.row_avatar {
  width: 35px;
  border-radius: 50%;
}

.el-row {
  height: 70px;
  margin-top: 50px;
}

a.link {
  color: #C3D730;
  opacity: 0.8;
}

.el-table {
  margin-top: 10px;
}

.slider-container {
  display: flex;
  justify-content: center;
  position: relative;


}


.slider-images {
  width: 1000px;
  height: 400px;
  overflow: hidden;
  position: relative;
}

.images-table{
  width: 300px;
  height: 150px;

}

.slider-images img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease;
}

.slider-images img.active {
  opacity: 1;
}

.slider-prev,
.slider-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 50%;
  color: #000000;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.slider-prev {
  left: 20px;
  display: flex;
  align-items: center;
  padding-left: 5px;

}

.slider-next {
  right: 20px;
  display: flex;
  align-items: center;
  padding-left: 5px;

}

.slider-prev:hover,
.slider-next:hover {
  background-color: #a2a2a2;
  color: #e12828;
}

.center {
  margin: 0 auto;
}

.slider-prev:before {
  content: '\2039';
  font-size: 30px;
  color: rgb(77, 77, 77);
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-bottom: 5px;

}

.slider-next:before {
  content: '\203A';
  font-size: 30px;
  color: rgb(77, 77, 77);
  display: flex;
  align-items: center;
  padding-left: 6px;
  padding-bottom: 5px;

}


.slider-dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.slider-dots {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
}

.slider-dots span.active {
  background-color: #333;
}

.slider-item img {
  width: 100%;
  height: 100%;
  position: absolute; /* Cambia "absolute" a "relative" */
}
/* Ajusta el estilo para .slider-text */
.slider-text {
  position: absolute;
  bottom: 10px; /* Ajusta la posición vertical según tus preferencias */
  left: 10px; /* Ajusta la posición horizontal según tus preferencias */
  background-color: white; /* Fondo blanco */
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 2; /* Asegura que el texto esté sobre la imagen */
  transition: opacity 0.3s ease;
  width: calc(100% - 20px); /* Ajusta el ancho para que se ajuste al contenedor de la imagen */
}
.block {
  clear: both; /* Evita que elementos floten junto a la paginación */
}
.card-image {
  width: 100%; /* Ajusta el ancho como desees */
  height: 200px; /* Ajusta la altura como desees */
  object-fit: cover; /* Asegura que la imagen se ajuste manteniendo las proporciones */
}


</style>
