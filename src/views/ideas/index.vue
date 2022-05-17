<template>
  <div class="app-container">

    <el-row :gutter="30">

      <el-col :span="22">

        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
        />
      </el-col>
      <el-col :span="2">
        <el-button
          v-if="findPermission('IDEA-CREATE')"
          type="primary"
          @click="handleCreate()"
        >Create</el-button>
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

            <div v-if="findPermission('IDEA-ONE')">
              <el-button
                size="mini"
                @click="handleConsult(scope.$index, scope.row)"
              >
                <i class="el-icon-view" />
              </el-button>
            </div>

            <div v-if="findPermission('IDEA-EDIT')">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                <i class="el-icon-edit" />
              </el-button>
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
import { getAll } from '@/api/idea'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexIdeas',
  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      currentPage: 1,
      numberItems: 5,
      countItems: 0
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
      console.log(params)
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
    },
    handleCreate() {
      this.$router.push({ path: '/idea/create' })
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/idea/edit/' + row.id })
    },
    handleConsult(index, row) {
      this.$router.push({ path: '/idea/' + row.id })
    },
    handlePermissions(index, row) {
      this.$router.push({ path: '/idea/' + row.id + '/permissions' })
    },
    hrefFile(obj) {
      window.open(obj.file.url)
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
