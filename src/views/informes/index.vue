<template>
  <div>
    <div class="app-container">

      <el-row :gutter="30" style="margin-bottom:50px">

        <el-col :span="22" style="margin-bottom:20px">

          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"
          />
        </el-col>

        <el-col :span="24" class="algo">

          <h5 style="margin-right:20px"> Estados Fechas: </h5>

          <el-select
            v-model="searching.estadoIdea"
            placeholder="Estado Idea"
            clearable
            filterable
            multiple
            @change="fetchData"
          >
            <el-option
              v-for="(ideaEstado, _i) in ideasEstados"
              :key="_i"
              :label="ideaEstado.nombre"
              :value="ideaEstado.id"
            />
          </el-select>

          <el-date-picker
            v-model="searching.fechaInicio"
            type="date"
            placeholder="Fecha Inicio"
            @change="fetchData"
          />

          <el-date-picker
            v-model="searching.fechaFin"
            type="date"
            placeholder="Fecha Fin"
            @change="fetchData"
          />

        </el-col>

        <el-col :span="12">
          <el-select
            v-model="searching.estudiantes"
            placeholder="Estudiantes"
            multiple
            filterable
            @change="fetchData"
          >
            <el-option
              v-for="item in listaEstudiantes"
              :key="item.id"
              :label="item.name + ' ' + item.last_name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-select
            v-model="searching.modalidad"
            placeholder="Modalidad"
            filterable
            @change="fetchData"
          >
            <el-option
              v-for="item in modalidades"
              :key="item.id"
              :label="item.nombre"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-select
            v-model="searching.linea_investigacion"
            placeholder="Linea Investigación"
            filterable
            @change="fetchData"
          >
            <el-option
              v-for="item in lineasInvestigacion"
              :key="item.id"
              :label="item.nombre"
              :value="item.id"
            />
          </el-select>

        </el-col>

      </el-row>

      <el-row :gutter="30" style="margin-top:180px">
        <el-col :span="24">
          <el-button type="primary" style="margin-bottom: 20px" @click="exportExcel">
            Download Excel <i class="el-icon-download el-icon-right" />
          </el-button>
        </el-col>

        <el-col :span="24">

          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >

            <el-table-column align="center" label="#" width="50">
              <template slot-scope="scope">
                {{ (scope.$index + 1) + ( numberItems * (currentPage - 1)) }}
              </template>
            </el-table-column>

            <el-table-column label="Título">
              <template slot-scope="scope">
                {{ scope.row.titulo }}
              </template>
            </el-table-column>

            <el-table-column label="Modalidad">
              <template slot-scope="scope">
                {{ scope.row.nombreModalidad }}
              </template>
            </el-table-column>

            <el-table-column label="Línea Investigación">
              <template slot-scope="scope">
                {{ scope.row.nombreLineaInvestigacion }}
              </template>
            </el-table-column>

            <el-table-column label="Max. Estudiantes">
              <template slot-scope="scope">
                {{ scope.row.max_estudiantes }}
              </template>
            </el-table-column>

            <el-table-column label="Usuarios">
              <template slot-scope="scope">
                {{ scope.row.usuarios }}
              </template>
            </el-table-column>

            <el-table-column label="Estado actual">
              <template slot-scope="scope">
                {{ scope.row.ultimoEstado }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { getAllInformes } from '@/api/idea'
import { mapGetters } from 'vuex'
import { getModalidades, getLineasInvestigacion } from '@/api/idea'
import { getEstados } from '@/api/lista'
import { getAll as getAllUsers } from '@/api/user'
import { saveExcel } from '@progress/kendo-vue-excel-export'
import Footer from '@/components/footer'

export default {
  name: 'IndexInformes',
  components: { Footer },

  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      currentPage: 1,
      numberItems: 5,
      countItems: 0,
      searching: {
        fechaInicio: '',
        fechaFin: '',
        modalidad: '',
        linea_investigacion: '',
        estadoIdea: '',
        estudiantes: ''
      },
      modalidades: [],
      lineasInvestigacion: [],
      ideasEstados: [],
      listaEstudiantes: []
    }
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
      handler: function(route) {
        // this.userId = route.params.user_id && route.params.user_id
      },
      immediate: true
    }
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

    getEstados().then(({ type, data }) => {
      if (type === 'success') {
        this.ideasEstados = data
      }
    })

    getAllUsers().then(({ type, data }) => {
      if (type === 'success') {
        this.listaEstudiantes = data
      }
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    exportExcel() {
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const sec = String(today.getSeconds()).padStart(2, '0')
      const yyyy = today.getFullYear()

      today = yyyy + '-' + mm + '-' + dd + '-' + sec

      saveExcel({
        data: this.list,
        fileName: 'informe_' + today,
        columns: [
          { field: 'titulo', title: 'Título' },
          { field: 'nombreModalidad', title: 'Modalidad' },
          { field: 'nombreLineaInvestigacion', title: 'Línea Investigación' },
          { field: 'max_estudiantes', title: 'Max. Estudiantes' }
        ]
      })
    },
    fetchData() {
      this.listLoading = true
      const params = {
        search: this.search,
        estado_idea: this.searching.estadoIdea,
        estudiantes: this.searching.estudiantes,
        fecha_inicio: this.searching.fechaInicio,
        fecha_fin: this.searching.fechaFin,
        modalidad: this.searching.modalidad,
        linea_investigacion: this.searching.linea_investigacion
      }
      getAllInformes(params).then(response => {
        this.list = response.data.map(function(x) {
          x.enable = (x.enable === 1)
          return x
        })
        this.countItems = response.count
        this.listLoading = false
      })
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
    }
  }
}
</script>
<style scoped lang="scss">
img.row_avatar{
  width: 35px;
  border-radius: 50%;
}
.el-row{
  height: 70px;
  margin-top: 50px;
}

a.link{
  color: #C3D730;
  opacity: 0.8;
}

.algo {
  margin-bottom:20px;
  display:flex;flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}
</style>
