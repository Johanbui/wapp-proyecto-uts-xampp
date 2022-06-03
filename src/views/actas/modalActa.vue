<template>
  <div class="app-container">
    <el-dialog
      title="Seleccionar Acta"
      :visible.sync="visible"
      width="30%"
      center
      :before-close="cancelActa"
    >

      <el-select v-model="codigoActa" filterable placeholder="Seleccionar Acta">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelActa">Cancel</el-button>
        <el-button type="primary" @click="confirmarActa">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAll } from '@/api/acta'
import { mapGetters } from 'vuex'

export default {
  props: ['visible'],
  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      currentPage: 1,
      numberItems: 99999999999999999999999,
      countItems: 0,
      options: [],
      codigoActa: ''
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
    confirmarActa() {
      // this.visible = false
      const codigoActa = this.codigoActa
      this.codigoActa = ''
      this.$emit('accionModal', { accion: 'CONFIRM', codigoActa: codigoActa })
    },
    cancelActa() {
      // this.visible = false
      this.codigoActa = ''
      this.$emit('accionModal', { accion: 'CANCEL', codigoActa: '' })
    },
    fetchData() {
      this.listLoading = true
      const params = {
        limit: this.numberItems,
        page: this.currentPage,
        search: this.search
      }
      getAll(params).then(response => {
        const options = []
        this.list = response.data.map(function(x) {
          x.enable = (x.enable === 1)
          options.push({
            value: x.codigo,
            label: x.codigo + ' - ' + x.fecha
          })
          return x
        })

        this.options = [...options]
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
