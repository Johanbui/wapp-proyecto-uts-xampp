<template>
  <div class="step1">

    <el-row :gutter="30">

      <el-col :span="22">
        {{ search }}
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
        />
      </el-col>

    </el-row>

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

      <el-table-column
        align="center"
        label="Actions"
      >

        <template slot-scope="scope">
          <div class="td-actions">
            <div>
              <el-button-group
                v-if="
                  (user.rol_id === 4
                    &&
                    ((scope.row.cantidadUsuarios == 0
                      ||
                      findIdeaUsuario(scope.row.id) )
                      && !bloqueoIdea
                    )) ||
                    (user.rol_id === 4 && findIdeaUsuario(scope.row.id)) ||
                    (user.rol_id !== 4 && scope.row.cantidadUsuarios > 0 )
                "
              >
                <el-button type="primary" @click="continuar({ ideaSelected: scope.row })">Continuar</el-button>
              </el-button-group>
            </div>

          </div>
        </template>

      </el-table-column>

    </el-table>

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
import { toggleEnable } from '@/api/rol'
import { getAll, getIdeaUsuario } from '@/api/idea'
import { mapGetters } from 'vuex'

export default {
  name: 'Step1',
  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      currentPage: 1,
      numberItems: 5,
      countItems: 0,
      userId: 0,
      ideaUsuario: [],
      bloqueoIdea: false

    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles',
      'user'

    ])
  },
  watch: {
    search() {
      this.fetchData()
    },
    $route: {
      handler: function(route) {
        this.userId = route.params.user_id && route.params.user_id
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {

    findIdeaUsuario(id_idea) {
      if (this.ideaUsuario !== null) {
        const ideaUsuario = this.ideaUsuario.find(element => element.id_idea === id_idea)
        if (
          typeof ideaUsuario !== 'undefined' &&
        (
          ideaUsuario.codigoLista === 27 ||
          ideaUsuario.codigoLista === 28 ||
          ideaUsuario.codigoLista === 30 ||
          ideaUsuario.codigoLista === null
        )
        ) {
          if (ideaUsuario.codigoLista === null) {
            this.bloqueoIdea = true
          }
          return true
        }
      }

      return false
    },
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

      getIdeaUsuario(this.user_id).then(({ data }) => {
        const response = [...data]
        this.ideaUsuario = response
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
    handleEnable(index, row) {
      const params = {
        id: row.id,
        enable: (row.enable) ? 1 : 0
      }
      toggleEnable(params)
    },
    findPermission(permission) {
      const user_rols = this.users_roles
      const found = user_rols.find(element => element.code === permission)
      if (typeof found === 'object' || permission === '') {
        return true
      }
      return false
    },
    continuar(ideaSelected) {
      this.$emit('continuar', ideaSelected)
    }
  }
}
</script>
<style scoped>
img.row_avatar{
  width: 35px;
  border-radius: 50%;
}
.el-row{
  height: 70px;
  margin-top: 50px;
}
</style>
