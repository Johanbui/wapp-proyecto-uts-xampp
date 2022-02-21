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

      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Last Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.last_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="E-mail" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Avatar" align="center">
        <template slot-scope="scope">
          <img class="row_avatar" :src=" scope.row.avatar">
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
      >
        <template slot-scope="scope">
          <div class="td-actions">
            <div>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                <i class="el-icon-edit" />
              </el-button>
            </div>
            <div>
              <el-button
                size="mini"
                @click="handleKey(scope.$index, scope.row)"
              >
                <i class="el-icon-key" />
              </el-button>
            </div>

            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleDelete(scope.$index, scope.row)"
            />

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
import { getAll, toggleEnable } from '@/api/user'

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
    handleEdit(index, row) {
      this.$router.push({ path: '/user/edit/' + row.id })
    },
    handleCreate() {
      this.$router.push({ path: '/user/create' })
    },
    handleKey(index, row) {
      this.$router.push({ path: '/user/key/' + row.id })
    },
    handleDelete(index, row) {
      const params = {
        id: row.id,
        enable: (row.enable) ? 1 : 0
      }
      toggleEnable(params)
    },
    handleSizeChange(val) {
      this.numberItems = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
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
