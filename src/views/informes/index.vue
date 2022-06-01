<template>
  <div class="app-container">

    <el-row :gutter="30" style="margin-bottom:50px">

      <el-col :span="22" style="margin-bottom:20px">

        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
        />
      </el-col>

        <el-col :span="24" style="margin-bottom:20px;    display:flex;flex-direction: row;    align-content: center;    justify-content: flex-start;  align-items: center;">
          <h5 style="margin-right:20px"> Estados Fechas: </h5>
           <el-date-picker
              v-model="searching.fechaInicio"
              type="date"
              placeholder="Fecha Inicio"
            />

            <el-date-picker
              v-model="searching.fechaFin"
              type="date"
              placeholder="Fecha Fin"
            />
        </el-col>


        <el-col :span="12">
            <el-select v-model="searching.modalidad" placeholder="Modalidad">
              <el-option
                v-for="item in modalidades"
                :key="item.id"
                :label="item.nombre"
                :value="item.id"
              />
            </el-select>
        </el-col>

        <el-col :span="12">
            <el-select v-model="searching.linea_investigacion" placeholder="Linea Investigación">
              <el-option
                v-for="item in lineasInvestigacion"
                :key="item.id"
                :label="item.nombre"
                :value="item.id"
              />
            </el-select>
        </el-col>

    </el-row>

    <el-row :gutter="30" style="margin-top:150px">
      <el-col :span="22">

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
    </el-table>
      </el-col>
    </el-row>

    <div class="block">
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20, 50,100]"
        :page-size="numberItems"
        layout="total, sizes, prev, pager, next, jumper"
        :total="countItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getAll } from '@/api/idea'
import { mapGetters } from 'vuex'
import {  getModalidades, getLineasInvestigacion } from '@/api/idea'

export default {
  name: 'IndexInformes',
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
        linea_investigacion: ''
      },
      modalidades: [],
      lineasInvestigacion: []
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
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = {
        limit: this.numberItems,
        page: this.currentPage,
        search: this.search
      }
      getAll(params).then(response => {
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

</style>
