<template>
  <div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        :row-class-name="tableRowClassName"
      >

        <el-table-column
          align="center"
          label="#"
          width="50"
          :header-row-style="{ backgroundColor: 'red' }"
        >
          <template slot-scope="scope">

            {{ (scope.$index + 1) /*+ ( numberItems * (currentPage - 1))*/ }}
          </template>
        </el-table-column>

        <el-table-column
          label="Título"
        >
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>

      </el-table>
    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getAll, markAsReaded } from '@/api/notificacion'
import Footer from '@/components/footer'

export default {
  name: 'Index',
  components: { Footer },

  data() {
    return {
      list: '',
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles',
      'user'
    ])
  },
  async mounted() {
    const { data } = await getAll({ id_usuario: this.user_id })

    this.list = data
    this.listLoading = false

    markAsReaded({ id_usuario: this.user_id })
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.visto === 0) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
