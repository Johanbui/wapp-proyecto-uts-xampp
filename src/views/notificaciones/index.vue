<template>
  <div class="app-container">
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
          {{ scope.row.title }}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getAll, markAsReaded } from '@/api/notificacion'

export default {
  name: 'Index',
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
  }
}
</script>
