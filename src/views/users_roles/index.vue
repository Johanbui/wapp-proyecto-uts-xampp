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

      <el-table-column label="Code">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>

      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
      >

        <template slot-scope="scope">
          <div class="td-actions">
            <div>
              <el-switch
                v-model="scope.row.activate"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="handleActivate(scope.$index, scope.row)"
              />
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
import { getAll, toggleEnable } from '@/api/userrol'
import { mapGetters } from 'vuex'

export default {
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
      'user_id'
    ])
  },
  watch: {
    search() {
      this.fetchData()
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
        search: this.search,
        userId: this.user_id
      }
      console.log(params)
      getAll(params).then(response => {
        this.list = response.data.map(function(x) {
          x.activate = (x.activate === 1)
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
    handleActivate(index, row) {
      const params = {
        userId: this.user_id,
        rolId: row.id,
        enable: (row.activate) ? 1 : 0
      }
      toggleEnable(params)
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
